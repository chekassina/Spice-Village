/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TourPackage, Review, BlogPost, Language } from './types';

export function mapLocalImagesToUnsplash(path: string): string {
  if (!path) return '';
  const match = path.match(/\/images\/ra(\d+)\.jpg/);
  if (match) {
    const num = parseInt(match[1], 10);
    const ids = [
      "photo-1596040033229-a9821ebd058d", // ra1: Spices market hero
      "photo-1509358271058-acd22cc93898", // ra2: Cloves close-up
      "photo-1513530534585-c7b1394c6d51", // ra3: Cinnamon/star anise
      "photo-1509099836639-18ba1795216d", // ra4: African village welcoming scene
      "photo-1544924405-b1ea827fc1f1", // ra5: Traditional artisan / African village
      "photo-1488521787991-ed7bbaae773c", // ra6: African school children smiling
      "photo-1595974482597-4b8da8879bc5", // ra7: Village organic farm / field
      "photo-1556910103-1c02745aae4d", // ra8: Fresh ingredients on table
      "photo-1547592180-85f173990554", // ra9: Hands cooking in clay pot
      "photo-1512058564366-18510be2db19", // ra10: Traditional spiced rice pilau/biryani
      "photo-1502082553048-f009c37129b9", // ra11: Lush green spice farm trail
      "photo-1563720223185-11003d516935", // ra12: Stone Town Zanzibar alley
      "photo-1606787366850-de6330128bfc", // ra13: Cooking school group
      "photo-1483683804023-6ccdb62f86ef", // ra14: Zanzibar beautiful ocean turquoise
      "photo-1507525428034-b723cf961d3e", // ra15: Zanzibar sunset palms
      "photo-1516450360452-9312f5e86fc7", // ra16: Traditional African drumming/dance
      "photo-1531123897727-8f129e1688ce", // ra17: Smiling local African guide
      "photo-1615485290382-441e4d049cb5", // ra18: Cardamom close-up
      "photo-1615485500704-8e990f9900f7", // ra19: Ginger and turmeric roots
      "photo-1533285907943-75b6329437b8"  // ra20: Basket of vanilla and nutmeg
    ];
    if (num >= 1 && num <= ids.length) {
      return `https://images.unsplash.com/${ids[num - 1]}?auto=format&fit=crop&w=1200&h=800&q=85`;
    }
  }
  return path;
}

export const exchangeRates = {
  USD: 1.0,
  EUR: 0.92,
  TZS: 2600.0
};

export const currencySymbols = {
  USD: '$',
  EUR: '€',
  TZS: 'TSh'
};

