import { apiClient } from './api-client';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  repassword: string;
  email: string;
  name: string;
  last_name: string;
  country: string;
  mobile: string;
  referral_code?: string;
}

export interface User {
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
}

export interface AuthResponse {
  status: string;
  message?: string;
  token?: string;
  user?: User;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
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
  
  register: async (userData: RegisterData): Promise<AuthResponse> => {
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
      
      // Always clear local storage on logout
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
  },
  
  getToken: (): string | null => {
    return localStorage.getItem('jaguarforex_token');
  }
};