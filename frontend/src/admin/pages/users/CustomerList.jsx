import React, { useState } from 'react';
import { User, Search, Filter, Download, Eye, Edit, Trash2, Plus } from 'lucide-react';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', status: 'Active', joinDate: '2023-01-15', orders: 12, totalSpent: 1250 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 (555) 987-6543', status: 'Active', joinDate: '2023-02-20', orders: 8, totalSpent: 890 },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '+1 (555) 456-7890', status: 'Inactive', joinDate: '2023-03-10', orders: 5, totalSpent: 420 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 (555) 234-5678', status: 'Active', joinDate: '2023-04-05', orders: 15, totalSpent: 2100 },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', phone: '+1 (555) 876-5432', status: 'Suspended', joinDate: '2023-05-12', orders: 3, totalSpent: 180 },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-success';
      case 'Inactive': return 'status-warning';
      case 'Suspended': return 'status-danger';
      default: return 'status-default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Customer List</h1>
          <p className="text-admin-gray-600">Manage customer accounts and information</p>
        </div>
        <button className="admin-btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Search and Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="admin-select">
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Customer</div>
            <div className="admin-table-cell font-semibold">Contact</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Join Date</div>
            <div className="admin-table-cell font-semibold">Orders</div>
            <div className="admin-table-cell font-semibold">Total Spent</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {customers.map((customer) => (
            <div key={customer.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-admin-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-admin-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-admin-gray-900">{customer.name}</p>
                    <p className="text-sm text-admin-gray-600">{customer.email}</p>
                  </div>
                </div>
              </div>
              <div className="admin-table-cell">
                <p>{customer.phone}</p>
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${getStatusClass(customer.status)}`}>
                  {customer.status}
                </span>
              </div>
              <div className="admin-table-cell">
                {customer.joinDate}
              </div>
              <div className="admin-table-cell">
                {customer.orders}
              </div>
              <div className="admin-table-cell">
                {formatCurrency(customer.totalSpent)}
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-admin-gray-600">Showing 1 to 5 of 5 customers</p>
        <div className="flex gap-2">
          <button className="admin-btn-secondary">Previous</button>
          <button className="admin-btn-primary">1</button>
          <button className="admin-btn-secondary">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;