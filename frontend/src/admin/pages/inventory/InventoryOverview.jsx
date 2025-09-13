import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, BarChart3, Filter, Search, Eye, Edit, Plus } from 'lucide-react';

const InventoryOverview = () => {
  const [inventoryData, setInventoryData] = useState({
    totalItems: 2547,
    lowStockItems: 23,
    outOfStockItems: 8,
    totalValue: 125430.50
  });

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'iPhone 15 Pro Max', sku: 'IPH15PM', category: 'Electronics', stock: 15, minStock: 5, status: 'In Stock', value: 999.99 },
    { id: 2, name: 'MacBook Pro 16"', sku: 'MBP16', category: 'Computers', stock: 3, minStock: 5, status: 'Low Stock', value: 2499.99 },
    { id: 3, name: 'AirPods Pro', sku: 'APP2023', category: 'Audio', stock: 0, minStock: 10, status: 'Out of Stock', value: 249.99 },
    { id: 4, name: 'Samsung Galaxy S24', sku: 'SGS24', category: 'Electronics', stock: 12, minStock: 5, status: 'In Stock', value: 899.99 },
    { id: 5, name: 'iPad Air', sku: 'IPDA2023', category: 'Tablets', stock: 7, minStock: 5, status: 'In Stock', value: 599.99 },
  ]);

  const [filteredItems, setFilteredItems] = useState(inventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filter inventory items based on search and filters
  useEffect(() => {
    let result = inventoryItems;
    
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    if (statusFilter) {
      result = result.filter(item => item.status === statusFilter);
    }
    
    setFilteredItems(result);
  }, [searchTerm, categoryFilter, statusFilter, inventoryItems]);

  // Get unique categories for filter dropdown
  const categories = [...new Set(inventoryItems.map(item => item.category))];

  // Get unique statuses for filter dropdown
  const statuses = [...new Set(inventoryItems.map(item => item.status))];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Inventory Overview</h1>
          <p className="text-admin-gray-600">Manage your product inventory and stock levels</p>
        </div>
        <button className="admin-btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Stock Adjustment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">
              <Package className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{inventoryData.totalItems.toLocaleString()}</div>
          <div className="admin-stats-label">Total Items</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-warning/10 text-admin-warning">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{inventoryData.lowStockItems}</div>
          <div className="admin-stats-label">Low Stock Items</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-danger/10 text-admin-danger">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <div className="admin-stats-number">{inventoryData.outOfStockItems}</div>
          <div className="admin-stats-label">Out of Stock Items</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">${inventoryData.totalValue.toLocaleString()}</div>
          <div className="admin-stats-label">Total Inventory Value</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search items..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="admin-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select 
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Product</div>
            <div className="admin-table-cell font-semibold">Category</div>
            <div className="admin-table-cell font-semibold">Stock</div>
            <div className="admin-table-cell font-semibold">Min Stock</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Value</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {filteredItems.map(item => (
            <div key={item.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div>
                  <p className="font-semibold text-admin-gray-900">{item.name}</p>
                  <p className="text-sm text-admin-gray-600">{item.sku}</p>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className="status-badge status-info">{item.category}</span>
              </div>
              <div className="admin-table-cell">
                <span className={`font-semibold ${
                  item.stock === 0 ? 'text-red-600' : 
                  item.stock <= item.minStock ? 'text-amber-600' : 'text-green-600'
                }`}>
                  {item.stock}
                </span>
              </div>
              <div className="admin-table-cell">
                {item.minStock}
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${
                  item.status === 'In Stock' ? 'status-success' : 
                  item.status === 'Low Stock' ? 'status-warning' : 'status-danger'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="admin-table-cell font-semibold">
                ${(item.value * item.stock).toLocaleString()}
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Edit className="w-4 h-4" />
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

export default InventoryOverview;