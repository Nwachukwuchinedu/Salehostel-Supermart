import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, BarChart3, Filter, Search, Eye, Edit, Plus } from 'lucide-react';
import adminApi from '../../../shared/services/adminApi';

const InventoryOverview = () => {
  const [inventoryData, setInventoryData] = useState({
    totalItems: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    totalValue: 0
  });

  const [inventoryItems, setInventoryItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState(inventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filter inventory items based on search and filters
  useEffect(() => {
    const loadOverview = async () => {
      try {
        const [overviewRes, lowStockRes] = await Promise.all([
          adminApi.getInventoryOverview(),
          adminApi.getLowStockAlerts(),
        ]);

        const overview = overviewRes.data;
        setInventoryData({
          totalItems: overview?.overview?.totalProducts || 0,
          lowStockItems: overview?.overview?.lowStockItems || 0,
          outOfStockItems: 0,
          totalValue: overview?.overview?.totalStockValue || 0,
        });

        // Flatten products into display rows
        const items = (overview?.overview?.recentMovements || []).map(m => ({
          id: m._id,
          name: m.product?.name || 'Product',
          sku: m.product?._id?.slice(-6) || '',
          category: '',
          stock: m.newStock ?? 0,
          minStock: 0,
          status: (m.newStock ?? 0) === 0 ? 'Out of Stock' : 'In Stock',
          value: 0,
        }));
        setInventoryItems(items);
      } catch (e) {
        console.error('Failed loading inventory overview', e);
      }
    };
    loadOverview();
  }, []);

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
            <TrendingUp className="w-5 h-5 text-red-500" />
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
                <span className={`font-semibold ${item.stock === 0 ? 'text-red-600' :
                    item.stock <= item.minStock ? 'text-amber-600' : 'text-green-600'
                  }`}>
                  {item.stock}
                </span>
              </div>
              <div className="admin-table-cell">
                {item.minStock}
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${item.status === 'In Stock' ? 'status-success' :
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