import { create } from 'zustand';
import adminApi from '../../shared/services/adminApi';

const useAdminReportStore = create((set, get) => ({
  salesData: [],
  inventoryData: [],
  profitLossData: [],
  customerData: [],
  productPerformanceData: [],
  loading: false,
  error: null,

  // Fetch sales report
  fetchSalesReport: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getSalesReport(params);
      set({ 
        salesData: response.data,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch sales report',
        loading: false
      });
      return null;
    }
  },

  // Fetch inventory report
  fetchInventoryReport: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getInventoryReport(params);
      set({ 
        inventoryData: response.data,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch inventory report',
        loading: false
      });
      return null;
    }
  },

  // Fetch profit and loss report
  fetchProfitLossReport: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getProfitLossReport(params);
      set({ 
        profitLossData: response.data,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch profit and loss report',
        loading: false
      });
      return null;
    }
  },

  // Fetch customer report
  fetchCustomerReport: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getCustomerReport(params);
      set({ 
        customerData: response.data,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch customer report',
        loading: false
      });
      return null;
    }
  },

  // Fetch product performance report
  fetchProductPerformance: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.getProductPerformance(params);
      set({ 
        productPerformanceData: response.data,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch product performance report',
        loading: false
      });
      return null;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAdminReportStore;