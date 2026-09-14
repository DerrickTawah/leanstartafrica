import { Venture, VentureStatus } from './types';

export const VENTURES: Venture[] = [
  {
    id: 'hali',
    name: 'Hali',
    domain: 'hali.africa',
    description:
      'A marketplace built for sellers to reach buyers directly, starting with sellers in Cameroon. Currently in staged rollout to early testers.',
    status: VentureStatus.DEVELOPMENT,
    url: 'https://www.hali.africa',
    imageUrl: '', // Logo lockup instead of a photo. See VentureCard.tsx.
    icon: 'marketplace'
  },
  {
    id: 'blotmarked',
    name: 'Blotmarked',
    domain: 'blotmarked.app',
    description:
      'Redact personal information from documents before you share them. Detection happens entirely on-device, so nothing is uploaded or stored. Pay per document, no subscription.',
    status: VentureStatus.PRE_LAUNCH,
    url: 'https://blotmarked.app',
    imageUrl: '', // Logo lockup. See VentureCard.tsx.
    icon: 'redaction'
  },
  {
    id: 'ukooyangu',
    name: 'Ukoo Yangu',
    domain: 'ukooyangu.com',
    description:
      "A private, self-hosted family tree for building and preserving your family's history without handing it to a third party. Invite-only for now, with export and print planned.",
    status: VentureStatus.DEVELOPMENT,
    url: 'https://ukooyangu.com',
    imageUrl: '/images/ukooyangu-family.jpg', // Drop in a real product photo when available.
    icon: 'family-tree'
  },
  {
    id: 'seedfund',
    name: 'Seedfund Africa',
    domain: 'seedfund.africa',
    description:
      'Empowering early-stage founders with the capital, network, and operational support required to scale innovative solutions across the continent.',
    status: VentureStatus.IDEA,
    // Real URL kept on record, but still rendered as "Coming Soon". See VentureCard.tsx.
    url: 'https://seedfund.africa',
    imageUrl: '/images/seedfund-finance.jpg',
    icon: 'funding'
  }
];
