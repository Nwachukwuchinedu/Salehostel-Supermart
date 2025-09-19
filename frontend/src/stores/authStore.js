import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../shared/services/api";

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
          console.log('Logging in with credentials:', credentials);
          const response = await api.post('/auth/login', credentials);
          console.log('Login API response:', response);
          
          // Check if response exists and has success property
          if (response && typeof response === 'object' && response.success) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            
            return { success: true, user: response.user };
          } else {
            const errorMessage = response && typeof response === 'object' && response.message ? response.message : 'Login failed';
            set({ 
              error: errorMessage,
              loading: false 
            });
            return { success: false, error: errorMessage };
          }
        } catch (error) {
          console.error('Login error:', error);
          const errorMessage = error && error.message ? error.message : 'Login failed';
          set({ 
            error: errorMessage,
            loading: false 
          });
          return { success: false, error: errorMessage };
        }
      },

      // Register action
      register: async (userData) => {
        set({ loading: true, error: null });

        try {
          console.log('Registering user with data:', userData);
          const response = await api.post('/auth/register', userData);
          console.log('Registration API response:', response);
          
          // Check if response exists and has success property
          if (response && typeof response === 'object' && response.success) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            
            return { success: true, user: response.user };
          } else {
            const errorMessage = response && typeof response === 'object' && response.message ? response.message : 'Registration failed';
            set({ 
              error: errorMessage,
              loading: false 
            });
            return { success: false, error: errorMessage };
          }
        } catch (error) {
          console.error('Registration error:', error);
          const errorMessage = error && error.message ? error.message : 'Registration failed';
          set({ 
            error: errorMessage,
            loading: false 
          });
          return { success: false, error: errorMessage };
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
          
          // Check if response exists and has success property
          if (response && typeof response === 'object' && response.success) {
            set({
              user: response.user,
              loading: false,
              error: null,
            });
            
            return { success: true, user: response.user };
          } else {
            const errorMessage = response && typeof response === 'object' && response.message ? response.message : 'Profile update failed';
            set({ 
              error: errorMessage,
              loading: false 
            });
            return { success: false, error: errorMessage };
          }
        } catch (error) {
          const errorMessage = error && error.message ? error.message : 'Profile update failed';
          set({ 
            error: errorMessage,
            loading: false 
          });
          return { success: false, error: errorMessage };
        }
      },

      // Get current user profile
      getProfile: async () => {
        const { token } = get();
        if (!token) return null;

        set({ loading: true, error: null });
        
        try {
          const response = await api.get('/auth/profile');
          
          // Check if response exists and has success property
          if (response && typeof response === 'object' && response.success) {
            set({
              user: response.user,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            
            return response.user;
          } else {
            const errorMessage = response && typeof response === 'object' && response.message ? response.message : 'Failed to fetch profile';
            set({ 
              error: errorMessage,
              loading: false 
            });
            return null;
          }
        } catch (error) {
          const errorMessage = error && error.message ? error.message : 'Failed to fetch profile';
          set({ 
            error: errorMessage,
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