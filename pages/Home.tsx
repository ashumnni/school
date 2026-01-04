
import React from 'react';
import { NEWS } from '../constants';

export const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-slate-900">
        <img 
          src="https://picsum.photos/seed/school-hero/1920/1080" 
          alt="Lumina Academy Campus" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-2xl leading-tight">
            Nurturing Tomorrow's <span className="text-emerald-400">Visionaries</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl">
            A world-class education focused on academic rigor, character building, and creative excellence.
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg">
              Visit Campus
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg transition-all">
              View Curriculum
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
              <div className="text-slate-500 text-sm uppercase tracking-wide">University Acceptance</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">12:1</div>
              <div className="text-slate-500 text-sm uppercase tracking-wide">Student-Teacher Ratio</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">25+</div>
              <div className="text-slate-500 text-sm uppercase tracking-wide">Clubs & Societies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">40</div>
              <div className="text-slate-500 text-sm uppercase tracking-wide">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Latest from Campus</h2>
              <p className="text-slate-600">Keep up to date with our events and academic achievements.</p>
            </div>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              View All News &rarr;
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-full">
                      {item.category}
                    </span>
                    <span className="text-slate-400 text-xs">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
                  <button className="text-emerald-600 text-sm font-bold group-hover:underline">Read Story</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600">Lumina Academy is built on three pillars that guide everything we do, from classroom discussions to athletic competition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-slate-50 rounded-3xl">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Intellectual Rigor</h3>
              <p className="text-slate-600 text-sm">Challenging students to think critically and solve complex problems across disciplines.</p>
            </div>
            <div className="text-center p-8 bg-slate-50 rounded-3xl">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Character First</h3>
              <p className="text-slate-600 text-sm">Building integrity, empathy, and leadership skills in every member of our community.</p>
            </div>
            <div className="text-center p-8 bg-slate-50 rounded-3xl">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 13a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-slate-600 text-sm">Embracing new technologies and creative methodologies to prepare for the future.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
