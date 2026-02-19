
export enum RewardTier {
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  AMBASSADOR = 'AMBASSADOR'
}

export type Language = 'KO' | 'EN' | 'TH';

export interface InfluencerProfile {
  name: string;
  followers: number;
  referralsCount: number;
  totalEarnings: number;
  tier: RewardTier;
}

export interface Application {
  id: string;
  sns: string;
  contact: string;
  niche: string;
  timestamp: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface NetworkStats {
  totalSales: number;
  activeInfluencers: number;
  pendingApps: number;
}
