import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      isOpen: false,

      // Add item to cart
      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.unitType === item.unitType
        );

        let newItems;
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          newItems = items.map((cartItem, index) =>
            index === existingItemIndex
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + (item.quantity || 1),
                }
              : cartItem
          );
        } else {
          // Add new item
          newItems = [...items, { ...item, quantity: item.quantity || 1 }];
        }

        set({ items: newItems });
        return { success: true };
      },

      // Remove item from cart
      removeItem: (productId, unitType) => {
        const { items } = get();
        const newItems = items.filter(
          (item) =>
            !(item.productId === productId && item.unitType === unitType)
        );

        set({ items: newItems });
        return { success: true };
      },

      // Update item quantity
      updateQuantity: (productId, unitType, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(productId, unitType);
        }

        const { items } = get();
        const newItems = items.map((item) =>
          item.productId === productId && item.unitType === unitType
            ? { ...item, quantity }
            : item
        );

        set({ items: newItems });
        return { success: true };
      },

      // Clear cart
      clearCart: () => {
        set({ items: [] });
        return { success: true };
      },

      // Get cart totals
      getCartTotals: () => {
        const { items } = get();
        const subtotal = items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const itemCount = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const deliveryFee = subtotal > 0 ? 500 : 0; // ₦500 delivery fee
        const total = subtotal + deliveryFee;

        return {
          subtotal,
          deliveryFee,
          total,
          itemCount,
        };
      },

      // Toggle cart sidebar
      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      // Open cart sidebar
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart sidebar
      closeCart: () => {
        set({ isOpen: false });
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Set loading state
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export default useCartStore;
