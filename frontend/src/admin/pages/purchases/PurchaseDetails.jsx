import React, { useState } from 'react';
import { ArrowLeft, Printer, Download, Edit, CheckCircle, Truck, Package, Calendar, User, Building, Mail, Phone } from 'lucide-react';

const PurchaseDetails = () => {
  const [purchase] = useState({
    id: 1,
    poNumber: 'PO-2023-001',
    status: 'Received',
    orderDate: '2023-06-15',
    expectedDelivery: '2023-06-20',
    receivedDate: '2023-06-18',
    supplier: {
      name: 'Apple Inc.',
      contact: 'John Smith',
      email: 'john@apple.com',
      phone: '+1 (555) 123-4567',
      address: '1 Apple Park Way, Cupertino, CA 95014'
    },
    items: [
      { id: 1, product: 'iPhone 15 Pro Max', sku: 'IPH15PM', quantity: 10, received: 10, unitPrice: 999.99, total: 9999.90 },
      { id: 2, product: 'MacBook Pro 16"', sku: 'MBP16', quantity: 10, received: 10, unitPrice: 999.99, total: 9999.90 }
    ],
    notes: 'Please ensure all items are properly packaged.',
    subtotal: 19999.80,
    tax: 1599.98,
    total: 21599.78
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'text-amber-600 bg-amber-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Received': return 'text-green-600 bg-green-100';
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
            <h1 className="text-3xl font-bold text-admin-gray-900">Purchase Order Details</h1>
            <p className="text-admin-gray-600">View and manage purchase order #{purchase.poNumber}</p>
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
              <h2 className="text-2xl font-bold text-admin-gray-900">{purchase.poNumber}</h2>
              <p className="text-admin-gray-600">Created on {purchase.orderDate}</p>
            </div>
            <span className={`status-badge ${getStatusClass(purchase.status)}`}>
              {purchase.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-admin-gray-500">Expected Delivery</p>
              <p className="font-medium text-admin-gray-900">{purchase.expectedDelivery}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Received Date</p>
              <p className="font-medium text-admin-gray-900">{purchase.receivedDate}</p>
            </div>
            <div>
              <p className="text-sm text-admin-gray-500">Items</p>
              <p className="font-medium text-admin-gray-900">{purchase.items.length}</p>
            </div>
          </div>
        </div>
        
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Actions</h3>
          <div className="space-y-3">
            <button className="w-full admin-btn-primary">
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark as Received
            </button>
            <button className="w-full admin-btn-secondary">
              <Truck className="w-5 h-5 mr-2" />
              Track Shipment
            </button>
            <button className="w-full admin-btn-secondary">
              <Package className="w-5 h-5 mr-2" />
              Receive Items
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supplier Information */}
        <div className="admin-glass-card p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Supplier Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-admin-gray-400 mt-1" />
              <div>
                <p className="font-medium text-admin-gray-900">{purchase.supplier.name}</p>
                <p className="text-sm text-admin-gray-600">{purchase.supplier.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-admin-gray-400" />
              <div>
                <p className="font-medium text-admin-gray-900">{purchase.supplier.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-admin-gray-400" />
              <div>
                <p className="font-medium text-admin-gray-900">{purchase.supplier.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-admin-gray-400" />
              <div>
                <p className="font-medium text-admin-gray-900">{purchase.supplier.phone}</p>
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
                <div className="admin-table-cell font-semibold">Received</div>
                <div className="admin-table-cell font-semibold">Unit Price</div>
                <div className="admin-table-cell font-semibold">Total</div>
              </div>
            </div>
            <div>
              {purchase.items.map(item => (
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
                    <span className={`font-semibold ${
                      item.received === item.quantity ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {item.received}
                    </span>
                  </div>
                  <div className="admin-table-cell">
                    ${item.unitPrice.toFixed(2)}
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
      <div className="admin-glass-card p-6 mt-6">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Order Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-admin-gray-500 mb-2">Notes</p>
            <p className="text-admin-gray-900">{purchase.notes || 'No notes provided'}</p>
          </div>
          <div className="md:col-span-2">
            <div className="space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between">
                <span className="text-admin-gray-600">Subtotal</span>
                <span className="font-medium">${purchase.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-gray-600">Tax (8%)</span>
                <span className="font-medium">${purchase.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-admin-gray-200/50 pt-2 flex justify-between">
                <span className="text-admin-gray-900 font-semibold">Total</span>
                <span className="text-admin-gray-900 font-bold text-lg">${purchase.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetails;