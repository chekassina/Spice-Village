import React, { useState } from 'react';
import { Compass, Calendar, Check, Star, HelpCircle, ArrowRight, DollarSign, Award, Clock, Users, Shield } from 'lucide-react';
import { tourPackages, exchangeRates, currencySymbols } from '../data';
import { Language, Currency } from '../types';

interface PackagesPageProps {
  currentLang: Language;
  currentCurrency: Currency;
  onBookNow: (tourId: string) => void;
}

export default function PackagesPage({ currentLang, currentCurrency, onBookNow }: PackagesPageProps) {
  const [selectedTour, setSelectedTour] = useState(tourPackages[0]);
  const [privateGuide, setPrivateGuide] = useState(false);
  const [lunchUpgrade, setLunchUpgrade] = useState(false);
  const [hotelPickup, setHotelPickup] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(2);

  const rate = exchangeRates[currentCurrency];
  const sym = currencySymbols[currentCurrency];

  const calculateTotalPrice = (basePriceUSD: number) => {
    let price = basePriceUSD * participantsCount;
    if (privateGuide) price += 30; // +$30 flat private guide fee
    if (lunchUpgrade) price += 15 * participantsCount; // +$15/person lunch upgrade
    if (hotelPickup) price += 20; // +$20 flat pickup
    
    const converted = price * rate;
    return `${sym}${Number(converted).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const getUpgradePrice = (usdAmount: number) => {
    return `${sym}${Number(usdAmount * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="py-12 bg-[#F8F5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono flex items-center justify-center gap-1.5">
            <Compass className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '20s' }} />
            {currentLang === 'fr' ? 'Planifier Votre Excursion' : currentLang === 'de' ? 'Exkursionsplaner' : 'CURATED COMBOS & EXCURSIONS'}
          </span>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#5A3E2B] tracking-tight">
            {currentLang === 'fr' ? 'Formules Clés en Main' : currentLang === 'de' ? 'Wählen Sie Ihr Abenteuer' : 'Explore Our Curated Packages'}
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            {currentLang === 'fr'
              ? 'Sélectionnez l\'une de nos aventures coopératives primées de village à Bububu. Personnalisez votre formule et estimez votre prix de groupe instantanément.'
              : currentLang === 'de'
              ? 'Wählen Sie eine unserer preisgekrönten Abenteuertouren in Bububu. Nutzen Sie unseren Live-Planer, um Extras hinzuzufügen und Gruppenpreise anzuzeigen.'
              : 'Compare our award-winning cooperative excursions. Customize your package below and watch the prices estimate instantly in your local currency.'}
          </p>
        </div>

        {/* Dynamic Package Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (curated cards list) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#5A3E2B] px-2">
              {currentLang === 'fr' ? '1. Choisissez une formule :' : currentLang === 'de' ? '1. Paket wählen:' : '1. Select a baseline tour :'}
            </h3>
            {tourPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => {
                  setSelectedTour(pkg);
                  // Reset checkboxes to default
                  setPrivateGuide(false);
                  setLunchUpgrade(false);
                  setHotelPickup(false);
                }}
                className={`p-5 rounded-3xl border transition cursor-pointer flex gap-4 items-center ${
                  selectedTour.id === pkg.id
                    ? 'bg-white border-[#1F6B42] shadow-md ring-2 ring-[#1F6B42]/10'
                    : 'bg-white/80 border-stone-200 hover:bg-white hover:border-stone-300 shadow-sm'
                }`}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name[currentLang]}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover border border-stone-100"
                />
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-[#5A3E2B] leading-tight">
                      {pkg.name[currentLang]}
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {pkg.description[currentLang]}
                  </p>
                  <div className="flex items-center gap-2 pt-1.5">
                    <span className="text-[10px] font-bold text-[#1F6B42] bg-emerald-50 px-2 py-0.5 rounded-md font-mono">
                      {sym}{(pkg.priceUSD * rate).toFixed(0)} / person
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      ⏱️ {pkg.duration[currentLang]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Dynamic Customizer & Price Calculator) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6.5 sm:p-8 border border-stone-200/60 shadow-sm space-y-8">
            <div className="pb-4 border-b border-stone-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">Selected Tour Excursion</span>
                <h3 className="font-serif font-bold text-2xl text-[#5A3E2B] mt-0.5">
                  {selectedTour.name[currentLang]}
                </h3>
              </div>
              <span className="bg-[#1F6B42] text-white text-xs font-bold font-mono px-3 py-1 rounded-xl">
                {selectedTour.duration[currentLang]}
              </span>
            </div>

            {/* Customizer Option Selectors */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-sm text-[#5A3E2B]">
                {currentLang === 'fr' ? '2. Personnalisez vos options :' : currentLang === 'de' ? '2. Optionen anpassen:' : '2. Customize your experiences :'}
              </h4>

              {/* Guest Count Input */}
              <div className="flex items-center justify-between p-4 bg-[#F8F5EC] rounded-2xl border border-stone-200/50">
                <div className="space-y-0.5">
                  <h5 className="font-bold text-xs text-[#5A3E2B]">{currentLang === 'fr' ? 'Nombre de Voyageurs' : currentLang === 'de' ? 'Anzahl der Reisenden' : 'Number of Travelers'}</h5>
                  <p className="text-[10px] text-stone-400">Baseline price multiplies with headcount</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setParticipantsCount(Math.max(1, participantsCount - 1))}
                    className="w-7 h-7 bg-[#F8F5EC] text-stone-600 font-bold rounded-lg hover:bg-stone-200 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-stone-850 font-mono w-4 text-center">{participantsCount}</span>
                  <button
                    onClick={() => setParticipantsCount(participantsCount + 1)}
                    className="w-7 h-7 bg-[#F8F5EC] text-stone-600 font-bold rounded-lg hover:bg-stone-200 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Option checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Private Guide */}
                <label className="flex flex-col justify-between p-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer select-none space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-xs text-[#5A3E2B]">{currentLang === 'fr' ? 'Guide Privé' : currentLang === 'de' ? 'Privater Guide' : 'Private Guide'}</span>
                    <input
                      type="checkbox"
                      checked={privateGuide}
                      onChange={(e) => setPrivateGuide(e.target.checked)}
                      className="w-4.5 h-4.5 rounded text-[#1F6B42] border-stone-300 focus:ring-[#1F6B42]"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">Exclusive translator & coordinator guide</p>
                  <span className="text-xs font-bold text-[#1F6B42] font-mono">+{getUpgradePrice(30)} / flat</span>
                </label>

                {/* Swahili Lunch Upgrade */}
                <label className="flex flex-col justify-between p-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer select-none space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-xs text-[#5A3E2B]">{currentLang === 'fr' ? 'Déjeuner Gourmet' : currentLang === 'de' ? 'Gourmet-Mittagessen' : 'Gourmet Lunch'}</span>
                    <input
                      type="checkbox"
                      checked={lunchUpgrade}
                      onChange={(e) => setLunchUpgrade(e.target.checked)}
                      className="w-4.5 h-4.5 rounded text-[#1F6B42] border-stone-300 focus:ring-[#1F6B42]"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">Add organic tropical juice & local sea crab</p>
                  <span className="text-xs font-bold text-[#1F6B42] font-mono">+{getUpgradePrice(15)} / person</span>
                </label>

                {/* Hotel Pickup */}
                <label className="flex flex-col justify-between p-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer select-none space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-xs text-[#5A3E2B]">{currentLang === 'fr' ? 'Pick-up Hôtel' : currentLang === 'de' ? 'Hotel-Transfer' : 'Hotel Pickup'}</span>
                    <input
                      type="checkbox"
                      checked={hotelPickup}
                      onChange={(e) => setHotelPickup(e.target.checked)}
                      className="w-4.5 h-4.5 rounded text-[#1F6B42] border-stone-300 focus:ring-[#1F6B42]"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">Door-to-door AC minibus flat transfer</p>
                  <span className="text-xs font-bold text-[#1F6B42] font-mono">+{getUpgradePrice(20)} / flat</span>
                </label>
              </div>
            </div>

            {/* Price Output summary card */}
            <div className="bg-[#1F6B42] text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 border border-white/10 shadow-lg">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">Est. Total Group Price</span>
                <h4 className="text-3xl font-black font-mono">
                  {calculateTotalPrice(selectedTour.priceUSD)}
                </h4>
                <p className="text-[10px] text-emerald-100/90 leading-tight">
                  No hidden card fees. Fully backed by local cooperative guarantees.
                </p>
              </div>

              <button
                onClick={() => onBookNow(selectedTour.id)}
                className="bg-[#D4AF37] text-[#1F6B42] hover:bg-[#f3cb4a] px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <span>{currentLang === 'fr' ? 'Réserver cette formule' : currentLang === 'de' ? 'Dieses Paket buchen' : 'Book Custom Itinerary'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Inclusion checklist */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-stone-500 leading-normal border-t border-stone-150">
              <div className="flex gap-1.5 items-center">
                <Check className="w-4 h-4 text-[#1F6B42]" />
                <span>Licensed Swahili Guides</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <Check className="w-4 h-4 text-[#1F6B42]" />
                <span>100% Organic Spiced Teas</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <Check className="w-4 h-4 text-[#1F6B42]" />
                <span>Village development fund (10%)</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <Check className="w-4 h-4 text-[#1F6B42]" />
                <span>Full booking protection</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
