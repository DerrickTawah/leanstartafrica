import React, { useEffect, useRef, useState } from 'react';
import { Venture, VentureIcon, VentureStatus } from '../types';

interface VentureCardProps {
  venture: Venture;
}

/**
 * Ventures with a real logo lockup render it on a brand-coloured banner instead
 * of a photo. Add an entry here as each asset lands; everything else falls back
 * to `imageUrl`, and anything missing falls back again to the branded panel
 * below, so a card never renders as a broken image.
 */
const LOGO_BANNERS: Record<string, { logo: string; bannerBg: string; logoMaxWidth?: string }> = {
  hali: { logo: '/images/hali-logo.svg', bannerBg: '#1F3D2B', logoMaxWidth: '70%' },
  blotmarked: { logo: '/images/blotmarked-logo.png', bannerBg: '#08080a', logoMaxWidth: '60%' },
};

/**
 * Line marks drawn in the same 24px stroke style as the icons in the approach
 * section, so the cards stay consistent with the rest of the page.
 */
const VENTURE_ICONS: Record<VentureIcon, React.ReactNode> = {
  // Storefront: a marketplace of sellers.
  marketplace: (
    <>
      <path d="M4 9.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5" />
      <path d="M2.5 9.5 4.3 4.1A1.5 1.5 0 0 1 5.7 3h12.6a1.5 1.5 0 0 1 1.4 1.1l1.8 5.4" />
      <path d="M9.5 21v-5.5h5V21" />
    </>
  ),
  // A document with one block of text blacked out.
  redaction: (
    <>
      <path d="M6 3h7.5L18 7.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M8 12.5h7" strokeWidth="3" />
      <path d="M8 17h4.5" />
    </>
  ),
  // Three connected nodes: one generation above two.
  'family-tree': (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M12 7.5V13" />
      <path d="M6 16.5V13h12v3.5" />
    </>
  ),
  // A seedling: early-stage capital.
  funding: (
    <>
      <path d="M12 21v-7.5" />
      <path d="M12 13.5c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6z" />
      <path d="M12 13.5c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7z" />
    </>
  ),
};

/** Badge styling per status, each pairing checked against WCAG AA (4.5:1). */
const STATUS_STYLES: Record<VentureStatus, string> = {
  [VentureStatus.LIVE]: 'bg-orange-700 text-white',
  [VentureStatus.PRE_LAUNCH]: 'bg-amber-100 text-amber-900',
  [VentureStatus.DEVELOPMENT]: 'bg-slate-200 text-slate-800',
  [VentureStatus.IDEA]: 'bg-slate-100 text-slate-700',
};

const VentureIconMark: React.FC<{ icon: VentureIcon; className: string }> = ({ icon, className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {VENTURE_ICONS[icon]}
  </svg>
);

const VentureCard: React.FC<VentureCardProps> = ({ venture }) => {
  const isLive = venture.status === VentureStatus.LIVE;
  const isComingSoon = venture.status === VentureStatus.IDEA || venture.url === '#';
  const isRedirecting = !isComingSoon && !isLive;
  const ctaEnabled = isLive || isRedirecting;
  const banner = LOGO_BANNERS[venture.id];

  const headingId = `venture-${venture.id}-title`;
  const src = banner ? banner.logo : venture.imageUrl;

  // The banner assets are not in the repo yet. Rather than ship broken images,
  // swap in a branded panel whenever the file is absent or fails to load; drop
  // the real file at the same path later and it takes over with no code change.
  const [imageFailed, setImageFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Covers the case where the request already failed before React hydrated,
    // which `onError` alone would miss on a prerendered page.
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImageFailed(true);
  }, []);

  const showImage = Boolean(src) && !imageFailed;

  return (
    <article
      aria-labelledby={headingId}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-slate-100 hover:-translate-y-2"
    >
      <div
        className="relative h-64 overflow-hidden shrink-0 flex items-center justify-center"
        // Ventures with a brand colour keep it behind the fallback too, so a
        // missing logo file still reads as that venture rather than as generic.
        style={{ background: banner?.bannerBg ?? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
      >
        {showImage ? (
          banner ? (
            <img
              ref={imgRef}
              src={banner.logo}
              alt={`${venture.name} logo`}
              width={400}
              height={256}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="object-contain"
              style={{ maxWidth: banner.logoMaxWidth ?? '70%', maxHeight: '64%' }}
            />
          ) : (
            <img
              ref={imgRef}
              src={venture.imageUrl}
              alt={venture.name}
              width={400}
              height={256}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )
        ) : (
          // Decorative: the venture name and status are already in the text below.
          <div aria-hidden="true" className="w-full h-full flex items-center justify-center">
            <VentureIconMark icon={venture.icon} className="w-16 h-16 text-white/90" />
          </div>
        )}

        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60"></div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          {!banner && showImage && (
            <VentureIconMark icon={venture.icon} className="w-8 h-8 text-white drop-shadow" />
          )}
          <span
            className={`ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${STATUS_STYLES[venture.status]}`}
          >
            <span className="sr-only">Status: </span>
            {venture.status}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col grow">
        <h3
          id={headingId}
          className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors"
        >
          {venture.name}
        </h3>
        <p className="text-slate-600 text-sm font-medium mb-4 flex items-center">
          <svg className="w-4 h-4 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.823a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
          </svg>
          {venture.domain}
        </p>
        <p className="text-slate-600 leading-relaxed mb-8 grow">{venture.description}</p>

        <div className="pt-6 border-t border-slate-100">
          {ctaEnabled ? (
            <a
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-bold transition-all bg-orange-600 text-white hover:bg-orange-700"
            >
              {isLive ? 'Visit Website' : 'Visit'} {venture.name}
              <span className="sr-only"> (opens in a new tab)</span>
              <svg className="w-4 h-4 ml-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          ) : (
            // Not a link: there is nothing to navigate to, so nothing should be
            // focusable or announced as a control.
            <p className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-500">
              Coming Soon
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default VentureCard;
