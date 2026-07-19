import React, { useState } from 'react';
import { Leaf, Search, Sparkles, X, Heart, Award, ArrowLeft, Info, ShoppingBag } from 'lucide-react';
import { spicesList } from '../data';
import { Language } from '../types';

interface SpicesPageProps {
  currentLang: Language;
  onBookNow: (tourId: string) => void;
}

export default function SpicesPage({ currentLang, onBookNow }: SpicesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'culinary' | 'medicinal' | 'fragrant'>('all');
  const [selectedSpice, setSelectedSpice] = useState<typeof spicesList[0] | null>(null);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'culinary': return currentLang === 'fr' ? 'Culinaire' : currentLang === 'de' ? 'Kulinarisch' : 'Culinary';
      case 'medicinal': return currentLang === 'fr' ? 'Médicinal' : currentLang === 'de' ? 'Medizinisch' : 'Medicinal';
      case 'fragrant': return currentLang === 'fr' ? 'Parfumant' : currentLang === 'de' ? 'Duftend' : 'Fragrant';
      default: return cat;
    }
  };

  const filteredSpices = spicesList.filter(spice => {
    const matchesSearch = 
      spice.name[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      spice.scientific.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spice.desc[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    
    // Categorization logic based on spice name / properties if categorizing
    const nameStr = spice.name.en.toLowerCase();
    let cat: 'culinary' | 'medicinal' | 'fragrant' = 'culinary';
    if (nameStr.includes('cardamom') || nameStr.includes('cinnamon')) {
      cat = 'fragrant';
    } else if (nameStr.includes('ginger') || nameStr.includes('turmeric')) {
      cat = 'medicinal';
    }
    
    const matchesCategory = selectedCategory === 'all' || cat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-[#F8F5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono flex items-center justify-center gap-1.5">
            <Leaf className="w-4 h-4 animate-bounce text-[#D4AF37]" />
            {currentLang === 'fr' ? 'Herbier Botanique Vivant' : currentLang === 'de' ? 'Lebendiges Botanisches Herbarium' : 'Living Botanical Herbarium'}
          </span>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#5A3E2B] tracking-tight">
            {currentLang === 'fr' ? 'Trésors Épicés de l\'Île' : currentLang === 'de' ? 'Die Gewürzkammer Sansibars' : 'Cornerstone Zanzibari Spices'}
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            {currentLang === 'fr'
              ? 'Plongez dans les secrets de nos cultures de renommée mondiale. Explorez les profils botaniques, les vertus médicinales ancestrales et les saveurs uniques de nos récoltes.'
              : currentLang === 'de'
              ? 'Entdecken Sie die Geheimnisse unserer weltberühmten Bio-Gewürze. Erforschen Sie botanische Hintergründe, heilende Wirkungen und kulinarische Verwendungen.'
              : 'Delve into the rich folklore, organic healing properties, and culinary matchings of our island’s cornerstone spices, harvested sustainably in Bububu village.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {(['all', 'culinary', 'medicinal', 'fragrant'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1F6B42] text-white'
                    : 'bg-[#F8F5EC] text-stone-600 hover:bg-[#F3EFE3]'
                }`}
              >
                {cat === 'all' 
                  ? (currentLang === 'fr' ? 'Tous' : currentLang === 'de' ? 'Alle' : 'All Spices')
                  : getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === 'fr' ? 'Rechercher une épice...' : currentLang === 'de' ? 'Gewürz suchen...' : 'Search spices...'}
              className="w-full bg-[#F8F5EC] pl-10 pr-4 py-2.5 rounded-2xl text-xs focus:outline-none border border-stone-200 focus:border-[#1F6B42] focus:bg-white transition text-stone-850"
            />
          </div>
        </div>

        {/* Spices Grid */}
        {filteredSpices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredSpices.map((spice, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedSpice(spice)}
                className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-stone-200/50 overflow-hidden flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={spice.image}
                    alt={spice.name[currentLang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur p-2 rounded-xl text-[#1F6B42] shadow-sm">
                    {idx % 4 === 0 && <Award className="w-4 h-4 text-amber-500" />}
                    {idx % 4 === 1 && <Leaf className="w-4 h-4 text-emerald-600" />}
                    {idx % 4 === 2 && <Sparkles className="w-4 h-4 text-indigo-500" />}
                    {idx % 4 === 3 && <Heart className="w-4 h-4 text-rose-500" />}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#5A3E2B]">
                      {spice.name[currentLang]}
                    </h4>
                    <p className="text-[10px] text-stone-400 font-mono italic mt-0.5">
                      {spice.scientific}
                    </p>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    {spice.desc[currentLang]}
                  </p>

                  <div className="bg-[#F8F5EC] p-3 rounded-xl border border-stone-200 text-[11px] leading-normal text-stone-600">
                    <strong className="text-[#1F6B42]">{currentLang === 'fr' ? 'Usage :' : currentLang === 'de' ? 'Anwendung:' : 'Traditional Use:'}</strong>{' '}
                    <span className="line-clamp-2">{spice.use[currentLang]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/60 shadow-sm max-w-xl mx-auto space-y-4">
            <Info className="w-12 h-12 text-[#D4AF37] mx-auto animate-pulse" />
            <h4 className="font-serif font-bold text-lg text-[#5A3E2B]">
              {currentLang === 'fr' ? 'Aucune épice trouvée' : currentLang === 'de' ? 'Keine Gewürze gefunden' : 'No Spices Found'}
            </h4>
            <p className="text-stone-500 text-xs px-6">
              {currentLang === 'fr' ? 'Essayez de changer vos mots-clés ou sélectionnez une autre catégorie.' : currentLang === 'de' ? 'Versuchen Sie einen anderen Suchbegriff oder eine andere Kategorie.' : 'Try adjusting your search terms or choosing a different category tab.'}
            </p>
          </div>
        )}

        {/* Botanical Garden CTA */}
        <div className="bg-[#1F6B42] text-white rounded-3xl p-8 lg:p-12 shadow-xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 select-none pointer-events-none translate-x-12 -translate-y-12">
            <Leaf className="w-80 h-80" />
          </div>
          <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest font-mono">LIVE SPICE FARM EXPERIENCE</span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl">
              {currentLang === 'fr' ? 'Sentez et goûtez ces épices en personne' : currentLang === 'de' ? 'Riechen & schmecken Sie vor Ort' : 'Touch, Smell, and Taste Live'}
            </h3>
            <p className="text-emerald-100 text-xs leading-relaxed">
              {currentLang === 'fr' 
                ? 'Rejoignez notre guide pour une excursion immersive au cours de laquelle vous pèlerez la cannelle, gratterez le gingembre et dégusterez du thé swahili fait maison.' 
                : currentLang === 'de'
                ? 'Begleiten Sie unsere Dorfbewohner, schälen Sie echten Zimt, reiben Sie frischen Ingwer und trinken Sie aromatischen Gewürztee.'
                : 'Join our local villagers on a sensory hike to strip cinnamon barks, harvest fresh cardamom pods, and taste organic spiced coffees straight from the source.'}
            </p>
          </div>
          <button
            onClick={() => onBookNow('spice')}
            className="bg-[#D4AF37] text-[#1F6B42] px-8 py-4 rounded-xl font-bold hover:bg-[#f3cb4a] transition duration-200 uppercase text-xs tracking-wider cursor-pointer shadow-lg whitespace-nowrap relative z-10"
          >
            {currentLang === 'fr' ? 'Réserver la Visite Sensorielle' : currentLang === 'de' ? 'Sensorische Tour Buchen' : 'Book Sensory Spice Tour'}
          </button>
        </div>

        {/* Details Modal */}
        {selectedSpice && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200/80 shadow-2xl relative">
              
              <button
                onClick={() => setSelectedSpice(null)}
                className="absolute top-4 right-4 bg-stone-100 text-stone-600 hover:bg-stone-200 p-2.5 rounded-full transition z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={selectedSpice.image}
                  alt={selectedSpice.name[currentLang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest font-mono">
                    {selectedSpice.scientific}
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl">
                    {selectedSpice.name[currentLang]}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#1F6B42] font-mono">
                    {currentLang === 'fr' ? 'Botanique & Origine' : currentLang === 'de' ? 'Botanik & Herkunft' : 'Botanical Profile'}
                  </h5>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {selectedSpice.desc[currentLang]}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F8F5EC] p-4.5 rounded-2xl border border-stone-200/50 space-y-1">
                    <h5 className="font-bold text-xs text-[#5A3E2B] flex items-center gap-1.5 font-mono">
                      <Leaf className="w-4 h-4 text-[#1F6B42]" />
                      {currentLang === 'fr' ? 'Usages Traditionnels' : currentLang === 'de' ? 'Traditionelle Anwendung' : 'Healing & Wellness'}
                    </h5>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      {selectedSpice.use[currentLang]}
                    </p>
                  </div>

                  <div className="bg-[#F8F5EC] p-4.5 rounded-2xl border border-stone-200/50 space-y-1">
                    <h5 className="font-bold text-xs text-[#5A3E2B] flex items-center gap-1.5 font-mono">
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      {currentLang === 'fr' ? 'Pairage Culinaire Swahili' : currentLang === 'de' ? 'Swahili-Küche Partner' : 'Swahili Kitchen Matching'}
                    </h5>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      {currentLang === 'fr' 
                        ? 'Excellent avec le pilau traditionnel, les plats de riz au lait de coco et le thé swahili.' 
                        : currentLang === 'de'
                        ? 'Hervorragend im traditionellen Pilau, Kokosnuss-Reis und würzigem Swahili-Tee.'
                        : 'Perfect pairing for traditional spice pilau, heavy coconut rice, spiced fish masala, and hot Swahili tea.'}
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-stone-150 w-full pt-2"></div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedSpice(null);
                      onBookNow('spice');
                    }}
                    className="flex-1 bg-[#1F6B42] text-white hover:bg-[#155231] py-3 rounded-xl font-bold tracking-wider uppercase text-xs transition cursor-pointer text-center"
                  >
                    {currentLang === 'fr' ? 'Réserver la Visite' : currentLang === 'de' ? 'Exkursion Buchen' : 'Book Spice Tour'}
                  </button>
                  <button
                    onClick={() => setSelectedSpice(null)}
                    className="sm:px-6 py-3 border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-xl font-bold tracking-wider uppercase text-xs transition cursor-pointer"
                  >
                    {currentLang === 'fr' ? 'Fermer' : currentLang === 'de' ? 'Schließen' : 'Close'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
