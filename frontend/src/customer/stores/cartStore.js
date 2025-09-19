import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customerApi from '../../shared/services/customerApi';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      isAuthenticated: false,

      // Set authentication status
      setAuthStatus: (status) => set({ isAuthenticated: status }),

      // Fetch cart (only for authenticated users)
      fetchCart: async () => {
        // Only fetch from server if user is authenticated
        const { isAuthenticated } = get();
        if (!isAuthenticated) return null;

        set({ loading: true, error: null });
        try {
          const response = await customerApi.getCart();
          const items = response.cart?.items || response.items || response.data?.items || [];
          set({ 
            items: items,
            loading: false
          });
          return items;
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
          const { isAuthenticated, items } = get();
          
          if (isAuthenticated) {
            // Authenticated user - save to server
            const response = await customerApi.addToCart(itemData);
            const serverItems = response.cart?.items || response.items || response.data?.items || [];
            set({ 
              items: serverItems,
              loading: false
            });
            return response;
          } else {
            // Unauthenticated user - save to local storage
            const response = await customerApi.addToCart(itemData);
            const newItem = response.item; // For unauthenticated users, we get item data
            
            // Check if item already exists in cart
            const existingItemIndex = items.findIndex(item => 
              item.product._id === newItem.product._id
            );
            
            let updatedItems;
            if (existingItemIndex > -1) {
              // Update existing item
              updatedItems = [...items];
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
                totalPrice: (updatedItems[existingItemIndex].quantity + newItem.quantity) * newItem.price
              };
            } else {
              // Add new item
              updatedItems = [...items, newItem];
            }
            
            set({ 
              items: updatedItems,
              loading: false
            });
            return response;
          }
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
          const { isAuthenticated, items } = get();
          
          if (isAuthenticated) {
            // Authenticated user - update on server
            const response = await customerApi.updateCartItem({ 
              productId: id, 
              quantity: quantity 
            });
            const serverItems = response.cart?.items || response.items || [];
            set({ 
              items: serverItems,
              loading: false
            });
            return response;
          } else {
            // Unauthenticated user - update in local storage
            const response = await customerApi.updateCartItem({ 
              productId: id, 
              quantity: quantity 
            });
            const updatedItem = response.item;
            
            // Find and update item in local storage
            const updatedItems = items.map(item => 
              item.product._id === id 
                ? { ...item, quantity: updatedItem.quantity, totalPrice: updatedItem.totalPrice }
                : item
            );
            
            set({ 
              items: updatedItems,
              loading: false
            });
            return response;
          }
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
          const { isAuthenticated, items } = get();
          
          if (isAuthenticated) {
            // Authenticated user - remove from server
            const response = await customerApi.removeFromCart({ 
              productId: id 
            });
            const serverItems = response.cart?.items || response.items || [];
            set({ 
              items: serverItems,
              loading: false
            });
            return response;
          } else {
            // Unauthenticated user - remove from local storage
            await customerApi.removeFromCart({ 
              productId: id 
            });
            
            // Remove item from local storage
            const updatedItems = items.filter(item => item.product._id !== id);
            
            set({ 
              items: updatedItems,
              loading: false
            });
            return { success: true };
          }
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
          const { isAuthenticated, items } = get();
          
          if (isAuthenticated) {
            // Authenticated user - clear server cart
            await customerApi.clearCart();
            set({ 
              items: [],
              loading: false
            });
            return true;
          } else {
            // Unauthenticated user - clear local storage
            await customerApi.clearCart();
            set({ 
              items: [],
              loading: false
            });
            return true;
          }
        } catch (error) {
          set({ 
            error: error.message || 'Failed to clear cart',
            loading: false
          });
          return false;
        }
      },

      // Merge guest cart with user cart (when user logs in)
      mergeCart: async () => {
        const { items, isAuthenticated } = get();
        
        // Only merge if user is authenticated and has items in local cart
        if (isAuthenticated && items.length > 0) {
          try {
            // Add each item from local storage to server cart
            for (const item of items) {
              await customerApi.addToCart({
                productId: item.product._id,
                quantity: item.quantity
              });
            }
            
            // Clear local storage and fetch server cart
            set({ items: [] });
            await get().fetchCart();
          } catch (error) {
            console.error('Failed to merge cart:', error);
          }
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