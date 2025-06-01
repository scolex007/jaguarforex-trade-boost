// Authentication utility functions

export const AUTH_TOKEN_KEY = 'jaguarforex_token';
export const AUTH_USER_KEY = 'jaguarforex_user';

export interface StoredUser {
  id: number;
  username: string;
  email: string;
  name: string;
  last_name: string;
  member_type: string;
  [key: string]: any;
}

/**
 * Get the stored authentication token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Set the authentication token
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Remove the authentication token
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Get the stored user data
 */
export const getStoredUser = (): StoredUser | null => {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    removeStoredUser();
    return null;
  }
};

/**
 * Set the stored user data
 */
export const setStoredUser = (user: StoredUser): void => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

/**
 * Remove the stored user data
 */
export const removeStoredUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
};

/**
 * Clear all authentication data
 */
export const clearAuthData = (): void => {
  removeAuthToken();
  removeStoredUser();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Get authorization header
 */
export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Handle authentication error (401)
 */
export const handleAuthError = (): void => {
  clearAuthData();
  
  // Redirect to login if not already there
  if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
    window.location.href = '/login?session_expired=true';
  }
};

/**
 * Parse JWT token
 */
export const parseJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
};

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = parseJWT(token);
  if (!payload || !payload.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

/**
 * Get time until token expires (in seconds)
 */
export const getTokenExpirationTime = (token: string): number => {
  const payload = parseJWT(token);
  if (!payload || !payload.exp) return 0;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return Math.max(0, payload.exp - currentTime);
};