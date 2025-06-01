import { apiClient } from './api-client';

export interface Referral {
  id: number;
  user_id: number;
  referred_user_id: number;
  referred_user: {
    username: string;
    email: string;
    name: string;
    last_name: string;
    created_at: string;
    is_active: boolean;
  };
  commission_earned: number;
  status: 'pending' | 'active' | 'inactive';
  created_at: string;
}

export interface ReferralStats {
  total_referrals: number;
  active_referrals: number;
  total_commission_earned: number;
  pending_commission: number;
  referral_link: string;
  referral_code: string;
  monthly_stats: {
    month: string;
    new_referrals: number;
    commission_earned: number;
  }[];
}

export interface ReferralTree {
  user: {
    id: number;
    username: string;
    name: string;
    level: number;
  };
  children: ReferralTree[];
}

export const referralService = {
  getReferrals: async (): Promise<Referral[]> => {
    try {
      const response = await apiClient.get('/user/referrals');
      return response.data;
    } catch (error: any) {
      console.error('Get referrals error:', error);
      throw error;
    }
  },
  
  getReferralStats: async (): Promise<ReferralStats> => {
    try {
      const response = await apiClient.get('/user/referral-stats');
      return response.data;
    } catch (error: any) {
      console.error('Get referral stats error:', error);
      throw error;
    }
  },
  
  getReferralLink: async (): Promise<{ link: string; code: string }> => {
    try {
      const response = await apiClient.get('/user/referral-link');
      return response.data;
    } catch (error: any) {
      console.error('Get referral link error:', error);
      throw error;
    }
  },
  
  getReferralTree: async (levels: number = 3): Promise<ReferralTree> => {
    try {
      const response = await apiClient.get('/user/referral-tree', {
        params: { levels }
      });
      return response.data;
    } catch (error: any) {
      console.error('Get referral tree error:', error);
      throw error;
    }
  },
  
  getReferralCommissions: async (filters?: {
    start_date?: string;
    end_date?: string;
    status?: string;
  }): Promise<any> => {
    try {
      const response = await apiClient.get('/user/referral-commissions', {
        params: filters
      });
      return response.data;
    } catch (error: any) {
      console.error('Get referral commissions error:', error);
      throw error;
    }
  },
  
  sendReferralInvite: async (inviteData: {
    email: string;
    name?: string;
    message?: string;
  }): Promise<any> => {
    try {
      const response = await apiClient.post('/user/referral-invite', inviteData);
      return response.data;
    } catch (error: any) {
      console.error('Send referral invite error:', error);
      throw error;
    }
  },
  
  generateNewReferralCode: async (): Promise<{ code: string }> => {
    try {
      const response = await apiClient.post('/user/referral-code/regenerate');
      return response.data;
    } catch (error: any) {
      console.error('Generate new referral code error:', error);
      throw error;
    }
  }
};