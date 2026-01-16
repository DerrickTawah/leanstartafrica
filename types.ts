
export enum VentureStatus {
  LIVE = 'Live',
  PRE_LAUNCH = 'Pre-launch',
  DEVELOPMENT = 'Under Development'
}

export interface Venture {
  id: string;
  name: string;
  domain: string;
  description: string;
  status: VentureStatus;
  url: string;
  imageUrl: string;
  icon: string;
}
