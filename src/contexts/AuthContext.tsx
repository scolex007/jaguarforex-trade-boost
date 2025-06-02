
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, User } from '../services/auth-service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // Added for compatibility
  error: string | null; // Added for compatibility
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if we have a token
      if (!authService.isLoggedIn()) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Verify the token with the server
      const response = await authService.verifyToken();
      
      if (response.status === 'success' && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        // Update stored user data
        localStorage.setItem('jaguarforex_user', JSON.stringify(response.user));
      } else {
        // Token is invalid
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('jaguarforex_token');
        localStorage.removeItem('jaguarforex_user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('jaguarforex_token');
      localStorage.removeItem('jaguarforex_user');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      const response = await authService.login({ username, password });
      
      if (response.status === 'success' && response.token && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const errorMsg = response.message || 'Login failed';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.messages?.error || 'Login failed. Please try again.';
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg
      };
    }
  };

  const register = async (userData: any) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      
      if (response.status === 'success') {
        return { success: true };
      } else {
        const errorMsg = response.message || 'Registration failed';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg
        };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMsg = error.response?.data?.messages?.error || 'Registration failed. Please try again.';
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      navigate('/login');
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('jaguarforex_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loading: isLoading, // Alias for compatibility
    error,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
