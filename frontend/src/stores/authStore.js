import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login action (simplified for now)
      login: async (credentials) => {
        set({ loading: true, error: null });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock successful login
        const mockUser = {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: credentials.email,
          role: "customer",
        };

        const mockToken = "mock-jwt-token";

        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
          loading: false,
          error: null,
        });

        return { success: true, user: mockUser };
      },

      // Register action (simplified for now)
      register: async (userData) => {
        set({ loading: true, error: null });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock successful registration
        const mockUser = {
          id: "1",
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: "customer",
        };

        const mockToken = "mock-jwt-token";

        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
          loading: false,
          error: null,
        });

        return { success: true, user: mockUser };
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

      // Update profile (simplified for now)
      updateProfile: async (profileData) => {
        set({ loading: true, error: null });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const { user } = get();
        const updatedUser = { ...user, ...profileData };

        set({
          user: updatedUser,
          loading: false,
          error: null,
        });

        return { success: true, user: updatedUser };
      },

      // Verify token (simplified for now)
      verifyToken: async () => {
        const { token } = get();
        if (!token) return false;

        // For now, just return true if token exists
        return true;
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
