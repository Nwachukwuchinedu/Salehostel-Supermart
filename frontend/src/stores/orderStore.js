import { create } from "zustand";
import api from "../shared/services/api";

const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  // Create new order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/orders", orderData);
      const order = response.data.order;

      set({
        currentOrder: order,
        loading: false,
        error: null,
      });

      return { success: true, order };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create order";
      set({
        loading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Fetch user orders
  fetchOrders: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = {
        page: params.page || get().pagination.page,
        limit: params.limit || get().pagination.limit,
        ...params,
      };

      const response = await api.get("/orders", { params: queryParams });
      const { orders, pagination } = response.data;

      set({
        orders,
        pagination,
        loading: false,
        error: null,
      });

      return { success: true, orders, pagination };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders";
      set({
        loading: false,
        error: errorMessage,
        orders: [],
      });
      return { success: false, error: errorMessage };
    }
  },

  // Fetch single order
  fetchOrder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/orders/${orderId}`);
      const order = response.data.order;

      set({
        currentOrder: order,
        loading: false,
        error: null,
      });

      return { success: true, order };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch order";
      set({
        loading: false,
        error: errorMessage,
        currentOrder: null,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Track order by order number (public endpoint)
  trackOrder: async (orderNumber) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/public/orders/track/${orderNumber}`);
      const order = response.data.order;

      set({
        currentOrder: order,
        loading: false,
        error: null,
      });

      return { success: true, order };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Order not found";
      set({
        loading: false,
        error: errorMessage,
        currentOrder: null,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Cancel order
  cancelOrder: async (orderId, reason = "") => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/orders/${orderId}/cancel`, { reason });
      const order = response.data.order;

      // Update order in orders list
      const { orders } = get();
      const updatedOrders = orders.map((o) => (o._id === orderId ? order : o));

      set({
        orders: updatedOrders,
        currentOrder: order,
        loading: false,
        error: null,
      });

      return { success: true, order };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to cancel order";
      set({
        loading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Reorder (create new order from existing order)
  reorder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(`/orders/${orderId}/reorder`);
      const order = response.data.order;

      set({
        currentOrder: order,
        loading: false,
        error: null,
      });

      return { success: true, order };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reorder";
      set({
        loading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Get order statistics
  getOrderStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/orders/stats");
      const stats = response.data.stats;

      set({
        loading: false,
        error: null,
      });

      return { success: true, stats };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch order stats";
      set({
        loading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Set current page
  setPage: (page) => {
    set({
      pagination: {
        ...get().pagination,
        page,
      },
    });
  },

  // Clear current order
  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Set loading state
  setLoading: (loading) => set({ loading }),
}));

export default useOrderStore;
