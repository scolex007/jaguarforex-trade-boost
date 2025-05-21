
import apiClient from '../utils/api-client';
import authService from './auth-service';
import userService from './user-service';
import walletService from './wallet-service';
import brokerService from './broker-service';
import referralService from './referral-service';

// Export all services individually
export {
  apiClient,
  authService,
  userService,
  walletService,
  brokerService,
  referralService
};

// Export default object for convenience
export default {
  auth: authService,
  user: userService,
  wallet: walletService,
  broker: brokerService,
  referral: referralService
};
