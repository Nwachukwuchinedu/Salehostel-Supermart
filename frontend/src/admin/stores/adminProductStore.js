import { create } from 'zustand';
import adminApi from '../../shared/services/adminApi';

const useAdminProductStore = create((set, get) => ({
  products: [],
  product: null,
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
      const response = await adminApi.getProducts(params);
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
      const response = await adminApi.getProduct(id);
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

  // Create product
  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.createProduct(productData);
      set(state => ({
        products: [response.product, ...state.products],
        loading: false
      }));
      return response.product;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to create product',
        loading: false
      });
      return null;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.updateProduct(id, productData);
      set(state => ({
        products: state.products.map(product => 
          product.id === id ? response.product : product
        ),
        product: state.product?.id === id ? response.product : state.product,
        loading: false
      }));
      return response.product;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to update product',
        loading: false
      });
      return null;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await adminApi.deleteProduct(id);
      set(state => ({
        products: state.products.filter(product => product.id !== id),
        loading: false
      }));
      return true;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to delete product',
        loading: false
      });
      return false;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset product detail
  resetProduct: () => set({ product: null }),
}));

export default useAdminProductStore;