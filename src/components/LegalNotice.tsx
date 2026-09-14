import React from 'react';
import Seo from './Seo';
import { RouteSeo } from '../seo';

/**
 * Route: /legal-notice (alias /impressum).
 *
 * Reuse this same content verbatim in the footer of hali.africa,
 * blotmarked.app and ukooyangu.com - §5 DDG requires it per site.
 *
 * While the bracketed placeholders below are unfilled, `LEGAL_CONTENT_FINALISED`
 * in seo.ts keeps this page out of the index and out of sitemap.xml.
 */
const LegalNotice: React.FC<{ route: RouteSeo }> = ({ route }) => {
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Legal Notice</h1>
          <p className="text-slate-600 text-sm mb-12">
            Impressum, pursuant to §5 DDG (Digital Services Act, Germany)
          </p>

          <div className="flex flex-col gap-8 text-slate-700 leading-relaxed">
            <section aria-labelledby="ln-operator">
              <h2 id="ln-operator" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Legal Notice / Impressum
              </h2>
              <p>
                [Your full legal name]
                <br />
                trading as: Leanstart Africa
                <br />
                Address: [street address, postal code, city, Germany]
              </p>
            </section>
            <section aria-labelledby="ln-contact">
              <h2 id="ln-contact" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Contact
              </h2>
              <p>
                Email: [contact email]
                <br />
                Phone: [optional]
                <br />
                Website: https://www.leanstart.africa
              </p>
            </section>
            <section aria-labelledby="ln-registration">
              <h2 id="ln-registration" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Business registration
              </h2>
              <p>
                Gewerbe registered with: [name of your local Gewerbeamt / city]
                <br />
                Tax number (Steuernummer): [once issued]
                <br />
                VAT ID (USt-IdNr.): [if/once registered]
              </p>
            </section>
            <section aria-labelledby="ln-responsible">
              <h2 id="ln-responsible" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Responsible for content (§ 18 Abs. 2 MStV)
              </h2>
              <p>[Your full legal name], [address if different from above]</p>
            </section>
            <section aria-labelledby="ln-products">
              <h2 id="ln-products" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Products operated under Leanstart Africa
              </h2>
              <p>
                hali.africa, blotmarked.app, ukooyangu.com
                <br />
                All three are operated by the same sole proprietorship; this legal notice applies to each.
              </p>
            </section>
            <p className="p-5 bg-slate-50 rounded-xl text-sm text-slate-600">
              Placeholder text pending final details (legal name, address, registration numbers). This same
              block should be reused verbatim in the footer of hali.africa, blotmarked.app, and ukooyangu.com,
              since each needs its own copy under German law (§5 DDG). A separate Privacy Policy page is
              required wherever user data is processed.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default LegalNotice;
