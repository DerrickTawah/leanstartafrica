import React from 'react';
import Header from './components/Header';
import VentureCard from './components/VentureCard';
import Seo from './components/Seo';
import { VENTURES } from './constants';
import { VentureStatus } from './types';
import { ROUTES, SITE } from './seo';

/**
 * Home page.
 *
 * Redesign changes applied from `Leanstart Africa redesign/code-diff`:
 *  - the "Watch on YouTube" hero CTA is gone
 *  - the philosophy section is rewritten around Hali, Blotmarked and Ukoo Yangu
 *  - the footer carries four social icons and a Legal column
 */

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  YouTube: (
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  ),
  TikTok: (
    <path d="M16.5 3c.3 2.1 1.7 3.6 3.9 3.8v3.1c-1.3.1-2.6-.3-3.9-1.1v6.4c0 3.2-2.6 5.8-5.8 5.8S5 18.4 5 15.2s2.6-5.8 5.8-5.8c.4 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.8-1.1 2.8-2.6V3h2.9z" />
  ),
  Facebook: (
    <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.5V4.3c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 3.9V10.5H8v3h2.5V21h3z" />
  ),
};

/** Matches the card CTA: an idea-stage venture is never linked out to. */
const linksOut = (status: VentureStatus, url: string) => status !== VentureStatus.IDEA && url !== '#';

const App: React.FC = () => {
  return (
    <>
      <Seo route={ROUTES['']} />

      {/* First focusable element on the page, so keyboard and screen-reader
          users can jump past the fixed header straight to the content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-5 focus:py-3 focus:bg-slate-900 focus:text-white focus:rounded-xl focus:font-semibold"
      >
        Skip to main content
      </a>

      <div className="min-h-screen">
        <Header />

        <main id="main">
          {/* Hero */}
          <section aria-labelledby="hero-title" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden bg-white">
            <div aria-hidden="true" className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-40"></div>
            <div aria-hidden="true" className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl opacity-40"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
              <p className="inline-block px-4 py-1.5 mb-6 bg-orange-50 text-orange-800 rounded-full text-sm font-bold tracking-wide uppercase">
                The African Venture Builder
              </p>
              <h1 id="hero-title" className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                Engineering the Next <br />
                <span className="gradient-text">African Success Story.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                LeanStart Africa builds high-impact solutions for the continent's digital future.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#ventures"
                  className="w-full sm:w-auto px-10 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200 active:scale-95"
                >
                  Explore Ventures
                </a>
              </div>
            </div>
          </section>

          {/* Approach */}
          <section aria-labelledby="approach-title" className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-xl mx-auto text-center mb-14">
                <h2 id="approach-title" className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  Built with Africa in mind, not bolted on after.
                </h2>
                <p className="text-slate-600 text-lg">
                  Most platforms are designed elsewhere and adapted for Africa as an afterthought. Ours start
                  from African realities (sellers, bandwidth, and family) and are built around them from
                  day one.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center md:text-left">
                  <div aria-hidden="true" className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 mb-6 mx-auto md:mx-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v4H3V3zm2 6h14v12H5V9zm3 3h8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Sellers first, not platforms first</h3>
                  <p className="text-slate-600">
                    Hali is built starting with sellers in Cameroon, not a generic global storefront retrofitted
                    for the continent later.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <div aria-hidden="true" className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-900 mb-6 mx-auto md:mx-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a4 4 0 100-8 4 4 0 000 8zm-7 6a7 7 0 0114 0" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Privacy that doesn't cost you data</h3>
                  <p className="text-slate-600">
                    Blotmarked redacts documents entirely on-device. Nothing is uploaded, so privacy costs no
                    data where bandwidth is expensive.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <div aria-hidden="true" className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 mb-6 mx-auto md:mx-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 10l6-1 3-6z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Family, kept private</h3>
                  <p className="text-slate-600">
                    Ukoo Yangu is self-hosted and invite-only, built for the trust and privacy African family
                    histories actually need.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ventures */}
          <section id="ventures" aria-labelledby="ventures-title" className="py-32 px-4 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <div className="mb-20 text-center">
                <h2 id="ventures-title" className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  Our Active Portfolio
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  From marketplaces to privacy tools and family record keeping, built and documented in the
                  open.
                </p>
              </div>
              {/* Four ventures, so the 3-column grid the redesign inherited would
                  strand one card on its own row. 2-up, then 4-up on xl. */}
              <ul className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 list-none p-0 m-0">
                {VENTURES.map((venture) => (
                  <li key={venture.id} className="grid">
                    <VentureCard venture={venture} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <footer className="bg-slate-900 text-slate-300 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <a href="/" className="inline-flex items-center justify-center md:justify-start space-x-2 mb-6" aria-label="LeanStart Africa - home">
                  <span aria-hidden="true" className="w-8 h-8 logo-gradient rounded flex items-center justify-center text-white font-bold">
                    L
                  </span>
                  <span className="text-xl font-bold text-white">
                    LeanStart<span className="text-orange-400">.africa</span>
                  </span>
                </a>
                <p className="leading-relaxed max-w-sm mb-8 mx-auto md:mx-0">{SITE.tagline}</p>
                <ul className="flex justify-center md:justify-start gap-3 list-none p-0 m-0">
                  {SITE.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={`${SITE.name} on ${social.label} (opens in a new tab)`}
                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300"
                      >
                        {social.label === 'Instagram' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                          </svg>
                        ) : (
                          <svg
                            className={social.label === 'YouTube' ? 'w-5 h-5' : 'w-4 h-4'}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                          >
                            {SOCIAL_ICONS[social.label]}
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <nav aria-labelledby="footer-ventures-heading">
                <h2 id="footer-ventures-heading" className="text-white font-bold mb-6">
                  Ventures
                </h2>
                <ul className="space-y-4 text-sm list-none p-0 m-0">
                  {VENTURES.map((v) => (
                    <li key={v.id}>
                      {linksOut(v.status, v.url) ? (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          {v.name}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">{v.name} (coming soon)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-labelledby="footer-legal-heading">
                <h2 id="footer-legal-heading" className="text-white font-bold mb-6">
                  Legal
                </h2>
                <ul className="space-y-4 text-sm list-none p-0 m-0">
                  <li>
                    <a href="/legal-notice" className="hover:text-white transition-colors">
                      Legal Notice
                    </a>
                  </li>
                  <li>
                    <a href="/privacy-policy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
              <p suppressHydrationWarning>
                Copyright {new Date().getFullYear()} {SITE.name}. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="/legal-notice" className="hover:text-white transition-colors">
                  Legal Notice
                </a>
                <a href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
