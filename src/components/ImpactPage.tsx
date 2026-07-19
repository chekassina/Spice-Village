import React, { useState } from 'react';
import { Heart, Users, BookOpen, Droplet, Flame, Compass, Check, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface ImpactPageProps {
  currentLang: Language;
  onBookNow: (tourId: string) => void;
}

export default function ImpactPage({ currentLang, onBookNow }: ImpactPageProps) {
  const [bookingSize, setBookingSize] = useState(4);

  // Milestone goals
  const milestones = [
    { title: { en: 'Primary School Textbooks', fr: 'Manuels Scolaires', de: 'Schulbücher' }, current: 780, target: 1000, unit: 'books', icon: BookOpen },
    { title: { en: 'Clean Water Bio-Filters', fr: 'Filtres d\'eau bio-sable', de: 'Wasser-Biofilter' }, current: 42, target: 50, unit: 'households', icon: Droplet },
    { title: { en: 'Smokeless Clay Cookstoves', fr: 'Foyers d\'argile améliorés', de: 'Lehmkocher' }, current: 120, target: 150, unit: 'stoves', icon: Flame }
  ];

  return (
    <div className="py-12 bg-[#F8F5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Heart className="w-4.5 h-4.5 text-rose-500 animate-pulse" />
              {currentLang === 'fr' ? 'Tourisme Solidaire & Communautaire' : currentLang === 'de' ? 'Gemeindeorientierter Tourismus' : 'COMMUNITY-FIRST SOCIAL IMPACT'}
            </span>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#5A3E2B] tracking-tight leading-tight">
              {currentLang === 'fr' 
                ? 'Chaque réservation finance l\'avenir de notre village' 
                : currentLang === 'de' 
                ? 'Jede Buchung finanziert die Zukunft unseres Dorfes' 
                : 'Where Your Holiday Directly Funds Rural Development'}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              {currentLang === 'fr'
                ? 'Notre coopérative est détenue et gérée à 100 % par les familles de Bububu. Nous ne reversons rien à de grands intermédiaires. 10 % du montant total de votre réservation va directement dans un fonds communautaire transparent géré par le conseil du village.'
                : currentLang === 'de'
                ? 'Unsere Genossenschaft gehört zu 100 % den Familien in Bububu. Wir zahlen keine Provisionen an internationale Vermittler. 10 % Ihres Buchungspreises fließen direkt in einen transparenten Gemeinschaftsfonds für die Dorfentwicklung.'
                : 'We operate as an independent cooperative owned entirely by 4 multi-generational families in Bububu village. Because we bypass large corporate booking agents, we channel 10% of gross ticket sales into transparent community-approved infrastructure projects.'}
            </p>

            <div className="grid grid-cols-2 gap-4.5 pt-2">
              <div className="bg-white p-4.5 rounded-2xl border border-stone-200/50 space-y-1">
                <span className="text-2xl font-black text-[#1F6B42] font-mono">$14.2K+</span>
                <h5 className="font-bold text-[11px] text-[#5A3E2B]">{currentLang === 'fr' ? 'Fonds Distribués' : currentLang === 'de' ? 'Fonds Ausschüttung' : 'Cooperative Funds Shared'}</h5>
                <p className="text-[9px] text-stone-400">Directly into schools, wells, and health</p>
              </div>
              <div className="bg-white p-4.5 rounded-2xl border border-stone-200/50 space-y-1">
                <span className="text-2xl font-black text-[#D4AF37] font-mono">1,200+</span>
                <h5 className="font-bold text-[11px] text-[#5A3E2B]">{currentLang === 'fr' ? 'Écoliers soutenus' : currentLang === 'de' ? 'Schüler Unterstützt' : 'Village Pupils Supported'}</h5>
                <p className="text-[9px] text-stone-400">Textbooks, math kits, and uniforms</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#D4AF37]/10 rounded-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&h=800&q=85"
              alt="Rural school development fund"
              referrerPolicy="no-referrer"
              className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover border-4 border-white"
            />
          </div>
        </div>

        {/* Dynamic Social Impact Booking Calculator */}
        <div className="bg-white rounded-3xl p-6.5 sm:p-10 border border-stone-200/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">Calculateur de Solidarité</span>
              <h3 className="font-serif font-bold text-2xl text-[#5A3E2B]">
                {currentLang === 'fr' ? 'Simulateur d\'Impact Direct' : currentLang === 'de' ? 'Live-Einfluss-Kalkulator' : 'See Your Direct Booking Impact'}
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                {currentLang === 'fr'
                  ? 'Ajustez le curseur selon la taille de votre groupe pour voir exactement quels projets communautaires vous financerez concrètement avec votre visite.'
                  : currentLang === 'de'
                  ? 'Passen Sie den Regler an Ihre Gruppenstärke an, um sofort die konkreten Sachwerte zu sehen, die Sie durch Ihre Buchung im Dorf finanzieren.'
                  : 'Slide to simulate your travel group headcount and instantly see the real, tangible village resources funded entirely by your visit. Transparency is our guarantee.'}
              </p>
            </div>

            <div className="bg-[#F8F5EC] p-5 rounded-2xl border border-[#D4AF37]/30 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-[#5A3E2B]">
                <span>{currentLang === 'fr' ? 'Taille du groupe :' : currentLang === 'de' ? 'Gruppengröße:' : 'Simulated Group Size:'}</span>
                <span className="bg-[#1F6B42] text-white px-3 py-1 rounded-lg flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{bookingSize} {currentLang === 'fr' ? 'pers.' : currentLang === 'de' ? 'Pers.' : 'guests'}</span>
                </span>
              </div>
              <input
                id="booking-size-slider"
                type="range"
                min="1"
                max="10"
                value={bookingSize}
                onChange={(e) => setBookingSize(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#1F6B42]"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>1 traveler</span>
                <span>10 travelers</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-serif font-bold text-sm text-[#5A3E2B] pb-2 border-b border-stone-150">
              {currentLang === 'fr' ? 'Ressources fournies au village par votre visite :' : currentLang === 'de' ? 'Durch Ihre Buchung finanzierte Dorfmittel:' : 'Tangible Village Resources Funded by Your Visit :'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Box 1 */}
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl space-y-2 text-center">
                <BookOpen className="w-8 h-8 text-[#1F6B42] mx-auto animate-bounce" />
                <span className="block text-2xl font-black text-[#1F6B42] font-mono">+{bookingSize * 4}</span>
                <h5 className="font-bold text-[11px] text-[#5A3E2B]">Primary Schoolbooks</h5>
                <p className="text-[9px] text-stone-400">Mathematics and Swahili exercise books bought</p>
              </div>

              {/* Box 2 */}
              <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl space-y-2 text-center">
                <Droplet className="w-8 h-8 text-[#D4AF37] mx-auto animate-pulse" />
                <span className="block text-2xl font-black text-[#D4AF37] font-mono">+{bookingSize * 2}</span>
                <h5 className="font-bold text-[11px] text-[#5A3E2B]">Families Water Filter</h5>
                <p className="text-[9px] text-stone-400">Maintains sand-filters in rural homesteads</p>
              </div>

              {/* Box 3 */}
              <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl space-y-2 text-center">
                <Flame className="w-8 h-8 text-rose-500 mx-auto" />
                <span className="block text-2xl font-black text-rose-600 font-mono">+{Math.ceil(bookingSize / 2)}</span>
                <h5 className="font-bold text-[11px] text-[#5A3E2B]">Smokeless Stoves</h5>
                <p className="text-[9px] text-stone-400">Safe, clean clay stoves for cooking mothers</p>
              </div>
            </div>
          </div>

        </div>

        {/* Milestone Tracks */}
        <div className="space-y-8">
          <div className="text-center space-y-1.5">
            <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono">TRANSPARENCY TIMELINE</span>
            <h3 className="font-serif font-bold text-2xl text-[#5A3E2B]">
              {currentLang === 'fr' ? 'Nos Objectifs de Progrès Communautaires' : currentLang === 'de' ? 'Aktuelle Dorfprojekte' : '2026 Community Development Goals'}
            </h3>
            <p className="text-stone-500 text-xs max-w-xl mx-auto">
              We define direct targets for our village development fund and update progress in real-time as tours are booked. See where our metrics stand today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((ms, idx) => {
              const Icon = ms.icon;
              const percent = Math.min(100, Math.round((ms.current / ms.target) * 100));
              return (
                <div key={idx} className="bg-white border border-stone-200/50 p-6 rounded-3xl space-y-5 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-[#F8F5EC] rounded-2xl text-[#1F6B42]">
                      <Icon className="w-6 h-6 text-[#1F6B42]" />
                    </div>
                    <span className="text-xs font-bold text-[#1F6B42] bg-emerald-50 px-2.5 py-1 rounded-md font-mono">
                      {percent}% Completed
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-[#5A3E2B]">{ms.title[currentLang]}</h4>
                    <p className="text-stone-400 text-[10px]">Annual community target for Bububu village</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-stone-150 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#1F6B42] h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#5A3E2B] font-semibold">
                      <span>{ms.current} {ms.unit}</span>
                      <span className="text-stone-400">Target: {ms.target}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join our effort CTA */}
        <div className="bg-[#5A3E2B] text-white rounded-3xl p-8 lg:p-12 shadow-xl border border-[#D4AF37]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest font-mono">DIRECT BOOKING ADVOCATE</span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl">Ready to make your travel matter?</h3>
            <p className="text-stone-200 text-xs leading-relaxed">
              Book any of our Spice and Village tours. Your presence directly pays certified fair wages to our cooperative, supports local schools, and protects the organic beauty of Zanzibar.
            </p>
          </div>
          <button
            onClick={() => onBookNow('full')}
            className="bg-[#D4AF37] text-[#1F6B42] hover:bg-[#f3cb4a] px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer shadow-lg whitespace-nowrap"
          >
            Choose Your Experience
          </button>
        </div>

      </div>
    </div>
  );
}
