import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import useCartStore from "../customer/stores/cartStore";

const AuthWrapper = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { setAuthStatus, mergeCart } = useCartStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Sync authentication status between stores
    setAuthStatus(isAuthenticated);
    
    // When user logs in, merge guest cart with user cart
    if (isAuthenticated) {
      mergeCart();
      
      // Redirect user based on their role
      if (user && user.role) {
        // Prevent redirect loops
        const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
        
        if (isAuthRoute) {
          switch (user.role) {
            case 'admin':
              navigate('/admin', { replace: true });
              break;
            case 'supplier':
              // Add supplier route when implemented
              break;
            case 'staff':
              // Add staff route when implemented
              break;
            case 'customer':
            default:
              navigate('/', { replace: true });
              break;
          }
        }
      }
    }
  }, [isAuthenticated, user, setAuthStatus, mergeCart, navigate, location.pathname]);

  return null; // This component doesn't render anything
};

export default AuthWrapper;