export const translations = {
  en: {
    title: 'Zanzibar Spice & Cooking Experience',
    subtitle: 'Spice Tour, Village Tour & Cooking Class',
    tagline: 'Discover the Heart of Culture Through Spices, Village Life & Traditional Cooking',
    taglineSub: 'Experience the authentic taste of local traditions. Walk through fragrant spice farms, meet welcoming villagers, and prepare delicious traditional meals with experienced local chefs.',
    bookNow: 'Book Your Adventure Today',
    chooseTour: 'Choose Your Tour',
    selectDate: 'Select Date',
    guestsCount: 'Number of Guests',
    whyUs: 'Why Choose Us',
    aboutUs: 'About Us',
    spiceTour: 'Spice Tour',
    villageTour: 'Village Tour',
    cookingClass: 'Cooking Class',
    packages: 'Tour Packages',
    gallery: 'Gallery',
    testimonials: 'Testimonials',
    blog: 'Blog',
    contact: 'Contact Us',
    meetGuides: 'Meet the Local Guides',
    sustainability: 'Sustainability & Community',
    allRightsReserved: 'All Rights Reserved. 10% of booking proceeds directly fund local village schools and water wells.',
    whatsappChat: 'Chat on WhatsApp',
    aiAssistant: 'Chat with Bibi (AI)',
    currency: 'Currency',
    language: 'Language',
    nextTourIn: 'Next tour begins in:',
    hours: 'h',
    mins: 'm',
    secs: 's',
    bookTitle: 'Book Your Experience',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneWhatsApp: 'WhatsApp Number',
    specialRequests: 'Special Requests / Dietary Restrictions',
    submitBooking: 'Proceed to Secure Payment',
    paymentSuccess: 'Payment Successful! Karibu Sana!',
    bookingConfirmed: 'Your booking has been secured. A confirmation email and WhatsApp message have been dispatched. Details:',
    bookingRef: 'Booking Reference',
    totalPrice: 'Total Price',
    close: 'Close',
    all: 'All',
    spices: 'Spices',
    village: 'Village Life',
    cooking: 'Cooking',
    visitors: 'Happy Visitors'
  },
  fr: {
    title: 'Expérience d\'Épices et de Cuisine à Zanzibar',
    subtitle: 'Visite d\'Épices, Visite de Village & Cours de Cuisine',
    tagline: 'Découvrez le Cœur de la Culture à travers les Épices, la Vie de Village et la Cuisine Traditionnelle',
    taglineSub: 'Découvrez le goût authentique des traditions locales. Promenez-vous dans des fermes d\'épices parfumées, rencontrez des villageois chaleureux et préparez de délicieux repas traditionnels avec des chefs locaux expérimentés.',
    bookNow: 'Réservez votre aventure aujourd\'hui',
    chooseTour: 'Choisissez votre visite',
    selectDate: 'Choisir la date',
    guestsCount: 'Nombre d\'invités',
    whyUs: 'Pourquoi nous choisir',
    aboutUs: 'À propos de nous',
    spiceTour: 'Visite d\'Épices',
    villageTour: 'Vie de Village',
    cookingClass: 'Cours de Cuisine',
    packages: 'Formules de Visite',
    gallery: 'Galerie',
    testimonials: 'Témoignages',
    blog: 'Blog',
    contact: 'Contactez-nous',
    meetGuides: 'Rencontrez nos guides locaux',
    sustainability: 'Durabilité & Communauté',
    allRightsReserved: 'Tous droits réservés. 10% des bénéfices financent directement les écoles et les puits du village.',
    whatsappChat: 'Discuter sur WhatsApp',
    aiAssistant: 'Discuter avec Bibi (IA)',
    currency: 'Devise',
    language: 'Langue',
    nextTourIn: 'Prochaine visite dans:',
    hours: 'h',
    mins: 'm',
    secs: 's',
    bookTitle: 'Réservez votre expérience',
    fullName: 'Nom complet',
    emailAddress: 'Adresse e-mail',
    phoneWhatsApp: 'Numéro WhatsApp',
    specialRequests: 'Demandes spéciales / Régime alimentaire',
    submitBooking: 'Passer au paiement sécurisé',
    paymentSuccess: 'Paiement réussi ! Karibu Sana !',
    bookingConfirmed: 'Votre réservation a été sécurisée. Un e-mail de confirmation et un message WhatsApp ont été envoyés. Détails :',
    bookingRef: 'Référence de réservation',
    totalPrice: 'Prix total',
    close: 'Fermer',
    all: 'Tout',
    spices: 'Épices',
    village: 'Vie de Village',
    cooking: 'Cuisine',
    visitors: 'Visiteurs heureux'
  },
  de: {
    title: 'Zanzibar Gewürz- & Kocherlebnis',
    subtitle: 'Gewürztour, Dorftour & Kochkurs',
    tagline: 'Entdecken Sie das Herz der Kultur durch Gewürze, Dorfleben & traditionelles Kochen',
    taglineSub: 'Erleben Sie den authentischen Geschmack lokaler Traditionen. Spazieren Sie durch duftende Gewürzfarmen, treffen Sie herzliche Dorfbewohner und bereiten Sie köstliche traditionelle Mahlzeiten mit erfahrenen lokalen Köchen zu.',
    bookNow: 'Buchen Sie Ihr Abenteuer heute',
    chooseTour: 'Wählen Sie Ihre Tour',
    selectDate: 'Datum auswählen',
    guestsCount: 'Anzahl der Gäste',
    whyUs: 'Warum uns wählen',
    aboutUs: 'Über uns',
    spiceTour: 'Gewürztour',
    villageTour: 'Dorftour',
    cookingClass: 'Kochkurs',
    packages: 'Tour-Pakete',
    gallery: 'Galerie',
    testimonials: 'Bewertungen',
    blog: 'Blog',
    contact: 'Kontakt',
    meetGuides: 'Lernen Sie die Guides kennen',
    sustainability: 'Nachhaltigkeit & Gemeinschaft',
    allRightsReserved: 'Alle Rechte vorbehalten. 10% der Buchungserlöse fließen direkt in Schulen und Brunnen im Dorf.',
    whatsappChat: 'Per WhatsApp chatten',
    aiAssistant: 'Mit Bibi chatten (KI)',
    currency: 'Währung',
    language: 'Sprache',
    nextTourIn: 'Nächste Tour startet in:',
    hours: 'Std',
    mins: 'Min',
    secs: 'Sek',
    bookTitle: 'Erlebnis buchen',
    fullName: 'Vollständiger Name',
    emailAddress: 'E-Mail-Adresse',
    phoneWhatsApp: 'WhatsApp-Nummer',
    specialRequests: 'Sonderwünsche / Ernährungseinschränkungen',
    submitBooking: 'Zur sicheren Zahlung',
    paymentSuccess: 'Zahlung erfolgreich! Karibu Sana!',
    bookingConfirmed: 'Ihre Buchung wurde gesichert. Eine Bestätigungs-E-Mail und eine WhatsApp-Nachricht wurden gesendet. Details:',
    bookingRef: 'Buchungsreferenz',
    totalPrice: 'Gesamtpreis',
    close: 'Schließen',
    all: 'Alle',
    spices: 'Gewürze',
    village: 'Dorfleben',
    cooking: 'Kochen',
    visitors: 'Zufriedene Gäste'
  }
};

