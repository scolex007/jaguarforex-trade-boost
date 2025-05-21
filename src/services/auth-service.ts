
import apiClient from '../utils/api-client';

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  [key: string]: any;
}

export interface AuthResponse {
  status: string;
  message?: string;
  token?: string;
  user?: User;
  success?: boolean;
}

export const authService = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      
      if (response.data.status === 'success' && response.data.token) {
        // Store token and user info
        localStorage.setItem('jaguarforex_token', response.data.token);
        localStorage.setItem('jaguarforex_user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData: any): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  verifyToken: async (): Promise<AuthResponse> => {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error: any) {
      console.error('Token verification error:', error);
      throw error;
    }
  },
  
  logout: async (): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/logout');
      
      // Always clear local storage on logout, even if the API call fails
      localStorage.removeItem('jaguarforex_token');
      localStorage.removeItem('jaguarforex_user');
      
      return response.data;
    } catch (error: any) {
      // Still clear storage on error
      localStorage.removeItem('jaguarforex_token');
      localStorage.removeItem('jaguarforex_user');
      
      console.error('Logout error:', error);
      throw error;
    }
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('jaguarforex_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        localStorage.removeItem('jaguarforex_user');
        return null;
      }
    }
    return null;
  },
  
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('jaguarforex_token');
  }
};

export default authService;
