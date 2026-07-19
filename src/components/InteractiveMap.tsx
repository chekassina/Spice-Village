/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Compass, Landmark, TreePine, Anchor, Palmtree } from 'lucide-react';
import { Language } from '../types';

interface InteractiveMapProps {
  currentLang: Language;
}

interface LocationDetails {
  id: string;
  name: Record<Language, string>;
  icon: any;
  coordinates: { x: number; y: number }; // Percentage offsets for responsive pins
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
}

export default function InteractiveMap({ currentLang }: InteractiveMapProps) {
  const locations: LocationDetails[] = [
    {
      id: 'spice-farms',
      name: {
        en: '🌿 Kidichi Spice Farms',
        fr: '🌿 Fermes d\'Épices de Kidichi',
        de: '🌿 Kidichi Gewürzfarmen'
      },
      icon: Palmtree,
      coordinates: { x: 42, y: 48 },
      description: {
        en: 'The heart of our organic agricultural tours. Founded under Sultan Seyyid Said, this region features rich red soils perfect for growing cloves, nutmeg, cardamom, and vanilla beans.',
        fr: 'Le cœur de nos visites agricoles biologiques. Fondée sous le Sultan Seyyid Said, cette région possède un sol rouge riche, idéal pour cultiver clous de girofle, cardamome et vanille.',
        de: 'Das Herz unserer landwirtschaftlichen Bio-Touren. Gegründet unter Sultan Seyyid Said, bietet diese Region rote, mineralreiche Böden für Nelken, Kardamom und Vanilleschoten.'
      },
      highlights: {
        en: ['Over 30 exotic spices', 'Coconut palm climbing show', 'Spiced tea tastings'],
        fr: ['Plus de 30 épices exotiques', 'Grimpeurs de cocotiers', 'Dégustations de thé aux épices'],
        de: ['Über 30 exotische Gewürze', 'Kokosnusspalmen-Kletterschau', 'Gewürztee-Verkostung']
      }
    },
    {
      id: 'stone-town',
      name: {
        en: '🕌 Historical Stone Town',
        fr: '🕌 Stone Town Historique',
        de: '🕌 Historisches Stone Town'
      },
      icon: Landmark,
      coordinates: { x: 30, y: 55 },
      description: {
        en: 'A UNESCO World Heritage site of labyrinthine coral stone alleys. Explore the historical Darajani Spice Market where traders have bargained for centuries.',
        fr: 'Un site classé au patrimoine mondial de l\'UNESCO composé de ruelles labyrinthiques en pierre de corail. Explorez le marché aux épices historique de Darajani.',
        de: 'Ein UNESCO-Weltkulturerbe mit labyrinthartigen Gassen aus Korallenstein. Erkunden Sie den historischen Darajani-Gewürzmarkt.'
      },
      highlights: {
        en: ['Darajani Spice Market', 'Sultan Palace architecture', 'House of Wonders'],
        fr: ['Marché de Darajani', 'Architecture du palais du Sultan', 'Maison des Merveilles'],
        de: ['Darajani Gewürzmarkt', 'Sultanspalast-Architektur', 'Haus der Wunder']
      }
    },
    {
      id: 'nungwi',
      name: {
        en: '⛵ Nungwi Dhow Builder Village',
        fr: '⛵ Village de Nungwi & Dhows',
        de: '⛵ Nungwi Dhow-Bauer-Dorf'
      },
      icon: Anchor,
      coordinates: { x: 48, y: 12 },
      description: {
        en: 'Located on Zanzibar’s northern tip. Witness master craftsmen hand-shaping traditional Swahili wooden sailing dhows using methods unchanged for over 500 years.',
        fr: 'Situé à la pointe nord de l\'île. Observez les maîtres artisans façonner à la main les dhows swahilis traditionnels en bois selon des méthodes ancestrales.',
        de: 'An der Nordspitze Sansibars gelegen. Erleben Sie, wie Schiffsbauer traditionelle dhows aus Holz ohne Baupläne mit 500 Jahre alten Techniken bauen.'
      },
      highlights: {
        en: ['Traditional woodcraft', 'White sand turtle lagoon', 'Beautiful sunset beaches'],
        fr: ['Artisanat du bois traditionnel', 'Lagune des tortues', 'Plages de sable blanc'],
        de: ['Traditionelle Holzschnitzkunst', 'Schildkröten-Lagune', 'Wunderschöne Sandstrände']
      }
    },
    {
      id: 'jozani',
      name: {
        en: '🐒 Jozani Indigenous Forest',
        fr: '🐒 Forêt Indigène de Jozani',
        de: '🐒 Jozani Urwald'
      },
      icon: TreePine,
      coordinates: { x: 62, y: 72 },
      description: {
        en: 'The only national park in Zanzibar. Home to the rare Red Colobus Monkeys, giant mahogany trees, and deep tropical swamp trails leading into pristine coastal mangroves.',
        fr: 'L\'unique parc national de Zanzibar, abritant les rares singes colobes rouges, des acajous géants et des sentiers serpentant dans les mangroves côtières.',
        de: 'Der einzige Nationalpark Sansibars. Heimat der seltenen Roten Stummelaffen (Colobus), riesiger Mahagonibäume und Pfade durch Küstenmangroven.'
      },
      highlights: {
        en: ['Red Colobus monkeys', 'Giant mahogany trees', 'Boardwalk mangrove tours'],
        fr: ['Singes colobes rouges', 'Acajous géants de 100 ans', 'Passerelle dans la mangrove'],
        de: ['Rote Colobus-Affen', 'Riesige Mahagonibäume', 'Mangroven-Steg-Tour']
      }
    },
    {
      id: 'kizimkazi',
      name: {
        en: '🐬 Kizimkazi Fishing Village',
        fr: '🐬 Village de Kizimkazi',
        de: '🐬 Fischerdorf Kizimkazi'
      },
      icon: Compass,
      coordinates: { x: 55, y: 90 },
      description: {
        en: 'A historic southern settlement featuring the 12th-century Shiraz Mosque. Famous for local traditional fishing, marine conservation, and daily ocean dhow safaris.',
        fr: 'Un village de pêcheurs historique abritant la mosquée Shirazi du XIIe siècle. Célèbre pour sa pêche traditionnelle et ses safaris marins en mer.',
        de: 'Eine historische Siedlung im Süden mit der Shirazi-Moschee aus dem 12. Jahrhundert. Berühmt für traditionellen Fischfang und dhow-Safaris.'
      },
      highlights: {
        en: ['12th Century Shirazi Mosque', 'Traditional seaweed farming', 'Local fishing harbor visit'],
        fr: ['Mosquée Shirazi médiévale', 'Culture traditionnelle d\'algues', 'Port de pêche traditionnel'],
        de: ['Shirazi-Moschee aus dem 12. Jh.', 'Algenzucht-Kooperativen', 'Fischereihafen-Rundgang']
      }
    }
  ];

  const [activeLoc, setActiveLoc] = useState<LocationDetails>(locations[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F8F5EC] p-6 lg:p-10 rounded-3xl shadow-lg border border-stone-200">
      
      {/* Map Column (7 cols) */}
      <div className="lg:col-span-7 flex flex-col items-center">
        <h3 className="text-xl font-serif font-bold text-[#5A3E2B] mb-6 tracking-tight flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#1F6B42] animate-spin" style={{ animationDuration: '20s' }} />
          {currentLang === 'fr' 
            ? 'Carte Interactive de l\'Île aux Épices' 
            : currentLang === 'de' 
            ? 'Interaktive Gewürzinsel-Karte' 
            : 'Interactive Spice Island Map'}
        </h3>

        {/* Map Container */}
        <div id="zanzibar-interactive-map" className="relative w-full max-w-[450px] aspect-[4/5] bg-emerald-50 rounded-2xl shadow-inner border-2 border-emerald-150 overflow-hidden">
          {/* Oceans / Grid Accents */}
          <div className="absolute inset-0 bg-[#E2F0D9] opacity-40 pattern-grid-lg"></div>
          
          {/* Island Outline Drawing (Stylized SVG Representation of Zanzibar Unguja) */}
          <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full text-emerald-100 fill-emerald-100 stroke-[#1F6B42]/20 stroke-[1.5]">
            <path d="M 45 5 
                     C 48 2 52 5 50 15 
                     C 48 25 54 35 52 45 
                     C 50 55 58 65 65 75 
                     C 70 82 65 92 60 98 
                     C 55 105 58 115 50 118 
                     C 42 120 40 110 38 100 
                     C 36 90 44 80 40 70 
                     C 36 60 32 50 35 40 
                     C 38 30 42 20 45 5 Z" />
          </svg>

          {/* Compass Rose Accent */}
          <div className="absolute top-6 right-6 opacity-30 select-none">
            <Compass className="w-16 h-16 text-[#5A3E2B]" />
            <div className="text-[10px] text-center font-mono text-[#5A3E2B] mt-1 font-bold">UNGUJA</div>
          </div>

          {/* Coral Reef Accent Waves */}
          <div className="absolute bottom-6 left-6 text-[#1F6B42]/10 font-mono text-xs select-none">
            🌊 Indian Ocean
          </div>

          {/* Location Pins */}
          {locations.map((loc) => {
            const Icon = loc.icon;
            const isActive = activeLoc.id === loc.id;
            return (
              <button
                key={loc.id}
                id={`map-pin-${loc.id}`}
                onClick={() => setActiveLoc(loc)}
                style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20`}
              >
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#D4AF37] text-[#5A3E2B] scale-125 ring-4 ring-[#1F6B42]/20' 
                      : 'bg-[#1F6B42] text-white hover:bg-[#D4AF37] hover:text-[#5A3E2B] scale-100 hover:scale-110'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {/* Micro Label */}
                <span className={`mt-1.5 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase font-sans border shadow-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#5A3E2B] text-white border-transparent' 
                    : 'bg-white text-[#5A3E2B] border-stone-200 opacity-60 group-hover:opacity-100'
                }`}>
                  {loc.id.replace('-', ' ').substring(0, 10)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Card Column (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-center h-full">
        <div id="map-detail-panel" className="bg-white rounded-2xl p-6 shadow-sm border border-stone-150 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
          {/* Top Decorative Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1F6B42] to-[#D4AF37]"></div>
          
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 font-mono">
              <MapPin className="w-4 h-4 text-[#1F6B42]" />
              <span>
                {currentLang === 'fr' ? 'Lieu Phare' : currentLang === 'de' ? 'Ortshöhepunkt' : 'Featured Location'}
              </span>
            </div>
            
            <h4 className="text-xl font-bold font-serif text-[#5A3E2B] mb-3">
              {activeLoc.name[currentLang]}
            </h4>
            
            <p className="text-stone-650 text-sm leading-relaxed mb-5">
              {activeLoc.description[currentLang]}
            </p>

            {/* Highlights */}
            <div className="border-t border-stone-100 pt-4 mb-4">
              <h5 className="text-xs font-bold text-[#5A3E2B] uppercase tracking-wider mb-2.5">
                {currentLang === 'fr' ? 'Ce que vous découvrirez :' : currentLang === 'de' ? 'Das erwartet Sie:' : "What You'll Experience:"}
              </h5>
              <ul className="space-y-2">
                {activeLoc.highlights[currentLang].map((hl, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-stone-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F6B42]"></span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-[11px] font-mono text-stone-400 text-right mt-4 italic">
            * {currentLang === 'fr' ? 'Inclus dans notre Expérience Journée Complète' : currentLang === 'de' ? 'Inbegriffen im Ganztages-Erlebnis' : 'Fully integrated in our Full-Day VIP experience'}
          </div>
        </div>
      </div>

    </div>
  );
}
