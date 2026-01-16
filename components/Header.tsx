
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 logo-gradient rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
            L
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            LeanStart<span className="text-orange-600">.africa</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.youtube.com/@LeanStart.Africa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 text-slate-600 hover:text-red-600 transition-colors font-medium px-4 py-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            <span>Watch</span>
          </a>
          <a 
            href="#ventures" 
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Our Ventures
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
