import { create } from 'zustand';
import customerApi from '../../shared/services/customerApi';

const useProductStore = create((set, get) => ({
  products: [],
  product: null,
  categories: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },

  // Fetch all products
  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await customerApi.getProducts(params);
      set({ 
        products: response.products,
        pagination: response.pagination,
        loading: false
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch products',
        loading: false
      });
      return null;
    }
  },

  // Fetch single product
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await customerApi.getProduct(id);
      set({ 
        product: response.product,
        loading: false
      });
      return response.product;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch product',
        loading: false
      });
      return null;
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await customerApi.getCategories();
      set({ 
        categories: response.categories,
        loading: false
      });
      return response.categories;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch categories',
        loading: false
      });
      return null;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset product detail
  resetProduct: () => set({ product: null }),
}));

export default useProductStore;