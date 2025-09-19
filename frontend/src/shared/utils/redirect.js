/**
 * Get redirect path based on user role
 * @param {string} role - User role
 * @returns {string} Redirect path
 */
export const getRedirectPathByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'customer':
      return '/';
    case 'supplier':
      // Add supplier dashboard route when implemented
      return '/supplier';
    case 'staff':
      // Add staff dashboard route when implemented
      return '/staff';
    default:
      return '/';
  }
};

/**
 * Get home path based on user role
 * @param {string} role - User role
 * @returns {string} Home path
 */
export const getHomePathByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'customer':
      return '/';
    case 'supplier':
      // Add supplier dashboard route when implemented
      return '/supplier';
    case 'staff':
      // Add staff dashboard route when implemented
      return '/staff';
    default:
      return '/';
  }
};

export default {
  getRedirectPathByRole,
  getHomePathByRole
};