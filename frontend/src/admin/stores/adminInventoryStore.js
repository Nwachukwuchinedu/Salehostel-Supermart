import { create } from 'zustand';
import adminApi from '../../shared/services/adminApi';

const useAdminInventoryStore = create((set, get) => ({
  inventory: [],
  inventoryItem: null,
  movements: [],
  lowStockAlerts: [],
  loading: false,
  error: null,

  // Fetch inventory overview
  fetchInventoryOverview: async () => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getInventoryOverview();
      set({ 
        inventory: response.inventory,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch inventory overview',
        loading: false
      });
      return null;
    }
  },

  // Fetch stock movements
  fetchStockMovements: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getStockMovements(params);
      set({ 
        movements: response.movements,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch stock movements',
        loading: false
      });
      return null;
    }
  },

  // Adjust stock
  adjustStock: async (adjustmentData) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.adjustStock(adjustmentData);
      // Refresh inventory after adjustment
      get().fetchInventoryOverview();
      set({ loading: false });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to adjust stock',
        loading: false
      });
      return null;
    }
  },

  // Fetch low stock alerts
  fetchLowStockAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getLowStockAlerts();
      set({ 
        lowStockAlerts: response.alerts,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch low stock alerts',
        loading: false
      });
      return null;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAdminInventoryStore;