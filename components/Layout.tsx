
import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'academics', label: 'Academics' },
    { id: 'library', label: 'Library' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'results', label: 'Results' },
    { id: 'portal', label: 'Student Portal' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onTabChange('home')}>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="text-xl font-bold text-slate-800 hidden sm:block">Lumina Academy</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === item.id ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeTab === item.id ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
              <span className="text-xl font-bold text-white">Lumina Academy</span>
            </div>
            <p className="text-sm max-w-sm">
              Empowering students to achieve excellence through a balanced curriculum of STEM, Humanities, and the Arts. Founded in 1994.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onTabChange('home')} className="hover:text-emerald-400">Home</button></li>
              <li><button onClick={() => onTabChange('academics')} className="hover:text-emerald-400">Academics</button></li>
              <li><button onClick={() => onTabChange('library')} className="hover:text-emerald-400">Library</button></li>
              <li><button onClick={() => onTabChange('admissions')} className="hover:text-emerald-400">Admissions</button></li>
              <li><button onClick={() => onTabChange('results')} className="hover:text-emerald-400">Results</button></li>
              <li><button onClick={() => onTabChange('portal')} className="hover:text-emerald-400">Portal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Education Lane</li>
              <li>Sunshine Valley, CA 90210</li>
              <li>(555) 123-4567</li>
              <li>info@luminaacademy.edu</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} Lumina Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
