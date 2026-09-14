export enum VentureStatus {
  LIVE = 'Live',
  PRE_LAUNCH = 'Pre-launch',
  DEVELOPMENT = 'Under Development',
  IDEA = 'Idea'
}

/** Key into VENTURE_ICONS in components/VentureCard.tsx. */
export type VentureIcon = 'marketplace' | 'redaction' | 'family-tree' | 'funding';

export interface Venture {
  id: string;
  name: string;
  domain: string;
  description: string;
  status: VentureStatus;
  url: string;
  imageUrl: string;
  icon: VentureIcon;
}
