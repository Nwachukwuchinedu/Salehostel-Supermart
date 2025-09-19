import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';
import useCartStore from '../../stores/cartStore';
import customerApi from '../../../shared/services/customerApi';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items: cartItems, updateCartItem, removeFromCart, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      await fetchCart();
      setError(null);
    } catch (err) {
      console.error('Failed to fetch cart data:', err);
      setError('Failed to load cart data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    
    try {
      // Update on backend and local store
      await updateCartItem(itemId, newQuantity);
    } catch (err) {
      console.error('Failed to update cart item:', err);
      // Revert UI change on error
      fetchCartData();
      alert('Failed to update item quantity. Please try again.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Remove from backend and local store
      await removeFromCart(itemId);
    } catch (err) {
      console.error('Failed to remove cart item:', err);
      // Revert UI change on error
      fetchCartData();
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || item.sellingPrice || 0) * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customer-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="customer-glass-card p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchCartData}
            className="customer-btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Link to="/" className="flex items-center text-customer-gray-600 hover:text-customer-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-customer-gray-900 mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-customer-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-customer-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-customer-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
              <Link to="/" className="customer-btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => {
                // Handle different cart item structures
                // For unauthenticated users, item has { product: { _id, name, ... }, quantity, price, ... }
                // For authenticated users, item might have { _id, product: { _id, name, ... }, quantity, ... }
                const productId = item.product?._id || item.productId || item._id;
                const uniqueKey = productId || `${item.name || item.product?.name}-${item.sku || item.product?.sku || Math.random()}`;
                
                // Ensure we have a valid product ID for API calls
                if (!productId) {
                  console.warn('Cart item missing product ID:', item);
                  return null; // Skip items without product IDs
                }
                
                return (
                  <div key={uniqueKey} className="customer-glass-card rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img 
                          src={item.image || item.images?.[0] || item.product?.image || item.product?.images?.[0] || "https://placehold.co/300x300"} 
                          alt={item.name || item.product?.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-customer-gray-900">{item.name || item.product?.name}</h3>
                            <p className="text-customer-gray-600">SKU: {item.sku || item.product?.sku || 'N/A'}</p>
                          </div>
                          
                          <div className="mt-2 sm:mt-0">
                            <p className="text-xl font-bold text-customer-gray-900">₦{(item.price || item.sellingPrice || item.product?.price || item.product?.sellingPrice || 0).toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleUpdateQuantity(productId, item.quantity - 1)}
                              className="p-2 border border-customer-gray-300 rounded-l-lg hover:bg-customer-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(productId, parseInt(e.target.value) || 1)}
                              className="w-16 text-center border-y border-customer-gray-300 py-2"
                            />
                            <button
                              onClick={() => handleUpdateQuantity(productId, item.quantity + 1)}
                              className="p-2 border border-customer-gray-300 rounded-r-lg hover:bg-customer-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 flex items-center">
                            <p className="text-lg font-semibold text-customer-gray-900 mr-4">
                              ₦{((item.price || item.sellingPrice || item.product?.price || item.product?.sellingPrice || 0) * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(productId)}
                              className="p-2 text-customer-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="customer-glass-card rounded-2xl p-6 sticky top-8">
            <h2 className="text-xl font-bold text-customer-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Subtotal</span>
                <span className="font-medium">₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : `₦${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Tax</span>
                <span className="font-medium">₦{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-customer-gray-200 pt-4 flex justify-between">
                <span className="text-customer-gray-900 font-bold">Total</span>
                <span className="text-customer-gray-900 font-bold text-lg">₦{total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="customer-btn-primary w-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </Link>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-customer-primary hover:text-customer-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;