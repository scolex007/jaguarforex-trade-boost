import api from './api';

export interface TradingAccount {
  id: string;
  userId: string;
  brokerId: string;
  accountNumber: string;
  platform: 'MT4' | 'MT5' | 'cTrader';
  status: 'active' | 'inactive' | 'pending';
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  openPositions: number;
  createdAt: string;
  lastUpdated: string;
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
  brokerId: string;
  accountNumber: string;
  platform: 'MT4' | 'MT5' | 'cTrader';
  accountName?: string;
}

const tradingService = {
  // Trading Account Management
  registerAccount: async (data: AccountRegistrationData) => {
    const response = await api.post('/user/trading-accounts', data);
    return response.data;
  },

  getAccounts: async (): Promise<TradingAccount[]> => {
    const response = await api.get('/user/trading-accounts');
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