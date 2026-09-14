# Redesign record

What the September 2026 redesign specified, how it was applied, and where the shipped code
deliberately differs from the hand-off.

The hand-off arrived as a `Leanstart Africa redesign/code-diff/` folder of replacement `.tsx`
files. That folder is gitignored and stays local: the applied code in `src/` is the single source
of truth, so there is no second copy to go stale. This document is the durable record.

## Source of the hand-off

| Hand-off file                   | Applied to                          |
| ------------------------------- | ----------------------------------- |
| `types.ts`                      | `src/types.ts`                      |
| `constants.tsx`                 | `src/constants.ts`                  |
| `components/VentureCard.tsx`    | `src/components/VentureCard.tsx`    |
| `components/Header.tsx`         | `src/components/Header.tsx`         |
| `components/LegalNotice.tsx`    | `src/components/LegalNotice.tsx`    |
| `components/PrivacyPolicy.tsx`  | `src/components/PrivacyPolicy.tsx`  |
| `App.tsx`                       | `src/App.tsx`                       |
| `index.tsx`                     | `src/main.tsx`                      |
| `public/sitemap.xml`            | now generated at build from `src/seo.ts` |

## What the redesign changed

**Portfolio.** The three old ventures (hali.Africa, Seedfund Africa, NjangiList) became four:
Hali, Blotmarked, Ukoo Yangu and Seedfund Africa. A fourth status, `IDEA`, was added for ventures
that exist as an intention only. Seedfund Africa carries its real URL on record but renders as
"Coming Soon" and is never linked out to.

**Hero.** The "Watch on YouTube" secondary call to action was removed, leaving "Explore Ventures"
as the single hero action. The supporting line lost its "Join our community and watch our journey
on YouTube" clause.

**Header.** The "Follow on Youtube" nav link was removed. Social links now live in the footer
only.

**Approach section.** Rewritten from three generic values (Lean and Agile, Built for Africa,
Documented Journey) to three claims tied to actual products: sellers first (Hali), privacy that
does not cost you data (Blotmarked), family kept private (Ukoo Yangu), under a new section
heading, "Built with Africa in mind, not bolted on after."

**Footer.** One YouTube icon became four social icons (YouTube, TikTok, Instagram, Facebook). A
new Legal column links the Legal Notice and Privacy Policy, which also repeat in the bottom bar.

**New pages.** `/legal-notice` (with `/impressum` as an alias) and `/privacy-policy`, both
placeholder text pending real details, plus minimal path-based routing with no router dependency.

## Where the shipped code differs, and why

These were judgment calls made while applying the hand-off. Each is a deliberate departure.

- **Grid columns.** The hand-off kept `md:grid-cols-3` from the three-venture layout, which would
  strand the fourth card alone on its own row. Now `sm:grid-cols-2 xl:grid-cols-4`.
- **Footer columns on mobile.** The hand-off inherited `hidden md:block` on the Ventures and Legal
  columns, hiding both below 768px. They are now visible at every width. §5 DDG requires the legal
  notice to be directly accessible, and hiding the venture links costs findability.
- **Footer venture links.** The hand-off linked every venture, including Seedfund Africa, whose own
  card says "Coming Soon". The footer now renders unlaunched ventures as plain text with a
  "(coming soon)" note, matching the card.
- **Coming Soon control.** The hand-off rendered it as an `<a>` with no `href` and a click handler
  calling `preventDefault`. It is now a `<p>`: there is nothing to navigate to, so nothing should
  be focusable or announced as a control.
- **Missing image assets.** The hand-off pointed at four image files that do not exist yet. The
  card now falls back to a branded panel carrying the venture's own brand colour and icon when a
  file is absent or fails to load. The paths are unchanged, so dropping the real files in takes
  effect with no code change.
- **Contrast.** The legal pages used `text-slate-400` on white for body text, about 2.6:1 against a
  4.5:1 WCAG AA requirement. Section labels and body copy moved to `slate-500` and `slate-600`. The
  Live status badge moved from `orange-500` to `orange-700` for the same reason.
- **Status badge colours.** The hand-off had one style for "live" and one for everything else. Each
  of the four statuses now has its own AA-checked pairing.
- **Sitemap.** The hand-off's `public/sitemap.xml` listed `https://leanstart.africa/#ventures` as a
  separate URL. Fragment URLs are not distinct pages and do not belong in a sitemap. The sitemap is
  now generated at build from the route table instead of being maintained by hand.
- **Host rewrite rule.** The hand-off noted that the host needed to serve `/legal-notice` and
  `/privacy-policy` as the SPA's `index.html`. Prerendering makes each route a real file, so no
  rewrite rule is needed.
- **Icons.** The venture cards originally used emoji (a shopping bag, a padlock, a tree, a
  seedling). These are now line-drawn SVG marks in the same stroke style as the approach section.
- **Punctuation.** Em dashes throughout the copy were rewritten into commas, colons, parentheses or
  full stops, and typographic apostrophes replaced with straight ones. The only non-ASCII character
  left in the rendered pages is `§`, which is correct legal notation.

## Still outstanding

Carried over from the hand-off and still true. See also the Outstanding section of the README.

- The same Legal Notice content must be added to hali.africa, blotmarked.app and ukooyangu.com
  individually, since §5 DDG requires it per site. Each also needs its own privacy policy, because
  each collects different data.
- Four image assets are still missing: `/images/hali-logo.svg`, `/images/blotmarked-logo.png`,
  `/images/ukooyangu-family.jpg`, `/images/seedfund-finance.jpg`.
- The legal pages are placeholder text. `LEGAL_CONTENT_FINALISED` in `src/seo.ts` keeps them
  `noindex` and out of the sitemap until that changes.
