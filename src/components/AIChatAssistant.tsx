/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AIChatAssistantProps {
  currentLang: Language;
}

export default function AIChatAssistant({ currentLang }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message depending on language
  useEffect(() => {
    const welcomeMessages = {
      en: "Jambo! I am Bibi, your Spice Island assistant. Ask me anything about our fragrant spice farms, traditional Swahili cooking recipes, village school support, or package booking details! 🌿🍲",
      fr: "Jambo ! Je suis Bibi, votre assistante de l'Île aux Épices. Posez-moi vos questions sur nos fermes d'épices, nos recettes traditionnelles swahilies, nos projets d'école ou les réservations ! 🌿🍲",
      de: "Jambo! Ich bin Bibi, Ihre Gewürzinsel-Assistentin. Fragen Sie mich alles über unsere duftenden Gewürzfarmen, traditionelle Swahili-Rezepte, Dorfschulen oder Buchungsdetails! 🌿🍲"
    };

    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: welcomeMessages[currentLang],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentLang]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Package conversation structure for the backend API route
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          userLanguage: currentLang
        })
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'model',
        text: data.text || "Karibu! I am here and happy to help you.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat API Error:', error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: currentLang === 'fr' 
          ? "Désolée, j'ai eu une petite interruption de connexion. Vous pouvez nous écrire directement sur WhatsApp au +255 777 SPICES !" 
          : currentLang === 'de'
          ? "Es tut mir leid, ich hatte eine kurze Verbindungsunterbrechung. Sie können uns direkt über WhatsApp unter +255 777 SPICES schreiben!"
          : "Sorry, I had a brief connection glitch. You can text us directly on WhatsApp at +255 777 SPICES and our local team will help!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-box"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-4 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-stone-200"
          >
            {/* Header */}
            <div className="bg-[#1F6B42] text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-[#D4AF37] relative">
                  🌴
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-1">
                    Bibi — AI Guide
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  </h3>
                  <p className="text-xs text-white/80">
                    {currentLang === 'fr' ? 'Ambassadrice de Zanzibar' : currentLang === 'de' ? 'Kulturbotschafterin' : 'Zanzibar Culture Guide'}
                  </p>
                </div>
              </div>
              <button 
                id="close-chat-btn"
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F5EC]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1F6B42] text-white rounded-br-none shadow-sm'
                        : 'bg-white text-stone-850 rounded-bl-none shadow-sm border border-stone-100'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`text-[10px] block mt-1 text-right ${
                        msg.role === 'user' ? 'text-white/60' : 'text-stone-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-stone-100 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#1F6B42] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-[#1F6B42] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-[#1F6B42] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form id="ai-chat-form" onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex gap-2">
              <input
                id="ai-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={currentLang === 'fr' ? 'Posez votre question...' : currentLang === 'de' ? 'Fragen Sie Bibi...' : 'Ask Bibi something...'}
                className="flex-1 px-4 py-2 bg-stone-100 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-[#1F6B42] text-stone-800 transition"
              />
              <button
                id="send-chat-btn"
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-[#1F6B42] text-white p-2.5 rounded-full hover:bg-[#155231] disabled:opacity-55 disabled:hover:bg-[#1F6B42] transition shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="toggle-chat-bubble"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1F6B42] text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 border border-white/20 hover:bg-[#1a5a37] transition group cursor-pointer"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-[#1F6B42]"></span>
          )}
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-40 transition-all duration-300 ease-out text-sm font-semibold whitespace-nowrap">
          {currentLang === 'fr' ? 'Discuter avec Bibi' : currentLang === 'de' ? 'Mit Bibi chatten' : 'Chat with Bibi'}
        </span>
      </motion.button>
    </div>
  );
}
