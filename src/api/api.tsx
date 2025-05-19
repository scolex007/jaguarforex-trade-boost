
import axios from 'axios';
import { getToken } from '../utils/auth';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://my.jaguarforex.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Unauthorized - redirect to login
        console.error('Unauthorized access attempt - redirecting to login');
        // You can add code to redirect to login page here
      }
      
      if (status === 403) {
        console.error('Forbidden access attempt');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
