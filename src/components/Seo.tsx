import React, { useEffect } from 'react';
import { RouteSeo, buildJsonLd, buildLinkTags, buildMetaTags } from '../seo';

/**
 * Every tag this component owns carries `data-seo`, so it can replace its own
 * previous output without ever touching a hand-written tag. `entry-server.tsx`
 * stamps the same attribute on the tags it prerenders, which means the runtime
 * pass cleanly supersedes the build-time pass instead of duplicating it.
 */
const OWNED = 'data-seo';

function applyHead(route: RouteSeo): void {
  const { head } = document;

  document.title = route.title;

  head.querySelectorAll(`[${OWNED}]`).forEach((el) => el.remove());

  const append = (tag: string, attrs: Record<string, string>) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    el.setAttribute(OWNED, '');
    head.appendChild(el);
  };

  for (const meta of buildMetaTags(route)) {
    append('meta', {
      ...(meta.name ? { name: meta.name } : {}),
      ...(meta.property ? { property: meta.property } : {}),
      content: meta.content,
    });
  }

  for (const link of buildLinkTags(route)) {
    append('link', {
      rel: link.rel,
      href: link.href,
      ...(link.hreflang ? { hreflang: link.hreflang } : {}),
    });
  }

  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify(buildJsonLd(route));
  jsonLd.setAttribute(OWNED, '');
  head.appendChild(jsonLd);
}

/**
 * Renders nothing. On a prerendered page it re-applies the identical head the
 * build already produced; its real job is keeping `vite dev` and any future
 * client-side navigation in step with `seo.ts`.
 */
const Seo: React.FC<{ route: RouteSeo }> = ({ route }) => {
  useEffect(() => {
    applyHead(route);
  }, [route]);

  return null;
};

export default Seo;
