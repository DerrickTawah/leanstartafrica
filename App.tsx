
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import VentureCard from './components/VentureCard';
import { VENTURES } from './constants';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden bg-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 bg-orange-50 text-orange-700 rounded-full text-sm font-bold tracking-wide uppercase">
            The African Venture Builder
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
            Engineering the Next <br />
            <span className="gradient-text">African Success Story.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            LeanStart Africa builds high-impact solutions for the continent's digital future. Join our community and watch our journey on YouTube.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#ventures" 
              className="w-full sm:w-auto px-10 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200 active:scale-95"
            >
              Explore Ventures
            </a>
            <a 
              href="https://www.youtube.com/@LeanStart.Africa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              <span>Watch on YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 mb-6 mx-auto md:mx-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Lean & Agile</h3>
              <p className="text-slate-600">We iterate fast, validate assumptions, and build only what users actually need. No waste, just results.</p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-900 mb-6 mx-auto md:mx-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Built for Africa</h3>
              <p className="text-slate-600">Our ventures are designed from the ground up to address unique localized challenges with global standards.</p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 mb-6 mx-auto md:mx-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Documented Journey</h3>
              <p className="text-slate-600">Transparency is in our DNA. We share our building process and lessons learned on our YouTube channel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures Section */}
      <section id="ventures" className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Our Active Portfolio
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From premium marketplaces to early-stage capital and community fintech.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {VENTURES.map((venture) => (
              <VentureCard key={venture.id} venture={venture} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
                <div className="w-8 h-8 logo-gradient rounded flex items-center justify-center text-white font-bold">
                  L
                </div>
                <span className="text-xl font-bold text-white">LeanStart<span className="text-orange-500">.africa</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm mb-8 mx-auto md:mx-0">
                Building the future of African digital business through documentation, execution, and community.
              </p>
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="https://www.youtube.com/@LeanStart.Africa" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-6">Ventures</h4>
              <ul className="space-y-4 text-sm">
                {VENTURES.map(v => (
                  <li key={v.id}><a href={v.url} className="hover:text-white transition-colors">{v.name}</a></li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-6">Connect</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="https://www.youtube.com/@LeanStart.Africa" target="_blank" className="hover:text-white transition-colors">YouTube Channel</a></li>
                <li><a href="mailto:hello@leanstart.africa" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} LeanStart Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
