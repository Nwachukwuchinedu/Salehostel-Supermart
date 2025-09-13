import { create } from 'zustand';
import adminApi from '../../shared/services/adminApi';

const useAdminUserStore = create((set, get) => ({
  users: [],
  user: null,
  customers: [],
  admins: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },

  // Fetch all users
  fetchUsers: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getUsers(params);
      set({ 
        users: response.users,
        pagination: response.pagination,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch users',
        loading: false
      });
      return null;
    }
  },

  // Fetch single user
  fetchUser: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getUser(id);
      set({ 
        user: response.user,
        loading: false
      });
      return response.user;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch user',
        loading: false
      });
      return null;
    }
  },

  // Create user
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.createUser(userData);
      set(state => ({
        users: [response.user, ...state.users],
        loading: false
      }));
      return response.user;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to create user',
        loading: false
      });
      return null;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.updateUser(id, userData);
      set(state => ({
        users: state.users.map(user => 
          user.id === id ? response.user : user
        ),
        user: state.user?.id === id ? response.user : state.user,
        loading: false
      }));
      return response.user;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to update user',
        loading: false
      });
      return null;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await adminApi.deleteUser(id);
      set(state => ({
        users: state.users.filter(user => user.id !== id),
        loading: false
      }));
      return true;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to delete user',
        loading: false
      });
      return false;
    }
  },

  // Fetch customers
  fetchCustomers: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getCustomers(params);
      set({ 
        customers: response.customers,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch customers',
        loading: false
      });
      return null;
    }
  },

  // Fetch admins
  fetchAdmins: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getAdmins(params);
      set({ 
        admins: response.admins,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch admins',
        loading: false
      });
      return null;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset user detail
  resetUser: () => set({ user: null }),
}));

export default useAdminUserStore;