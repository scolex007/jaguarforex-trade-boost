
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import api from '../services/api';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Token refresh configuration
const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes (if token expires in 15 minutes)

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTokenInterval, setRefreshTokenInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if user is logged in on page load
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }

    // Cleanup on unmount
    return () => {
      if (refreshTokenInterval) {
        clearInterval(refreshTokenInterval);
      }
    };
  }, []);

  // Set up token refresh interval when user is authenticated
  useEffect(() => {
    if (user && !refreshTokenInterval) {
      const interval = setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL);
      setRefreshTokenInterval(interval);
      
      return () => {
        clearInterval(interval);
        setRefreshTokenInterval(null);
      };
    }
  }, [user]);

  const refreshAccessToken = async () => {
    try {
      // Get refresh token from secure storage (httpOnly cookie handled by browser)
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post('https://my.jaguarforex.com/api/auth/refresh', { 
        refresh_token: refreshToken 
      });
      
      const { token } = response.data;
      localStorage.setItem('auth_token', token);
      
      // No need to update user data here unless it's changed
    } catch (err) {
      console.error('Failed to refresh token', err);
      // If refresh fails, log the user out
      logout();
    }
  };

  const verifyToken = async (token: string) => {
    try {
      const response = await axios.get('https://my.jaguarforex.com/api/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      
      // Set up refresh token interval
      if (!refreshTokenInterval) {
        const interval = setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL);
        setRefreshTokenInterval(interval);
      }
    } catch (err) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      if (refreshTokenInterval) {
        clearInterval(refreshTokenInterval);
        setRefreshTokenInterval(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // Added timestamp to help prevent replay attacks
      const timestamp = new Date().toISOString();
      
      const response = await axios.post('https://my.jaguarforex.com/api/auth/login', {
        username, 
        password,
        timestamp // Backend can verify request freshness
      });

      const { token, refresh_token, user } = response.data;
      localStorage.setItem('auth_token', token);
      
      // Store refresh token (in a real app, this would be an httpOnly cookie)
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token);
      }
      
      setUser(user);
      toast.success('Login successful!');
      
      // Set up refresh token interval
      if (refreshTokenInterval) {
        clearInterval(refreshTokenInterval);
      }
      const interval = setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL);
      setRefreshTokenInterval(interval);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      const response = await axios.post('https://my.jaguarforex.com/api/auth/register/jaguarforex', userData);
      setError(null);
      toast.success('Registration successful! You can now log in.');
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Consider adding a call to the backend to blacklist the token
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        axios.post('https://my.jaguarforex.com/api/auth/logout', { token }); // Blacklist the token on server
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
    
    // Clear tokens and user data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    toast.success('You have been logged out successfully');
    
    // Clear refresh interval
    if (refreshTokenInterval) {
      clearInterval(refreshTokenInterval);
      setRefreshTokenInterval(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
