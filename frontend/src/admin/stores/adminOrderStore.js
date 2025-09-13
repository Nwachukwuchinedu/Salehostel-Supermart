import { create } from 'zustand';
import adminApi from '../../shared/services/adminApi';

const useAdminOrderStore = create((set, get) => ({
  orders: [],
  order: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },

  // Fetch all orders
  fetchOrders: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getOrders(params);
      set({ 
        orders: response.orders,
        pagination: response.pagination,
        loading: false
      });
      return response;
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
      const response = await adminApi.getOrder(id);
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

  // Update order status
  updateOrderStatus: async (id, statusData) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.updateOrderStatus(id, statusData);
      set(state => ({
        orders: state.orders.map(order => 
          order.id === id ? { ...order, ...response.order } : order
        ),
        order: state.order?.id === id ? { ...state.order, ...response.order } : state.order,
        loading: false
      }));
      return response.order;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to update order status',
        loading: false
      });
      return null;
    }
  },

  // Process refund
  processRefund: async (id, refundData) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.processRefund(id, refundData);
      set(state => ({
        orders: state.orders.map(order => 
          order.id === id ? { ...order, ...response.order } : order
        ),
        order: state.order?.id === id ? { ...state.order, ...response.order } : state.order,
        loading: false
      }));
      return response.order;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to process refund',
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

export default useAdminOrderStore;