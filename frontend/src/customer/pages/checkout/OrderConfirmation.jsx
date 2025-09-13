import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingCart, Package, CreditCard, Truck } from 'lucide-react';

const OrderConfirmation = () => {
  // Sample order data
  const order = {
    id: 'ORD-2023-001',
    date: 'June 15, 2023',
    status: 'Processing',
    total: 2195.96,
    items: [
      { id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
      { id: 2, name: 'Smartphone', price: 699.99, quantity: 1, image: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
      { id: 3, name: 'Laptop', price: 1299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    ],
    shipping: {
      method: 'Standard Shipping',
      cost: 15.99,
      address: '123 Main St, Apt 4B, New York, NY 10001',
      estimatedDelivery: 'June 22, 2023'
    },
    payment: {
      method: 'Visa ending in 1234',
      amount: 2195.96
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Processing': return 'text-amber-600 bg-amber-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-customer-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-customer-primary" />
        </div>
        <h1 className="text-3xl font-bold text-customer-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-customer-gray-600 max-w-2xl mx-auto">
          Thank you for your order. We've sent a confirmation email to {order.email}. 
          Your order details are below.
        </p>
      </div>

      <div className="customer-glass-card rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-customer-gray-900">Order #{order.id}</h2>
            <p className="text-customer-gray-600">Placed on {order.date}</p>
          </div>
          <span className={`status-badge ${getStatusClass(order.status)} mt-4 md:mt-0`}>
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Shipping Information</h3>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-customer-gray-400 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-customer-gray-900">{order.shipping.address}</p>
                <p className="text-customer-gray-600 mt-2">
                  <span className="font-medium">Method:</span> {order.shipping.method}
                </p>
                <p className="text-customer-gray-600">
                  <span className="font-medium">Estimated Delivery:</span> {order.shipping.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Payment Information</h3>
            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-customer-gray-400 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-customer-gray-900">{order.payment.method}</p>
                <p className="text-customer-gray-600 mt-2">
                  <span className="font-medium">Amount:</span> ${order.payment.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Order Items</h3>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="ml-6 flex-1">
                  <h4 className="font-medium text-customer-gray-900">{item.name}</h4>
                  <p className="text-customer-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="font-medium text-customer-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-customer-gray-200 pt-6 mt-8">
          <div className="flex justify-between mb-2">
            <span className="text-customer-gray-600">Subtotal</span>
            <span className="font-medium">${(order.total - order.shipping.cost).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-customer-gray-600">Shipping</span>
            <span className="font-medium">${order.shipping.cost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span className="text-customer-gray-900">Total</span>
            <span className="text-customer-gray-900">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="customer-glass-card rounded-2xl p-6 text-center">
          <Package className="w-8 h-8 text-customer-primary mx-auto mb-4" />
          <h3 className="font-semibold text-customer-gray-900 mb-2">Processing</h3>
          <p className="text-customer-gray-600 text-sm">
            We're preparing your order
          </p>
        </div>
        
        <div className="customer-glass-card rounded-2xl p-6 text-center">
          <Truck className="w-8 h-8 text-customer-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-customer-gray-900 mb-2">Shipped</h3>
          <p className="text-customer-gray-600 text-sm">
            Your order is on the way
          </p>
        </div>
        
        <div className="customer-glass-card rounded-2xl p-6 text-center">
          <Check className="w-8 h-8 text-customer-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-customer-gray-900 mb-2">Delivered</h3>
          <p className="text-customer-gray-600 text-sm">
            Your order has arrived
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="customer-btn-primary">
          Continue Shopping
        </Link>
        <Link to="/account/orders" className="customer-btn-secondary">
          View Order Details
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;