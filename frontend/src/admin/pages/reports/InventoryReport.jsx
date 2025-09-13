import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, AlertTriangle, Filter, Download, Printer } from 'lucide-react';

const InventoryReport = () => {
  const [dateRange, setDateRange] = useState({ start: '2023-06-01', end: '2023-06-30' });
  
  // Sample data for inventory levels
  const inventoryData = [
    { name: 'Electronics', current: 120, reserved: 30, available: 90 },
    { name: 'Clothing', current: 250, reserved: 50, available: 200 },
    { name: 'Home Goods', current: 180, reserved: 20, available: 160 },
    { name: 'Books', current: 320, reserved: 40, available: 280 },
    { name: 'Toys', current: 90, reserved: 10, available: 80 },
  ];
  
  // Sample data for stock movement
  const stockMovementData = [
    { date: 'Jun 1', received: 45, sold: 32, adjusted: 5 },
    { date: 'Jun 5', received: 60, sold: 42, adjusted: -2 },
    { date: 'Jun 10', received: 35, sold: 58, adjusted: 0 },
    { date: 'Jun 15', received: 50, sold: 45, adjusted: 3 },
    { date: 'Jun 20', received: 40, sold: 38, adjusted: -1 },
    { date: 'Jun 25', received: 55, sold: 62, adjusted: 2 },
  ];
  
  // Sample data for low stock items
  const lowStockData = [
    { name: 'iPhone 15 Pro', stock: 3, minStock: 5 },
    { name: 'MacBook Pro 16"', stock: 2, minStock: 5 },
    { name: 'AirPods Pro', stock: 0, minStock: 10 },
    { name: 'iPad Air', stock: 4, minStock: 10 },
  ];
  
  const COLORS = ['#1e40af', '#8b5cf6', '#059669'];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Inventory Report</h1>
          <p className="text-admin-gray-600">Track inventory levels, movements, and stock status</p>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
          <button className="admin-btn-secondary">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
          <button className="admin-btn-secondary">
            <Printer className="w-5 h-5 mr-2" />
            Print
          </button>
        </div>
      </div>
      
      {/* Date Range Selector */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Start Date</label>
            <input 
              type="date" 
              className="admin-input w-full"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          <div>
            <label className="form-label">End Date</label>
            <input 
              type="date" 
              className="admin-input w-full"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
          <div className="flex items-end">
            <button className="admin-btn-primary w-full">Apply Filters</button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-blue-600 font-semibold">Total Items</span>
          </div>
          <div className="admin-stats-number">2,847</div>
          <div className="admin-stats-label">All inventory items</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">In Stock</span>
          </div>
          <div className="admin-stats-number">2,156</div>
          <div className="admin-stats-label">Available items</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-amber-100 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-amber-600 font-semibold">Low Stock</span>
          </div>
          <div className="admin-stats-number">42</div>
          <div className="admin-stats-label">Items below threshold</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-purple-100 text-purple-600">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-purple-600 font-semibold">Categories</span>
          </div>
          <div className="admin-stats-number">12</div>
          <div className="admin-stats-label">Product categories</div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Inventory Levels Chart */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Inventory Levels by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="name" stroke="var(--admin-gray-500)" />
                <YAxis stroke="var(--admin-gray-500)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-glass)', 
                    borderColor: 'var(--admin-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Bar dataKey="current" name="Current Stock" fill="var(--admin-primary)" />
                <Bar dataKey="reserved" name="Reserved" fill="var(--admin-secondary)" />
                <Bar dataKey="available" name="Available" fill="var(--admin-success)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Stock Movement Chart */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Stock Movement</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stockMovementData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="date" stroke="var(--admin-gray-500)" />
                <YAxis stroke="var(--admin-gray-500)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-glass)', 
                    borderColor: 'var(--admin-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Bar dataKey="received" name="Received" fill="var(--admin-success)" />
                <Bar dataKey="sold" name="Sold" fill="var(--admin-primary)" />
                <Bar dataKey="adjusted" name="Adjusted" fill="var(--admin-warning)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Low Stock Items */}
      <div className="admin-glass-card p-6 mb-8">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Low Stock Items</h3>
        <div className="admin-table">
          <div className="admin-table-header">
            <div className="admin-table-row">
              <div className="admin-table-cell font-semibold">Product</div>
              <div className="admin-table-cell font-semibold">Current Stock</div>
              <div className="admin-table-cell font-semibold">Min Stock</div>
              <div className="admin-table-cell font-semibold">Status</div>
            </div>
          </div>
          <div>
            {lowStockData.map((item, index) => (
              <div key={index} className="admin-table-row">
                <div className="admin-table-cell">
                  <p className="font-semibold text-admin-gray-900">{item.name}</p>
                </div>
                <div className="admin-table-cell">
                  <span className={item.stock === 0 ? 'text-red-600 font-semibold' : 'text-amber-600 font-semibold'}>
                    {item.stock}
                  </span>
                </div>
                <div className="admin-table-cell">
                  {item.minStock}
                </div>
                <div className="admin-table-cell">
                  <span className={`status-badge ${
                    item.stock === 0 ? 'status-danger' : 'status-warning'
                  }`}>
                    {item.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;