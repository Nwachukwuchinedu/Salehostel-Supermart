import useAuthStore from "../../stores/authStore";

/**
 * Check if user is authenticated
 * @returns {boolean} Whether user is authenticated
 */
export const isAuthenticated = () => {
  const { isAuthenticated } = useAuthStore.getState();
  return isAuthenticated;
};

/**
 * Get current user role
 * @returns {string|null} User role or null if not authenticated
 */
export const getUserRole = () => {
  const { user } = useAuthStore.getState();
  return user ? user.role : null;
};

/**
 * Check if user has specific role
 * @param {string} role - Role to check
 * @returns {boolean} Whether user has the specified role
 */
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Check if user has any of the specified roles
 * @param {string[]} roles - Array of roles to check
 * @returns {boolean} Whether user has any of the specified roles
 */
export const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return userRole && roles.includes(userRole);
};

/**
 * Check if user is admin
 * @returns {boolean} Whether user is admin
 */
export const isAdmin = () => {
  return hasRole('admin');
};

/**
 * Check if user is customer
 * @returns {boolean} Whether user is customer
 */
export const isCustomer = () => {
  return hasRole('customer');
};

/**
 * Check if user is supplier
 * @returns {boolean} Whether user is supplier
 */
export const isSupplier = () => {
  return hasRole('supplier');
};

/**
 * Check if user is staff
 * @returns {boolean} Whether user is staff
 */
export const isStaff = () => {
  return hasRole('staff');
};

export default {
  isAuthenticated,
  getUserRole,
  hasRole,
  hasAnyRole,
  isAdmin,
  isCustomer,
  isSupplier,
  isStaff
};