import { VENTURES } from './constants';
import { VentureStatus } from './types';

/**
 * Single source of truth for every SEO-relevant value on the site.
 *
 * Consumed in three places, so all of them stay in sync automatically:
 *  - `entry-server.tsx` renders real <head> tags and JSON-LD into the static
 *    HTML of every route at build time.
 *  - `scripts/prerender.mjs` generates `dist/sitemap.xml` from ROUTES.
 *  - `components/Seo.tsx` mirrors the same tags into the live DOM so the dev
 *    server and any client-side navigation match the prerendered output.
 */

/** Canonical origin. Matches `public/robots.txt`. No trailing slash. */
export const SITE_ORIGIN = 'https://leanstart.africa';

export const SITE = {
  name: 'LeanStart Africa',
  /** Used for the LeanStart.africa wordmark and as schema.org alternateName. */
  alternateName: 'LeanStart.africa',
  origin: SITE_ORIGIN,
  locale: 'en',
  /** Open Graph locale. */
  ogLocale: 'en_US',
  /** Matches the accent used by `.logo-gradient` in src/index.css. */
  themeColor: '#f97316',
  // Kept under ~155 characters so search results are not truncated.
  description:
    'LeanStart Africa builds Hali, Blotmarked, Ukoo Yangu and Seedfund Africa: digital products designed around African realities from day one.',
  /** Footer positioning line, reused as the Organization description. */
  tagline:
    'Building the future of African digital business through documentation, execution, and community.',
  socials: [
    { label: 'YouTube', url: 'https://www.youtube.com/@LeanStart.Africa' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@LeanStart.Africa' },
    { label: 'Instagram', url: 'https://www.instagram.com/LeanStart.Africa' },
    { label: 'Facebook', url: 'https://www.facebook.com/LeanStart.Africa' },
  ],
} as const;

/**
 * Flip to `true` once the placeholder brackets in `components/LegalNotice.tsx`
 * and `components/PrivacyPolicy.tsx` are replaced with the real legal name,
 * address, contact email and registration numbers.
 *
 * While it is `false` both pages stay live and footer-linked (§5 DDG requires
 * the link to be directly accessible) but are served `noindex, follow` and are
 * left out of `sitemap.xml`, so placeholder text is never indexed.
 */
export const LEGAL_CONTENT_FINALISED = false;

const LEGAL_ROBOTS = LEGAL_CONTENT_FINALISED ? 'index, follow' : 'noindex, follow';

export interface RouteSeo {
  /** Path as served, without a trailing slash. The home route is ''. */
  path: string;
  /** Full contents of <title>. */
  title: string;
  description: string;
  /** Absolute canonical URL. Aliases point at their primary URL. */
  canonical: string;
  /** Value of <meta name="robots">. */
  robots: string;
  /** Whether this URL belongs in sitemap.xml. */
  inSitemap: boolean;
  sitemapPriority?: string;
  sitemapChangefreq?: string;
  /** Open Graph object type. */
  ogType: 'website' | 'article';
  /** Trail rendered as BreadcrumbList structured data. Home has none. */
  breadcrumb?: { name: string; path: string }[];
}

const abs = (path: string) => `${SITE_ORIGIN}${path || '/'}`;

const LEGAL_NOTICE_DESCRIPTION =
  'Legal notice and operator details for LeanStart Africa, pursuant to §5 DDG, covering leanstart.africa, hali.africa, blotmarked.app and ukooyangu.com.';

export const ROUTES: Record<string, RouteSeo> = {
  '': {
    path: '',
    title: 'LeanStart Africa | African Venture Builder',
    description: SITE.description,
    canonical: abs('/'),
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    inSitemap: true,
    sitemapPriority: '1.0',
    sitemapChangefreq: 'weekly',
    ogType: 'website',
  },
  '/legal-notice': {
    path: '/legal-notice',
    title: 'Legal Notice (Impressum) | LeanStart Africa',
    description: LEGAL_NOTICE_DESCRIPTION,
    canonical: abs('/legal-notice'),
    robots: LEGAL_ROBOTS,
    inSitemap: LEGAL_CONTENT_FINALISED,
    sitemapPriority: '0.3',
    sitemapChangefreq: 'yearly',
    ogType: 'article',
    breadcrumb: [{ name: 'Legal Notice', path: '/legal-notice' }],
  },
  '/impressum': {
    path: '/impressum',
    title: 'Legal Notice (Impressum) | LeanStart Africa',
    description: LEGAL_NOTICE_DESCRIPTION,
    // German-language alias for the same document. The canonical points at the
    // primary URL so the two never compete as duplicate content.
    canonical: abs('/legal-notice'),
    robots: LEGAL_ROBOTS,
    inSitemap: false,
    ogType: 'article',
    breadcrumb: [{ name: 'Legal Notice', path: '/legal-notice' }],
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | LeanStart Africa',
    description:
      'How leanstart.africa handles personal data, cookies and third-party services, and how to exercise your rights under the GDPR.',
    canonical: abs('/privacy-policy'),
    robots: LEGAL_ROBOTS,
    inSitemap: LEGAL_CONTENT_FINALISED,
    sitemapPriority: '0.3',
    sitemapChangefreq: 'yearly',
    ogType: 'article',
    breadcrumb: [{ name: 'Privacy Policy', path: '/privacy-policy' }],
  },
};

export const NOT_FOUND_SEO: RouteSeo = {
  path: '/404',
  title: 'Page not found | LeanStart Africa',
  description: 'This page does not exist. Browse the LeanStart Africa venture portfolio instead.',
  canonical: abs('/404'),
  robots: 'noindex, follow',
  inSitemap: false,
  ogType: 'website',
};

/** Every path the build emits static HTML for. */
export const PRERENDER_PATHS: string[] = [...Object.keys(ROUTES), '/404'];

/** Normalises a pathname to a ROUTES key. Returns '' for the home page. */
export function normalisePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '').toLowerCase();
  return trimmed === '/index.html' ? '' : trimmed;
}

