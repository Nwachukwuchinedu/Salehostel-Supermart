import React, { useState } from 'react';
import { ArrowLeft, Printer, Download, Edit, Truck, CreditCard, User, Mail, Phone, MapPin, Calendar, Package, CheckCircle } from 'lucide-react';

const OrderDetails = () => {
  const [order] = useState({
    id: 1,
    orderNumber: 'ORD-2023-001',
    status: 'Processing',
    date: '2023-06-15',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      shippingAddress: '123 Main St, Apt 4B, New York, NY 10001',
      billingAddress: '123 Main St, Apt 4B, New York, NY 10001'
    },
    items: [
      { id: 1, product: 'iPhone 15 Pro Max', sku: 'IPH15PM', quantity: 1, price: 999.99, total: 999.99 },
      { id: 2, product: 'AirPods Pro', sku: 'APP2023', quantity: 1, price: 299.99, total: 299.99 }
    ],
    payment: {
      method: 'Credit Card',
      transactionId: 'TXN-2023-001',
      status: 'Paid'
    },
    shipping: {
      method: 'Standard Shipping',
      trackingNumber: 'TRK-2023-001',
      estimatedDelivery: '2023-06-20'
    },
    totals: {
      subtotal: 1299.98,
      shipping: 0.00,
      tax: 104.00,
      total: 1403.98
    }
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Processing': return 'text-amber-600 bg-amber-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-admin-gray-100 transition-colors">
            <ArrowLeft className="w-6 h-6 text-admin-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-admin-gray-900">Order Details</h1>
            <p className="text-admin-gray-600">View and manage order #{order.orderNumber}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-secondary">
            <Printer className="w-5 h-5 mr-2" />
            Print
          </button>
          <button className="admin-btn-secondary">
            <Download className="w-5 h-5 mr-2" />
            Download
          </button>
          <button className="admin-btn-primary">
            <Edit className="w-5 h-5 mr-2" />
            Edit Order
          </button>
        </div>
      </div>

      {/* Status and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="admin-glass-card p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-admin-gray-900">{order.orderNumber}</h2>
              <p className="text-admin-gray-600">Placed on {order.date}</p>
            </div>
            <span className={`status-badge ${getStatusClass(order.status)}`}>
              {order.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-admin-gray-500">Payment Status</p>
              <p className="font-medium text-admin-gray-900">{order.payment.status}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Payment Method</p>
              <p className="font-medium text-admin-gray-900">{order.payment.method}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Items</p>
              <p className="font-medium text-admin-gray-900">{order.items.length}</p>
            </div>
          </div>
        </div>
        
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Actions</h3>
          <div className="space-y-3">
            <button className="w-full admin-btn-primary">
              <Truck className="w-5 h-5 mr-2" />
              Update Shipping Status
            </button>
            <button className="w-full admin-btn-secondary">
              <CreditCard className="w-5 h-5 mr-2" />
              Process Refund
            </button>
            <button className="w-full admin-btn-secondary">
              <Package className="w-5 h-5 mr-2" />
              Mark as Delivered
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="admin-glass-card p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Customer Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-admin-gray-400" />
              <div>
                <p className="font-medium text-admin-gray-900">{order.customer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-admin-gray-400" />
              <div>
                <p className="font-medium text-admin-gray-900">{order.customer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-admin-gray-400" />
              <div>
                <p className="font-medium text-admin-gray-900">{order.customer.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500 mb-2">Shipping Address</p>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-admin-gray-400 mt-1" />
                <p className="text-admin-gray-900">{order.customer.shippingAddress}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500 mb-2">Billing Address</p>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-admin-gray-400 mt-1" />
                <p className="text-admin-gray-900">{order.customer.billingAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="admin-glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Items</h3>
          <div className="admin-table">
            <div className="admin-table-header">
              <div className="admin-table-row">
                <div className="admin-table-cell font-semibold">Product</div>
                <div className="admin-table-cell font-semibold">SKU</div>
                <div className="admin-table-cell font-semibold">Quantity</div>
                <div className="admin-table-cell font-semibold">Price</div>
                <div className="admin-table-cell font-semibold">Total</div>
              </div>
            </div>
            <div>
              {order.items.map(item => (
                <div key={item.id} className="admin-table-row">
                  <div className="admin-table-cell">
                    <p className="font-semibold text-admin-gray-900">{item.product}</p>
                  </div>
                  <div className="admin-table-cell">
                    {item.sku}
                  </div>
                  <div className="admin-table-cell">
                    {item.quantity}
                  </div>
                  <div className="admin-table-cell">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="admin-table-cell font-semibold">
                    ${item.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Shipping Information */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Shipping Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-admin-gray-500">Shipping Method</p>
              <p className="font-medium text-admin-gray-900">{order.shipping.method}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Tracking Number</p>
              <p className="font-medium text-admin-gray-900">{order.shipping.trackingNumber}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Estimated Delivery</p>
              <p className="font-medium text-admin-gray-900">{order.shipping.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Payment Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-admin-gray-500">Payment Method</p>
              <p className="font-medium text-admin-gray-900">{order.payment.method}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Transaction ID</p>
              <p className="font-medium text-admin-gray-900">{order.payment.transactionId}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Payment Status</p>
              <p className="font-medium text-admin-gray-900">{order.payment.status}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-admin-gray-600">Subtotal</span>
              <span className="font-medium">${order.totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-admin-gray-600">Shipping</span>
              <span className="font-medium">${order.totals.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-admin-gray-600">Tax</span>
              <span className="font-medium">${order.totals.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-admin-gray-200/50 pt-2 flex justify-between">
              <span className="text-admin-gray-900 font-semibold">Total</span>
              <span className="text-admin-gray-900 font-bold text-lg">${order.totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;