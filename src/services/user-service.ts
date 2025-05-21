
import apiClient from '../utils/api-client';

export interface ProfileResponse {
  status: string;
  message?: string;
  user?: any;
  data?: any;
  success?: boolean;
}

export const userService = {
  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  updateProfile: async (profileData: any): Promise<ProfileResponse> => {
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
  
  getDashboard: async (): Promise<ProfileResponse> => {
    try {
      const response = await apiClient.get('/user/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Get dashboard error:', error);
      throw error;
    }
  }
};

export default userService;
