import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import Loading from './common/Loading';

/**
 * Protected Route Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string|string[]} props.allowedRoles - Allowed roles for this route
 * @param {string} props.redirectPath - Path to redirect to if not authorized
 */
const ProtectedRoute = ({ children, allowedRoles, redirectPath = '/login' }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <Loading />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If user data is not loaded yet, show loading
  if (!user) {
    return <Loading />;
  }

  // Check role authorization
  if (allowedRoles) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!roles.includes(user.role)) {
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          return <Navigate to="/admin" replace />;
        case 'customer':
          return <Navigate to="/" replace />;
        case 'supplier':
          // Add supplier dashboard route when implemented
          return <Navigate to="/login" replace />;
        case 'staff':
          // Add staff dashboard route when implemented
          return <Navigate to="/login" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;