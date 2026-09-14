import React from 'react';
import Seo from './Seo';
import { RouteSeo } from '../seo';

/**
 * Rendered for any path the route table does not know. Without it, a host that
 * serves index.html for every path would answer unknown URLs with a copy of the
 * home page, which search engines treat as a soft 404 and duplicate content.
 * This page is `noindex, follow` (see NOT_FOUND_SEO in seo.ts).
 */
const NotFound: React.FC<{ route: RouteSeo }> = ({ route }) => {
  return (
    <>
      <Seo route={route} />
      <main id="main" className="min-h-screen flex items-center justify-center px-4 py-24 bg-white">
        <div className="max-w-md text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-orange-700 mb-4">Error 404</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            This page doesn't exist.
          </h1>
          <p className="text-slate-600 leading-relaxed mb-10">
            The link may be out of date or mistyped. The venture portfolio is the best place to pick up again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all"
            >
              Back to home
            </a>
            <a
              href="/#ventures"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              Explore ventures
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
