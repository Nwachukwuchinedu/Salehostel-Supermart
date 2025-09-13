import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customerApi from '../../shared/services/customerApi';

const useCustomerAuthStore = create(
  persist(
    (set, get) => ({
      customer: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Register customer
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.register(userData);
          set({ 
            customer: response.customer, 
            isAuthenticated: true, 
            loading: false 
          });
          return { success: true, data: response };
        } catch (error) {
          set({ 
            error: error.message || 'Registration failed', 
            loading: false 
          });
          return { success: false, error: error.message || 'Registration failed' };
        }
      },

      // Login customer
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.login(credentials);
          set({ 
            customer: response.customer, 
            isAuthenticated: true, 
            loading: false 
          });
          return { success: true, data: response };
        } catch (error) {
          set({ 
            error: error.message || 'Login failed', 
            loading: false 
          });
          return { success: false, error: error.message || 'Login failed' };
        }
      },

      // Logout customer
      logout: async () => {
        try {
          await customerApi.logout();
        } catch (error) {
          console.error('Logout error:', error);
        }
        set({ 
          customer: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      // Get customer profile
      getProfile: async () => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.getProfile();
          set({ 
            customer: response.customer, 
            isAuthenticated: true, 
            loading: false 
          });
          return response.customer;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to fetch profile', 
            loading: false 
          });
          return null;
        }
      },

      // Update customer profile
      updateProfile: async (profileData) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.updateProfile(profileData);
          set({ 
            customer: response.customer, 
            loading: false 
          });
          return response.customer;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to update profile', 
            loading: false 
          });
          return null;
        }
      },

      // Change password
      changePassword: async (passwordData) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.changePassword(passwordData);
          set({ loading: false });
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to change password', 
            loading: false 
          });
          return null;
        }
      },

      // Forgot password
      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.forgotPassword(email);
          set({ loading: false });
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to send reset link', 
            loading: false 
          });
          return null;
        }
      },

      // Reset password
      resetPassword: async (token, password) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.resetPassword(token, password);
          set({ loading: false });
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to reset password', 
            loading: false 
          });
          return null;
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'customer-auth-storage',
      partialize: (state) => ({ 
        customer: state.customer, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useCustomerAuthStore;