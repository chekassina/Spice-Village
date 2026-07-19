import React, { useState } from 'react';
import { ChefHat, Users, Check, Flame, ArrowRight, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';
import { Language } from '../types';

interface CookingPageProps {
  currentLang: Language;
  onOpenRecipes: () => void;
  onBookNow: (tourId: string) => void;
}

export default function CookingPage({ currentLang, onOpenRecipes, onBookNow }: CookingPageProps) {
  const [guestsCount, setGuestsCount] = useState(4);

  // Core traditional Pilau ingredients base for 4 guests
  const baseIngredients = [
    { name: { en: 'Basmati Rice', fr: 'Riz Basmati', de: 'Basmati-Reis' }, amount: 500, unit: 'g' },
    { name: { en: 'Organic Whole Cloves', fr: 'Clous de girofle bio', de: 'Bio-Gewürznelken' }, amount: 6, unit: 'pcs' },
    { name: { en: 'Cardamom Pods', fr: 'Gousses de cardamome', de: 'Kardamomkapseln' }, amount: 5, unit: 'pcs' },
    { name: { en: 'Cinnamon Sticks', fr: 'Bâtons de cannelle', de: 'Zimtstangen' }, amount: 2, unit: 'pcs' },
    { name: { en: 'Fresh Coconut Milk', fr: 'Lait de coco frais', de: 'Frische Kokosmilch' }, amount: 400, unit: 'ml' },
    { name: { en: 'Ginger & Garlic Paste', fr: 'Pâte de gingembre & ail', de: 'Ingwer-Knoblauch-Paste' }, amount: 2, unit: 'tbsp' },
    { name: { en: 'Red Onions', fr: 'Oignons rouges', de: 'Rote Zwiebeln' }, amount: 3, unit: 'pcs' },
    { name: { en: 'Cumin seeds', fr: 'Graines de cumin', de: 'Kreuzkümmelsamen' }, amount: 1.5, unit: 'tsp' }
  ];

  const calculateAmount = (baseAmount: number) => {
    return ((baseAmount * guestsCount) / 4).toFixed(guestsCount % 4 === 0 ? 0 : 1);
  };

  return (
    <div className="py-12 bg-[#F8F5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-1.5">
              <ChefHat className="w-4.5 h-4.5 text-[#D4AF37] animate-pulse" />
              {currentLang === 'fr' ? 'La Cuisine Swahilie Authentique' : currentLang === 'de' ? 'Authentische Swahili-Küche' : 'SWAHILI COOKERY SCHOOL'}
            </span>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#5A3E2B] tracking-tight leading-tight">
              {currentLang === 'fr' 
                ? 'Apprenez à cuisiner avec les mères de notre village' 
                : currentLang === 'de' 
                ? 'Kochen Sie mit den Müttern unseres Dorfes' 
                : 'Unlock the Spiced Secrets of Zanzibar Cookery'}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              {currentLang === 'fr'
                ? 'Pas de cuisine professionnelle froide, mais un cours sous un toit de chaume traditionnel. Râpez des noix de coco mûres à la main à l\'aide d\'un outil swahili traditionnel en bois (Mbuzi) et préparez un festin aromatique de riz Pilau et de curry de poisson au coco.'
                : currentLang === 'de'
                ? 'Keine sterile Edelstahlküche, sondern Kochen im Freien unter Strohdächern. Reiben Sie Kokosnüsse auf traditionelle Swahili-Art mit dem Mbuzi-Holzhocker und kochen Sie ein duftendes Pilau-Festessen über dem Holzfeuer.'
                : 'Step under high-roofed clay gazebos to cook alongside local grandmothers. Learn to scrape ripe coconuts with a traditional wooden stool scraper (Mbuzi), grind whole spices in heavy wood mortars, and cook over eco-clay stoves.'}
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              <button
                onClick={onOpenRecipes}
                className="bg-[#D4AF37] text-[#1F6B42] hover:bg-[#f3cb4a] px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>{currentLang === 'fr' ? 'Ouvrir le Carnet de Recettes' : currentLang === 'de' ? 'Rezeptbuch Öffnen' : 'Open Recipe Book'}</span>
              </button>
              <button
                onClick={() => onBookNow('cooking')}
                className="bg-[#1F6B42] text-white hover:bg-[#155231] px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>{currentLang === 'fr' ? 'Réserver le Cours' : currentLang === 'de' ? 'Kochkurs Buchen' : 'Book Cooking Class'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Masterclass details visual card */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-4 -right-4 w-36 h-36 bg-[#D4AF37]/10 rounded-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&h=800&q=85"
              alt="Swahili cookery classroom experience"
              referrerPolicy="no-referrer"
              className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover border-4 border-white"
            />
            {/* Float Highlight Badge */}
            <div className="absolute -bottom-6 left-6 bg-white border border-stone-200 p-4.5 rounded-2xl shadow-lg max-w-xs flex gap-3.5 items-center">
              <div className="bg-amber-100 text-[#D4AF37] p-2.5 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#5A3E2B]">{currentLang === 'fr' ? 'Durée : 4 Heures' : currentLang === 'de' ? 'Dauer: 4 Stunden' : 'Duration: 4 Hours'}</h5>
                <p className="text-[10px] text-stone-500">{currentLang === 'fr' ? 'Repas copieux à volonté inclus' : currentLang === 'de' ? 'Inklusive reichhaltigem Festmahl' : 'Includes unlimited authentic lunch buffet'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portions & Ingredients Scaler Tool */}
        <div className="bg-white rounded-3xl p-6.5 sm:p-10 border border-stone-200/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                {currentLang === 'fr' ? 'Outil Interactif Swahili' : currentLang === 'de' ? 'Interaktives Swahili-Tool' : 'Interactive Swahili Tool'}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#5A3E2B]">
                {currentLang === 'fr' ? 'Calculateur d\'Ingrédients' : currentLang === 'de' ? 'Gewürz- & Mengenkalkulator' : 'Recipe Portion Scaler'}
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                {currentLang === 'fr'
                  ? 'Faites glisser pour ajuster le nombre d\'invités et voir instantanément les proportions d\'épices et d\'ingrédients requises pour un Pilau traditionnel parfait.'
                  : currentLang === 'de'
                  ? 'Passen Sie die Personenanzahl an, um sofort die idealen Gewürzmischungen und Zutaten für ein perfektes traditionelles Pilau zu berechnen.'
                  : 'Slide to adjust the guest count and watch the organic spices and baseline ingredients scale instantly. Try it before your holiday!'}
              </p>
            </div>

            {/* Slider */}
            <div className="bg-[#F8F5EC] p-5 rounded-2xl border border-stone-200/50 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-[#5A3E2B]">
                <span>{currentLang === 'fr' ? 'Nombre d\'invités :' : currentLang === 'de' ? 'Gästeanzahl:' : 'Number of Guests:'}</span>
                <span className="bg-[#1F6B42] text-white px-3 py-1 rounded-lg flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{guestsCount}</span>
                </span>
              </div>
              <input
                id="guests-count-slider"
                type="range"
                min="1"
                max="20"
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#1F6B42]"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>1 guest</span>
                <span>20 guests</span>
              </div>
            </div>

            {/* Chef Secret Info Block */}
            <div className="bg-amber-50 border border-[#D4AF37]/50 rounded-2xl p-4 space-y-1 text-xs">
              <h5 className="font-bold text-[#5A3E2B] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                {currentLang === 'fr' ? 'Secret de cuisine :' : currentLang === 'de' ? 'Küchengeheimnis:' : 'Chef Grandmother Secret:'}
              </h5>
              <p className="text-stone-600 leading-relaxed">
                {currentLang === 'fr'
                  ? 'Pour un Pilau swahili authentique, faites toujours caraméliser vos oignons jusqu\'à ce qu\'ils soient brun foncé avant d\'ajouter le riz. C\'est cela qui donne sa couleur riche et brune caractéristique !'
                  : currentLang === 'de'
                  ? 'Für ein echtes Swahili-Pilau karamellisieren Sie die Zwiebeln dunkelbraun, bevor Sie den Reis hinzufügen. Dies verleiht dem Reis sein typisch reiches Aroma und die charakteristische Farbe.'
                  : 'For a true aromatic Swahili Pilau, caramelize the red onions heavily in hot oil until deeply dark brown before tossing the spices and rice. This creates the signature rich brown colour and woodsy flavor.'}
              </p>
            </div>
          </div>

          {/* Recipe Checklist Ingredients Column */}
          <div className="lg:col-span-7 bg-[#F8F5EC] border border-stone-200/50 p-6 rounded-2xl space-y-4">
            <h4 className="font-serif font-bold text-base text-[#5A3E2B] pb-2 border-b border-stone-200 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-[#1F6B42]" />
              <span>{currentLang === 'fr' ? 'Ingrédients pour le Riz Pilau' : currentLang === 'de' ? 'Zutaten für Pilau-Reis' : 'Spiced Pilau Ingredients'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {baseIngredients.map((ing, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-emerald-50 text-[#1F6B42] p-1 rounded-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-stone-750">{ing.name[currentLang]}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#1F6B42] bg-[#F8F5EC] px-2.5 py-1 rounded-md">
                    {calculateAmount(ing.amount)} {ing.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
