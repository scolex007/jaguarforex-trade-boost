
import apiClient from '../utils/api-client';

export interface BrokerResponse {
  status: string;
  message?: string;
  data?: any;
  success?: boolean;
}

export const brokerService = {
  getBrokers: async (): Promise<BrokerResponse> => {
    try {
      const response = await apiClient.get('/brokers');
      return response.data;
    } catch (error: any) {
      console.error('Get brokers error:', error);
      throw error;
    }
  },
  
  getBrokerAccounts: async (): Promise<BrokerResponse> => {
    try {
      const response = await apiClient.get('/user/broker-accounts');
      return response.data;
    } catch (error: any) {
      console.error('Get broker accounts error:', error);
      throw error;
    }
  },
  
  linkBrokerAccount: async (accountData: any): Promise<BrokerResponse> => {
    try {
      const response = await apiClient.post('/user/broker-accounts', accountData);
      return response.data;
    } catch (error: any) {
      console.error('Link broker account error:', error);
      throw error;
    }
  }
};

export default brokerService;
