
import React from 'react';
import { Venture, VentureStatus } from './types';

export const VENTURES: Venture[] = [
  {
    id: 'made-in-africa',
    name: 'MadeInAfrica.biz',
    domain: 'madeinafrica.biz',
    description: 'A premium B2B and consumer marketplace dedicated to showcasing and distributing authentic African-made goods to a global audience.',
    status: VentureStatus.LIVE,
    url: 'https://madeinafrica.biz',
    imageUrl: 'https://images.unsplash.com/photo-1523474253046-2cd2c78a9db1?auto=format&fit=crop&q=80&w=800',
    icon: '🛍️'
  },
  {
    id: 'seedfund-africa',
    name: 'Seedfund Africa',
    domain: 'seedfund.africa',
    description: 'Empowering early-stage founders with the capital, network, and operational support required to scale innovative solutions across the continent.',
    status: VentureStatus.PRE_LAUNCH,
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800',
    icon: '🌱'
  },
  {
    id: 'njangilist',
    name: 'NjangiList',
    domain: 'njangilist.com',
    description: 'A community-driven platform digitizing traditional savings and credit associations (Njangis) to drive collaborative commerce and financial inclusion.',
    status: VentureStatus.DEVELOPMENT,
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    icon: '🤝'
  }
];
