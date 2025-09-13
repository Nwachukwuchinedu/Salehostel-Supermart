import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowLeft, 
  Download, 
  Printer 
} from 'lucide-react';

const OrderDetails = () => {
  // Sample order data
  const order = {
    id: '#ORD-001',
    date: '2023-06-15',
    status: 'delivered',
    total: 245.99,
    subtotal: 220.00,
    shipping: 15.99,
    tax: 10.00,
    tracking: 'TRK123456789',
    estimatedDelivery: '2023-06-20',
    items: [
      {
        id: 1,
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
        price: 199.99,
        quantity: 1,
        variant: 'Black'
      },
      {
        id: 2,
        name: 'Phone Case',
        image: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
        price: 24.99,
        quantity: 1,
        variant: 'Silicone, Black'
      },
      {
        id: 3,
        name: 'USB Cable',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
        price: 12.99,
        quantity: 2,
        variant: '3m, White'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    },
    paymentMethod: 'Visa ending in 1234',
    paymentStatus: 'paid'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <Link to="/account/orders" className="flex items-center text-customer-gray-600 hover:text-customer-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-customer-gray-900">Order Details</h1>
            <p className="text-customer-gray-600">Order {order.id} • Placed on {order.date}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="customer-btn-secondary flex items-center">
              <Printer className="w-5 h-5 mr-2" />
              Print
            </button>
            <button className="customer-btn-secondary flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="customer-glass-card rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {getStatusIcon(order.status)}
            <div className="ml-3">
              <h2 className="text-xl font-semibold text-customer-gray-900">{getStatusText(order.status)}</h2>
              <p className="text-customer-gray-600">Order #{order.id}</p>
            </div>
          </div>
          <div className="flex items-center text-customer-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Estimated delivery: {order.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Items</h3>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex border-b border-customer-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-customer-gray-900">{item.name}</h4>
                    <p className="text-sm text-customer-gray-600">{item.variant}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-customer-gray-900">
                        ${item.price} × {item.quantity}
                      </div>
                      <div className="font-medium text-customer-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="customer-glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Subtotal</span>
                <span className="text-customer-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Shipping</span>
                <span className="text-customer-gray-900">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Tax</span>
                <span className="text-customer-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-customer-gray-200 pt-3 flex justify-between font-semibold">
                <span className="text-customer-gray-900">Total</span>
                <span className="text-customer-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Billing Info */}
        <div>
          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Shipping Address</h3>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-customer-gray-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-customer-gray-700">
                <div className="font-medium">{order.shippingAddress.name}</div>
                <div>{order.shippingAddress.street}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                <div>{order.shippingAddress.country}</div>
                <div className="mt-2 flex items-center">
                  <Phone className="w-4 h-4 text-customer-gray-400 mr-2" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Billing Address</h3>
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-customer-gray-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-customer-gray-700">
                <div className="font-medium">{order.billingAddress.name}</div>
                <div>{order.billingAddress.street}</div>
                <div>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}</div>
                <div>{order.billingAddress.country}</div>
                <div className="mt-2 flex items-center">
                  <Phone className="w-4 h-4 text-customer-gray-400 mr-2" />
                  <span>{order.billingAddress.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="customer-glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Payment Method</h3>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-customer-gray-400 mr-3" />
              <div>
                <div className="font-medium text-customer-gray-900">{order.paymentMethod}</div>
                <div className="text-sm text-green-600">Paid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;