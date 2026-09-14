import React from 'react';
import App from './App';
import LegalNotice from './components/LegalNotice';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotFound from './components/NotFound';
import { NOT_FOUND_SEO, getRouteSeo, normalisePath } from './seo';

/**
 * Path-based routing for a handful of static pages - no router dependency
 * needed. Shared by the browser entry (`index.tsx`) and the build-time
 * prerenderer (`entry-server.tsx`) so both produce identical markup.
 */
export function resolveRoute(pathname: string): React.ReactElement {
  const route = getRouteSeo(pathname);

  switch (normalisePath(pathname)) {
    case '':
      return <App />;
    case '/legal-notice':
    case '/impressum':
      return <LegalNotice route={route} />;
    case '/privacy-policy':
      return <PrivacyPolicy route={route} />;
    default:
      return <NotFound route={NOT_FOUND_SEO} />;
  }
}
