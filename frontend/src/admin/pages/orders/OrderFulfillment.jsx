import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Calendar, User, MapPin, Printer, Download, Edit } from 'lucide-react';

const OrderFulfillment = () => {
  const [orders, setOrders] = useState([
    { id: 1, orderNumber: 'ORD-2023-001', customer: 'John Doe', date: '2023-06-15', status: 'Processing', items: 2, total: 1299.98 },
    { id: 2, orderNumber: 'ORD-2023-002', customer: 'Sarah Johnson', date: '2023-06-14', status: 'Ready to Ship', items: 1, total: 899.99 },
    { id: 3, orderNumber: 'ORD-2023-003', customer: 'Mike Brown', date: '2023-06-12', status: 'Shipped', items: 3, total: 2499.97 },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [fulfillmentStatus, setFulfillmentStatus] = useState({
    packed: false,
    shipped: false,
    delivered: false
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Processing': return 'text-amber-600 bg-amber-100';
      case 'Ready to Ship': return 'text-blue-600 bg-blue-100';
      case 'Shipped': return 'text-indigo-600 bg-indigo-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    // Reset fulfillment status when selecting a new order
    setFulfillmentStatus({
      packed: order.status !== 'Processing',
      shipped: order.status === 'Shipped' || order.status === 'Delivered',
      delivered: order.status === 'Delivered'
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const markAsPacked = () => {
    if (selectedOrder) {
      setFulfillmentStatus(prev => ({ ...prev, packed: true }));
      updateOrderStatus(selectedOrder.id, 'Ready to Ship');
    }
  };

  const markAsShipped = () => {
    if (selectedOrder) {
      setFulfillmentStatus(prev => ({ ...prev, shipped: true }));
      updateOrderStatus(selectedOrder.id, 'Shipped');
    }
  };

  const markAsDelivered = () => {
    if (selectedOrder) {
      setFulfillmentStatus(prev => ({ ...prev, delivered: true }));
      updateOrderStatus(selectedOrder.id, 'Delivered');
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Order Fulfillment</h1>
          <p className="text-admin-gray-600">Manage order processing and shipping</p>
        </div>
        <button className="admin-btn-primary">
          <Package className="w-5 h-5 mr-2" />
          New Shipment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1">
          <div className="admin-glass-card p-6">
            <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Pending Orders</h3>
            <div className="space-y-4">
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedOrder && selectedOrder.id === order.id 
                      ? 'border-admin-primary bg-admin-primary/5' 
                      : 'border-admin-gray-200 hover:border-admin-primary hover:bg-admin-primary/5'
                  }`}
                  onClick={() => handleSelectOrder(order)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-admin-gray-900">{order.orderNumber}</h4>
                    <span className={`status-badge text-xs ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-admin-gray-600 mb-1">{order.customer}</p>
                  <div className="flex justify-between text-sm">
                    <span>{order.date}</span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details and Fulfillment */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="admin-glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-admin-gray-900">Order #{selectedOrder.orderNumber}</h3>
                  <div className="flex gap-2">
                    <button className="admin-btn-secondary p-2">
                      <Printer className="w-5 h-5" />
                    </button>
                    <button className="admin-btn-secondary p-2">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="admin-btn-secondary p-2">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-admin-gray-500">Customer</p>
                    <p className="font-medium text-admin-gray-900">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-admin-gray-500">Date</p>
                    <p className="font-medium text-admin-gray-900">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-admin-gray-500">Total</p>
                    <p className="font-medium text-admin-gray-900">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-admin-gray-400" />
                  <div>
                    <p className="text-sm text-admin-gray-500">Shipping Address</p>
                    <p className="font-medium text-admin-gray-900">123 Main St, Apt 4B, New York, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Fulfillment Progress */}
              <div className="admin-glass-card p-6">
                <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Fulfillment Progress</h3>
                
                <div className="space-y-6">
                  {/* Packed */}
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      fulfillmentStatus.packed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-admin-gray-100 text-admin-gray-400'
                    }`}>
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-admin-gray-900">Packed</h4>
                        {fulfillmentStatus.packed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-admin-gray-600 mb-3">Items have been packed and are ready for shipping</p>
                      {!fulfillmentStatus.packed ? (
                        <button 
                          className="admin-btn-primary"
                          onClick={markAsPacked}
                        >
                          Mark as Packed
                        </button>
                      ) : (
                        <div className="text-sm text-green-600">
                          Packed on June 15, 2023 at 2:30 PM
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipped */}
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      fulfillmentStatus.shipped 
                        ? 'bg-green-100 text-green-600' 
                        : fulfillmentStatus.packed
                          ? 'bg-admin-gray-100 text-admin-gray-600'
                          : 'bg-admin-gray-100 text-admin-gray-400'
                    }`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-admin-gray-900">Shipped</h4>
                        {fulfillmentStatus.shipped && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-admin-gray-600 mb-3">Order has been shipped to the customer</p>
                      {fulfillmentStatus.packed && !fulfillmentStatus.shipped ? (
                        <button 
                          className="admin-btn-primary"
                          onClick={markAsShipped}
                        >
                          Mark as Shipped
                        </button>
                      ) : fulfillmentStatus.shipped ? (
                        <div className="space-y-2">
                          <div className="text-sm text-green-600">
                            Shipped on June 15, 2023 at 4:15 PM
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-admin-gray-900">Tracking Number:</span>
                            <span className="text-sm text-admin-gray-600">TRK-2023-001</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-admin-gray-500">
                          Complete packing first
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivered */}
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      fulfillmentStatus.delivered 
                        ? 'bg-green-100 text-green-600' 
                        : fulfillmentStatus.shipped
                          ? 'bg-admin-gray-100 text-admin-gray-600'
                          : 'bg-admin-gray-100 text-admin-gray-400'
                    }`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-admin-gray-900">Delivered</h4>
                        {fulfillmentStatus.delivered && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-admin-gray-600 mb-3">Order has been delivered to the customer</p>
                      {fulfillmentStatus.shipped && !fulfillmentStatus.delivered ? (
                        <button 
                          className="admin-btn-primary"
                          onClick={markAsDelivered}
                        >
                          Mark as Delivered
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="admin-glass-card p-6 text-center">
              <p className="text-admin-gray-600">Please select an order to view details and manage fulfillment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFulfillment;
