import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1, variant = null) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      if (existingItemIndex > -1) {
        // Update existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [
          ...currentItems,
          {
            id: product.id,
            name: product.name,
            price: variant ? variant.price : product.price,
            image: product.images?.[0] || product.image,
            quantity,
            variant,
            product,
          },
        ];
      }
    });
  };

  const removeItem = (itemId, variant = null) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === itemId &&
            JSON.stringify(item.variant) === JSON.stringify(variant)
          )
      )
    );
  };

  const updateQuantity = (itemId, quantity, variant = null) => {
    if (quantity <= 0) {
      removeItem(itemId, variant);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTax = (taxRate = 0.075) => {
    return getSubtotal() * taxRate;
  };

  const getTotal = (taxRate = 0.075) => {
    return getSubtotal() + getTax(taxRate);
  };

  const isInCart = (productId, variant = null) => {
    return items.some(
      (item) =>
        item.id === productId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );
  };

  const getItemQuantity = (productId, variant = null) => {
    const item = items.find(
      (item) =>
        item.id === productId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );
    return item ? item.quantity : 0;
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(!isOpen);

  const value = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    getTax,
    getTotal,
    isInCart,
    getItemQuantity,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
