// Export all services from a central location
export { authService } from './auth-service';
export { userService } from './user-service';
export { walletService } from './wallet-service';
export { brokerService } from './broker-service';
export { referralService } from './referral-service';
export { apiClient } from './api-client';

// Export types
export type { 
  LoginCredentials, 
  RegisterData, 
  User, 
  AuthResponse 
} from './auth-service';

export type { 
  UserProfile, 
  DashboardData, 
  Transaction as UserTransaction, 
  UpdateProfileData 
} from './user-service';

export type { 
  Wallet, 
  Transaction as WalletTransaction, 
  WithdrawalRequest, 
  TransactionFilters 
} from './wallet-service';

export type { 
  Broker, 
  BrokerAccount, 
  LinkBrokerAccountData, 
  BrokerAccountStats 
} from './broker-service';

export type { 
  Referral, 
  ReferralStats, 
  ReferralTree 
} from './referral-service';