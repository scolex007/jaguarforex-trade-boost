
import apiClient from '../utils/api-client';

export interface ReferralResponse {
  status: string;
  message?: string;
  data?: any;
  success?: boolean;
}

export const referralService = {
  getReferrals: async (): Promise<ReferralResponse> => {
    try {
      const response = await apiClient.get('/user/referrals');
      return response.data;
    } catch (error: any) {
      console.error('Get referrals error:', error);
      throw error;
    }
  },
  
  getReferralLink: async (): Promise<ReferralResponse> => {
    try {
      const response = await apiClient.get('/user/referral-link');
      return response.data;
    } catch (error: any) {
      console.error('Get referral link error:', error);
      throw error;
    }
  }
};

export default referralService;
