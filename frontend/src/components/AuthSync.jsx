import React, { useEffect } from "react";
import useAuthStore from "../stores/authStore";
import useCartStore from "../customer/stores/cartStore";

const AuthSync = () => {
  const { isAuthenticated } = useAuthStore();
  const { setAuthStatus, mergeCart } = useCartStore();

  useEffect(() => {
    // Sync authentication status between stores
    setAuthStatus(isAuthenticated);
    
    // When user logs in, merge guest cart with user cart
    if (isAuthenticated) {
      mergeCart();
    }
  }, [isAuthenticated, setAuthStatus, mergeCart]);

  return null; // This component doesn't render anything
};

export default AuthSync;