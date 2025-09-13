import React, { useState } from 'react'
import { X, ShoppingCart, Trash2, Minus, Plus, CreditCard } from 'lucide-react'

const CartSidebar = ({ isOpen, onClose }) => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      quantity: 2,
      image: "https://placehold.co/100x100/7c3aed/white?text=Headphones"
    },
    {
      id: 2,
      name: "Smartphone XYZ Pro",
      price: 699.99,
      quantity: 1,
      image: "https://placehold.co/100x100/7c3aed/white?text=Smartphone"
    }
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0
  const total = subtotal + shipping

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  return (
    <div className={`customer-cart-sidebar ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <button 
              onClick={onClose}
              className="customer-btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="customer-cart-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                  <p className="text-sm text-gray-600">₦{item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₦{(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-200/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">₦{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold text-gray-900">{shipping === 0 ? 'Free' : `₦${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-customer-primary">₦{total.toFixed(2)}</span>
          </div>
          
          <div className="space-y-3">
            <button className="customer-btn-primary w-full">
              <CreditCard className="w-5 h-5 mr-2" />
              Checkout
            </button>
            <button 
              onClick={onClose}
              className="customer-btn-secondary w-full"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartSidebar