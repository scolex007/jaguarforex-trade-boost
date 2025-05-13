
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authService, User } from '../services/authService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on page load
    const checkAuth = async () => {
      const token = authService.getToken();
      if (token) {
        const result = await authService.verifyToken();
        if (result.success && result.user) {
          setUser(result.user);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const result = await authService.login(usernameOrEmail, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        setError(null);
      } else {
        setError(result.message || 'Login failed');
        throw new Error(result.message);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      const result = await authService.register(userData);
      setError(null);
      return result;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
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
