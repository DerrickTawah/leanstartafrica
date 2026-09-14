<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LeanStart Africa

The portfolio site for LeanStart Africa and its ventures: Hali, Blotmarked, Ukoo Yangu and
Seedfund Africa. React 19 + Vite, Tailwind CSS v4, prerendered to static HTML at build time.

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
```

`build` runs three stages in order, and all three must run. `vite build` on its own produces an
empty `<div id="root">` with no per-page `<head>`:

| Stage          | Script                       | What it does                                                                     |
| -------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| `build:client` | `vite build`                 | Bundles the browser app and compiles `src/index.css` into one purged stylesheet.  |
| `build:server` | `vite build --ssr`           | Bundles `src/entry-server.tsx` into `.prerender/` (a throwaway build artefact).   |
| `prerender`    | `node scripts/prerender.mjs` | Renders every route to static HTML and generates `dist/sitemap.xml`.             |

Output:

```
dist/index.html                 /
dist/legal-notice/index.html    /legal-notice
dist/impressum/index.html       /impressum   (alias, canonical -> /legal-notice)
dist/privacy-policy/index.html  /privacy-policy
dist/404.html                   served for unmatched paths
dist/sitemap.xml                generated from the route table
```

Because each route is a real HTML file, no SPA rewrite rule is needed, so clean URLs work on any
static host. `npm run typecheck` runs TypeScript with no emit.

## Where things live

```
index.html                  Shell. Holds the seo markers the prerenderer fills in per route.
src/
  main.tsx                  Browser entry. Hydrates the prerendered markup.
  entry-server.tsx          Build-time renderer: serialises the head and the app to HTML.
  routes.tsx                Path -> component. Shared by the browser and the prerenderer,
                            so both render identical markup.
  seo.ts                    Single source of truth for titles, descriptions, canonicals,
                            robots directives, Open Graph/Twitter tags, JSON-LD and the sitemap.
  constants.ts              The venture list. Editing it updates the cards, the footer and
                            the ItemList structured data.
  types.ts                  Venture shape, status enum and the venture icon keys.
  index.css                 Tailwind entry plus .glass / .gradient-text / .logo-gradient.
  App.tsx                   Home page.
  components/               Header, VentureCard, Seo, LegalNotice, PrivacyPolicy, NotFound.
public/                     Static assets served from the site root, and robots.txt.
scripts/
  prerender.mjs             Writes the static route files and sitemap.xml.
  generate-assets.mjs       Regenerates favicons, app icons, the manifest and og-image.png.
docs/
  redesign.md               What the redesign specified and how it was applied.
  content-audit.md          Every piece of user-facing copy, for review.
```

### Changing anything SEO-related

Edit `src/seo.ts`. Titles, meta descriptions, canonical URLs, robots directives, hreflang, Open Graph
and Twitter tags, JSON-LD and `sitemap.xml` are all derived from the `ROUTES` table there, and are
applied in two places from that one definition: baked into the static HTML at build time, and
mirrored into the live DOM by `src/components/Seo.tsx` so `vite dev` matches production.

Adding a page means adding a `ROUTES` entry and a `case` in `src/routes.tsx`. The sitemap, canonical
tag, breadcrumbs and prerendered file all follow automatically.

### Brand assets

`npm run gen:assets` regenerates `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`,
`icon-192.png`, `icon-512.png`, `og-image.png` and `site.webmanifest` from the SVG sources in
`scripts/generate-assets.mjs`. The outputs are committed, so a normal build never needs the
rasterizer. Re-run it only when the mark or the social-card copy changes.

## Deploy to Vercel

1. Push to a Git repository (GitHub, GitLab, or Bitbucket).
2. Import the project at https://vercel.com/new.
3. Deploy. `vercel.json` already sets the build command, `cleanUrls`, `trailingSlash: false`,
   immutable caching for hashed assets and baseline security headers.

## Outstanding

These are known gaps, deliberately left rather than filled with invented content:

- **Venture artwork.** `src/components/VentureCard.tsx` points at `/images/hali-logo.svg` and
  `/images/blotmarked-logo.png`, and `src/constants.ts` at `/images/ukooyangu-family.jpg` and
  `/images/seedfund-finance.jpg`. None are in the repo yet, so cards fall back to a branded panel.
  Drop the real files at those paths and they take over, with no code change.
- **Legal placeholders.** `src/components/LegalNotice.tsx` and `src/components/PrivacyPolicy.tsx` still
  contain bracketed placeholders (legal name, address, contact email, registration numbers). Until
  they are filled in, `LEGAL_CONTENT_FINALISED` in `src/seo.ts` is `false`, which serves both pages
  `noindex, follow` and keeps them out of `sitemap.xml`. Flip that flag once the content is real.
- **Per-site legal notices.** §5 DDG requires the legal notice on each site individually, so the
  same content still needs adding to hali.africa, blotmarked.app and ukooyangu.com. Each of those
  also needs its own privacy policy, since they collect different data from this one.
