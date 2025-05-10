import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: 'https://my.jaguarforex.com/api'
});

// Track failed requests to detect potential brute force attempts
let consecutiveFailures = 0;
const FAILURE_THRESHOLD = 3;
const failedRequests = new Map();

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add request timestamp to help prevent replay attacks
  config.headers['X-Request-Time'] = Date.now();
  
  return config;
});

api.interceptors.response.use(
  response => {
    // Reset failure counter on success
    consecutiveFailures = 0;
    return response;
  },
  error => {
    // Handle specific error cases
    if (error.response) {
      // Handle rate limiting (status code 429 Too Many Requests)
      if (error.response.status === 429) {
        toast.error('Too many attempts. Please try again later.');
        // Track the rate-limited endpoint to prevent retry floods
        const endpoint = error.config.url;
        failedRequests.set(endpoint, Date.now());
        
        // Implement exponential backoff on retry
        const retryAfter = error.response.headers['retry-after'] || 30;
        console.log(`Rate limited. Retry after ${retryAfter} seconds`);
      }
      
      // Handle authentication failures
      else if (error.response.status === 401) {
        consecutiveFailures++;
        
        // Token expired or invalid
        if (error.response.data?.code === 'token_expired') {
          // Let the AuthContext handle token refresh
          toast.error('Your session has expired. Please log in again.');
        } 
        // Invalid credentials
        else if (error.config.url.includes('/login')) {
          // Don't redirect on login failures
          console.log('Login failure');
        } 
        // Other auth failures
        else {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          toast.error('Authentication failed. Please login again.');
        }
        
        // If multiple consecutive failures, implement additional security measures
        if (consecutiveFailures >= FAILURE_THRESHOLD) {
          toast.error('Multiple authentication failures detected');
          // In a real system, this might trigger additional security checks
        }
      }
      
      // Handle forbidden (could mean blacklisted token)
      else if (error.response.status === 403) {
        toast.error('Access denied. Please login again.');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper to check if an endpoint is currently rate-limited
api.isRateLimited = (endpoint) => {
  const limitTime = failedRequests.get(endpoint);
  if (!limitTime) return false;
  
  // Check if we're still within the rate limit window (5 minutes)
  const stillLimited = (Date.now() - limitTime) < 5 * 60 * 1000;
  
  // Clean up old entries
  if (!stillLimited) {
    failedRequests.delete(endpoint);
  }
  
  return stillLimited;
};

export default api;