export const whyChooseUsData = [
  {
    icon: 'Compass',
    title: {
      en: 'Local Expert Guides',
      fr: 'Guides Experts Locaux',
      de: 'Lokale Experten-Guides'
    },
    desc: {
      en: 'Our guides are born and raised in the villages, sharing authentic stories and generations of spice knowledge.',
      fr: 'Nos guides sont nés et ont grandi dans les villages, partageant des récits authentiques et des générations de connaissances sur les épices.',
      de: 'Unsere Guides sind in den Dörfern geboren und aufgewachsen. Sie teilen authentische Geschichten und Generationen von Gewürzwissen.'
    }
  },
  {
    icon: 'Users',
    title: {
      en: 'Small Personal Groups',
      fr: 'Petits Groupes Personnels',
      de: 'Kleine, persönliche Gruppen'
    },
    desc: {
      en: 'We limit our tour sizes to maximum 8 guests to ensure an intimate, respectful, and highly interactive experience.',
      fr: 'Nous limitons la taille des groupes à 8 personnes maximum pour garantir une expérience intime, respectueuse et très interactive.',
      de: 'Wir begrenzen die Gruppen auf maximal 8 Personen, um ein intimes, respektvolles und hochgradig interaktives Erlebnis zu bieten.'
    }
  },
  {
    icon: 'Leaf',
    title: {
      en: 'Fresh Organic Spices',
      fr: 'Épices Biologiques Fraîches',
      de: 'Frische Bio-Gewürze'
    },
    desc: {
      en: 'Touch, smell, and taste spices straight from the plants. Learn ancient healing secrets of roots and barks.',
      fr: 'Touchez, sentez et goûtez les épices directement sur les plantes. Apprenez les secrets de guérison anciens des racines et des écorces.',
      de: 'Fühlen, riechen und schmecken Sie Gewürze direkt von den Pflanzen. Lernen Sie die uralten Heilgeheimnisse von Wurzeln und Rinden kennen.'
    }
  },
  {
    icon: 'Heart',
    title: {
      en: 'Community Funded',
      fr: 'Soutien à la Communauté',
      de: 'Gemeinschaftsunterstützung'
    },
    desc: {
      en: '10% of all profits fund local primary schools, medical supplies, and clean water wells in our partner villages.',
      fr: '10% de tous les bénéfices financent les écoles primaires, les fournitures médicales et les puits d\'eau potable dans nos villages partenaires.',
      de: '10 % aller Gewinne fließen in lokale Grundschulen, medizinische Versorgung und saubere Trinkwasserbrunnen in Partnerdörfern.'
    }
  }
];

