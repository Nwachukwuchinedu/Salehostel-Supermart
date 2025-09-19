import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, BarChart3, Filter, Search, Eye, Edit, Plus, Download, RefreshCw } from 'lucide-react';
import adminApi from '../../../shared/services/adminApi';

const InventoryOverview = () => {
  const [inventoryData, setInventoryData] = useState({
    totalItems: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    totalValue: 0
  });

  const [inventoryItems, setInventoryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Filter inventory items based on search and filters
  useEffect(() => {
    const loadOverview = async () => {
      try {
        setLoading(true);
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
          category: 'Staple Foods',
          stock: m.newStock ?? 0,
          minStock: 10,
          status: (m.newStock ?? 0) === 0 ? 'Out of Stock' : (m.newStock ?? 0) < 10 ? 'Low Stock' : 'In Stock',
          value: (m.newStock ?? 0) * 1000,
        }));
        setInventoryItems(items);
        setFilteredItems(items);
      } catch (e) {
        console.error('Failed loading inventory overview', e);
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, []);

  // Filter items based on search and filters
  useEffect(() => {
    let filtered = inventoryItems;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredItems(filtered);
  }, [inventoryItems, searchTerm, categoryFilter, statusFilter]);

  // Get unique categories for filter dropdown
  const categories = [...new Set(inventoryItems.map(item => item.category))];

  // Get unique statuses for filter dropdown
  const statuses = [...new Set(inventoryItems.map(item => item.status))];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'In Stock': 'admin-badge-success',
      'Low Stock': 'admin-badge-warning',
      'Out of Stock': 'admin-badge-danger'
    };
    return statusClasses[status] || 'admin-badge-gray';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="admin-stats-card">
              <div className="admin-skeleton h-12 w-12 rounded-xl mb-4"></div>
              <div className="admin-skeleton-title mb-2"></div>
              <div className="admin-skeleton-text w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-gray-900">Inventory Overview</h1>
          <p className="text-admin-gray-600">Manage your product inventory and stock levels</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="admin-btn-secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="admin-btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="admin-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock Adjustment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{inventoryData.totalItems.toLocaleString()}</div>
          <div className="admin-stats-label">Total Items</div>
          <div className="admin-stats-change positive">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5% from last month
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-yellow-100 text-yellow-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <div className="admin-stats-number">{inventoryData.lowStockItems}</div>
          <div className="admin-stats-label">Low Stock Items</div>
          <div className="admin-stats-change negative">
            <TrendingUp className="w-4 h-4 mr-1" />
            +2 from yesterday
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-red-100 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <div className="admin-stats-number">{inventoryData.outOfStockItems}</div>
          <div className="admin-stats-label">Out of Stock Items</div>
          <div className="admin-stats-change negative">
            <TrendingUp className="w-4 h-4 mr-1" />
            +1 from yesterday
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{formatCurrency(inventoryData.totalValue)}</div>
          <div className="admin-stats-label">Total Inventory Value</div>
          <div className="admin-stats-change positive">
            <TrendingUp className="w-4 h-4 mr-1" />
            +8% from last month
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-filter-bar">
        <div className="admin-filter-group">
          <label className="admin-filter-label">Search:</label>
          <div className="admin-search-box">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search items..."
              className="admin-search-input w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-filter-group">
          <label className="admin-filter-label">Category:</label>
          <select
            className="admin-form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="admin-filter-group">
          <label className="admin-filter-label">Status:</label>
          <select
            className="admin-form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <button className="admin-btn-secondary">
          <Filter className="w-4 h-4 mr-2" />
          Clear Filters
        </button>
      </div>

      {/* Inventory Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-admin-gray-900">Inventory Items</h3>
            <span className="text-sm text-admin-gray-600">
              Showing {filteredItems.length} of {inventoryItems.length} items
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead className="admin-table-header">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Min Stock</th>
                <th>Status</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="admin-table-body">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="admin-empty-state">
                      <Package className="admin-empty-icon" />
                      <h3 className="admin-empty-title">No items found</h3>
                      <p className="admin-empty-description">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <p className="font-medium text-admin-gray-900">{item.name}</p>
                        <p className="text-sm text-admin-gray-600">SKU: {item.sku}</p>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge-primary">{item.category}</span>
                    </td>
                    <td>
                      <span className="font-medium">{item.stock}</span>
                    </td>
                    <td>
                      <span className="text-admin-gray-600">{item.minStock}</span>
                    </td>
                    <td>
                      <span className={`admin-badge ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="admin-btn-ghost admin-btn-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="admin-btn-ghost admin-btn-sm">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredItems.length > 0 && (
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Showing 1 to {filteredItems.length} of {inventoryItems.length} items
            </div>
            <div className="admin-pagination-controls">
              <button className="admin-pagination-btn" disabled>Previous</button>
              <button className="admin-pagination-btn active">1</button>
              <button className="admin-pagination-btn">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryOverview;