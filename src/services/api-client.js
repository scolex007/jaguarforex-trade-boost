
// JaguarForex API Client for React frontend
import axios from 'axios';

// Base API URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jaguarforex_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (expired token, etc.)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('jaguarforex_token');
      localStorage.removeItem('jaguarforex_user');
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login?session_expired=true';
      }
    }
    
    return Promise.reject(error);
  }
);

// -------------------------
// Authentication services
// -------------------------

const authService = {
  login: async (username, password) => {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      
      if (response.data.status === 'success' && response.data.token) {
        // Store token and user info
        localStorage.setItem('jaguarforex_token', response.data.token);
        localStorage.setItem('jaguarforex_user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  verifyToken: async () => {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      
      // Always clear local storage on logout, even if the API call fails
      localStorage.removeItem('jaguarforex_token');
      localStorage.removeItem('jaguarforex_user');
      
      return response.data;
    } catch (error) {
      // Still clear storage on error
      localStorage.removeItem('jaguarforex_token');
      localStorage.removeItem('jaguarforex_user');
      
      console.error('Logout error:', error);
      throw error;
    }
  },
  
  getCurrentUser: () => {
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
  
  isLoggedIn: () => {
    return !!localStorage.getItem('jaguarforex_token');
  }
};

// -------------------------
// User Profile services
// -------------------------

const userService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  updateProfile: async (profileData) => {
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
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
  
  getDashboard: async () => {
    try {
      const response = await apiClient.get('/user/dashboard');
      return response.data;
    } catch (error) {
      console.error('Get dashboard error:', error);
      throw error;
    }
  }
};

// -------------------------
// Wallet/Finance services
// -------------------------

const walletService = {
  getWallet: async () => {
    try {
      const response = await apiClient.get('/user/wallet');
      return response.data;
    } catch (error) {
      console.error('Get wallet error:', error);
      throw error;
    }
  },
  
  getTransactions: async (params = {}) => {
    try {
      const response = await apiClient.get('/user/transactions', { params });
      return response.data;
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },
  
  requestWithdrawal: async (withdrawalData) => {
    try {
      const response = await apiClient.post('/user/withdrawal', withdrawalData);
      return response.data;
    } catch (error) {
      console.error('Withdrawal request error:', error);
      throw error;
    }
  }
};

// -------------------------
// Broker Account services
// -------------------------

const brokerService = {
  getBrokers: async () => {
    try {
      const response = await apiClient.get('/brokers');
      return response.data;
    } catch (error) {
      console.error('Get brokers error:', error);
      throw error;
    }
  },
  
  getBrokerAccounts: async () => {
    try {
      const response = await apiClient.get('/user/broker-accounts');
      return response.data;
    } catch (error) {
      console.error('Get broker accounts error:', error);
      throw error;
    }
  },
  
  linkBrokerAccount: async (accountData) => {
    try {
      const response = await apiClient.post('/user/broker-accounts', accountData);
      return response.data;
    } catch (error) {
      console.error('Link broker account error:', error);
      throw error;
    }
  }
};

// -------------------------
// Referral services
// -------------------------

const referralService = {
  getReferrals: async () => {
    try {
      const response = await apiClient.get('/user/referrals');
      return response.data;
    } catch (error) {
      console.error('Get referrals error:', error);
      throw error;
    }
  },
  
  getReferralLink: async () => {
    try {
      const response = await apiClient.get('/user/referral-link');
      return response.data;
    } catch (error) {
      console.error('Get referral link error:', error);
      throw error;
    }
  }
};

// Export all services
export {
  apiClient,
  authService,
  userService,
  walletService,
  brokerService,
  referralService
};

// Default export for convenience
export default {
  auth: authService,
  user: userService,
  wallet: walletService,
  broker: brokerService,
  referral: referralService
};
