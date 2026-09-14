import React from 'react';

/**
 * Site header. Per the redesign the "Follow on Youtube" nav link is gone -
 * social links now live in the footer only.
 */
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <nav aria-label="Primary" className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2" aria-label="LeanStart Africa - home">
          <span
            aria-hidden="true"
            className="w-10 h-10 logo-gradient rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md"
          >
            L
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            LeanStart<span className="text-orange-600">.africa</span>
          </span>
        </a>

        <a
          href="#ventures"
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Our Ventures
        </a>
      </nav>
    </header>
  );
};

export default Header;
