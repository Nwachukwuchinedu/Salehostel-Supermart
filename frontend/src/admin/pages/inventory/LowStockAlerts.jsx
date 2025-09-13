import React, { useState } from 'react';
import { AlertTriangle, Bell, BellOff, PackagePlus, ShoppingCart, Filter, Search } from 'lucide-react';

const LowStockAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, product: 'MacBook Pro 16"', sku: 'MBP16', category: 'Computers', currentStock: 3, minStock: 5, status: 'Low Stock', lastUpdated: '2023-06-14' },
    { id: 2, product: 'AirPods Pro', sku: 'APP2023', category: 'Audio', currentStock: 0, minStock: 10, status: 'Out of Stock', lastUpdated: '2023-06-12' },
    { id: 3, product: 'iPad Air', sku: 'IPDA2023', category: 'Tablets', currentStock: 2, minStock: 5, status: 'Critical', lastUpdated: '2023-06-10' },
    { id: 4, product: 'Dell XPS 13', sku: 'DXPS13', category: 'Computers', currentStock: 1, minStock: 5, status: 'Critical', lastUpdated: '2023-06-05' },
    { id: 5, product: 'Sony WH-1000XM5', sku: 'SWHXM5', category: 'Audio', currentStock: 4, minStock: 10, status: 'Low Stock', lastUpdated: '2023-06-01' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alert.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter ? alert.category === categoryFilter : true;
    const matchesStatus = statusFilter ? alert.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Low Stock': return 'text-amber-600 bg-amber-100';
      case 'Out of Stock': return 'text-red-600 bg-red-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const snoozeAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, snoozed: true } : alert
    ));
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  // Get unique categories for filter dropdown
  const categories = [...new Set(alerts.map(alert => alert.category))];

  // Get unique statuses for filter dropdown
  const statuses = [...new Set(alerts.map(alert => alert.status))];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Low Stock Alerts</h1>
          <p className="text-admin-gray-600">Monitor and manage inventory alerts</p>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-secondary">
            <Bell className="w-5 h-5 mr-2" />
            Enable Notifications
          </button>
          <button className="admin-btn-primary">
            <PackagePlus className="w-5 h-5 mr-2" />
            Create Purchase Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-amber-100 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-amber-600 font-semibold">Low Stock</span>
          </div>
          <div className="admin-stats-number">2</div>
          <div className="admin-stats-label">Items with low stock</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-red-100 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-red-600 font-semibold">Out of Stock</span>
          </div>
          <div className="admin-stats-number">1</div>
          <div className="admin-stats-label">Items out of stock</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-red-100 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-red-600 font-semibold">Critical</span>
          </div>
          <div className="admin-stats-number">2</div>
          <div className="admin-stats-label">Critically low items</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search alerts..."
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

      {/* Alerts Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Product</div>
            <div className="admin-table-cell font-semibold">Category</div>
            <div className="admin-table-cell font-semibold">Stock Level</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Last Updated</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {filteredAlerts.map(alert => (
            <div key={alert.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div>
                  <p className="font-semibold text-admin-gray-900">{alert.product}</p>
                  <p className="text-sm text-admin-gray-600">{alert.sku}</p>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className="status-badge status-info">{alert.category}</span>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    alert.currentStock === 0 ? 'text-red-600' : 'text-amber-600'
                  }`}>
                    {alert.currentStock}
                  </span>
                  <span className="text-gray-500">/ {alert.minStock}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        alert.currentStock === 0 ? 'bg-red-500' : 
                        alert.currentStock <= alert.minStock ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(alert.currentStock / alert.minStock) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${getStatusClass(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
              <div className="admin-table-cell">
                {alert.lastUpdated}
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 text-admin-gray-400 hover:text-admin-primary"
                    title="Create Purchase Order"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-admin-gray-400 hover:text-amber-600"
                    title="Snooze Alert"
                    onClick={() => snoozeAlert(alert.id)}
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-admin-gray-400 hover:text-red-600"
                    title="Dismiss Alert"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <BellOff className="w-4 h-4" />
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

export default LowStockAlerts;