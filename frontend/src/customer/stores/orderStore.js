import { create } from 'zustand';
import customerApi from '../../../shared/services/customerApi';

const useOrderStore = create((set, get) => ({
  orders: [],
  order: null,
  loading: false,
  error: null,

  // Fetch all orders
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await customerApi.getOrders();
      set({ 
        orders: response.orders,
        loading: false
      });
      return response.orders;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch orders',
        loading: false
      });
      return null;
    }
  },

  // Fetch single order
  fetchOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await customerApi.getOrder(id);
      set({ 
        order: response.order,
        loading: false
      });
      return response.order;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch order',
        loading: false
      });
      return null;
    }
  },

  // Create order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const response = await customerApi.createOrder(orderData);
      set(state => ({
        orders: [response.order, ...state.orders],
        loading: false
      }));
      return response.order;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to create order',
        loading: false
      });
      return null;
    }
  },

  // Track order
  trackOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await customerApi.trackOrder(id);
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to track order',
        loading: false
      });
      return null;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset order detail
  resetOrder: () => set({ order: null }),
}));

export default useOrderStore;