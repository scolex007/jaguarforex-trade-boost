
// Simple token management utilities

/**
 * Get the JWT token from local storage
 */
export const getToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

/**
 * Set JWT token in local storage
 */
export const setToken = (token: string): void => {
  localStorage.setItem('jwt_token', token);
};

/**
 * Remove JWT token from local storage
 */
export const removeToken = (): void => {
  localStorage.removeItem('jwt_token');
};

/**
 * Check if the user is authenticated (has a token)
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
