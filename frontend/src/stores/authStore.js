import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login action
      login: async (credentials) => {
        set({ loading: true, error: null });

        try {
          const { data: response } = await api.post('/auth/login', credentials);
          
          if (response.success) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            
            return { success: true, user: response.user };
          } else {
            set({ 
              error: response.message || 'Login failed',
              loading: false 
            });
            return { success: false, error: response.message || 'Login failed' };
          }
        } catch (error) {
          set({ 
            error: error.message || 'Login failed',
            loading: false 
          });
          return { success: false, error: error.message || 'Login failed' };
        }
      },

      // Register action
      register: async (userData) => {
        set({ loading: true, error: null });

        try {
          const { data: response } = await api.post('/auth/register', userData);
          
          if (response.success) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            
            return { success: true, user: response.user };
          } else {
            set({ 
              error: response.message || 'Registration failed',
              loading: false 
            });
            return { success: false, error: response.message || 'Registration failed' };
          }
        } catch (error) {
          set({ 
            error: error.message || 'Registration failed',
            loading: false 
          });
          return { success: false, error: error.message || 'Registration failed' };
        }
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });

        // Clear persisted state
        localStorage.removeItem("auth-storage");
      },

      // Update profile
      updateProfile: async (profileData) => {
        set({ loading: true, error: null });

        try {
          const response = await api.put('/auth/profile', profileData);
          
          if (response.success) {
            set({
              user: response.user,
              loading: false,
              error: null,
            });
            
            return { success: true, user: response.user };
          } else {
            set({ 
              error: response.message || 'Profile update failed',
              loading: false 
            });
            return { success: false, error: response.message || 'Profile update failed' };
          }
        } catch (error) {
          set({ 
            error: error.message || 'Profile update failed',
            loading: false 
          });
          return { success: false, error: error.message || 'Profile update failed' };
        }
      },

      // Get current user profile
      getProfile: async () => {
        const { token } = get();
        if (!token) return null;

        set({ loading: true, error: null });
        
        try {
          const response = await api.get('/auth/profile');
          
          if (response.success) {
            set({
              user: response.user,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            
            return response.user;
          } else {
            set({ 
              error: response.message || 'Failed to fetch profile',
              loading: false 
            });
            return null;
          }
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

      // Set loading state
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;