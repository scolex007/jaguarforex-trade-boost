/**
 * Authentication service for the React frontend
 * This file integrates with the PHP backend at my.jaguarforex.com
 */

import axios from 'axios';
import { toast } from 'sonner';

// Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  [key: string]: any;
}

export interface AuthResponse {
  success: boolean;
  data?: any;
  user?: User;
  token?: string;
  message?: string;
}

const API_URL = 'https://my.jaguarforex.com/api/auth';

// Store the JWT token in localStorage
const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('jaguarforex_token', token);
    // Set axios default headers for all future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('jaguarforex_token');
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get the JWT token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('jaguarforex_token');
};

// Store user data in localStorage
const setUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('jaguarforex_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('jaguarforex_user');
  }
};

// Get user data from localStorage
const getUser = (): User | null => {
  const user = localStorage.getItem('jaguarforex_user');
  return user ? JSON.parse(user) : null;
};

// Setup axios instance with defaults
const setupAxiosDefaults = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Initialize axios defaults when the service is imported
setupAxiosDefaults();

// Login user
const login = async (usernameOrEmail: string, password: string): Promise<AuthResponse> => {
  try {
    // Detect if input is email or username based on @ character
    const isEmail = usernameOrEmail.includes('@');
    const loginData = isEmail 
      ? { email: usernameOrEmail, password } 
      : { username: usernameOrEmail, password };
    
    const response = await axios.post(`${API_URL}/login`, loginData, {
      withCredentials: true // Important for cookies if your API uses them
    });

    if (response.status >= 200 && response.status < 300) {
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      toast.success('Login successful!');
      return { success: true, data: response.data, user, token };
    } else {
      toast.error(response.data.message || 'Login failed');
      return { success: false, message: response.data.message || 'Login failed' };
    }
  } catch (error: any) {
    console.error('Login error:', error);
    const errorMessage = error.response?.data?.message || 'Network error. Please try again.';
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

// Register user
const register = async (userData: any): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true // Important for cookies if your API uses them
    });

    if (response.status >= 200 && response.status < 300) {
      toast.success('Registration successful! You can now log in.');
      // If token is provided (auto-login), store it
      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
      }
      return { success: true, data: response.data };
    } else {
      toast.error(response.data.message || 'Registration failed');
      return { success: false, message: response.data.message || 'Registration failed' };
    }
  } catch (error: any) {
    console.error('Registration error:', error);
    const errorMessage = error.response?.data?.message || 'Network error. Please try again.';
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

// Verify token and get user data
const verifyToken = async (): Promise<AuthResponse> => {
  const token = getToken();
  
  if (!token) {
    return { success: false, message: 'No token found' };
  }

  try {
    const response = await axios.get(`${API_URL}/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true // Important for cookies if your API uses them
    });

    if (response.status >= 200 && response.status < 300) {
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } else {
      // Clear invalid token
      setToken(null);
      setUser(null);
      return { success: false, message: response.data.message || 'Token verification failed' };
    }
  } catch (error: any) {
    console.error('Token verification error:', error);
    // Clear invalid token
    setToken(null);
    setUser(null);
    return { success: false, message: error.response?.data?.message || 'Network error. Please try again.' };
  }
};

// Updated logout function that doesn't use window.location
const logout = async (): Promise<AuthResponse> => {
  const token = getToken();
  
  try {
    if (token) {
      // Call backend logout API to invalidate session
      await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Continue with local logout even if API call fails
  } finally {
    // Always clear local storage
    setToken(null);
    setUser(null);
  }
  
  return { success: true };
};

// Check if user is authenticated
const isAuthenticated = (): boolean => {
  return !!getToken() && !!getUser();
};

export const authService = {
  login,
  register,
  verifyToken,
  logout,
  isAuthenticated,
  getUser,
  getToken
};

export default authService;