const rawTourPackages: TourPackage[] = [
  {
    id: 'spice',
    name: {
      en: '🌿 Organic Spice Farm Tour',
      fr: '🌿 Visite de la Ferme d\'Épices',
      de: '🌿 Bio-Gewürzfarm-Tour'
    },
    description: {
      en: 'An immersive olfactory journey. Walk among clove trees, scratch fresh turmeric, and learn harvesting secrets.',
      fr: 'Un voyage olfactif immersif. Marchez parmi les giroflier, grattez le curcuma frais et apprenez les secrets de la récolte.',
      de: 'Eine faszinierende Reise für die Sinne. Spazieren Sie zwischen Nelkenbäumen, reiben Sie frischen Kurkuma und lernen Sie Erntegeheimnisse.'
    },
    longDescription: {
      en: 'Walk through lush forest farms. Smell raw cardamom, taste fresh cocoa pods, watch climbers harvest coconuts singing traditional songs, and crown yourself with hand-crafted leaf accessories.',
      fr: 'Marchez à travers des fermes forestières luxuriantes. Sentez la cardamome brute, goûtez aux cabosses de cacao fraîches, observez les grimpeurs cueillir des noix de coco en chantant des chansons traditionnelles, et couronnez-vous d\'accessoires en feuilles fabriqués à la main.',
      de: 'Spazieren Sie durch üppige Wald-Gewürzfarmen. Riechen Sie rohen Kardamom, schmecken Sie frische Kakaoschoten, beobachten Sie Palmenkletterer beim Kokosnussernten zu traditionellen Liedern und krönen Sie sich mit handgefertigtem Blattschmuck.'
    },
    duration: {
      en: '3 Hours',
      fr: '3 Heures',
      de: '3 Stunden'
    },
    priceUSD: 35,
    image: '/images/ra11.jpg',
    included: {
      en: ['Local English/FR/DE guide', 'Fresh coconut drink (Dafu)', 'Spiced tea tasting', 'Traditional leaf crown', 'Hotel pickup'],
      fr: ['Guide local parlant votre langue', 'Noix de coco fraîche (Dafu)', 'Dégustation de thé aux épices', 'Couronne de feuilles tressées', 'Navette hôtel'],
      de: ['Lokaler Guide (DE/EN/FR)', 'Frische Kokosnuss (Dafu)', 'Gewürztee-Verkostung', 'Traditionelle Blätterkrone', 'Hotelabholung']
    },
    highlights: {
      en: ['Cinnamon scraping', 'Coconut tree climbing show', 'Vanilla pollination demonstration', 'Natural medicine secrets'],
      fr: ['Grattage de cannelle', 'Spectacle de grimpeur de cocotier', 'Démonstration de pollinisation de vanille', 'Secrets de médecine naturelle'],
      de: ['Zimtrinde schälen', 'Kokosnusspalmen-Klettershow', 'Vanille-Bestäubungs-Demo', 'Geheimnisse der Naturmedizin']
    }
  },
  {
    id: 'village',
    name: {
      en: '🏡 Authentic Village Tour',
      fr: '🏡 Visite de Village Authentique',
      de: '🏡 Authentische Dorftour'
    },
    description: {
      en: 'Step off the tourist path. Join families in their daily tasks, visit our school, and witness traditional dances.',
      fr: 'Sortez des sentiers battus. Partagez les tâches quotidiennes des familles, visitez l\'école et assistez à des danses traditionnelles.',
      de: 'Verlassen Sie die Touristenpfade. Nehmen Sie am Alltag von Familien teil, besuchen Sie die Schule und erleben Sie traditionelle Tänze.'
    },
    longDescription: {
      en: 'Gain genuine insight into modern and traditional Swahili life. Learn how clay stoves are hand-shaped, meet students at the village school we support, grind cassava with local women, and enjoy high-energy traditional drumming.',
      fr: 'Découvrez la vie swahilie authentique. Apprenez à façonner des fourneaux en argile, rencontrez les élèves de l\'école locale que nous soutenons, pilez le manioc avec les femmes du village et profitez de percussions traditionnelles dynamiques.',
      de: 'Gewinnen Sie echte Einblicke in das Swahili-Leben. Erfahren Sie, wie Tonöfen von Hand geformt werden, treffen Sie Schüler in der von uns unterstützten Dorfschule, mahlen Sie Maniok mit lokalen Frauen und erleben Sie energiegeladenes Trommeln.'
    },
    duration: {
      en: '4 Hours',
      fr: '4 Heures',
      de: '4 Stunden'
    },
    priceUSD: 40,
    image: '/images/ra4.jpg',
    included: {
      en: ['Experienced village host', 'School donation contribution', 'Traditional cassava snack', 'Handmade soap souvenir', 'Roundtrip transport'],
      fr: ['Hôte de village expérimenté', 'Contribution de don à l\'école', 'Collation traditionnelle au manioc', 'Souvenir de savon artisanal', 'Transport aller-retour'],
      de: ['Erfahrener Dorf-Gastgeber', 'Schulspenden-Beitrag', 'Traditioneller Maniok-Snack', 'Handgemachte Seife als Souvenir', 'Hin- und Rücktransfer']
    },
    highlights: {
      en: ['Clay house building secrets', 'Cassava pounding experience', 'Zanzibar hand-weaving craft', 'Children Choir performance'],
      fr: ['Secrets de construction de maisons en argile', 'Pilonnage du manioc', 'Tissage traditionnel de feuilles', 'Chorale des enfants du village'],
      de: ['Geheimnisse des Lehmhausbaus', 'Maniok-Stampf-Erlebnis', 'Zanzibar Handweberei', 'Dorf-Kinderchor-Auftritt']
    }
  },
  {
    id: 'cooking',
    name: {
      en: '🍲 Hands-On Cooking Class',
      fr: '🍲 Cours de Cuisine Interactive',
      de: '🍲 Interaktiver Kochkurs'
    },
    description: {
      en: 'Gather fresh farm ingredients, blend your own spices, and cook traditional Swahili dishes in clay pots.',
      fr: 'Récoltez des ingrédients frais, assemblez vos propres épices et cuisinez des plats traditionnels swahilis dans des pots en argile.',
      de: 'Sammeln Sie frische Zutaten, mahlen Sie Ihre Gewürze selbst und kochen Sie traditionelle Swahili-Gerichte in Tontöpfen.'
    },
    longDescription: {
      en: 'Squeeze coconut milk by hand using a traditional mbuzi wood scraper. Grind cardamom, turmeric, and clove. Simmer spiced Pilau rice, aromatic vegetable curries, and hand-tossed chapatis over wood-fired clay stoves. Vegetarian options are fully embraced!',
      fr: 'Pressez le lait de coco à la main avec une râpe traditionnelle mbuzi. Broyez la cardamome, le curcuma et le clou de girofle. Mijotez du riz Pilau parfumé, des currys de légumes et des chapatis roulés à la main sur des fourneaux en terre cuite.',
      de: 'Pressen Sie Kokosmilch von Hand mit einer traditionellen Mbuzi-Holzreibe. Mahlen Sie Kardamom, Kurkuma und Nelken. Kochen Sie würzigen Pilau-Reis, aromatische Gemüse-Currys und handgezogene Chapatis auf holzbefeuerten Tonöfen.'
    },
    duration: {
      en: '3.5 Hours',
      fr: '3.5 Heures',
      de: '3.5 Stunden'
    },
    priceUSD: 45,
    image: '/images/ra9.jpg',
    included: {
      en: ['Professional Swahili chef', 'Full multi-course lunch', 'Recipe booklet (PDF)', 'Unlimited spiced drinks', 'Apron hire'],
      fr: ['Chef Swahili professionnel', 'Déjeuner complet multi-plats', 'Livret de recettes (PDF)', 'Boissons épicées à volonté', 'Prêt de tablier'],
      de: ['Professioneller Swahili-Koch', 'Volles Gänge-Mittagessen', 'Rezeptbuch (PDF)', 'Unbegrenzt Gewürzgetränke', 'Leihschürze']
    },
    highlights: {
      en: ['Coconut milking by hand', 'Stone spice-grinding technique', 'Clay pot woodstove cooking', 'Vegetarian & Vegan friendly'],
      fr: ['Extraction du lait de coco', 'Technique de broyage d\'épices sur pierre', 'Cuisson au fourneau à bois', 'Options végétariennes & véganes'],
      de: ['Kokosmilch-Pressen von Hand', 'Steingewürz-Mahltechnik', 'Kochen auf dem Holz-Tonofen', 'Vegetarisch & Vegan freundlich']
    }
  },
  {
    id: 'combo',
    name: {
      en: '⭐ Spice & Village Combo',
      fr: '⭐ Combo Épices & Village',
      de: '⭐ Gewürz- & Dorf-Kombination'
    },
    description: {
      en: 'The ultimate half-day adventure. Walk the spice trails, then head straight into the village for local life.',
      fr: 'L\'aventure ultime d\'une demi-journée. Promenez-vous sur les sentiers d\'épices, puis visitez le village.',
      de: 'Das ultimative Halbtages-Abenteuer. Wandern Sie auf Gewürzpfaden und erleben Sie anschließend das Dorfleben.'
    },
    longDescription: {
      en: 'Combine our two signature tours into a seamless, high-value journey. Uncover the agriculture, trade history, and deep-rooted family culture of rural Zanzibar in one spectacular morning.',
      fr: 'Combinez nos deux visites phares en un seul voyage harmonieux à tarif préférentiel. Découvrez l\'agriculture, l\'histoire du commerce et la culture familiale de Zanzibar en une seule matinée spectaculaire.',
      de: 'Kombinieren Sie unsere zwei beliebtesten Touren zu einer nahtlosen, preiswerten Reise. Entdecken Sie die Landwirtschaft, Handelsgeschichte und die tief verwurzelte Familienkultur Sansibars an einem einzigen Vormittag.'
    },
    duration: {
      en: '6 Hours',
      fr: '6 Heures',
      de: '6 Stunden'
    },
    priceUSD: 65,
    image: '/images/ra13.jpg',
    included: {
      en: ['Dual-tour certified guides', 'Tropical fruit lunch buffet', 'All school and farm donations', 'Comfortable AC transport', 'Refreshing spiced drinks'],
      fr: ['Guides certifiés double visite', 'Buffet de fruits tropicaux', 'Dons pour l\'école et la ferme', 'Transport climatisé confortable', 'Boissons fraîches infusées'],
      de: ['Zertifizierter Kombi-Guide', 'Tropisches Früchte-Mittagsbuffet', 'Alle Dorf- & Schulspenden', 'Komfortabler AC-Transfer', 'Erfrischende Gewürzgetränke']
    },
    highlights: {
      en: ['Complete spice farm exploration', 'Traditional school & school children meet', 'Drumming & dancing workshop', 'Zanzibar coffee tasting'],
      fr: ['Exploration complète de la ferme', 'Rencontre avec les écoliers', 'Atelier percussions & danse', 'Dégustation de café de Zanzibar'],
      de: ['Komplette Gewürzfarm-Erkundung', 'Treffen mit Dorfeinzelschülern', 'Trommel- & Tanzworkshop', 'Zanzibar Kaffee-Verkostung']
    }
  },
  {
    id: 'full',
    name: {
      en: '💎 The Full-Day Experience',
      fr: '💎 L\'Expérience Journée Complète',
      de: '💎 Das Ganztages-Erlebnis'
    },
    description: {
      en: 'Our most recommended choice. Spice trails, school visits, traditional cooking, and a festive family feast.',
      fr: 'Notre formule la plus recommandée. Sentiers d\'épices, visite d\'école, cours de cuisine et banquet festif.',
      de: 'Unsere meistempfohlene Option. Gewürzpfade, Schulbesuch, traditioneller Kochkurs und ein festliches Familienessen.'
    },
    longDescription: {
      en: 'A fully guided cultural immersion. Spend the morning harvesting raw spices, visit our partner village and school, cook your own grand Zanzibar Pilau lunch, and relax with elders over tea and traditional Swahili storytelling.',
      fr: 'Une immersion culturelle complète de 8 heures. Récoltez les épices fraîches le matin, visitez le village partenaire, cuisinez votre grand déjeuner Pilau, et détendez-vous avec les anciens du village autour d\'un thé et de contes swahilis.',
      de: 'Eine ganztägige, geführte kulturelle Immersion. Ernten Sie morgens Gewürze, besuchen Sie unser Partnerdorf und die Schule, kochen Sie Ihr eigenes großes Sansibar-Pilau-Mittagessen und entspannen Sie mit den Dorfältesten bei Tee und traditionellen Swahili-Erzählungen.'
    },
    duration: {
      en: '8 Hours',
      fr: '8 Heures',
      de: '8 Stunden'
    },
    priceUSD: 85,
    image: '/images/ra10.jpg',
    included: {
      en: ['VIP full-day guiding team', 'Zanzibar cooking class & grand lunch', 'Printed recipe book souvenir', 'Private AC transport', 'Fresh coconut (Dafu) & treats', 'Village elder storytelling session'],
      fr: ['Équipe de guides VIP dédiée', 'Cours de cuisine & grand déjeuner', 'Livre de recettes papier en souvenir', 'Transport privé climatisé', 'Noix de coco & collations', 'Contes swahilis avec les anciens'],
      de: ['VIP-Ganztages-Guide-Team', 'Sansibar-Kochkurs & großes Mittagessen', 'Gedrucktes Rezeptbuch als Souvenir', 'Privater AC-Transfer', 'Frische Kokosnuss & Snacks', 'Geschichtenstunde mit den Dorfältesten']
    },
    highlights: {
      en: ['Complete Spice + Village + Cooking', 'Handmade soap crafting session', 'VIP Private school children choir', 'Zanzibar lemongrass tea ceremony'],
      fr: ['Formule Épices + Village + Cuisine', 'Atelier de fabrication de savon artisanal', 'Chorale privée des écoliers du village', 'Cérémonie du thé à la citronnelle'],
      de: ['Komplettes Gewürz- + Dorf- + Kocherlebnis', 'Atelier für handgemachte Seife', 'Privater Auftritt des Kinderchors', 'Zanzibar Zitronengras-Tee-Zeremonie']
    }
  }
];

