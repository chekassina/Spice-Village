import React, { useState } from 'react';
import { BookOpen, Search, User, Calendar, Tag, ArrowRight, MessageSquare, X, Heart, Sparkles, Send } from 'lucide-react';
import { blogPosts } from '../data';
import { Language } from '../types';

interface BlogPageProps {
  currentLang: Language;
}

export default function BlogPage({ currentLang }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({
    '1': [
      { author: 'Clara M.', text: 'Fascinating read! The curing process sounds incredibly delicate.', date: 'July 14, 2026' },
      { author: 'Jan K.', text: 'I tried vanilla tea after this and it is indeed magical!', date: 'July 18, 2026' }
    ],
    '2': [
      { author: 'Pierre L.', text: 'Un article très inspirant, hâte de goûter au pilau cuit au feu de bois !', date: 'July 10, 2026' }
    ]
  });
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const filteredPosts = blogPosts.filter(post => 
    post.title[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment = {
      author: newCommentName,
      text: newCommentText,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setComments({
      ...comments,
      [postId]: [...(comments[postId] || []), newComment]
    });

    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <div className="py-12 bg-[#F8F5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#1F6B42] text-xs font-bold uppercase tracking-widest font-mono flex items-center justify-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            {currentLang === 'fr' ? 'Le Journal de la Communauté' : currentLang === 'de' ? 'Gemeindeblog' : 'SWAHILI COMMUNITY JOURNAL'}
          </span>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#5A3E2B] tracking-tight">
            {currentLang === 'fr' ? 'Histoires & Recettes Swahilies' : currentLang === 'de' ? 'Sansibar-Geschichten & Kultur' : 'Stories from the Spice Trails'}
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            {currentLang === 'fr'
              ? 'Découvrez les chroniques rédigées par nos guides, nos agriculteurs et les enseignants de notre village de Bububu.'
              : currentLang === 'de'
              ? 'Lesen Sie Berichte unserer Guides, Gewürzbauern und Dorfschullehrer über das Leben in Bububu.'
              : 'Read articles and insights straight from our local guides, farmers, and village teachers to learn about traditional vanilla curing, local festivals, and organic recipes.'}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto relative bg-white p-2.5 rounded-2xl border border-stone-200/50 shadow-sm">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'fr' ? 'Rechercher un article...' : currentLang === 'de' ? 'Artikel suchen...' : 'Search journal...'}
            className="w-full bg-[#F8F5EC] pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none border border-stone-200 focus:border-[#1F6B42] focus:bg-white transition text-stone-850"
          />
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-stone-200/50 overflow-hidden flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title[currentLang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#1F6B42] text-white text-[10px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-lg">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-[10px] text-stone-400 font-mono">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#5A3E2B] leading-tight group-hover:text-[#1F6B42] transition">
                      {post.title[currentLang]}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt[currentLang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#1F6B42] group-hover:text-[#155231]">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/50 shadow-sm max-w-lg mx-auto">
            <h4 className="font-serif font-bold text-lg text-[#5A3E2B]">No articles matched your search</h4>
            <p className="text-stone-400 text-xs mt-1.5">Try looking for general topics like "Vanilla" or "Pilau".</p>
          </div>
        )}

        {/* Read Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200/80 shadow-2xl relative">
              
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-stone-100 text-stone-600 hover:bg-stone-200 p-2.5 rounded-full transition z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title[currentLang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white space-y-1.5 pr-12">
                  <span className="bg-[#D4AF37] text-[#5A3E2B] text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {selectedPost.category}
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl leading-tight">
                    {selectedPost.title[currentLang]}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-10 space-y-8">
                
                {/* Author card */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-150">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-[#F8F5EC] rounded-full flex items-center justify-center text-[#1F6B42] font-serif font-bold text-sm border border-stone-200">
                      {selectedPost.author.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-[#5A3E2B]">{selectedPost.author}</h5>
                      <p className="text-[10px] text-stone-400 font-mono">Bububu Village contributor</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">{selectedPost.date}</span>
                </div>

                {/* Body Content */}
                <div className="text-stone-700 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {selectedPost.content[currentLang]}
                </div>

                {/* Comment Section Panel */}
                <div className="pt-6 border-t border-stone-150 space-y-6">
                  <h4 className="font-serif font-bold text-base text-[#5A3E2B] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#1F6B42]" />
                    <span>Reader Discussion ({comments[selectedPost.id]?.length || 0})</span>
                  </h4>

                  {/* Comment Feed */}
                  <div className="space-y-3.5">
                    {(comments[selectedPost.id] || []).map((c, i) => (
                      <div key={i} className="bg-[#F8F5EC] p-4 rounded-2xl border border-stone-200/50 space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="font-bold text-[#5A3E2B]">{c.author}</span>
                          <span className="text-stone-400">{c.date}</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Comment Form */}
                  <form onSubmit={(e) => handleAddComment(selectedPost.id, e)} className="space-y-3.5 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        placeholder="Your Name (e.g. Sarah J.)"
                        className="bg-[#F8F5EC] text-stone-850 text-xs px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#1F6B42] focus:bg-white transition"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        rows={2}
                        required
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Join the discussion, share thoughts..."
                        className="w-full bg-[#F8F5EC] text-stone-850 text-xs p-4 pr-12 rounded-xl border border-stone-200 focus:outline-none focus:border-[#1F6B42] focus:bg-white transition resize-none"
                      />
                      <button
                        type="submit"
                        className="absolute right-3.5 bottom-3.5 bg-[#1F6B42] text-white p-2 rounded-lg hover:bg-[#155231] transition cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl font-bold uppercase tracking-wider text-xs transition cursor-pointer"
                  >
                    Close Article
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
