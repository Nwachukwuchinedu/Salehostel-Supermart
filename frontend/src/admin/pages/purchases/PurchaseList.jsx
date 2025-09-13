import React, { useState } from 'react';
import { ShoppingCart, Plus, Filter, Search, Eye, Edit, Trash2, Download, Upload } from 'lucide-react';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([
    { id: 1, poNumber: 'PO-2023-001', supplier: 'Apple Inc.', date: '2023-06-15', total: 19999.80, status: 'Received', items: 20 },
    { id: 2, poNumber: 'PO-2023-002', supplier: 'Samsung Electronics', date: '2023-06-12', total: 12499.50, status: 'Shipped', items: 50 },
    { id: 3, poNumber: 'PO-2023-003', supplier: 'Dell Technologies', date: '2023-06-08', total: 7499.70, status: 'Pending', items: 15 },
    { id: 4, poNumber: 'PO-2023-004', supplier: 'Sony Corporation', date: '2023-06-01', total: 6249.75, status: 'Received', items: 25 },
    { id: 5, poNumber: 'PO-2023-005', supplier: 'Microsoft Corp.', date: '2023-05-28', total: 24999.00, status: 'Received', items: 10 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? purchase.status === statusFilter : true;
    const matchesDate = dateFilter ? purchase.date === dateFilter : true;
    
    return matchesSearch && matchesStatus && matchesDate;
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
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Purchase Orders</h1>
          <p className="text-admin-gray-600">Manage supplier purchase orders and track deliveries</p>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-secondary">
            <Upload className="w-5 h-5 mr-2" />
            Import
          </button>
          <button className="admin-btn-secondary">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
          <button className="admin-btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            New Purchase Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-admin-primary font-semibold">Total</span>
          </div>
          <div className="admin-stats-number">24</div>
          <div className="admin-stats-label">Purchase Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-amber-100 text-amber-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-amber-600 font-semibold">Pending</span>
          </div>
          <div className="admin-stats-number">3</div>
          <div className="admin-stats-label">Pending Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-blue-600 font-semibold">Shipped</span>
          </div>
          <div className="admin-stats-number">5</div>
          <div className="admin-stats-label">Shipped Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">Received</span>
          </div>
          <div className="admin-stats-number">16</div>
          <div className="admin-stats-label">Received Orders</div>
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
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Received">Received</option>
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

      {/* Purchases Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">PO Number</div>
            <div className="admin-table-cell font-semibold">Supplier</div>
            <div className="admin-table-cell font-semibold">Date</div>
            <div className="admin-table-cell font-semibold">Items</div>
            <div className="admin-table-cell font-semibold">Total</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {filteredPurchases.map(purchase => (
            <div key={purchase.id} className="admin-table-row">
              <div className="admin-table-cell">
                <p className="font-semibold text-admin-gray-900">{purchase.poNumber}</p>
              </div>
              <div className="admin-table-cell">
                {purchase.supplier}
              </div>
              <div className="admin-table-cell">
                {purchase.date}
              </div>
              <div className="admin-table-cell">
                {purchase.items}
              </div>
              <div className="admin-table-cell font-semibold">
                ${purchase.total.toLocaleString()}
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${getStatusClass(purchase.status)}`}>
                  {purchase.status}
                </span>
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
    </div>
  );
};

export default PurchaseList;