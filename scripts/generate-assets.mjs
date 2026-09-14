// Generates every raster brand asset the <head> and the manifest reference,
// from the SVG sources defined below. Run with `npm run gen:assets`.
//
// Deliberately not part of `npm run build`: the outputs are committed to
// public/ so a normal build stays fast and needs no rasterizer. Re-run it only
// when the mark or the card copy changes.

import { Resvg } from '@resvg/resvg-js';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

// Same values as `.logo-gradient` in src/index.css and SITE.themeColor in seo.ts.
const ORANGE_LIGHT = '#fb923c';
const ORANGE = '#f97316';
const SLATE_900 = '#0f172a';

const FONT_STACK = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

/** The "L" mark: rounded square, brand gradient, white letterform. */
const markSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ORANGE_LIGHT}"/>
      <stop offset="100%" stop-color="${ORANGE}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <path d="M170 116h62v244h134v62H170z" fill="#ffffff"/>
</svg>`;

/** 1200x630 link-preview card. */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ORANGE_LIGHT}"/>
      <stop offset="100%" stop-color="${ORANGE}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.75">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${SLATE_900}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(80, 74)">
    <rect width="72" height="72" rx="16" fill="url(#mark)"/>
    <path d="M24 16h9v34h19v9H24z" fill="#ffffff" transform="translate(0,0) scale(1.0)"/>
    <text x="94" y="50" font-family="${FONT_STACK}" font-size="34" font-weight="700" fill="#ffffff">LeanStart<tspan fill="${ORANGE_LIGHT}">.africa</tspan></text>
  </g>

  <text x="80" y="300" font-family="${FONT_STACK}" font-size="68" font-weight="700" fill="#ffffff">Engineering the Next</text>
  <text x="80" y="382" font-family="${FONT_STACK}" font-size="68" font-weight="700" fill="${ORANGE_LIGHT}">African Success Story.</text>

  <text x="80" y="452" font-family="${FONT_STACK}" font-size="27" fill="#cbd5e1">Digital products built around African realities from day one.</text>

  <g font-family="${FONT_STACK}" font-size="22" font-weight="600" fill="#e2e8f0">
    <rect x="80" y="512" width="150" height="52" rx="26" fill="#1e293b"/>
    <text x="155" y="545" text-anchor="middle">Hali</text>
    <rect x="246" y="512" width="214" height="52" rx="26" fill="#1e293b"/>
    <text x="353" y="545" text-anchor="middle">Blotmarked</text>
    <rect x="476" y="512" width="214" height="52" rx="26" fill="#1e293b"/>
    <text x="583" y="545" text-anchor="middle">Ukoo Yangu</text>
    <rect x="706" y="512" width="252" height="52" rx="26" fill="#1e293b"/>
    <text x="832" y="545" text-anchor="middle">Seedfund Africa</text>
  </g>
</svg>`;

function rasterise(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' },
  });
  return resvg.render().asPng();
}

/**
 * Wraps a 32x32 PNG in an ICO container. Every browser that still asks for
 * /favicon.ico accepts a PNG payload inside the ICO wrapper.
 */
function pngToIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // width
  entry.writeUInt8(32, 1); // height
  entry.writeUInt8(0, 2); // palette size (0 = truecolour)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, png]);
}

const manifest = {
  name: 'LeanStart Africa',
  short_name: 'LeanStart',
  description:
    'LeanStart Africa is an African venture builder behind Hali, Blotmarked, Ukoo Yangu and Seedfund Africa.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#f8fafc',
  theme_color: ORANGE,
  lang: 'en',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};

await mkdir(publicDir, { recursive: true });

const favicon32 = rasterise(markSvg(32), 32);

const outputs = [
  ['favicon.svg', Buffer.from(markSvg(512), 'utf8')],
  ['favicon.ico', pngToIco(favicon32)],
  ['apple-touch-icon.png', rasterise(markSvg(180), 180)],
  ['icon-192.png', rasterise(markSvg(192), 192)],
  ['icon-512.png', rasterise(markSvg(512), 512)],
  ['og-image.png', rasterise(ogSvg, 1200)],
  ['site.webmanifest', Buffer.from(JSON.stringify(manifest, null, 2) + '\n', 'utf8')],
];

for (const [name, data] of outputs) {
  await writeFile(join(publicDir, name), data);
  console.log(`  public/${name} (${data.length.toLocaleString()} bytes)`);
}
