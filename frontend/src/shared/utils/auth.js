// Authentication utilities

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem('auth_token');
  // Clear any other auth-related data
  localStorage.removeItem('user_preferences');
};

// Get user role from token
export const getUserRole = () => {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    // Decode JWT token (this is a simplified version)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if user has specific role
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

// Check if user is admin
export const isAdmin = () => {
  return hasRole('admin') || hasRole('super_admin');
};

// Check if user is customer
export const isCustomer = () => {
  return hasRole('customer');
};

// Check if user is super admin
export const isSuperAdmin = () => {
  return hasRole('super_admin');
};

// Get user ID from token
export const getUserId = () => {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    // Decode JWT token (this is a simplified version)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = () => {
  const token = getAuthToken();
  if (!token) return true;
  
  try {
    // Decode JWT token (this is a simplified version)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Refresh token (placeholder function)
export const refreshToken = async () => {
  // In a real implementation, this would make an API call to refresh the token
  console.log('Refreshing token...');
  return Promise.resolve();
};

// Logout user
export const logout = () => {
  clearAuthData();
  // Redirect to login page or home page
  window.location.href = '/login';
};

// Protected route helper
export const requireAuth = (allowedRoles = []) => {
  if (!isAuthenticated()) {
    return { authenticated: false, redirect: '/login' };
  }
  
  if (isTokenExpired()) {
    logout();
    return { authenticated: false, redirect: '/login' };
  }
  
  if (allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!allowedRoles.includes(userRole)) {
      return { authenticated: false, redirect: '/unauthorized' };
    }
  }
  
  return { authenticated: true };
};