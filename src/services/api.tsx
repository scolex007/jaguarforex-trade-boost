
import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: 'https://my.jaguarforex.com/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

export default api;
