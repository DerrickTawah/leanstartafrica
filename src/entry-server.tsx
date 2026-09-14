import React from 'react';
import { renderToString } from 'react-dom/server';
import { resolveRoute } from './routes';
import { RouteSeo, buildJsonLd, buildLinkTags, buildMetaTags, getRouteSeo } from './seo';

/**
 * Build-time entry point. `scripts/prerender.mjs` imports this to turn each
 * route into static HTML, so crawlers and link-preview scrapers - which do not
 * run JavaScript - receive a fully formed document with real <head> tags
 * instead of an empty <div id="root">.
 */

export { PRERENDER_PATHS, ROUTES, SITE_ORIGIN } from './seo';

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const escapeText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Prevents a `</script>` sequence inside the data from closing the tag early. */
const escapeJsonLd = (json: string) => json.replace(/</g, '\\u003c');

function renderHead(route: RouteSeo): string {
  const lines: string[] = [`    <title>${escapeText(route.title)}</title>`];

  for (const meta of buildMetaTags(route)) {
    const key = meta.name ? `name="${escapeAttr(meta.name)}"` : `property="${escapeAttr(meta.property!)}"`;
    // `data-seo` marks the tag as owned by seo.ts, so components/Seo.tsx can
    // replace it on the client without disturbing hand-written tags.
    lines.push(`    <meta ${key} content="${escapeAttr(meta.content)}" data-seo>`);
  }

  for (const link of buildLinkTags(route)) {
    const hreflang = link.hreflang ? ` hreflang="${escapeAttr(link.hreflang)}"` : '';
    lines.push(`    <link rel="${escapeAttr(link.rel)}" href="${escapeAttr(link.href)}"${hreflang} data-seo>`);
  }

  lines.push(
    `    <script type="application/ld+json" data-seo>${escapeJsonLd(JSON.stringify(buildJsonLd(route)))}</script>`
  );

  return lines.join('\n');
}

export function render(pathname: string): { html: string; head: string } {
  return {
    html: renderToString(resolveRoute(pathname)),
    head: renderHead(getRouteSeo(pathname)),
  };
}
