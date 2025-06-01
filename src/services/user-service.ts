import { apiClient } from './api-client';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  name: string;
  last_name: string;
  country: string;
  mobile: string;
  member_type: string;
  email_verify: number;
  kyc_verify: number;
  user_status: number;
  created_at: string;
  updated_at?: string;
}

export interface DashboardData {
  total_balance: number;
  total_referrals: number;
  pending_withdrawals: number;
  active_broker_accounts: number;
  recent_transactions: Transaction[];
  referral_earnings: number;
}

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  description?: string;
}

export interface UpdateProfileData {
  name?: string;
  last_name?: string;
  country?: string;
  mobile?: string;
  email?: string;
}

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  updateProfile: async (profileData: UpdateProfileData): Promise<any> => {
    try {
      const response = await apiClient.put('/user/profile', profileData);
      
      // If successful, update local storage user data
      if (response.data.status === 'success') {
        const userStr = localStorage.getItem('jaguarforex_user');
        if (userStr) {
          const user = JSON.parse(userStr);
          const updatedUser = { ...user, ...profileData };
          localStorage.setItem('jaguarforex_user', JSON.stringify(updatedUser));
        }
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
  
  getDashboard: async (): Promise<DashboardData> => {
    try {
      const response = await apiClient.get('/user/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Get dashboard error:', error);
      throw error;
    }
  },
  
  uploadKYCDocument: async (documentData: FormData): Promise<any> => {
    try {
      const response = await apiClient.post('/user/kyc/upload', documentData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('KYC upload error:', error);
      throw error;
    }
  },
  
  getKYCStatus: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/user/kyc/status');
      return response.data;
    } catch (error: any) {
      console.error('Get KYC status error:', error);
      throw error;
    }
  },
  
  changePassword: async (passwordData: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }): Promise<any> => {
    try {
      const response = await apiClient.post('/user/change-password', passwordData);
      return response.data;
    } catch (error: any) {
      console.error('Change password error:', error);
      throw error;
    }
  },
  
  getNotifications: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/user/notifications');
      return response.data;
    } catch (error: any) {
      console.error('Get notifications error:', error);
      throw error;
    }
  },
  
  markNotificationAsRead: async (notificationId: number): Promise<any> => {
    try {
      const response = await apiClient.put(`/user/notifications/${notificationId}/read`);
      return response.data;
    } catch (error: any) {
      console.error('Mark notification as read error:', error);
      throw error;
    }
  }
};