export function getRouteSeo(pathname: string): RouteSeo {
  return ROUTES[normalisePath(pathname)] ?? NOT_FOUND_SEO;
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const LOGO_ID = `${SITE_ORIGIN}/#logo`;

/** Absolute URL of the social / link-preview card image. */
export const OG_IMAGE = {
  url: `${SITE_ORIGIN}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'LeanStart Africa, an African venture builder. Ventures: Hali, Blotmarked, Ukoo Yangu, Seedfund Africa.',
};

/**
 * A venture only gets a `url` in structured data when the interface actually
 * links out to it, so we never advertise a destination the UI calls unbuilt.
 */
function ventureLinksOut(status: VentureStatus, url: string) {
  return status !== VentureStatus.IDEA && url !== '#';
}

export function buildJsonLd(route: RouteSeo): object {
  const graph: object[] = [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE.name,
      alternateName: SITE.alternateName,
      url: `${SITE_ORIGIN}/`,
      description: SITE.tagline,
      logo: {
        '@type': 'ImageObject',
        '@id': LOGO_ID,
        url: `${SITE_ORIGIN}/icon-512.png`,
        contentUrl: `${SITE_ORIGIN}/icon-512.png`,
        width: 512,
        height: 512,
        caption: SITE.name,
      },
      image: { '@id': LOGO_ID },
      sameAs: SITE.socials.map((s) => s.url),
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: SITE.name,
      description: SITE.description,
      publisher: { '@id': ORGANIZATION_ID },
      inLanguage: SITE.locale,
    },
    {
      '@type': 'WebPage',
      '@id': `${route.canonical}#webpage`,
      url: route.canonical,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      inLanguage: SITE.locale,
      primaryImageOfPage: { '@id': LOGO_ID },
    },
  ];

  if (route.breadcrumb?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${route.canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        ...route.breadcrumb.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: crumb.name,
          item: abs(crumb.path),
        })),
      ],
    });
  }

  // The venture portfolio is the substance of the home page, so expose it as a
  // machine-readable list rather than leaving it as unlabelled card markup.
  if (route.path === '') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_ORIGIN}/#venture-portfolio`,
      name: 'LeanStart Africa venture portfolio',
      numberOfItems: VENTURES.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: VENTURES.map((venture, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Organization',
          name: venture.name,
          description: venture.description,
          parentOrganization: { '@id': ORGANIZATION_ID },
          ...(ventureLinksOut(venture.status, venture.url) ? { url: venture.url } : {}),
        },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/* ------------------------------------------------------------------ */
/* Head tag model - serialised to HTML at build, applied to DOM at run  */
/* ------------------------------------------------------------------ */

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export function buildMetaTags(route: RouteSeo): MetaTag[] {
  return [
    { name: 'description', content: route.description },
    { name: 'robots', content: route.robots },
    { name: 'googlebot', content: route.robots },
    { name: 'theme-color', content: SITE.themeColor },
    { name: 'application-name', content: SITE.name },
    { name: 'apple-mobile-web-app-title', content: SITE.name },
    { name: 'format-detection', content: 'telephone=no' },

    { property: 'og:site_name', content: SITE.name },
    { property: 'og:type', content: route.ogType },
    { property: 'og:locale', content: SITE.ogLocale },
    { property: 'og:title', content: route.title },
    { property: 'og:description', content: route.description },
    { property: 'og:url', content: route.canonical },
    { property: 'og:image', content: OG_IMAGE.url },
    { property: 'og:image:secure_url', content: OG_IMAGE.url },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: String(OG_IMAGE.width) },
    { property: 'og:image:height', content: String(OG_IMAGE.height) },
    { property: 'og:image:alt', content: OG_IMAGE.alt },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: route.title },
    { name: 'twitter:description', content: route.description },
    { name: 'twitter:image', content: OG_IMAGE.url },
    { name: 'twitter:image:alt', content: OG_IMAGE.alt },
  ];
}

export interface LinkTag {
  rel: string;
  href: string;
  hreflang?: string;
}

export function buildLinkTags(route: RouteSeo): LinkTag[] {
  return [
    { rel: 'canonical', href: route.canonical },
    // Single-language site: both hreflang entries point at the same URL, which
    // is what Google expects rather than an omitted x-default.
    { rel: 'alternate', href: route.canonical, hreflang: 'x-default' },
    { rel: 'alternate', href: route.canonical, hreflang: SITE.locale },
  ];
}
