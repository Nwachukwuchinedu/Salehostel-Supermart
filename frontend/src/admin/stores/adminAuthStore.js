import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import adminApi from '../../shared/services/adminApi';

const useAdminAuthStore = create(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login admin
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await adminApi.login(credentials);
          set({ 
            admin: response.admin, 
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

      // Logout admin
      logout: async () => {
        try {
          await adminApi.logout();
        } catch (error) {
          console.error('Logout error:', error);
        }
        set({ 
          admin: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      // Get admin profile
      getProfile: async () => {
        set({ loading: true, error: null });
        try {
          const response = await adminApi.getProfile();
          set({ 
            admin: response.admin, 
            isAuthenticated: true, 
            loading: false 
          });
          return response.admin;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to fetch profile', 
            loading: false 
          });
          return null;
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({ 
        admin: state.admin, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAdminAuthStore;