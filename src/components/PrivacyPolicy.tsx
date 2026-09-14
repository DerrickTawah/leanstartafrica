import React from 'react';
import Seo from './Seo';
import { RouteSeo } from '../seo';

/**
 * Route: /privacy-policy.
 *
 * Covers leanstart.africa only - hali.africa, blotmarked.app and ukooyangu.com
 * each collect different data and need their own separate policy.
 *
 * While the bracketed placeholders below are unfilled, `LEGAL_CONTENT_FINALISED`
 * in seo.ts keeps this page out of the index and out of sitemap.xml.
 */
const PrivacyPolicy: React.FC<{ route: RouteSeo }> = ({ route }) => {
  return (
    <>
      <Seo route={route} />
      <main id="main" className="pt-32 pb-24 px-4 bg-white min-h-[70vh]">
        <div className="max-w-2xl mx-auto">
          <a href="/" className="inline-flex items-center gap-1.5 text-orange-700 font-semibold mb-12 hover:text-orange-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </a>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-600 text-sm mb-12">
            For leanstart.africa, pursuant to GDPR (EU) 2016/679
          </p>

          <div className="flex flex-col gap-8 text-slate-700 leading-relaxed">
            <section aria-labelledby="pp-controller">
              <h2 id="pp-controller" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Data controller
              </h2>
              <p>
                [Your full legal name], trading as Leanstart Africa
                <br />
                [Street address, postal code, city], Germany
                <br />
                Email: [contact email]
              </p>
            </section>
            <section aria-labelledby="pp-collects">
              <h2 id="pp-collects" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                What this site collects
              </h2>
              <p>
                [Placeholder: e.g. server logs (IP, browser, timestamp) for security and diagnostics; no account
                creation or form submissions on this portfolio site itself.]
              </p>
            </section>
            <section aria-labelledby="pp-cookies">
              <h2 id="pp-cookies" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Cookies &amp; analytics
              </h2>
              <p>
                [Placeholder: list any analytics tool in use, e.g. none / self-hosted / Plausible / Google
                Analytics, and whether consent is requested.]
              </p>
            </section>
            <section aria-labelledby="pp-third-party">
              <h2 id="pp-third-party" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Third-party services
              </h2>
              <p>
                Social icons (YouTube, TikTok, Instagram, Facebook) may set their own cookies once clicked,
                governed by each platform's own privacy policy.
              </p>
            </section>
            <section aria-labelledby="pp-rights">
              <h2 id="pp-rights" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Your rights
              </h2>
              <p>
                Under GDPR you may request access, correction, deletion, or export of any personal data held
                about you. Contact [contact email] to exercise these rights.
              </p>
            </section>
            <p className="p-5 bg-slate-50 rounded-xl text-sm text-slate-600">
              Placeholder text pending final details. hali.africa, blotmarked.app, and ukooyangu.com each need
              their own, separate privacy policy reflecting the data they actually collect (accounts, uploads,
              family records).
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
