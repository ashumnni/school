
import React, { useState, useMemo, useEffect } from 'react';
import { LIBRARY_BOOKS } from '../constants';
import { Book } from '../types';

type ReaderMode = 'light' | 'sepia' | 'dark';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type LineSpacing = 'tight' | 'normal' | 'relaxed' | 'loose';

export const Library: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Reader Settings
  const [readerMode, setReaderMode] = useState<ReaderMode>('light');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>('relaxed');
  const [showStats, setShowStats] = useState(true);

  const categories = ['All', 'Science', 'Humanities', 'Arts', 'Reference', 'Bookmarked'];

  const filteredBooks = useMemo(() => {
    return LIBRARY_BOOKS.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const isBookmarked = bookmarks.includes(book.id);
      const matchesCategory = activeCategory === 'All' 
                            ? true 
                            : activeCategory === 'Bookmarked' 
                            ? isBookmarked 
                            : book.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, bookmarks]);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const getReaderStyles = () => {
    switch (readerMode) {
      case 'sepia': return 'bg-[#f4ecd8] text-[#5b4636]';
      case 'dark': return 'bg-[#1a1a1a] text-[#d1d1d1]';
      default: return 'bg-white text-slate-800';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-base';
      case 'lg': return 'text-xl';
      case 'xl': return 'text-2xl';
      default: return 'text-lg';
    }
  };

  const getLineSpacingClass = () => {
    switch (lineSpacing) {
      case 'tight': return 'leading-tight';
      case 'relaxed': return 'leading-relaxed';
      case 'loose': return 'leading-loose';
      default: return 'leading-normal';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Library Hero - Advanced Visuals */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-10"
            alt="Library"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1 bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Lumina Digital Commons
              </span>
              <h1 className="text-6xl font-bold mb-6 leading-tight font-serif">
                Knowledge without <span className="text-emerald-500 italic">Boundaries.</span>
              </h1>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Explore our sophisticated digital archive. From quantum theory to classical cinematography, the entire Lumina curriculum is at your fingertips.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, authors, research topics..."
                    className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-500 shadow-2xl"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="hidden sm:inline text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded">⌘ K</span>
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Book Card */}
            <div className="hidden lg:block w-80 shrink-0">
               <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Reading Recommendation</div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-xl">
                    <img src={LIBRARY_BOOKS[0].cover} className="w-full h-full object-cover" alt="Featured" />
                  </div>
                  <h4 className="font-bold text-lg mb-1">{LIBRARY_BOOKS[0].title}</h4>
                  <p className="text-slate-400 text-xs mb-4">Selected by the Physics Dept.</p>
                  <button 
                    onClick={() => setSelectedBook(LIBRARY_BOOKS[0])}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-900/40"
                  >
                    Start Reading Now
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          {/* Enhanced Category Bar */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                  activeCategory === cat 
                  ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {cat}
                {cat === 'Bookmarked' && bookmarks.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg animate-bounce">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-white p-1.5 rounded-xl border border-slate-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>

        {/* Dynamic Grid/List Transition */}
        {filteredBooks.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            : "space-y-4"
          }>
            {filteredBooks.map(book => (
              <div 
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className={`bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer ${
                  viewMode === 'grid' 
                  ? "rounded-[2rem] overflow-hidden flex flex-col h-full"
                  : "rounded-2xl p-4 flex flex-row items-center gap-6"
                }`}
              >
                <div className={`relative overflow-hidden shrink-0 ${
                  viewMode === 'grid' ? "aspect-[3/4]" : "w-24 h-32 rounded-xl"
                }`}>
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full scale-50 group-hover:scale-100 transition-transform shadow-2xl">
                       <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => toggleBookmark(e, book.id)}
                    className={`absolute top-4 right-4 p-2 rounded-xl backdrop-blur-md transition-all ${
                      bookmarks.includes(book.id) ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-400 hover:text-emerald-500'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={bookmarks.includes(book.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>

                <div className={`flex-grow ${viewMode === 'grid' ? 'p-6' : 'py-2'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{book.category}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      book.difficulty === 'Advanced' ? 'bg-rose-50 text-rose-600' :
                      book.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {book.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1 font-serif">
                    {book.title}
                  </h3>
                  <div className="space-y-0.5 mb-4">
                    <p className="text-sm text-slate-500">by {book.author}</p>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-bold">{book.readingTime} read</span>
                    </div>
                  </div>
                  
                  {viewMode === 'grid' && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                      {book.description}
                    </p>
                  )}

                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                       <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                          {book.pages} Pages
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
             <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
             </div>
             <h3 className="text-2xl font-bold text-slate-800 mb-2">The Archive is Empty</h3>
             <p className="text-slate-500 max-w-sm mx-auto">No results match your current search filters. Try clearing your bookmarks or searching for something else.</p>
             <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-8 text-emerald-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
          </div>
        )}
      </main>

      {/* Professional Reader Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setSelectedBook(null)}></div>
          
          <div className={`relative w-full max-w-6xl h-full sm:h-[95vh] rounded-none sm:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-12 duration-500 ${getReaderStyles()}`}>
            
            {/* Sidebar - Book Context */}
            <div className="lg:w-80 h-48 lg:h-full bg-black/5 flex flex-col p-8 shrink-0">
               <div className="hidden lg:block aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-8 group relative">
                  <img src={selectedBook.cover} className="w-full h-full object-cover" alt="Cover" />
                  <div className="absolute inset-0 bg-emerald-600/20 mix-blend-overlay"></div>
               </div>
               <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-2 leading-tight font-serif">{selectedBook.title}</h2>
                  <p className="opacity-60 text-sm mb-6 uppercase tracking-widest font-bold">by {selectedBook.author}</p>
                  
                  {/* Metadata Stats Setting Display */}
                  {showStats && (
                    <div className="mb-8 p-4 bg-emerald-600/5 border border-emerald-600/10 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Est. Reading Time</p>
                          <p className="text-sm font-bold opacity-80">{selectedBook.readingTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Complexity</p>
                          <p className="text-sm font-bold opacity-80">{selectedBook.difficulty}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="hidden lg:block space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black uppercase opacity-40 mb-3 tracking-[0.2em]">Table of Contents</h4>
                      <ul className="space-y-3 text-sm font-medium">
                        <li className="flex items-center gap-2 text-emerald-500"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Chapter 1: Introduction</li>
                        <li className="opacity-40 hover:opacity-100 cursor-not-allowed">Chapter 2: Core Concepts</li>
                        <li className="opacity-40 hover:opacity-100 cursor-not-allowed">Chapter 3: Methodology</li>
                        <li className="opacity-40 hover:opacity-100 cursor-not-allowed">Chapter 4: Conclusion</li>
                      </ul>
                    </div>
                  </div>
               </div>
               
               {/* Controls in Sidebar */}
               <div className="mt-auto hidden lg:block pt-8 border-t border-black/10">
                  <div className="flex items-center justify-between">
                     <button className="p-2 hover:bg-black/5 rounded-xl transition-colors opacity-60">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                     </button>
                     <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/20">
                        GET FULL VERSION
                     </button>
                  </div>
               </div>
            </div>

            {/* Main Reading Canvas */}
            <div className="flex-grow flex flex-col relative overflow-hidden">
               {/* Header Toolbar */}
               <div className="px-8 py-5 border-b border-black/5 flex items-center justify-between sticky top-0 backdrop-blur-md z-10">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Digital Commons Viewer</span>
                     
                     {/* Reading Time Quick View (Setting Toggle) */}
                     <button 
                        onClick={() => setShowStats(!showStats)}
                        className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                          showStats 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                          : 'bg-black/5 border-transparent text-slate-400 opacity-60'
                        }`}
                        title="Toggle Reading Stats"
                     >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-widest">Stats</span>
                     </button>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {/* Line Spacing Toggle */}
                    <div className="flex items-center gap-1 border-r border-black/10 pr-6 mr-2">
                       {(['tight', 'normal', 'relaxed', 'loose'] as LineSpacing[]).map(spacing => (
                         <button 
                            key={spacing}
                            onClick={() => setLineSpacing(spacing)}
                            className={`p-2 rounded-lg transition-all ${lineSpacing === spacing ? 'bg-black/5 text-emerald-500' : 'opacity-40 hover:opacity-100'}`}
                            title={`Line Spacing: ${spacing}`}
                         >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                              {spacing === 'tight' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9h16M4 15h16" className="opacity-30" />}
                            </svg>
                         </button>
                       ))}
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-black/5 p-1 rounded-xl">
                       {(['light', 'sepia', 'dark'] as ReaderMode[]).map(mode => (
                         <button 
                            key={mode}
                            onClick={() => setReaderMode(mode)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${readerMode === mode ? 'bg-white shadow-sm scale-110' : 'opacity-40 hover:opacity-100'}`}
                         >
                            <div className={`w-4 h-4 rounded-full border border-black/10 ${
                              mode === 'light' ? 'bg-white' : 
                              mode === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-[#333]'
                            }`} />
                         </button>
                       ))}
                    </div>

                    {/* Font Size */}
                    <div className="flex items-center gap-2 border-l border-black/10 pl-6">
                       <button onClick={() => setFontSize('sm')} className={`p-2 font-bold ${fontSize === 'sm' ? 'text-emerald-500' : 'opacity-40'}`}>A</button>
                       <button onClick={() => setFontSize('md')} className={`p-2 font-bold text-lg ${fontSize === 'md' ? 'text-emerald-500' : 'opacity-40'}`}>A</button>
                       <button onClick={() => setFontSize('lg')} className={`p-2 font-bold text-xl ${fontSize === 'lg' ? 'text-emerald-500' : 'opacity-40'}`}>A</button>
                    </div>

                    <button 
                      onClick={() => setSelectedBook(null)}
                      className="ml-4 p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
               </div>

               {/* Text Area */}
               <div className="flex-grow overflow-y-auto p-12 lg:p-24 scroll-smooth custom-scrollbar">
                  <article className={`max-w-2xl mx-auto font-serif ${getFontSizeClass()} ${getLineSpacingClass()}`}>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-12 leading-tight">{selectedBook.title}</h1>
                    <div className="space-y-8">
                       {selectedBook.fullContent?.split('\n').map((para, i) => (
                         <p key={i} className={para.startsWith('CHAPTER') ? 'text-emerald-500 font-bold uppercase tracking-[0.2em] text-sm mt-16 mb-6 leading-normal' : ''}>
                           {para}
                         </p>
                       ))}
                       
                       <div className="py-20 border-t border-black/5 mt-20 text-center opacity-40">
                          <p className="text-sm italic">You have reached the end of the preview version of this document.</p>
                       </div>
                    </div>
                  </article>
               </div>

               {/* Footer Progress Bar */}
               <div className="px-8 py-4 border-t border-black/5 flex items-center justify-between text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  <span>Reading: 12m of {selectedBook.readingTime}</span>
                  <div className="flex-grow mx-8 h-1 bg-black/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[5%]"></div>
                  </div>
                  <span>Page 1 of {selectedBook.pages}</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
