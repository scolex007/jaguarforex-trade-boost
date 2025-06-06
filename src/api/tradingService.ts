
import api from './api';

export interface TradingAccount {
  id: string;
  userId: string;
  brokerId: string;
  accountNumber: string;
  account_number: string; // Added for compatibility
  platform: 'MT4' | 'MT5' | 'cTrader';
  status: 'active' | 'inactive' | 'pending' | '0' | '1' | '2';
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  openPositions: number;
  createdAt: string;
  dated: string; // Added for compatibility
  lastUpdated: string;
  service: string; // Added for compatibility
  is_demo: string; // Added for compatibility
}

export interface TradingPosition {
  id: string;
  accountId: string;
  symbol: string;
  type: 'buy' | 'sell';
  volume: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
  swap: number;
  commission: number;
  openTime: string;
  sl?: number;
  tp?: number;
}

export interface TradingHistory {
  id: string;
  accountId: string;
  ticket: string;
  symbol: string;
  type: 'buy' | 'sell';
  volume: number;
  openPrice: number;
  closePrice: number;
  profit: number;
  swap: number;
  commission: number;
  openTime: string;
  closeTime: string;
}

export interface AccountRegistrationData {
  brokerId?: string;
  broker?: string; // Added for compatibility
  accountNumber: string;
  platform?: 'MT4' | 'MT5' | 'cTrader';
  accountName?: string;
  isDemo?: boolean;
}

export interface Broker {
  id: string;
  name: string;
  displayName?: string;
  status: 'active' | 'inactive';
  affiliateLink?: string; // Added for compatibility
}

const tradingService = {
  // Broker Management
  getBrokers: async (): Promise<Broker[]> => {
    const response = await api.get('/brokers');
    return response.data;
  },

  // Trading Account Management
  registerAccount: async (data: AccountRegistrationData) => {
    const response = await api.post('/user/trading-accounts', data);
    return response.data;
  },

  getAccounts: async (status?: string | null): Promise<TradingAccount[]> => {
    const params = status ? { status } : {};
    const response = await api.get('/user/trading-accounts', { params });
    return response.data;
  },

  getAccountById: async (accountId: string): Promise<TradingAccount> => {
    const response = await api.get(`/user/trading-accounts/${accountId}`);
    return response.data;
  },

  syncAccount: async (accountId: string) => {
    const response = await api.post(`/user/trading-accounts/${accountId}/sync`);
    return response.data;
  },

  deleteAccount: async (accountId: string) => {
    const response = await api.delete(`/user/trading-accounts/${accountId}`);
    return response.data;
  },

  // Trading Positions
  getOpenPositions: async (accountId: string): Promise<TradingPosition[]> => {
    const response = await api.get(`/user/trading-accounts/${accountId}/positions`);
    return response.data;
  },

  // Trading History
  getTradeHistory: async (accountId: string, params?: {
    startDate?: string;
    endDate?: string;
    symbol?: string;
    limit?: number;
    offset?: number;
  }): Promise<TradingHistory[]> => {
    const response = await api.get(`/user/trading-accounts/${accountId}/history`, { params });
    return response.data;
  },

  // Account Statistics
  getAccountStats: async (accountId: string, period: 'day' | 'week' | 'month' | 'year' = 'month') => {
    const response = await api.get(`/user/trading-accounts/${accountId}/stats`, {
      params: { period }
    });
    return response.data;
  },

  // Performance Metrics
  getPerformanceMetrics: async (accountId: string) => {
    const response = await api.get(`/user/trading-accounts/${accountId}/performance`);
    return response.data;
  },

  // Export functionality
  exportTradeHistory: async (accountId: string, format: 'csv' | 'xlsx' | 'pdf' = 'csv') => {
    const response = await api.get(`/user/trading-accounts/${accountId}/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  }
};

export default tradingService;
