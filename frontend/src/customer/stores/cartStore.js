import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customerApi from '../../shared/services/customerApi';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,

      // Fetch cart
      fetchCart: async () => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.getCart();
          set({ 
            items: response.items,
            loading: false
          });
          return response.items;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to fetch cart',
            loading: false
          });
          return null;
        }
      },

      // Add to cart
      addToCart: async (itemData) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.addToCart(itemData);
          set({ 
            items: response.items,
            loading: false
          });
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to add item to cart',
            loading: false
          });
          return null;
        }
      },

      // Update cart item
      updateCartItem: async (id, quantity) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.updateCartItem(id, quantity);
          set({ 
            items: response.items,
            loading: false
          });
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to update cart item',
            loading: false
          });
          return null;
        }
      },

      // Remove from cart
      removeFromCart: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.removeFromCart(id);
          set({ 
            items: response.items,
            loading: false
          });
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to remove item from cart',
            loading: false
          });
          return null;
        }
      },

      // Clear cart
      clearCart: async () => {
        set({ loading: true, error: null });
        try {
          await customerApi.clearCart();
          set({ 
            items: [],
            loading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to clear cart',
            loading: false
          });
          return false;
        }
      },

      // Get cart total
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      // Get cart item count
      getCartItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;