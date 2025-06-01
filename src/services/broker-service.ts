import { apiClient } from './api-client';

export interface Broker {
  id: number;
  name: string;
  logo_url?: string;
  commission_rate: number;
  min_deposit: number;
  supported_platforms: string[];
  supported_countries: string[];
  description?: string;
  website_url?: string;
  is_active: boolean;
}

export interface BrokerAccount {
  id: number;
  user_id: number;
  broker_id: number;
  account_number: string;
  account_name?: string;
  platform: 'MT4' | 'MT5' | 'cTrader' | 'Other';
  status: 'pending' | 'active' | 'inactive' | 'rejected';
  verified_at?: string;
  created_at: string;
  broker?: Broker;
}

export interface LinkBrokerAccountData {
  broker_id: number;
  account_number: string;
  account_name?: string;
  platform: string;
  verification_documents?: File[];
}

export interface BrokerAccountStats {
  total_volume: number;
  total_commission: number;
  last_trade_date?: string;
  monthly_stats: {
    month: string;
    volume: number;
    commission: number;
  }[];
}

export const brokerService = {
  getBrokers: async (): Promise<Broker[]> => {
    try {
      const response = await apiClient.get('/brokers');
      return response.data;
    } catch (error: any) {
      console.error('Get brokers error:', error);
      throw error;
    }
  },
  
  getBrokerById: async (brokerId: number): Promise<Broker> => {
    try {
      const response = await apiClient.get(`/brokers/${brokerId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get broker by ID error:', error);
      throw error;
    }
  },
  
  getBrokerAccounts: async (): Promise<BrokerAccount[]> => {
    try {
      const response = await apiClient.get('/user/broker-accounts');
      return response.data;
    } catch (error: any) {
      console.error('Get broker accounts error:', error);
      throw error;
    }
  },
  
  linkBrokerAccount: async (accountData: LinkBrokerAccountData): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append('broker_id', accountData.broker_id.toString());
      formData.append('account_number', accountData.account_number);
      if (accountData.account_name) {
        formData.append('account_name', accountData.account_name);
      }
      formData.append('platform', accountData.platform);
      
      // Add verification documents if provided
      if (accountData.verification_documents) {
        accountData.verification_documents.forEach((file, index) => {
          formData.append(`documents[${index}]`, file);
        });
      }
      
      const response = await apiClient.post('/user/broker-accounts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Link broker account error:', error);
      throw error;
    }
  },
  
  unlinkBrokerAccount: async (accountId: number): Promise<any> => {
    try {
      const response = await apiClient.delete(`/user/broker-accounts/${accountId}`);
      return response.data;
    } catch (error: any) {
      console.error('Unlink broker account error:', error);
      throw error;
    }
  },
  
  getBrokerAccountStats: async (accountId: number): Promise<BrokerAccountStats> => {
    try {
      const response = await apiClient.get(`/user/broker-accounts/${accountId}/stats`);
      return response.data;
    } catch (error: any) {
      console.error('Get broker account stats error:', error);
      throw error;
    }
  },
  
  verifyBrokerAccount: async (accountId: number, verificationCode: string): Promise<any> => {
    try {
      const response = await apiClient.post(`/user/broker-accounts/${accountId}/verify`, {
        verification_code: verificationCode,
      });
      return response.data;
    } catch (error: any) {
      console.error('Verify broker account error:', error);
      throw error;
    }
  },
  
  syncBrokerAccount: async (accountId: number): Promise<any> => {
    try {
      const response = await apiClient.post(`/user/broker-accounts/${accountId}/sync`);
      return response.data;
    } catch (error: any) {
      console.error('Sync broker account error:', error);
      throw error;
    }
  }
};