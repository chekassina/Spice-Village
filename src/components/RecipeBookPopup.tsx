/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, X, Download, CheckCircle, Mail, Sparkles, ChefHat } from 'lucide-react';
import { Language } from '../types';

interface RecipeBookPopupProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeBookPopup({ currentLang, isOpen, onClose }: RecipeBookPopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  const content = {
    en: {
      title: "Mama Asha's Spice Kitchen",
      subtitle: "Download Our Free Swahili Recipe Book",
      desc: "Get instant access to 10 generations of secret spice proportions, step-by-step cooking guides for authentic Pilau, Coconut Curry, and lemongrass-infused Zanzibar Chai.",
      placeholder: "Enter your email address...",
      button: "Unlock Recipes (PDF)",
      successTitle: "Karibu Sana! Recipe Book Unlocked",
      successDesc: "Your premium cookbook has been dispatched to your email. You can also view our featured recipes below right now!",
      featuredRecipe: "Featured Recipe: Zanzibar Spiced Pilau",
      ingredients: "Ingredients: 2 cups Basmati Rice, 3 cardamom pods, 3 whole cloves, 1 cinnamon stick, 1 tsp cumin, 2 red onions, 2 garlic cloves, 1 tbsp organic coconut oil.",
      steps: "Step 1: Toast spices in coconut oil. Step 2: Sauté onions until caramelized dark brown. Step 3: Add rice, garlic, and water. Simmer covered on low heat until steam locks the flavor!"
    },
    fr: {
      title: "La Cuisine de Mama Asha",
      subtitle: "Téléchargez le Livre de Recettes Swahilies",
      desc: "Accédez instantanément à 10 générations de secrets d'épices, des guides étape par étape pour réussir le Pilau traditionnel, le Curry de Coco, et le thé à la citronnelle de Zanzibar.",
      placeholder: "Saisissez votre adresse e-mail...",
      button: "Déverrouiller le PDF",
      successTitle: "Karibu Sana ! Recettes Débloquées",
      successDesc: "Votre livre culinaire a été envoyé à votre adresse e-mail. Vous pouvez également consulter notre recette phare ci-dessous !",
      featuredRecipe: "Recette Phare : Riz Pilau de Zanzibar",
      ingredients: "Ingrédients : 2 tasses de riz Basmati, 3 gousses de cardamome, 3 clous de girofle, 1 bâton de cannelle, 1 cuillère à café de cumin, 2 oignons rouges, 1 cuillère à soupe d'huile de coco.",
      steps: "Étape 1 : Faire torréfier les épices dans l'huile de coco. Étape 2 : Caraméliser les oignons rouges. Étape 3 : Ajouter le riz et l'eau. Mijoter à feu doux couvert."
    },
    de: {
      title: "Mama Ashas Gewürzküche",
      subtitle: "Kostenloses Swahili-Rezeptbuch sichern",
      desc: "Erhalten Sie sofortigen Zugang zu 10 Generationen geheimer Gewürzmischungen, Schritt-für-Schritt-Anleitungen für echten Pilau-Reis, Kokos-Curry und Zitronengras-Tee.",
      placeholder: "Geben Sie Ihre E-Mail-Adresse ein...",
      button: "Rezeptbuch freischalten (PDF)",
      successTitle: "Karibu Sana! Rezeptbuch freigeschaltet",
      successDesc: "Ihr Premium-Kochbuch wurde an Ihre E-Mail gesendet. Sie können unser Rezept-Highlight auch direkt unten einsehen!",
      featuredRecipe: "Rezept-Highlight: Gewürzter Sansibar Pilau-Reis",
      ingredients: "Zutaten: 2 Tassen Basmatireis, 3 Kardamomkapseln, 3 ganze Nelken, 1 Zimtstange, 1 TL Kreuzkümmel, 2 rote Zwiebeln, 1 EL Bio-Kokosöl.",
      steps: "Schritt 1: Gewürze in Kokosöl anrösten. Schritt 2: Zwiebeln dunkelbraun karamellisieren. Schritt 3: Reis und Wasser hinzugeben. Abgedeckt bei schwacher Hitze dampfgaren."
    }
  }[currentLang];

  return (
    <div className="fixed inset-0 bg-[#5A3E2B]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div id="recipe-modal-box" className="bg-[#F8F5EC] border-2 border-[#D4AF37] max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden relative p-6 lg:p-8 font-sans">
        
        {/* Close Button */}
        <button 
          id="close-recipe-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-[#5A3E2B] bg-white hover:bg-stone-100 p-2 rounded-full shadow-sm transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="w-14 h-14 bg-[#1F6B42] text-[#D4AF37] rounded-2xl flex items-center justify-center mb-6 shadow-md">
              <ChefHat className="w-8 h-8" />
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
              {content.title}
            </h3>
            <h4 className="text-2xl font-bold font-serif text-[#5A3E2B] mb-3 leading-tight">
              {content.subtitle}
            </h4>
            <p className="text-stone-650 text-sm leading-relaxed mb-6">
              {content.desc}
            </p>

            <form id="recipe-download-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  id="recipe-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.placeholder}
                  className="w-full bg-white text-stone-800 text-sm pl-12 pr-4 py-3.5 rounded-2xl border border-stone-200 focus:outline-none focus:border-[#1F6B42] transition shadow-inner"
                />
              </div>

              <button
                id="submit-recipe-btn"
                type="submit"
                className="w-full bg-[#1F6B42] text-white py-4 rounded-2xl text-sm font-semibold tracking-wide hover:bg-[#155231] hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                {content.button}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-200 animate-bounce">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold font-serif text-[#5A3E2B] mb-2">
              {content.successTitle}
            </h3>
            <p className="text-stone-650 text-sm leading-relaxed mb-6">
              {content.successDesc}
            </p>

            {/* Recipe Teaser inside modal */}
            <div className="bg-white rounded-2xl p-5 text-left border border-stone-200 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wide mb-2">
                <Sparkles className="w-4 h-4 text-[#1F6B42]" />
                <span>{content.featuredRecipe}</span>
              </div>
              <p className="text-xs text-stone-700 font-medium mb-2.5">
                {content.ingredients}
              </p>
              <p className="text-xs text-stone-550 leading-relaxed border-t border-stone-100 pt-2.5">
                {content.steps}
              </p>
            </div>

            <button
              id="close-recipe-success"
              onClick={onClose}
              className="mt-6 bg-[#5A3E2B] text-white px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider hover:bg-stone-850 transition"
            >
              {currentLang === 'fr' ? 'Fermer' : currentLang === 'de' ? 'Schließen' : 'Close & Start Cooking'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
