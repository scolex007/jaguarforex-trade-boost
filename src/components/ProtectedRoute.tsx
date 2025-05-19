
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Check if we're already on the login page to prevent redirect loops
  const isLoginPage = location.pathname === '/login';
  
  // If still loading, show loading spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jaguargold"></div>
      </div>
    );
  }

  // Only redirect to login if not authenticated and not already on login page
  if (!isAuthenticated && !loading && !isLoginPage) {
    return <Navigate to="/login" />;
  }

  // If authenticated or on login page, render children
  return <>{children}</>;
};

export default ProtectedRoute;
