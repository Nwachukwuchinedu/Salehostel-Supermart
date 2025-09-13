import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Eye, Truck, CheckCircle, XCircle, Calendar, User, CreditCard } from 'lucide-react';

const OrderList = () => {
  const [orders, setOrders] = useState([
    { id: 1, orderNumber: 'ORD-2023-001', customer: 'John Doe', date: '2023-06-15', total: 1299.98, status: 'Processing', items: 2 },
    { id: 2, orderNumber: 'ORD-2023-002', customer: 'Sarah Johnson', date: '2023-06-14', total: 899.99, status: 'Shipped', items: 1 },
    { id: 3, orderNumber: 'ORD-2023-003', customer: 'Mike Brown', date: '2023-06-12', total: 2499.97, status: 'Delivered', items: 3 },
    { id: 4, orderNumber: 'ORD-2023-004', customer: 'Lisa Davis', date: '2023-06-10', total: 599.99, status: 'Cancelled', items: 1 },
    { id: 5, orderNumber: 'ORD-2023-005', customer: 'David Wilson', date: '2023-06-08', total: 1799.96, status: 'Processing', items: 2 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    const matchesDate = dateFilter ? order.date === dateFilter : true;
    
    return matchesSearch && matchesStatus && matchesDate;
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Calendar className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Orders</h1>
          <p className="text-admin-gray-600">Manage customer orders and track fulfillment</p>
        </div>
        <button className="admin-btn-primary">
          <ShoppingCart className="w-5 h-5 mr-2" />
          New Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-admin-primary font-semibold">Total</span>
          </div>
          <div className="admin-stats-number">142</div>
          <div className="admin-stats-label">Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-amber-100 text-amber-600">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-amber-600 font-semibold">Processing</span>
          </div>
          <div className="admin-stats-number">24</div>
          <div className="admin-stats-label">Processing Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-blue-600 font-semibold">Shipped</span>
          </div>
          <div className="admin-stats-number">38</div>
          <div className="admin-stats-label">Shipped Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">Delivered</span>
          </div>
          <div className="admin-stats-number">72</div>
          <div className="admin-stats-label">Delivered Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-red-100 text-red-600">
              <XCircle className="w-6 h-6" />
            </div>
            <span className="text-red-600 font-semibold">Cancelled</span>
          </div>
          <div className="admin-stats-number">8</div>
          <div className="admin-stats-label">Cancelled Orders</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search orders..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input 
            type="date" 
            className="admin-input"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Order</div>
            <div className="admin-table-cell font-semibold">Customer</div>
            <div className="admin-table-cell font-semibold">Date</div>
            <div className="admin-table-cell font-semibold">Items</div>
            <div className="admin-table-cell font-semibold">Total</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {filteredOrders.map(order => (
            <div key={order.id} className="admin-table-row">
              <div className="admin-table-cell">
                <p className="font-semibold text-admin-gray-900">{order.orderNumber}</p>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-admin-gray-400" />
                  <span>{order.customer}</span>
                </div>
              </div>
              <div className="admin-table-cell">
                {order.date}
              </div>
              <div className="admin-table-cell">
                {order.items}
              </div>
              <div className="admin-table-cell font-semibold">
                ${order.total.toFixed(2)}
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </span>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Truck className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;