import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', sku: 'WH-001' },
    { id: 2, name: 'Smartphone', price: 699.99, quantity: 1, image: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', sku: 'SP-002' },
    { id: 3, name: 'Laptop', price: 1299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', sku: 'LP-003' },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

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
              {cartItems.map((item) => (
                <div key={item.id} className="customer-glass-card rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-customer-gray-900">{item.name}</h3>
                          <p className="text-customer-gray-600">SKU: {item.sku}</p>
                        </div>
                        
                        <div className="mt-2 sm:mt-0">
                          <p className="text-xl font-bold text-customer-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 border border-customer-gray-300 rounded-l-lg hover:bg-customer-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center border-y border-customer-gray-300 py-2"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 border border-customer-gray-300 rounded-r-lg hover:bg-customer-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 flex items-center">
                          <p className="text-lg font-semibold text-customer-gray-900 mr-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-customer-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-customer-gray-200 pt-4 flex justify-between">
                <span className="text-customer-gray-900 font-bold">Total</span>
                <span className="text-customer-gray-900 font-bold text-lg">${total.toFixed(2)}</span>
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