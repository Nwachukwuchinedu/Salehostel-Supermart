import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Filter, Truck, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample order data
  const orders = [
    {
      id: '#ORD-001',
      date: '2023-06-15',
      total: 245.99,
      status: 'delivered',
      items: 3,
      tracking: 'TRK123456789'
    },
    {
      id: '#ORD-002',
      date: '2023-06-10',
      total: 189.50,
      status: 'shipped',
      items: 2,
      tracking: 'TRK987654321'
    },
    {
      id: '#ORD-003',
      date: '2023-06-05',
      total: 89.99,
      status: 'processing',
      items: 1,
      tracking: 'TRK456789123'
    },
    {
      id: '#ORD-004',
      date: '2023-05-28',
      total: 356.75,
      status: 'cancelled',
      items: 4,
      tracking: 'TRK321654987'
    }
  ];

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.tracking.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-customer-gray-900">Order History</h1>
        <p className="text-customer-gray-600">View and manage your past orders</p>
      </div>

      <div className="customer-glass-card rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID or tracking number..."
              className="customer-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="customer-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button className="customer-btn-secondary flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-customer-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-customer-gray-900 mb-2">No orders found</h3>
            <p className="text-customer-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Link to="/shop" className="customer-btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-customer-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-customer-gray-700">Order</th>
                  <th className="text-left py-3 px-4 font-medium text-customer-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-customer-gray-700">Items</th>
                  <th className="text-left py-3 px-4 font-medium text-customer-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-customer-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-customer-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-customer-gray-100 hover:bg-customer-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-customer-gray-900">{order.id}</div>
                        <div className="text-sm text-customer-gray-500">{order.tracking}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-customer-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {order.date}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-customer-gray-600">{order.items} items</td>
                    <td className="py-4 px-4 font-medium text-customer-gray-900">${order.total}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{getStatusText(order.status)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Link 
                        to={`/account/orders/${order.id}`} 
                        className="text-customer-primary hover:text-customer-secondary font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-customer-gray-600">Showing 1 to {filteredOrders.length} of {orders.length} orders</p>
        <div className="flex gap-2">
          <button className="customer-btn-secondary">Previous</button>
          <button className="customer-btn-primary">1</button>
          <button className="customer-btn-secondary">2</button>
          <button className="customer-btn-secondary">Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;