export const reviewsData: Review[] = [
  {
    id: 'rev1',
    author: 'Sarah Jenkins (UK)',
    rating: 5,
    date: 'June 2026',
    content: {
      en: 'Hands down the highlight of our entire trip to Zanzibar. Pounding fresh lemongrass and cooking coconut curry in clay pots over charcoal was magic. Bibi was an amazing host!',
      fr: 'Le clou de notre voyage à Zanzibar ! Piler la citronnelle fraîche et cuisiner le curry de coco dans des pots en terre cuite était magique. Bibi était un hôte fantastique !',
      de: 'Absolut das Highlight unserer gesamten Sansibar-Reise. Frisches Zitronengras zu stampfen und Kokosnuss-Curry in Tontöpfen zu kochen war magisch. Bibi war eine tolle Gastgeberin!'
    },
    platform: 'Google',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'rev2',
    author: 'Markus Weber (Germany)',
    rating: 5,
    date: 'May 2026',
    content: {
      en: 'The Spice and Village combo was exceptional. Visiting the local school and meeting the children was so touching. Unbelievably transparent and supportive of the community.',
      fr: 'Le combo Épices et Village était exceptionnel. Visiter l\'école locale et rencontrer les enfants était si touchant. Très transparent et solidaire de la communauté.',
      de: 'Die Gewürz- und Dorfkombi war außergewöhnlich. Der Besuch der örtlichen Schule und das Treffen mit den Kindern war so berührend. Unglaublich transparent und unterstützend.'
    },
    platform: 'TripAdvisor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'rev3',
    author: 'Chantal Dubois (France)',
    rating: 5,
    date: 'July 2026',
    content: {
      en: 'My kids loved seeing where vanilla and cinnamon actually come from! Climbing the coconut palm was jaw-dropping. Highly authentic, delicious food, highly recommend!',
      fr: 'Mes enfants ont adoré voir d\'où viennent la vanille et la cannelle ! Le grimpeur de cocotier était à couper le souffle. Nourriture authentique et délicieuse !',
      de: 'Meine Kinder liebten es zu sehen, woher Vanille und Zimt wirklich kommen! Das Kokospalmenklettern war atemberaubend. Sehr authentisch, leckeres Essen, sehr zu empfehlen!'
    },
    platform: 'Google',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

const rawBlogPosts: BlogPost[] = [
  {
    id: 'blog1',
    title: {
      en: 'The Royal History of Cloves on Zanzibar Island',
      fr: 'L\'Histoire Royale du Clou de Girofle à Zanzibar',
      de: 'Die königliche Geschichte der Gewürznelken auf Sansibar'
    },
    excerpt: {
      en: 'How a simple tree flower bud transformed Zanzibar into the clove capital of the world and shaped its destiny.',
      fr: 'Comment le simple bouton d\'une fleur d\'arbre a transformé Zanzibar en capitale mondiale du clou de girofle.',
      de: 'Wie eine einfache Baublüte Sansibar zur Nelkenhauptstadt der Welt machte und sein Schicksal prägte.'
    },
    content: {
      en: 'In the 19th century, Sultan Seyyid Said moved his entire capital from Muscat to Zanzibar, recognizing the incredible potential of the island\'s red soils for clove cultivation. Cloves were worth their weight in gold, used to preserve food, cure toothaches, and spice royal banquets across Europe and Asia. Today, we still harvest these rich aromatic buds by hand, letting them dry under the hot tropical sun to produce the deep, rich oil Zanzibar is famous for.',
      fr: 'Au XIXe siècle, le sultan Seyyid Said a transféré sa capitale de Mascate à Zanzibar, reconnaissant le potentiel incroyable des sols rouges de l\'île pour la culture des clous de girofle. Les clous de girofle valaient leur pesant d\'or, utilisés pour conserver la nourriture et soigner les maux de dents. Aujourd\'hui, nous récoltons toujours ces bourgeons parfumés à la main, les laissant sécher sous le soleil tropical.',
      de: 'Im 19. Jahrhundert verlegte Sultan Seyyid Said seine gesamte Hauptstadt von Maskat nach Sansibar, da er das unglaubliche Potenzial der roten Inselböden für den Nelkenanbau erkannte. Nelken waren so wertvoll wie Gold und wurden verwendet, um Lebensmittel zu konservieren, Zahnschmerzen zu heilen und königliche Bankette in Europa und Asien zu würzen. Noch heute ernten wir diese aromatischen Knospen von Hand.'
    },
    date: '2026-07-10',
    image: '/images/ra2.jpg',
    author: 'Khalfan (Lead Guide)',
    category: 'History'
  },
  {
    id: 'blog2',
    title: {
      en: 'Secret to Cooking the Perfect Swahili Spiced Pilau',
      fr: 'Le secret pour cuisiner le riz Pilau Swahili parfait',
      de: 'Das Geheimnis für den perfekten Sansibar Pilau-Reis'
    },
    excerpt: {
      en: 'Unlock the correct proportions of freshly crushed spices to achieve that deep mahogany, aromatic rice dish.',
      fr: 'Découvrez les proportions exactes d\'épices fraîchement broyées pour réussir ce riz acajou parfumé.',
      de: 'Erfahren Sie das genaue Verhältnis frisch gemahlener Gewürze für dieses tiefbraune, aromatische Reisgericht.'
    },
    content: {
      en: 'The secret to authentic Zanzibar Pilau lies in the roasting. Before adding any rice, you must toast cardamom pods, cloves, cinnamon sticks, black peppercorns, and cumin seeds in hot oil until they release their essential oils. Then, slowly caramelize red onions to a deep mahogany color—this is what gives Pilau its signature golden-brown hue without any artificial colorings. Finally, cook the basmati rice in a heavy-bottomed clay pot, allowing the steam to lock in the absolute depth of flavors.',
      fr: 'Le secret du Pilau de Zanzibar réside dans la torréfaction. Avant d\'ajouter le riz, vous devez faire griller les gousses de cardamome, les clous de girofle, les bâtons de cannelle et le cumin dans de l\'huile chaude. Ensuite, caramélisez lentement les oignons rouges jusqu\'à obtenir une couleur acajou profond—c\'est ce qui donne au Pilau sa teinte dorée emblématique.',
      de: 'Das Geheimnis des echten Sansibar-Pilau liegt im Rösten. Bevor Sie Reis hinzufügen, müssen Sie Kardamomkapseln, Nelken, Zimtstangen, schwarze Pfefferkörner und Kreuzkümmelsamen in heißem Öl anrösten, bis sie ihre ätherischen Öle freisetzen. Anschließend karamellisieren Sie rote Zwiebeln langsam bis zu einer tiefen Mahagonifarbe.'
    },
    date: '2026-07-05',
    image: '/images/ra10.jpg',
    author: 'Mama Asha (Chef)',
    category: 'Cooking'
  },
  {
    id: 'blog3',
    title: {
      en: 'Zanzibar Village Schools: Creating Brighter Futures',
      fr: 'Écoles de Village à Zanzibar : Créer un avenir meilleur',
      de: 'Sansibars Dorfschulen: Eine hellere Zukunft aufbauen'
    },
    excerpt: {
      en: 'How your cultural tour bookings are directly building classrooms, libraries, and supplying school lunches.',
      fr: 'Comment vos réservations de visites financent directement les salles de classe, les bibliothèques et les repas.',
      de: 'Wie Ihre Buchungen direkt den Bau von Klassenzimmern, Bibliotheken und Schulessen finanzieren.'
    },
    content: {
      en: 'In rural Zanzibar, access to modern learning resources can be challenging. By integrating a village school visit into our tours, we give travelers a chance to support the community in an active, respectful way. 10% of every ticket goes directly to purchasing mathematics books, roofing sheets for monsoon protection, and funding a daily hot lunch program that has increased school attendance by 45%. Thank you for being a part of this vital sustainable journey.',
      fr: 'Dans les zones rurales de Zanzibar, l\'accès aux ressources d\'apprentissage peut être difficile. En intégrant une visite d\'école, nous offrons aux voyageurs la chance de soutenir la communauté de manière respectueuse. 10 % de chaque billet financent l\'achat de livres, de tôles de toiture et des déjeuners quotidiens.',
      de: 'Im ländlichen Sansibar kann der Zugang zu modernen Lernressourcen eine Herausforderung sein. Durch die Integration eines Dorfschulbesuchs geben wir Reisenden die Möglichkeit, die Gemeinschaft aktiv und respektvoll zu unterstützen. 10 % jedes Tickets fließen direkt in den Kauf von Büchern, Dächern und Schulspeisungen.'
    },
    date: '2026-06-28',
    image: '/images/ra6.jpg',
    author: 'Ali (Community Liaison)',
    category: 'Community'
  }
];

const rawSpicesList = [
  {
    name: { en: 'Cloves (Karafuu)', fr: 'Clous de Girofle (Karafuu)', de: 'Gewürznelken (Karafuu)' },
    scientific: 'Syzygium aromaticum',
    use: { en: 'Pilau, curries, traditional anesthetics for toothaches.', fr: 'Pilau, currys, anesthésiques traditionnels pour les dents.', de: 'Pilau, Currys, traditionelles Betäubungsmittel bei Zahnschmerzen.' },
    desc: { en: 'The king of Zanzibar spices. Dried aromatic flower buds harvested from giant evergreen trees.', fr: 'Le roi des épices de Zanzibar. Bourgeons séchés récoltés sur des arbres à feuilles persistantes.', de: 'Der König der sansibarischen Gewürze. Getrocknete Blütenknospen, die von riesigen Bäumen geerntet werden.' },
    icon: 'Sparkles',
    image: '/images/ra2.jpg'
  },
  {
    name: { en: 'Cinnamon (Mdalasini)', fr: 'Cannelle (Mdalasini)', de: 'Zimt (Mdalasini)' },
    scientific: 'Cinnamomum verum',
    use: { en: 'Sweet pastries, spiced coffees, beef and vegetable stews.', fr: 'Pâtisseries, cafés épicés, ragoûts de bœuf et légumes.', de: 'Süßes Gebäck, Gewürzkaffee, Rindfleisch- und Gemüseeintöpfe.' },
    desc: { en: 'A magical plant where the leaves, bark, and roots all smell completely different (lemongrass, classic cinnamon, and camphor!).', fr: 'Une plante magique dont les feuilles, l\'écorce et les racines ont des odeurs totalement différentes !', de: 'Eine magische Pflanze, bei der Blätter, Rinde und Wurzeln völlig unterschiedlich riechen (Zitronengras, Zimt, Kampfer!).' },
    icon: 'Flame',
    image: '/images/ra3.jpg'
  },
  {
    name: { en: 'Cardamom (Iliki)', fr: 'Cardamome (Iliki)', de: 'Kardamom (Iliki)' },
    scientific: 'Elettaria cardamomum',
    use: { en: 'Zanzibar spiced tea, Pilau rice, aromatic baking.', fr: 'Thé épicé de Zanzibar, riz Pilau, pâtisseries aromatiques.', de: 'Sansibar-Gewürztee, Pilau-Reis, aromatisches Backen.' },
    desc: { en: 'Known as the Queen of Spices. The small green pods grow at the root level of a lush tropical plant.', fr: 'Reine des épices. Les petites gousses vertes poussent au niveau des racines d\'une plante tropicale.', de: 'Die Königin der Gewürze. Die kleinen grünen Kapseln wachsen am Fuß einer üppigen tropischen Pflanze.' },
    icon: 'Crown',
    image: '/images/ra18.jpg'
  },
  {
    name: { en: 'Turmeric (Manjano)', fr: 'Curcuma (Manjano)', de: 'Kurkuma (Manjano)' },
    scientific: 'Curcuma longa',
    use: { en: 'Swahili coconut fish curry, natural yellow textile dye.', fr: 'Curry de poisson coco swahili, teinture textile naturelle.', de: 'Swahili Kokos-Fischcurry, natürlicher gelber Textilfarbstoff.' },
    desc: { en: 'A golden rhizome related to ginger. Known locally for its powerful anti-inflammatory benefits.', fr: 'Un rhizome doré cousin du gingembre, réputé pour ses propriétés anti-inflammatoires puissantes.', de: 'Ein goldener Wurzelstock, verwandt mit Ingwer. Bekannt für seine starken entzündungshemmenden Eigenschaften.' },
    icon: 'Sun',
    image: '/images/ra19.jpg'
  }
];

const rawTeamGuides = [
  {
    name: 'Khalfan Khamis',
    role: {
      en: 'Lead Botanist & Guide',
      fr: 'Botaniste en chef & Guide',
      de: 'Chefe-Botaniker & Guide'
    },
    bio: {
      en: 'With over 20 years wandering the spice trails, Khalfan can identify any plant on the island with his eyes closed.',
      fr: 'Avec plus de 20 ans d\'exploration des sentiers, Khalfan sait identifier n\'importe quelle plante les yeux fermés.',
      de: 'Mit über 20 Jahren Erfahrung auf Gewürzpfaden kann Khalfan jede Pflanze der Insel mit geschlossenen Augen bestimmen.'
    },
    image: '/images/ra17.jpg'
  },
  {
    name: 'Mama Asha',
    role: {
      en: 'Master Culinary Chef',
      fr: 'Chef de Cuisine Swahili',
      de: 'Küchenmeisterin'
    },
    bio: {
      en: 'Asha has been cooking traditional woodstove meals since childhood. Her coconut-milking speed is legendary!',
      fr: 'Asha cuisine sur fourneaux à bois traditionnels depuis son enfance. Sa vitesse pour extraire le lait de coco est légendaire !',
      de: 'Asha kocht seit ihrer Kindheit auf traditionellen Holzöfen. Ihre Geschwindigkeit beim Kokosmilchpressen ist legendär!'
    },
    image: '/images/ra5.jpg'
  }
];

export const tourPackages = rawTourPackages.map(pkg => ({
  ...pkg,
  image: mapLocalImagesToUnsplash(pkg.image)
}));

export const blogPosts = rawBlogPosts.map(post => ({
  ...post,
  image: mapLocalImagesToUnsplash(post.image)
}));

export const spicesList = rawSpicesList.map(spice => ({
  ...spice,
  image: mapLocalImagesToUnsplash(spice.image)
}));

export const teamGuides = rawTeamGuides.map(guide => ({
  ...guide,
  image: mapLocalImagesToUnsplash(guide.image)
}));

