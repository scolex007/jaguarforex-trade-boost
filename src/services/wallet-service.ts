import { apiClient } from './api-client';

export interface Wallet {
  id: number;
  user_id: number;
  balance: number;
  pending_balance: number;
  total_earned: number;
  total_withdrawn: number;
  currency: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  type: 'deposit' | 'withdrawal' | 'commission' | 'referral_bonus' | 'adjustment';
  amount: number;
  balance_before: number;
  balance_after: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  reference_id?: string;
  created_at: string;
  completed_at?: string;
}

export interface WithdrawalRequest {
  amount: number;
  payment_method: 'bank_transfer' | 'crypto' | 'paypal' | 'skrill';
  payment_details: {
    account_name?: string;
    account_number?: string;
    bank_name?: string;
    swift_code?: string;
    crypto_address?: string;
    crypto_network?: string;
    paypal_email?: string;
    skrill_email?: string;
  };
  notes?: string;
}

export interface TransactionFilters {
  type?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export const walletService = {
  getWallet: async (): Promise<Wallet> => {
    try {
      const response = await apiClient.get('/user/wallet');
      return response.data;
    } catch (error: any) {
      console.error('Get wallet error:', error);
      throw error;
    }
  },
  
  getTransactions: async (filters: TransactionFilters = {}): Promise<{
    transactions: Transaction[];
    total: number;
  }> => {
    try {
      const response = await apiClient.get('/user/transactions', { params: filters });
      return response.data;
    } catch (error: any) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },
  
  requestWithdrawal: async (withdrawalData: WithdrawalRequest): Promise<any> => {
    try {
      const response = await apiClient.post('/user/withdrawal', withdrawalData);
      return response.data;
    } catch (error: any) {
      console.error('Withdrawal request error:', error);
      throw error;
    }
  },
  
  getWithdrawalHistory: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/user/withdrawals');
      return response.data;
    } catch (error: any) {
      console.error('Get withdrawal history error:', error);
      throw error;
    }
  },
  
  cancelWithdrawal: async (withdrawalId: number): Promise<any> => {
    try {
      const response = await apiClient.put(`/user/withdrawals/${withdrawalId}/cancel`);
      return response.data;
    } catch (error: any) {
      console.error('Cancel withdrawal error:', error);
      throw error;
    }
  },
  
  getPaymentMethods: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/user/payment-methods');
      return response.data;
    } catch (error: any) {
      console.error('Get payment methods error:', error);
      throw error;
    }
  },
  
  addPaymentMethod: async (paymentMethodData: any): Promise<any> => {
    try {
      const response = await apiClient.post('/user/payment-methods', paymentMethodData);
      return response.data;
    } catch (error: any) {
      console.error('Add payment method error:', error);
      throw error;
    }
  },
  
  deletePaymentMethod: async (paymentMethodId: number): Promise<any> => {
    try {
      const response = await apiClient.delete(`/user/payment-methods/${paymentMethodId}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete payment method error:', error);
      throw error;
    }
  }
};