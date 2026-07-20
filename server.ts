/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini AI client successfully initialized.');
  } catch (err) {
    console.error('Error initializing Gemini client:', err);
  }
} else {
  console.warn('Warning: GEMINI_API_KEY environment variable is not defined. Chat will operate in simulated offline mode.');
}

// In-Memory Database for Bookings
const bookings: any[] = [];

// Static Data
const packages = [
  { id: 'spice', name: 'Spice Farm Tour', priceUSD: 10, duration: '3 Hours' },
  { id: 'village', name: 'Village Tour', priceUSD: 10, duration: '4 Hours' },
  { id: 'cooking', name: 'Cooking Class', priceUSD: 10, duration: '3.5 Hours' },
  { id: 'combo', name: 'Spice + Village Combo', priceUSD: 10, duration: '6 Hours' },
  { id: 'full', name: 'Full-Day Experience', priceUSD: 10, duration: '8 Hours' },
  { id: 'private', name: 'Private Customized Tour', priceUSD: 10, duration: 'Flexible' }
];

// Interactive Weather API (Zanzibar simulation)
app.get('/api/weather', (req, res) => {
  const isFrench = req.query.lang === 'fr';
  const isGerman = req.query.lang === 'de';

  const date = new Date();
  const hour = date.getHours();
  let temp = 28;
  let condition = 'Sunny';
  let windSpeed = '12 km/h';
  let humidity = '72%';

  // Dynamic conditions based on local server hour
  if (hour > 18 || hour < 6) {
    temp = 24;
    condition = 'Clear & Breezy';
  } else if (hour % 3 === 0) {
    temp = 27;
    condition = 'Partly Cloudy';
  }

  // Translations
  if (isFrench) {
    if (condition === 'Sunny') condition = 'Ensoleillé';
    if (condition === 'Clear & Breezy') condition = 'Clair & Venté';
    if (condition === 'Partly Cloudy') condition = 'Partiellement Nuageux';
  } else if (isGerman) {
    if (condition === 'Sunny') condition = 'Sonnig';
    if (condition === 'Clear & Breezy') condition = 'Klar & Windig';
    if (condition === 'Partly Cloudy') condition = 'Teilweise bewölkt';
  }

  res.json({
    tempCelsius: temp,
    condition,
    humidity,
    windSpeed,
    location: 'Zanzibar, Tanzania'
  });
});

// Bookings Endpoint
app.post('/api/bookings', (req, res) => {
  const { tourId, guestName, guestEmail, guestPhone, date, guestsCount, specialRequests } = req.body;

  if (!tourId || !guestName || !guestEmail || !date || !guestsCount) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }

  const tour = packages.find(p => p.id === tourId);
  if (!tour) {
    return res.status(404).json({ error: 'Selected tour package not found.' });
  }

  const totalCostUSD = tour.priceUSD * Number(guestsCount);
  const confirmationId = `ZNZ-${Math.floor(1000 + Math.random() * 9000)}-${tourId.toUpperCase()}`;

  const newBooking = {
    id: confirmationId,
    tourId,
    tourName: tour.name,
    guestName,
    guestEmail,
    guestPhone: guestPhone || 'WhatsApp',
    date,
    guestsCount: Number(guestsCount),
    totalCostUSD,
    specialRequests,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);

  res.status(201).json({
    success: true,
    booking: newBooking
  });
});

// AI Chat Assistant Endpoint (Server-Side proxying of Gemini API)
app.post('/api/chat', async (req, res) => {
  const { messages, userLanguage } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages body.' });
  }

  const conversation = messages.map((m: any) => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  const userPrompt = messages[messages.length - 1]?.text || '';

  const systemInstruction = `You are "Bibi", a warm, welcoming, and deeply knowledgeable local cultural ambassador and booking assistant for Zanzibar Spice & Cooking Experience.
You speak English, French (français), and German (Deutsch) fluently. You should respond in the language the user is speaking (${userLanguage || 'English'}).
Keep your tone enthusiastic, authentic, hospitable, and colorful—reflecting Zanzibar's "Karibu" (welcome) and "Hakuna Matata" spirit.
Answer questions accurately using these details:
- **Our Packages**:
  1. Spice Farm Tour: 3 hours, $10 per person. Explore cloves, cardamom, ginger, cinnamon, vanilla, and turmeric.
  2. Village Tour: 4 hours, $10 per person. Meet local families, visit a school, watch traditional dancers, and see clay craftspeople.
  3. Cooking Class: 3.5 hours, $10 per person. Learn to blend fresh spices, cook Pilau, Zanzibar curry, and hand-rolled chapatis. Vegetarian options are fully supported.
  4. Combo Tour: 6 hours, $10 per person (Spice + Village).
  5. Full-Day Experience: 8 hours, $10 per person (Combo + Cooking Class + traditional lunch).
- **Inclusions**: Hotel pickup is available. Refreshments and spiced tea are included.
- **Booking**: Guests can book online directly in the dashboard, or via WhatsApp at +255 777 SPICES.
- Keep responses relatively concise, readable, and beautifully formatted (using simple paragraphs or bullets). Encourage direct bookings!`;

  if (ai) {
    try {
      // We use the models.generateContent with the conversation array
      // To format for chat, we pass the current system instruction inside config
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: conversation,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }], // Enable Search Grounding for live inquiries
        }
      });

      const replyText = response.text || "Polite Swahili welcome! How can Bibi help you today?";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Zanzibar Tourism info',
        uri: chunk.web?.uri || '#'
      })) || [];

      res.json({
        text: replyText,
        sources
      });
    } catch (err: any) {
      console.error('Gemini call error:', err);
      res.json({
        text: `Karibu! I encountered a small storm in my spice sails, but I am still here to help! To book or ask questions directly, you can always reach our team via WhatsApp at +255 777 SPICES. What would you like to know about our ${userLanguage === 'fr' ? 'visites' : userLanguage === 'de' ? 'Touren' : 'tours'}?`,
        sources: []
      });
    }
  } else {
    // Elegant fallback simulation when Gemini Key is absent
    let reply = "Karibu Sana! Welcome to our Spice Island. ";
    if (userPrompt.toLowerCase().includes('price') || userPrompt.toLowerCase().includes('cost') || userPrompt.toLowerCase().includes('tarif') || userPrompt.toLowerCase().includes('preis')) {
      reply += "Our individual experiences (Spice Tour, Village Tour, Cooking Class) range from $10 to $10. Our best seller is the Full-Day Experience for $10 which includes everything, plus a delicious fresh lunch!";
    } else if (userPrompt.toLowerCase().includes('cook') || userPrompt.toLowerCase().includes('cuisine') || userPrompt.toLowerCase().includes('essen')) {
      reply += "In our Cooking Class ($10), you will harvest fresh turmeric, ginger, and cardamom, and learn to make traditional Zanzibar Pilau and Swahili coconut fish curry in a clay pot!";
    } else {
      reply += "I am Bibi, your local guide. I can help you discover our authentic tours, traditional recipes, and local community projects. Ask me about our Spice Tours, Village visits, or Cooking Classes!";
    }

    res.json({
      text: reply,
      sources: []
    });
  }
});

// Serve frontend SPA or configure development server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development server middleware loaded.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zanzibar Spice Tour App server running on http://localhost:${PORT}`);
  });
}

startServer();
