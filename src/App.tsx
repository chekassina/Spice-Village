/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Compass, Leaf, ChefHat, Calendar, Users, Star, 
  BookOpen, MessageSquare, Menu, X, ArrowRight, Check, 
  MapPin, Globe, Sparkles, Send, HelpCircle, Crown,
  GraduationCap, Music, Sun, Phone, ChevronRight, Heart, Award, ArrowUpRight
} from 'lucide-react';
import { Language, Currency, Booking } from './types';
import { 
  tourPackages, 
  reviewsData, 
  blogPosts, 
  spicesList, 
  teamGuides, 
  whyChooseUsData, 
  translations, 
  exchangeRates, 
  currencySymbols,
  mapLocalImagesToUnsplash
} from './data';

// Import components
import AIChatAssistant from './components/AIChatAssistant';
import WeatherWidget from './components/WeatherWidget';
import CountdownTimer from './components/CountdownTimer';
import InteractiveMap from './components/InteractiveMap';
import RecipeBookPopup from './components/RecipeBookPopup';
import BookingForm from './components/BookingForm';

// Import pages
import SpicesPage from './components/SpicesPage';
import CookingPage from './components/CookingPage';
import PackagesPage from './components/PackagesPage';
import ImpactPage from './components/ImpactPage';
import BlogPage from './components/BlogPage';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'spices' | 'village' | 'cooking' | 'visitors'>('all');
  const [currentPage, setCurrentPage] = useState<'home' | 'spices' | 'cooking' | 'packages' | 'impact' | 'blog'>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  
  // Modals & Drawers State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState('spice');
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Hero image slide rotation
  const heroImages = [
    '/images/ra1.jpg',
    '/images/ra11.jpg',
    '/images/ra8.jpg',
    '/images/ra10.jpg'
  ].map(mapLocalImagesToUnsplash);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const labels = translations[currentLang];
  const currSym = currencySymbols[currentCurrency];
  const rate = exchangeRates[currentCurrency];

  // Helper to convert USD price dynamically
  const formatPrice = (usdPrice: number) => {
    const converted = usdPrice * rate;
    return `${currSym}${Number(converted).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  // Gallery items with category tags
  const galleryItems = [
    { src: '/images/ra1.jpg', cat: 'spices', title: { en: 'Vibrant spice market heaps', fr: 'Épices colorées au marché', de: 'Bunte Gewürzhaufen am Markt' } },
    { src: '/images/ra2.jpg', cat: 'spices', title: { en: 'Drying cloves close-up', fr: 'Girofles séchant au soleil', de: 'Trocknende Gewürznelken' } },
    { src: '/images/ra3.jpg', cat: 'spices', title: { en: 'Cinnamon sticks & star anise', fr: 'Cannelle et badiane fraîches', de: 'Zimtstangen und Sternanis' } },
    { src: '/images/ra4.jpg', cat: 'village', title: { en: 'Welcoming village family', fr: 'Famille chaleureuse du village', de: 'Herzliche Dorffamilie' } },
    { src: '/images/ra5.jpg', cat: 'village', title: { en: 'Traditional cooking on clay stoves', fr: 'Cuisine traditionnelle sur argile', de: 'Traditionelles Lehmkochen' } },
    { src: '/images/ra6.jpg', cat: 'village', title: { en: 'Smiling primary school students', fr: 'Écoliers du village soutenus', de: 'Dorfschulkinder-Lächeln' } },
    { src: '/images/ra7.jpg', cat: 'village', title: { en: 'Lush organic farm plot', fr: 'Culture maraîchère biologique', de: 'Üppiges Bio-Anbaufeld' } },
    { src: '/images/ra8.jpg', cat: 'cooking', title: { en: 'Fresh culinary ingredients', fr: 'Ingrédients de cuisine frais', de: 'Frische Kochzutaten' } },
    { src: '/images/ra9.jpg', cat: 'cooking', title: { en: 'Hands-on cooking class lesson', fr: 'Cours de cuisine interactif', de: 'Interaktiver Kochkurs' } },
    { src: '/images/ra10.jpg', cat: 'cooking', title: { en: 'Fresh Zanzibar Pilau feast', fr: 'Grand buffet de Pilau Swahili', de: 'Sansibar-Pilau-Festessen' } },
    { src: '/images/ra11.jpg', cat: 'spices', title: { en: 'Lush forest spice farm paths', fr: 'Sentiers de la ferme d\'épices', de: 'Grüne Gewürzfarm-Pfade' } },
    { src: '/images/ra12.jpg', cat: 'visitors', title: { en: 'Touring historical Stone Town', fr: 'Visite de Stone Town', de: 'Historische Stone-Town-Gasse' } },
    { src: '/images/ra13.jpg', cat: 'visitors', title: { en: 'Happy spice tour graduates', fr: 'Visiteurs couronnés de feuilles', de: 'Zufriedene Gäste mit Blattkrone' } },
    { src: '/images/ra14.jpg', cat: 'visitors', title: { en: 'Zanzibar turquoise coastal reefs', fr: 'Lagon turquoise de Zanzibar', de: 'Türkisfarbener Sansibar-Strand' } },
    { src: '/images/ra15.jpg', cat: 'visitors', title: { en: 'Magical ocean sunset behind palms', fr: 'Coucher de soleil sous les palmiers', de: 'Tropischer Strand-Sonnenuntergang' } },
    { src: '/images/ra16.jpg', cat: 'village', title: { en: 'Traditional drumming performance', fr: 'Spectacle de percussions Swahilies', de: 'Traditionelle Trommel-Show' } }
  ].map(item => ({ ...item, src: mapLocalImagesToUnsplash(item.src) }));

  const filteredGallery = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.cat === activeTab);

  const handleOpenBooking = (tourId: string) => {
    setSelectedTourId(tourId);
    setBookingOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const faqs = [
    {
      q: {
        en: "What should I wear for the Spice & Village Tour?",
        fr: "Comment dois-je m'habiller pour la visite ?",
        de: "Was sollte ich für die Tour anziehen?"
      },
      a: {
        en: "As Zanzibar is a culturally conservative island, we highly recommend wearing comfortable walking shoes and clothing that covers your shoulders and knees. This is especially important during the village tour and school visits.",
        fr: "Zanzibar étant une île culturellement conservatrice, nous vous recommandons de porter des chaussures de marche confortables et des vêtements couvrant les épaules et les genoux, en particulier lors des visites de village.",
        de: "Da Sansibar eine kulturell konservative Insel ist, empfehlen wir bequeme Laufschuhe sowie Kleidung, die Schultern und Knie bedeckt. Dies ist besonders wichtig für die Dorftour und den Schulbesuch."
      }
    },
    {
      q: {
        en: "Is hotel pickup and drop-off included in the price?",
        fr: "La navette depuis l'hôtel est-elle incluse ?",
        de: "Ist der Hoteltransfer im Preis inbegriffen?"
      },
      a: {
        en: "Yes, roundtrip air-conditioned transport is fully included for all hotels within Stone Town, Bububu, and Kiwengwa regions. For hotels outside these areas, a small transfer surcharge may apply depending on the distance.",
        fr: "Oui, le transport climatisé aller-retour est inclus pour tous les hôtels de Stone Town, Bububu et Kiwengwa. Pour les autres zones, un petit supplément de transfert s'applique.",
        de: "Ja, der Hin- und Rücktransfer im klimatisierten Fahrzeug ist für alle Hotels in Stone Town, Bububu und Kiwengwa inbegriffen. Für Hotels in anderen Regionen kann ein kleiner Aufpreis anfallen."
      }
    },
    {
      q: {
        en: "Can the cooking class accommodate vegetarians or food allergies?",
        fr: "Le cours de cuisine s'adapte-t-il aux végétariens ?",
        de: "Können Vegetarier oder Allergiker am Kochkurs teilnehmen?"
      },
      a: {
        en: "Absolutely! Traditional Swahili cuisine is highly versatile and naturally embraces coconut milk, fresh vegetables, and beans. We fully accommodate vegetarian, vegan, gluten-free, and nut allergies. Please let us know in the booking form requests.",
        fr: "Absolument ! La cuisine Swahilie est très polyvalente. Nous nous adaptons entièrement aux régimes végétariens, végétaliens, sans gluten ou allergies aux noix. Mentionnez-le simplement lors de votre réservation.",
        de: "Absolut! Die traditionelle Swahili-Küche ist sehr vielseitig und verwendet Kokosmilch, frisches Gemüse und Bohnen. Wir bieten vegetarische, vegane und glutenfreie Optionen an. Bitte tragen Sie dies im Buchungsformular ein."
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8F5EC] text-stone-900 selection:bg-[#1F6B42] selection:text-white">
      
      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-40 bg-[#1F6B42]/95 backdrop-blur-md shadow-md border-b-[3px] border-[#D4AF37] text-[#F8F5EC] transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <img 
              src="/logo.png" 
              alt="Zanzibar Spice Experience Logo" 
              className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37] group-hover:rotate-6 transition-transform"
              onError={(e) => {
                // Fallback elegant circular layout icon if logo file is not loaded yet
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <h1 className="font-serif font-bold text-xl text-white tracking-tight leading-tight">
                {currentLang === 'fr' ? 'Épices & Village' : currentLang === 'de' ? 'Gewürz- & Dorferlebnis' : 'Spice & Village'}
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] font-mono leading-none mt-0.5">
                Zanzibar Experience
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6.5 text-xs font-bold uppercase tracking-widest text-white/90">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`hover:text-[#D4AF37] transition cursor-pointer font-bold ${currentPage === 'home' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : ''}`}
            >
              {currentLang === 'fr' ? 'Accueil' : currentLang === 'de' ? 'Startseite' : 'Home'}
            </button>
            <button 
              onClick={() => setCurrentPage('spices')} 
              className={`hover:text-[#D4AF37] transition cursor-pointer font-bold ${currentPage === 'spices' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : ''}`}
            >
              {labels.spices}
            </button>
            <button 
              onClick={() => setCurrentPage('cooking')} 
              className={`hover:text-[#D4AF37] transition cursor-pointer font-bold ${currentPage === 'cooking' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : ''}`}
            >
              {labels.cookingClass}
            </button>
            <button 
              onClick={() => setCurrentPage('packages')} 
              className={`hover:text-[#D4AF37] transition cursor-pointer font-bold ${currentPage === 'packages' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : ''}`}
            >
              {labels.packages}
            </button>
            <button 
              onClick={() => setCurrentPage('impact')} 
              className={`hover:text-[#D4AF37] transition cursor-pointer font-bold ${currentPage === 'impact' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : ''}`}
            >
              {currentLang === 'fr' ? 'Impact' : currentLang === 'de' ? 'Einfluss' : 'Impact'}
            </button>
            <button 
              onClick={() => setCurrentPage('blog')} 
              className={`hover:text-[#D4AF37] transition cursor-pointer font-bold ${currentPage === 'blog' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : ''}`}
            >
              {labels.blog}
            </button>
          </nav>

          {/* Controls: Lang, Currency & Booking Trigger */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-[#155231] border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <select 
                id="lang-select"
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value as Language)}
                className="bg-transparent focus:outline-none cursor-pointer text-white [&>option]:text-stone-850"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-[#155231] border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white">
              <span className="text-[#D4AF37] font-mono">$</span>
              <select 
                id="currency-select"
                value={currentCurrency} 
                onChange={(e) => setCurrentCurrency(e.target.value as Currency)}
                className="bg-transparent focus:outline-none cursor-pointer font-mono text-white [&>option]:text-stone-850"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="TZS">TZS (TSh)</option>
              </select>
            </div>

            {/* Primary CTA */}
            <button
              id="header-booking-btn"
              onClick={() => handleOpenBooking('full')}
              className="bg-[#D4AF37] text-[#1F6B42] px-6 py-2.5 rounded-sm shadow-lg font-bold hover:bg-[#f3cb4a] hover:text-[#1F6B42] transition duration-200 uppercase text-xs tracking-wider cursor-pointer"
            >
              {labels.chooseTour}
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-white p-1.5 hover:bg-[#155231] rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1F6B42] border-t border-white/10 p-6 space-y-5 shadow-inner text-white">
            <nav className="flex flex-col gap-4 text-base font-semibold">
              <button 
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} 
                className={`text-left hover:text-[#D4AF37] transition font-semibold cursor-pointer ${currentPage === 'home' ? 'text-[#D4AF37]' : ''}`}
              >
                {currentLang === 'fr' ? 'Accueil' : currentLang === 'de' ? 'Startseite' : 'Home'}
              </button>
              <button 
                onClick={() => { setCurrentPage('spices'); setMobileMenuOpen(false); }} 
                className={`text-left hover:text-[#D4AF37] transition font-semibold cursor-pointer ${currentPage === 'spices' ? 'text-[#D4AF37]' : ''}`}
              >
                {labels.spices}
              </button>
              <button 
                onClick={() => { setCurrentPage('cooking'); setMobileMenuOpen(false); }} 
                className={`text-left hover:text-[#D4AF37] transition font-semibold cursor-pointer ${currentPage === 'cooking' ? 'text-[#D4AF37]' : ''}`}
              >
                {labels.cookingClass}
              </button>
              <button 
                onClick={() => { setCurrentPage('packages'); setMobileMenuOpen(false); }} 
                className={`text-left hover:text-[#D4AF37] transition font-semibold cursor-pointer ${currentPage === 'packages' ? 'text-[#D4AF37]' : ''}`}
              >
                {labels.packages}
              </button>
              <button 
                onClick={() => { setCurrentPage('impact'); setMobileMenuOpen(false); }} 
                className={`text-left hover:text-[#D4AF37] transition font-semibold cursor-pointer ${currentPage === 'impact' ? 'text-[#D4AF37]' : ''}`}
              >
                {currentLang === 'fr' ? 'Impact Social' : currentLang === 'de' ? 'Sozialer Einfluss' : 'Social Impact'}
              </button>
              <button 
                onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); }} 
                className={`text-left hover:text-[#D4AF37] transition font-semibold cursor-pointer ${currentPage === 'blog' ? 'text-[#D4AF37]' : ''}`}
              >
                {labels.blog}
              </button>
            </nav>

            <div className="h-[1px] bg-white/10 w-full"></div>

            {/* Mobile Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 bg-[#155231] border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold text-white">
                <Globe className="w-4.5 h-4.5 text-[#D4AF37]" />
                <select 
                  id="lang-select-mobile"
                  value={currentLang} 
                  onChange={(e) => setCurrentLang(e.target.value as Language)}
                  className="bg-transparent focus:outline-none text-white [&>option]:text-stone-850"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-[#155231] border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold text-white">
                <span className="text-[#D4AF37] font-mono">$</span>
                <select 
                  id="currency-select-mobile"
                  value={currentCurrency} 
                  onChange={(e) => setCurrentCurrency(e.target.value as Currency)}
                  className="bg-transparent focus:outline-none font-mono text-white [&>option]:text-stone-850"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="TZS">TZS (TSh)</option>
                </select>
              </div>
            </div>

            <button
              id="mobile-header-booking-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBooking('full');
              }}
              className="w-full bg-[#D4AF37] text-[#1F6B42] py-4 rounded-md text-sm font-bold tracking-wide hover:bg-[#f3cb4a] transition text-center block uppercase cursor-pointer"
            >
              {labels.chooseTour}
            </button>
          </div>
        )}
      </header>

      {/* Dynamic Page Views */}
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            {/* 2. Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden font-sans select-none">
        {/* Cinematic Fading Background Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                idx === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `linear-gradient(rgba(45, 30, 20, 0.55), rgba(45, 30, 20, 0.75)), url(${img})` }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-12 flex flex-col items-center">
          
          {/* Scented Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="bg-[#D4AF37] text-[#5A3E2B] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 fill-[#5A3E2B]" />
              <span>{currentLang === 'fr' ? 'Expérience Culturelle 5 Étoiles' : currentLang === 'de' ? '5-Sterne Kulturerlebnis' : '5-Star Cultural Experience'}</span>
            </span>
            <span className="bg-white/15 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
              {currentLang === 'fr' ? 'Soutien direct au village' : currentLang === 'de' ? 'Direkte Unterstützung des Dorfes' : 'Direct Village Support'}
            </span>
          </div>

          <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6.5xl tracking-tight leading-tight max-w-4xl text-shadow-lg">
            {labels.tagline}
          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-stone-200/95 max-w-3xl leading-relaxed text-shadow">
            {labels.taglineSub}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4.5">
            <button
              id="hero-booking-btn"
              onClick={() => handleOpenBooking('full')}
              className="bg-[#1F6B42] text-white hover:bg-[#155231] px-8 py-4.5 rounded-2xl font-bold tracking-wider hover:shadow-2xl transition duration-300 uppercase text-sm border-2 border-transparent hover:border-white/10 cursor-pointer shadow-md"
            >
              {labels.bookNow}
            </button>
            <a
              href="#packages"
              className="bg-white/15 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-4.5 rounded-2xl font-bold tracking-wider transition duration-300 uppercase text-sm border border-white/20 flex items-center gap-2 shadow-sm"
            >
              <span>{currentLang === 'fr' ? 'Découvrir les formules' : currentLang === 'de' ? 'Formeln ansehen' : 'Explore Packages'}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </div>

          {/* Dynamic Floating Widgets Row */}
          <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <CountdownTimer currentLang={currentLang} />
            <WeatherWidget currentLang={currentLang} />
          </div>

        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest font-mono">
              KARIBU SANIBAR
            </span>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] mt-2 tracking-tight">
              {labels.whyUs}
            </h3>
            <p className="mt-3 text-stone-500 text-sm leading-relaxed">
              {currentLang === 'fr' 
                ? 'Nous proposons des expériences de tourisme durable authentiques qui responsabilisent les familles locales et partagent notre fier patrimoine.' 
                : currentLang === 'de' 
                ? 'Wir bieten nachhaltige Tourismuserlebnisse, die lokale Familien stärken und unser stolzes Erbe teilen.' 
                : 'We deliver transparent, sustainable, and highly personalized cultural excursions that support rural schools and empower Zanzibari families.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsData.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#F8F5EC] border border-stone-200/50 p-6.5 rounded-3xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-[#1F6B42] shadow-inner mb-5">
                    {idx === 0 && <Compass className="w-5 h-5 text-[#1F6B42]" />}
                    {idx === 1 && <Users className="w-5 h-5 text-[#1F6B42]" />}
                    {idx === 2 && <Leaf className="w-5 h-5 text-[#1F6B42]" />}
                    {idx === 3 && <Heart className="w-5 h-5 text-rose-500" />}
                  </div>
                  <h4 className="font-bold text-base text-[#5A3E2B] mb-2.5">
                    {item.title[currentLang]}
                  </h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    {item.desc[currentLang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. About Us & Sustainability */}
      <section id="about" className="py-20 lg:py-28 bg-[#F8F5EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Our Story Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-[#D4AF37]/15 rounded-3xl -z-10"></div>
              <img 
                src={mapLocalImagesToUnsplash('/images/ra12.jpg')} 
                alt="Zanzibar alleys" 
                className="rounded-3xl shadow-xl w-full aspect-video lg:aspect-[4/3] object-cover border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#1F6B42] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/10 hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">ESTABLISHED 2012</p>
                <p className="text-xs leading-relaxed font-medium">
                  {currentLang === 'fr' ? 'Lancé comme projet coopératif de village par 4 familles.' : currentLang === 'de' ? 'Gegründet als Dorfkooperative von 4 Familien.' : 'Started as a small village cooperative by 4 families in Bububu.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">{labels.aboutUs}</span>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] tracking-tight leading-tight">
                {currentLang === 'fr' 
                  ? 'Faire connaître la beauté de notre île, de manière durable' 
                  : currentLang === 'de' 
                  ? 'Die Schönheit unserer Insel auf nachhaltige Weise teilen' 
                  : 'Bridging Travel & Community Support'}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {currentLang === 'fr'
                  ? 'Notre coopérative a été créée pour offrir aux voyageurs une immersion sincère et sans artifice à Zanzibar. Nous croyons que le tourisme doit directement bénéficier à ceux qui ouvrent leur maison et leur cœur. C\'est pourquoi toutes nos visites intègrent des guides locaux certifiés, soutiennent l\'agriculture biologique et financent activement l\'école de notre village.'
                  : currentLang === 'de'
                  ? 'Unsere Kooperative wurde gegründet, um Reisenden eine ehrliche, unverfälschte Begegnung mit Sansibar zu ermöglichen. Wir glauben, dass Tourismus direkt den Menschen zugute kommen muss, die ihre Häuser und Herzen öffnen. Deshalb beschäftigen wir ausschließlich lokale Guides, unterstützen Bio-Gewürzbauern und finanzieren die Dorfschule.'
                  : 'Our cooperative was founded to offer travelers an honest, unvarnished window into rural Zanzibar. We believe tourism must directly benefit the individuals who open their homes and heritage. That is why 100% of our guiding team are local villagers, we advocate exclusively for organic farming, and fund clean water infrastructure.'}
              </p>

              {/* Sustainability Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                <div className="flex gap-2.5 items-start">
                  <div className="bg-emerald-100 p-2 rounded-xl text-[#1F6B42]">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#5A3E2B]">100% Fair Wages</h5>
                    <p className="text-[10px] text-stone-500 leading-tight mt-0.5">Direct guide profit share</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="bg-amber-100 p-2 rounded-xl text-[#D4AF37]">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#5A3E2B]">10% Direct Fund</h5>
                    <p className="text-[10px] text-stone-500 leading-tight mt-0.5">Primary school math books</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guides Spotlight */}
          <div className="space-y-10">
            <div className="text-center">
              <h4 className="font-serif font-bold text-2xl text-[#5A3E2B]">{labels.meetGuides}</h4>
              <p className="text-stone-500 text-xs mt-1">
                {currentLang === 'fr' ? 'Nos guides sont des conteurs d\'histoires agréés.' : currentLang === 'de' ? 'Unsere Guides sind zertifizierte Dorfälteste.' : 'Our guides are licensed, friendly, and certified village hosts.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamGuides.map((guide, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-stone-200/50 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row gap-5 items-center"
                >
                  <img 
                    src={guide.image} 
                    alt={guide.name} 
                    className="w-24 h-24 rounded-2xl object-cover border border-[#D4AF37]"
                  />
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h5 className="font-bold text-base text-[#5A3E2B]">{guide.name}</h5>
                    <span className="inline-block text-[11px] font-bold text-[#1F6B42] bg-[#F8F5EC] px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                      {guide.role[currentLang]}
                    </span>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      {guide.bio[currentLang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Interactive Spice Showroom */}
      <section id="spices" className="py-20 lg:py-28 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">
              THE SENSORY TRAIL
            </span>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] mt-2 tracking-tight">
              {currentLang === 'fr' ? 'Trésors Botaniques de Zanzibar' : currentLang === 'de' ? 'Sansibars Botanische Schätze' : 'Zanzibari Spice Treasures'}
            </h3>
            <p className="mt-3 text-stone-500 text-sm leading-relaxed">
              {currentLang === 'fr'
                ? 'Touchez, sentez et goûtez plus de 30 épices biologiques. Cliquez sur l\'une de nos épices phares ci-dessous pour découvrir ses secrets et vertus.'
                : currentLang === 'de'
                ? 'Fühlen, riechen und schmecken Sie über 30 Bio-Gewürze. Klicken Sie auf ein Gewürz, um seine medizinischen Kräfte zu entdecken.'
                : 'Smell, scrape, and taste over 30 wild-growing varieties. Explore below to uncover the healing properties and Swahili names of our four cornerstone spices.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spicesList.map((spice, idx) => (
              <div 
                key={idx}
                id={`spice-card-${idx}`}
                className="bg-[#F8F5EC] rounded-3xl shadow-sm hover:shadow-md border border-stone-200/50 overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={spice.image} 
                    alt={spice.name[currentLang]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur p-2 rounded-xl text-[#1F6B42] shadow-sm">
                    {idx === 0 && <Award className="w-4.5 h-4.5" />}
                    {idx === 1 && <Leaf className="w-4.5 h-4.5" />}
                    {idx === 2 && <Crown className="w-4.5 h-4.5" />}
                    {idx === 3 && <Sun className="w-4.5 h-4.5 text-amber-500" />}
                  </div>
                </div>

                <div className="p-5.5 space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-base text-[#5A3E2B]">
                      {spice.name[currentLang]}
                    </h4>
                    <p className="text-[10px] text-stone-400 font-mono italic mt-0.5">
                      {spice.scientific}
                    </p>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    {spice.desc[currentLang]}
                  </p>

                  <div className="bg-white p-3 rounded-xl border border-stone-150 text-[11px] leading-normal text-stone-650">
                    <strong className="text-[#1F6B42]">{currentLang === 'fr' ? 'Usages :' : currentLang === 'de' ? 'Anwendung:' : 'Traditional Uses:'}</strong>{' '}
                    {spice.use[currentLang]}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Village Tour Spotlight */}
      <section className="py-20 bg-[#F8F5EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest font-mono">CULTURAL IMMERSION</span>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] tracking-tight leading-tight">
                {currentLang === 'fr' ? 'Rencontrer les familles et artisans' : currentLang === 'de' ? 'Dorfleben & Familie' : 'Inside Swahili Village Life'}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {currentLang === 'fr'
                  ? 'Il ne s\'agit pas d\'un simple spectacle, mais d\'un véritable aperçu de la vie rurale à Zanzibar. Vous rencontrerez des artisans qui fabriquent des paniers de feuilles de palmier, assisterez à des danses festives de femmes swahilies et visiterez l\'école locale de Bububu pour voir comment vos réservations changent les vies.'
                  : currentLang === 'de'
                  ? 'Keine Show – sondern eine ehrliche Begegnung. Lernen Sie die Dorffamilien kennen, mahlen Sie Maniok, schauen Sie den Weberinnen über die Schulter und erleben Sie ein traditionelles Trommelfest. Ihr Besuch unterstützt die Schulbildung der Kinder vor Ort.'
                  : 'We walk respectfully into the heart of rural Zanzibar. Pilon cassava roots with local mothers, learn how clay cookstoves are hand-formed, hear children practice songs in the community school we fund, and join a high-energy traditional Swahili drumming workshop.'}
              </p>

              <div className="space-y-3.5 pt-3">
                <div className="flex gap-3 items-center text-sm font-semibold text-[#5A3E2B]">
                  <Check className="w-5 h-5 text-[#1F6B42] bg-white p-1 rounded-full shadow-sm" />
                  <span>{currentLang === 'fr' ? 'Visite de l\'école primaire locale' : currentLang === 'de' ? 'Besuch der Dorfgrundschule' : 'Visit rural primary school'}</span>
                </div>
                <div className="flex gap-3 items-center text-sm font-semibold text-[#5A3E2B]">
                  <Check className="w-5 h-5 text-[#1F6B42] bg-white p-1 rounded-full shadow-sm" />
                  <span>{currentLang === 'fr' ? 'Atelier de pilonnage du manioc' : currentLang === 'de' ? 'Maniok-Stampf-Workshop' : 'Cassava pounding workshop'}</span>
                </div>
                <div className="flex gap-3 items-center text-sm font-semibold text-[#5A3E2B]">
                  <Check className="w-5 h-5 text-[#1F6B42] bg-white p-1 rounded-full shadow-sm" />
                  <span>{currentLang === 'fr' ? 'Danses et tambours traditionnels' : currentLang === 'de' ? 'Traditionelle Trommeln & Gesang' : 'Traditional Swahili drumming & dance'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <img 
                src={mapLocalImagesToUnsplash('/images/ra4.jpg')} 
                alt="Village Family" 
                className="rounded-3xl shadow-md w-full aspect-[4/3] object-cover border-4 border-white"
              />
              <img 
                src={mapLocalImagesToUnsplash('/images/ra6.jpg')} 
                alt="Village school children" 
                className="rounded-3xl shadow-md w-full aspect-[4/3] object-cover border-4 border-white mt-6"
              />
              <img 
                src={mapLocalImagesToUnsplash('/images/ra16.jpg')} 
                alt="Drummers" 
                className="rounded-3xl shadow-md w-full aspect-[4/3] object-cover border-4 border-white -mt-6"
              />
              <img 
                src={mapLocalImagesToUnsplash('/images/ra5.jpg')} 
                alt="Cooking lesson" 
                className="rounded-3xl shadow-md w-full aspect-[4/3] object-cover border-4 border-white"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 7. Cooking Class Showcase */}
      <section id="cooking" className="py-20 lg:py-28 bg-white border-y border-stone-200 relative overflow-hidden">
        {/* Subtle Decorative Leaves */}
        <div className="absolute -top-12 -left-12 opacity-5 select-none pointer-events-none">
          <Leaf className="w-64 h-64 text-[#1F6B42]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative">
              <img 
                src={mapLocalImagesToUnsplash('/images/ra9.jpg')} 
                alt="Chef hands spice pot cooking" 
                className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover border-4 border-white"
              />
              {/* Overlay highlight card */}
              <div className="absolute top-6 left-6 bg-amber-50 rounded-2xl p-4 shadow-lg border border-[#D4AF37] max-w-xs hidden sm:block">
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest font-mono">VEGETARIAN FRIENDLY</span>
                <p className="text-xs text-[#5A3E2B] leading-relaxed mt-1 font-semibold">
                  {currentLang === 'fr' ? 'Toutes les recettes proposent d\'excellentes alternatives végétaliennes et sans gluten.' : currentLang === 'de' ? 'Alle Rezepte bieten hervorragende vegetarische & glutenfreie Varianten.' : 'All dishes fully support delicious vegan, organic, and gluten-free variations.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">SWAHILI KITCHEN</span>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] tracking-tight leading-tight">
                {labels.cookingClass}
              </h3>
              <p className="text-stone-650 text-sm leading-relaxed">
                {currentLang === 'fr'
                  ? 'Apprenez à assembler et broyer les épices récoltées sur des meules traditionnelles en pierre. Sous la direction de Mama Asha, préparez le célèbre riz Pilau aux parfums de cardamome, un curry de poisson à la noix de coco fraîche pressée à la main, et de délicieux beignets Mandazi.'
                  : currentLang === 'de'
                  ? 'Erleben Sie das echte Kochen in Tontöpfen auf Holzfeuer-Öfen. Pressen Sie Kokosmilch selbst, mahlen Sie Kurkuma auf Stein und kochen Sie unter Anleitung von Mama Asha berühmten Gewürz-Pilau und Swahili-Kokos-Curry.'
                  : 'Squeeze rich coconut milk by hand using a traditional wood-carved mbuzi scraper. Grind cinnamon bark, cardamom pods, and turmeric root on historic flat stones, and simmer rich aromatic Pilau rice and Swahili curry in traditional clay pots over open wood-fires.'}
              </p>

              {/* Recipes Included List */}
              <div className="bg-[#F8F5EC] p-5 rounded-2xl border border-stone-200/50 space-y-3">
                <h5 className="font-bold text-xs text-[#5A3E2B] uppercase tracking-wider">{currentLang === 'fr' ? 'Recettes que vous maîtriserez :' : currentLang === 'de' ? 'Rezepte, die Sie lernen:' : 'Recipes You Will Learn:'}</h5>
                <div className="grid grid-cols-2 gap-2 text-stone-700 text-xs font-medium">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1F6B42]" /> Zanzibar Spiced Pilau</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1F6B42]" /> Mchuzi wa Nazi (Curry)</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1F6B42]" /> Lemongrass Spiced Tea</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1F6B42]" /> Hand-Tossed Chapatis</div>
                </div>
              </div>

              {/* Recipe Book CTA Button */}
              <button
                id="open-recipe-modal-btn"
                onClick={() => setRecipeOpen(true)}
                className="bg-[#5A3E2B] text-white hover:bg-stone-850 px-6 py-4.5 rounded-2xl text-xs font-bold tracking-wider hover:shadow-lg transition uppercase flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentLang === 'fr' ? 'Télécharger Livre de Recettes' : currentLang === 'de' ? 'Kostenloses Rezeptbuch' : 'Unlock Recipe Cookbook (Free)'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Tour Packages Pricing Grid */}
      <section id="packages" className="py-20 lg:py-28 bg-[#F8F5EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">
              CURATED EXCURSIONS
            </span>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] mt-2 tracking-tight">
              {labels.packages}
            </h3>
            <p className="mt-3 text-stone-500 text-sm leading-relaxed">
              {currentLang === 'fr' 
                ? 'Choisissez la formule idéale pour votre séjour. Tous les prix s\'affichent dans la devise de votre choix avec hotel pickup inclus.' 
                : currentLang === 'de' 
                ? 'Wählen Sie das perfekte Paket für Ihren Aufenthalt. Alle Preise inkl. Transfer und in Ihrer Wunschwährung.' 
                : 'Select the perfect excursion for your party. All experiences feature local organic ingredients, professional hosts, and direct community donations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                id={`package-card-${pkg.id}`}
                className={`bg-white rounded-3xl border shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 relative group ${
                  pkg.id === 'full' 
                    ? 'border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/10 scale-102 hover:scale-103' 
                    : 'border-stone-200/60 hover:shadow-lg hover:scale-101'
                }`}
              >
                {pkg.id === 'full' && (
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#5A3E2B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10 shadow-sm">
                    BEST SELLER
                  </div>
                )}

                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name[currentLang]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[#5A3E2B] text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm font-mono">
                    {pkg.duration[currentLang]}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6.5 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display font-extrabold text-lg text-[#5A3E2B]">
                        {pkg.name[currentLang]}
                      </h4>
                      <div className="text-right">
                        <span className="text-2xl font-black text-[#1F6B42] font-mono block leading-none">
                          {formatPrice(pkg.priceUSD)}
                        </span>
                        <span className="text-[10px] text-stone-400 block font-semibold mt-1 font-mono">per person</span>
                      </div>
                    </div>

                    <p className="text-stone-500 text-xs leading-relaxed">
                      {pkg.longDescription[currentLang]}
                    </p>

                    {/* Highlights Bullets */}
                    <div className="space-y-1.5 pt-3.5 border-t border-stone-100">
                      <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Highlights Included:</h5>
                      <div className="space-y-1.5">
                        {pkg.highlights[currentLang].slice(0, 3).map((hl, i) => (
                          <div key={i} className="flex items-center gap-2 text-stone-700 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1F6B42]"></span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    id={`book-pkg-btn-${pkg.id}`}
                    onClick={() => handleOpenBooking(pkg.id)}
                    className={`w-full py-4 rounded-2xl text-xs font-bold tracking-wider uppercase shadow-sm transition duration-200 cursor-pointer ${
                      pkg.id === 'full'
                        ? 'bg-[#1F6B42] text-white hover:bg-[#155231]'
                        : 'bg-[#5A3E2B] text-white hover:bg-stone-850'
                    }`}
                  >
                    {labels.chooseTour}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Interactive Map Section */}
      <section id="map" className="py-20 lg:py-28 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMap currentLang={currentLang} />
        </div>
      </section>

      {/* 10. Filterable Photo Gallery */}
      <section id="gallery" className="py-20 lg:py-28 bg-[#F8F5EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">
              PHOTO JOURNEY
            </span>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] mt-2 tracking-tight">
              {currentLang === 'fr' ? 'Moments d\'Émotions de nos Voyageurs' : currentLang === 'de' ? 'Galerie unserer Besucher' : 'Our Happy Visitor Gallery'}
            </h3>
            <p className="mt-3 text-stone-500 text-sm leading-relaxed">
              {currentLang === 'fr' 
                ? 'De vraies photos prises lors de nos visites d\'épices, cours de cuisine et visites de village.' 
                : currentLang === 'de' 
                ? 'Echte Fotos von unseren Touren, Kochkursen und Dorfbesuchen.' 
                : 'Genuine, high-resolution snapshots captured during our active excursions, organic farm visits, and primary school sessions.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 text-xs font-bold">
            {(['all', 'spices', 'village', 'cooking', 'visitors'] as const).map((tab) => (
              <button
                key={tab}
                id={`gallery-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full border transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#1F6B42] text-white border-transparent shadow-sm'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {tab === 'all' && labels.all}
                {tab === 'spices' && labels.spices}
                {tab === 'village' && labels.village}
                {tab === 'cooking' && labels.cooking}
                {tab === 'visitors' && labels.visitors}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredGallery.map((item, idx) => (
              <div 
                key={idx} 
                id={`gallery-item-${idx}`}
                className="bg-white p-2.5 rounded-3xl border border-stone-200/50 shadow-sm relative group overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <img 
                    src={item.src} 
                    referrerPolicy="no-referrer"
                    alt={item.title[currentLang]} 
                    className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#5A3E2B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                    <p className="text-white text-xs font-semibold leading-normal">
                      {item.title[currentLang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. Testimonials & Google Reviews */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest font-mono">
              GUEST REVIEWS
            </span>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] mt-2 tracking-tight">
              {currentLang === 'fr' ? 'La parole à nos visiteurs' : currentLang === 'de' ? 'Das sagen unsere Besucher' : 'Loved by Travelers Worldwide'}
            </h3>
            <p className="text-stone-500 text-xs mt-1">Authentic ratings from Google Reviews and TripAdvisor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsData.map((rev) => (
              <div 
                key={rev.id}
                className="bg-[#F8F5EC] border border-stone-200/50 p-6 rounded-3xl shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex gap-1 text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>

                  <p className="text-stone-700 text-xs leading-relaxed italic">
                    &ldquo;{rev.content[currentLang]}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-stone-200/50 mt-6">
                  {rev.avatar && (
                    <img 
                      src={rev.avatar} 
                      alt={rev.author} 
                      className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                    />
                  )}
                  <div>
                    <h5 className="font-bold text-xs text-[#5A3E2B]">{rev.author}</h5>
                    <span className="text-[9px] uppercase font-bold text-stone-400 font-mono">
                      {rev.platform} — {rev.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. Swahili Cultural Blog */}
      <section id="blog" className="py-20 lg:py-28 bg-[#F8F5EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">
              COMMUNITY WRITINGS
            </span>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] mt-2 tracking-tight">
              {currentLang === 'fr' ? 'Chroniques de l\'Île aux Épices' : currentLang === 'de' ? 'Neues aus dem Gewürzdorf' : 'The Spice Trails Journal'}
            </h3>
            <p className="mt-3 text-stone-500 text-sm leading-relaxed">
              Discover Zanzibari botanical secrets, authentic recipes, and updates about our local village schools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title[currentLang]} 
                      className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-[#1F6B42] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-[10px] text-stone-400 font-bold tracking-wider uppercase font-mono">{post.date} | by {post.author}</span>
                    <h4 className="font-display font-bold text-base text-[#5A3E2B] group-hover:text-[#1F6B42] transition">
                      {post.title[currentLang]}
                    </h4>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      {post.excerpt[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="border-t border-stone-100 pt-4">
                    <details className="group/details">
                      <summary className="text-xs font-bold text-[#1F6B42] hover:text-[#155231] cursor-pointer flex items-center justify-between outline-none select-none">
                        <span>{currentLang === 'fr' ? 'Lire l\'article entier' : currentLang === 'de' ? 'Vollständigen Artikel lesen' : 'Read Full Article'}</span>
                        <ChevronRight className="w-4 h-4 text-[#D4AF37] group-open/details:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-3 text-stone-600 text-xs leading-relaxed border-l-2 border-[#D4AF37] pl-3">
                        {post.content[currentLang]}
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
          </>
        ) : (
          <>
            {currentPage === 'spices' && (
              <SpicesPage 
                currentLang={currentLang} 
                onBookNow={handleOpenBooking} 
              />
            )}

            {currentPage === 'cooking' && (
              <CookingPage 
                currentLang={currentLang} 
                onOpenRecipes={() => setRecipeOpen(true)} 
                onBookNow={handleOpenBooking} 
              />
            )}

            {currentPage === 'packages' && (
              <PackagesPage 
                currentLang={currentLang} 
                currentCurrency={currentCurrency} 
                onBookNow={handleOpenBooking} 
              />
            )}

            {currentPage === 'impact' && (
              <ImpactPage 
                currentLang={currentLang} 
                onBookNow={handleOpenBooking} 
              />
            )}

            {currentPage === 'blog' && (
              <BlogPage 
                currentLang={currentLang} 
              />
            )}
          </>
        )}
      </main>

      {/* 13. FAQs & Newsletter Subscription (Dual block) */}
      <section className="py-20 lg:py-28 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* FAQ Block (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">COMMON INQUIRIES</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#5A3E2B] mt-2 tracking-tight">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isActive = activeFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-[#F8F5EC] border border-stone-200/50 rounded-2xl overflow-hidden transition shadow-sm"
                    >
                      <button
                        id={`faq-btn-${idx}`}
                        onClick={() => setActiveFaq(isActive ? null : idx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-sm text-[#5A3E2B] hover:text-[#1F6B42] outline-none select-none cursor-pointer"
                      >
                        <span>{faq.q[currentLang]}</span>
                        <ChevronRight className={`w-4 h-4 text-[#D4AF37] transition-transform ${isActive ? 'rotate-90' : ''}`} />
                      </button>
                      {isActive && (
                        <div className="px-5 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-200/50 pt-3">
                          {faq.a[currentLang]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Block (5 cols) */}
            <div className="lg:col-span-5 bg-[#5A3E2B] text-white p-6.5 lg:p-8 rounded-3xl shadow-xl relative overflow-hidden border-2 border-[#D4AF37]">
              {/* Decorative background circle */}
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#1F6B42] rounded-full opacity-20"></div>

              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest font-mono">STAY UPDATED</span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl mt-2 leading-snug">
                Join our botanical community mailing list
              </h3>
              <p className="mt-3 text-stone-200 text-xs leading-normal">
                Sign up to receive traditional Swahili recipe cards, organic botanical guides, and seasonal village project digests.
              </p>

              {!newsletterSuccess ? (
                <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="mt-6 space-y-3 relative z-10">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full bg-white/10 text-white placeholder-stone-300 text-xs px-4 py-3 rounded-xl focus:outline-none border border-white/20 focus:border-[#D4AF37] focus:bg-white focus:text-stone-850 transition"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="w-full bg-[#1F6B42] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#155231] transition duration-200 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-[#D4AF37]/50 text-center relative z-10">
                  <Check className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 animate-bounce" />
                  <h5 className="font-bold text-sm text-[#D4AF37]">Subscribed!</h5>
                  <p className="text-[10px] text-stone-200 mt-1">Karibu! You are now part of our community circle.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 14. Contact & WhatsApp Support */}
      <section id="contact" className="py-20 lg:py-28 bg-[#F8F5EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">SAY HELLO</span>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#5A3E2B] tracking-tight">
                {currentLang === 'fr' ? 'Commençons l\'aventure' : currentLang === 'de' ? 'Kontaktieren Sie uns' : 'Let\'s Secure Your Tour'}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Have custom group requests, hotel pickup queries, or special requirements? Chat directly with our local coordinator on WhatsApp, or send us a query!
              </p>

              <div className="space-y-4 pt-2">
                <a 
                  id="whatsapp-direct-link"
                  href="https://wa.me/255777774233" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3.5 bg-green-50 border border-green-200 hover:border-green-400 p-4 rounded-2xl transition shadow-sm cursor-pointer group"
                >
                  <div className="bg-[#1F6B42] text-white p-2.5 rounded-xl group-hover:rotate-6 transition-transform">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#5A3E2B]">{labels.whatsappChat}</h5>
                    <p className="text-[10px] text-stone-500 font-mono">+255 777 SPICES (774233)</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 ml-auto" />
                </a>

                <div className="flex items-center gap-3.5 bg-white border border-stone-200/60 p-4 rounded-2xl shadow-sm">
                  <div className="bg-[#5A3E2B] text-white p-2.5 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#5A3E2B]">Local Headquarters</h5>
                    <p className="text-[10px] text-stone-500 font-mono">Bububu Village Road, Zanzibar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6.5 lg:p-8 border border-stone-200/50 shadow-sm relative">
              <h4 className="font-serif font-bold text-lg text-[#5A3E2B] mb-5">Quick Contact Query</h4>
              <form id="contact-query-form" onSubmit={(e) => {
                e.preventDefault();
                alert(currentLang === 'fr' ? 'Merci ! Votre message a bien été envoyé. Karibu !' : currentLang === 'de' ? 'Vielen Dank! Ihre Nachricht wurde gesendet. Karibu!' : 'Thank you! Your message was sent successfully. Karibu!');
                (e.target as HTMLFormElement).reset();
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    id="contact-name-input"
                    type="text" 
                    required 
                    placeholder="Your Name" 
                    className="bg-[#F8F5EC] text-stone-850 text-xs px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#1F6B42] focus:bg-white transition"
                  />
                  <input 
                    id="contact-email-input"
                    type="email" 
                    required 
                    placeholder="Your Email" 
                    className="bg-[#F8F5EC] text-stone-850 text-xs px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#1F6B42] focus:bg-white transition"
                  />
                </div>
                <input 
                  id="contact-subject-input"
                  type="text" 
                  required 
                  placeholder="Subject (e.g. Private Honeymoon Combo)" 
                  className="w-full bg-[#F8F5EC] text-stone-850 text-xs px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#1F6B42] focus:bg-white transition"
                />
                <textarea 
                  id="contact-message-input"
                  rows={3} 
                  required 
                  placeholder="Your Message..." 
                  className="w-full bg-[#F8F5EC] text-stone-850 text-xs p-4 rounded-xl border border-stone-200 focus:outline-none focus:border-[#1F6B42] focus:bg-white transition resize-none"
                />
                <button 
                  id="contact-submit-btn"
                  type="submit" 
                  className="w-full bg-[#1F6B42] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#155231] transition cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-[#5A3E2B] text-white border-t-4 border-[#D4AF37] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg tracking-tight flex items-center gap-2 text-white">
              <Compass className="w-5 h-5 text-[#D4AF37]" />
              Zanzibar Spice Tour
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              An award-winning village cooperative bringing you face-to-face with authentic Swahili agricultural traditions, culinary arts, and family culture.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] mb-4">Our Experiences</h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button 
                  onClick={() => setCurrentPage('spices')} 
                  className="hover:text-white text-left cursor-pointer focus:outline-none"
                >
                  Spice Farm Trails
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('home')} 
                  className="hover:text-white text-left cursor-pointer focus:outline-none"
                >
                  Village Guided Excursion
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('cooking')} 
                  className="hover:text-white text-left cursor-pointer focus:outline-none"
                >
                  Traditional Cooking Class
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('packages')} 
                  className="hover:text-white text-left cursor-pointer focus:outline-none"
                >
                  Combo Excursions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] mb-4">Community Impact</h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><span className="text-[#D4AF37] font-semibold">10% Profit Fund</span></li>
              <li><span>Bububu Primary school books</span></li>
              <li><span>Village clay stove supply</span></li>
              <li><span>Clean water wells maintenance</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] mb-4">Trust & Accreditations</h5>
            <div className="space-y-3.5 text-xs text-stone-300 leading-snug">
              <p>📍 Zanzibar Tourism Board License #ZTB-2026-9428</p>
              <p>🌿 100% Certified Organic Farm Partners</p>
              <p>⭐ 5.0 Star Average on Google Excursions</p>
            </div>
          </div>

        </div>

        <div className="bg-[#4d3424] py-6 text-center text-xs text-stone-300/90 border-t border-stone-200/10 px-4">
          <p className="max-w-4xl mx-auto leading-relaxed">
            &copy; {new Date().getFullYear()} {labels.title}. {labels.allRightsReserved}
          </p>
        </div>
      </footer>

      {/* Floating Widgets & Drawers */}
      <AIChatAssistant currentLang={currentLang} />
      
      <BookingForm 
        currentLang={currentLang}
        currentCurrency={currentCurrency}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedTourId={selectedTourId}
      />

      <RecipeBookPopup 
        currentLang={currentLang}
        isOpen={recipeOpen}
        onClose={() => setRecipeOpen(false)}
      />

    </div>
  );
}
