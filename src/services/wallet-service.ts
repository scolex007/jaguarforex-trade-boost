
import apiClient from '../utils/api-client';

export interface WalletResponse {
  status: string;
  message?: string;
  data?: any;
  success?: boolean;
}

export const walletService = {
  getWallet: async (): Promise<WalletResponse> => {
    try {
      const response = await apiClient.get('/user/wallet');
      return response.data;
    } catch (error: any) {
      console.error('Get wallet error:', error);
      throw error;
    }
  },
  
  getTransactions: async (params = {}): Promise<WalletResponse> => {
    try {
      const response = await apiClient.get('/user/transactions', { params });
      return response.data;
    } catch (error: any) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },
  
  requestWithdrawal: async (withdrawalData: any): Promise<WalletResponse> => {
    try {
      const response = await apiClient.post('/user/withdrawal', withdrawalData);
      return response.data;
    } catch (error: any) {
      console.error('Withdrawal request error:', error);
      throw error;
    }
  }
};

export default walletService;
