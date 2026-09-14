// Build step 3 of 3 (see the "build" script in package.json).
//
// Takes the client build's index.html as a template and, for every route in
// seo.ts, writes a real static HTML file with that route's markup, <head> tags
// and JSON-LD baked in. Also emits sitemap.xml from the same route table so the
// sitemap can never drift from what is actually indexable.
//
// Uses only react-dom/server and Vite, both already project dependencies.

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const ssrDir = join(root, '.prerender');

const serverEntry = pathToFileURL(join(ssrDir, 'entry-server.js')).href;
const { render, PRERENDER_PATHS, ROUTES, SITE_ORIGIN } = await import(serverEntry);

const template = await readFile(join(distDir, 'index.html'), 'utf8');

const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;
const APP_SLOT = '<!--app-html-->';

if (!SEO_BLOCK.test(template)) {
  throw new Error('index.html is missing the <!--seo-start--> / <!--seo-end--> markers.');
}
if (!template.includes(APP_SLOT)) {
  throw new Error(`index.html is missing the ${APP_SLOT} slot inside #root.`);
}

/** Where a route's HTML lands on disk. */
function outputPath(routePath) {
  if (routePath === '') return join(distDir, 'index.html');
  // Static hosts (Vercel, Netlify, Cloudflare Pages) serve /404.html for
  // unmatched paths, so it is a file rather than a directory index.
  if (routePath === '/404') return join(distDir, '404.html');
  return join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

const written = [];

for (const routePath of PRERENDER_PATHS) {
  const { html, head } = render(routePath || '/');
  const page = template.replace(SEO_BLOCK, head).replace(APP_SLOT, html);

  const file = outputPath(routePath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page, 'utf8');
  written.push(`${routePath || '/'} -> ${file.slice(distDir.length + 1)}`);
}

/* ---------------------------------------------------------------- */
/* sitemap.xml                                                       */
/* ---------------------------------------------------------------- */

const lastmod = new Date().toISOString().slice(0, 10);

const entries = Object.values(ROUTES)
  .filter((route) => route.inSitemap)
  .map((route) =>
    [
      '  <url>',
      `    <loc>${route.canonical}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      route.sitemapChangefreq ? `    <changefreq>${route.sitemapChangefreq}</changefreq>` : null,
      route.sitemapPriority ? `    <priority>${route.sitemapPriority}</priority>` : null,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n')
  );

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

// The SSR bundle is a build artefact only; nothing should ship it.
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerendered ${written.length} route(s) for ${SITE_ORIGIN}:`);
for (const line of written) console.log(`  ${line}`);
console.log(`  sitemap.xml (${entries.length} indexable URL(s))`);
