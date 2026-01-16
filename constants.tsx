

import React from 'react';
import { Venture, VentureStatus } from './types';

export const VENTURES: Venture[] = [
  {
    id: 'made-in-africa',
    name: 'MadeInAfrica.biz',
    domain: 'madeinafrica.biz',
    description: 'A premium B2B and consumer marketplace dedicated to showcasing and distributing authentic African-made goods to a global audience.',
    status: VentureStatus.PRE_LAUNCH,
    url: 'https://madeinafrica.biz',
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
    icon: '🛍️'
  },
  {
    id: 'seedfund-africa',
    name: 'Seedfund Africa',
    domain: 'seedfund.africa',
    description: 'Empowering early-stage founders with the capital, network, and operational support required to scale innovative solutions across the continent.',
    status: VentureStatus.DEVELOPMENT,
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800',
    icon: '🌱'
  },
  {
    id: 'njangilist',
    name: 'NjangiList',
    domain: 'njangilist.com',
    description: 'A community-driven platform digitizing traditional savings and credit associations (Njangis) to drive collaborative commerce and financial inclusion.',
    status: VentureStatus.DEVELOPMENT,
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1634704784915-aacf363b021f?auto=format&fit=crop&q=80&w=800',
    icon: '🤝'
  }
];
