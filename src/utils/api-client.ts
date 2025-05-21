
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Base API URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

// Create and configure axios instance
export const createApiClient = (): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout
  });

  // Request interceptor for adding auth token
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jaguarforex_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling common errors
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 Unauthorized errors (expired token, etc.)
      if (error.response && error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('jaguarforex_token');
        localStorage.removeItem('jaguarforex_user');
        
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login?session_expired=true';
        }
      }
      
      return Promise.reject(error);
    }
  );

  return apiClient;
};

// Create a default instance
const apiClient = createApiClient();

export default apiClient;
