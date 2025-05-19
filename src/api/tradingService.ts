import api from './api';
import { brokersData } from '../data/brokersData';

// Types
export interface Broker {
  id: string;
  name: string;
  affiliateLink?: string;
}

export interface TradingAccount {
  id: string;
  username: string;
  account_number: string;
  service: string;
  is_demo: string;
  status: string;
  dated: string;
}

// API functions
export const tradingService = {
  /**
   * Get all available brokers
   */
  getBrokers: async (): Promise<Broker[]> => {
    try {
      const response = await api.get('/trading/brokers');
      return response.data.brokers;
    } catch (error) {
      console.error('Error fetching brokers:', error);
      // Fall back to static data if API fails
      console.log('Using fallback broker data');
      return brokersData;
    }
  },

  /**
   * Register a new trading account
   */
  registerAccount: async (data: {
    broker: string;
    accountNumber: string;
    isDemo?: boolean;
  }): Promise<any> => {
    try {
      const response = await api.post('/trading/register', data);
      return response.data;
    } catch (error) {
      console.error('Error registering account:', error);
      throw error;
    }
  },

  /**
   * Get user trading accounts
   * @param status Filter by status: 'pending'(0), 'approved'(1), 'rejected'(2), or 'all'
   */
  getAccounts: async (status?: string | null): Promise<TradingAccount[]> => {
    try {
      const url = status ? `/trading/accounts?status=${status}` : '/trading/accounts';
      const response = await api.get(url);
      return response.data.accounts;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }
};

export default tradingService;