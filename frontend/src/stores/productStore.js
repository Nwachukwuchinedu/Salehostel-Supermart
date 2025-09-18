import { create } from "zustand";
import api from "../services/api";

const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  currentProduct: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  filters: {
    category: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "name",
    sortOrder: "asc",
  },

  // Fetch all products (public endpoint)
  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = {
        ...get().filters,
        ...params,
        page: params.page || get().pagination.page,
        limit: params.limit || get().pagination.limit,
      };

      const response = await api.get("/public/products", {
        params: queryParams,
      });
      const { products, pagination } = response.data;

      set({
        products,
        pagination,
        loading: false,
        error: null,
      });

      return { success: true, products, pagination };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch products";
      set({
        loading: false,
        error: errorMessage,
        products: [],
      });
      return { success: false, error: errorMessage };
    }
  },

  // Fetch single product
  fetchProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/public/products/${productId}`);
      const product = response.data.product;

      set({
        currentProduct: product,
        loading: false,
        error: null,
      });

      return { success: true, product };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch product";
      set({
        loading: false,
        error: errorMessage,
        currentProduct: null,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Fetch categories (public endpoint)
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/public/categories");
      const categories = response.data.categories;

      set({
        categories,
        loading: false,
        error: null,
      });

      return { success: true, categories };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch categories";
      set({
        loading: false,
        error: errorMessage,
        categories: [],
      });
      return { success: false, error: errorMessage };
    }
  },

  // Fetch products by category
  fetchProductsByCategory: async (categoryId, params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = {
        ...params,
        page: params.page || 1,
        limit: params.limit || 12,
      };

      const response = await api.get(
        `/public/products/category/${categoryId}`,
        {
          params: queryParams,
        }
      );
      const { products, pagination } = response.data;

      set({
        products,
        pagination,
        loading: false,
        error: null,
      });

      return { success: true, products, pagination };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch products";
      set({
        loading: false,
        error: errorMessage,
        products: [],
      });
      return { success: false, error: errorMessage };
    }
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = {
        q: query,
        ...params,
        page: params.page || 1,
        limit: params.limit || 12,
      };

      const response = await api.get("/public/products/search", {
        params: queryParams,
      });
      const { products, pagination } = response.data;

      set({
        products,
        pagination,
        loading: false,
        error: null,
      });

      return { success: true, products, pagination };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Search failed";
      set({
        loading: false,
        error: errorMessage,
        products: [],
      });
      return { success: false, error: errorMessage };
    }
  },

  // Update filters
  updateFilters: (newFilters) => {
    set({
      filters: {
        ...get().filters,
        ...newFilters,
      },
    });
  },

  // Reset filters
  resetFilters: () => {
    set({
      filters: {
        category: "",
        search: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "name",
        sortOrder: "asc",
      },
    });
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

  // Clear current product
  clearCurrentProduct: () => {
    set({ currentProduct: null });
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Set loading state
  setLoading: (loading) => set({ loading }),
}));

export default useProductStore;
