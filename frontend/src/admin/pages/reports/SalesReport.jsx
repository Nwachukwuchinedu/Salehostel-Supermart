import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Download, Filter, Calendar, TrendingUp, DollarSign, ShoppingCart, User } from 'lucide-react';

const SalesReport = () => {
  const [dateRange, setDateRange] = useState('monthly');
  const [startDate, setStartDate] = useState('2023-06-01');
  const [endDate, setEndDate] = useState('2023-06-30');

  // Mock data for charts
  const salesData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 139 },
    { month: 'Mar', sales: 2000, orders: 180 },
    { month: 'Apr', sales: 2780, orders: 190 },
    { month: 'May', sales: 1890, orders: 120 },
    { month: 'Jun', sales: 2390, orders: 170 },
  ];

  const productSales = [
    { name: 'iPhone 15 Pro Max', sales: 400, revenue: 399996 },
    { name: 'MacBook Pro 16"', sales: 200, revenue: 499998 },
    { name: 'AirPods Pro', sales: 500, revenue: 149995 },
    { name: 'iPad Air', sales: 300, revenue: 179997 },
    { name: 'Samsung Galaxy S24', sales: 250, revenue: 224997 },
  ];

  const topCustomers = [
    { id: 1, name: 'John Doe', orders: 15, totalSpent: 12500 },
    { id: 2, name: 'Sarah Johnson', orders: 12, totalSpent: 9800 },
    { id: 3, name: 'Mike Brown', orders: 10, totalSpent: 8200 },
    { id: 4, name: 'Lisa Davis', orders: 8, totalSpent: 6500 },
    { id: 5, name: 'David Wilson', orders: 7, totalSpent: 5400 },
  ];

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalSales / totalOrders;

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Sales Report</h1>
          <p className="text-admin-gray-600">Analyze sales performance and trends</p>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
          <button className="admin-btn-primary">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">${totalSales.toLocaleString()}</div>
          <div className="admin-stats-label">Total Sales</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{totalOrders}</div>
          <div className="admin-stats-label">Total Orders</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <User className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">${avgOrderValue.toFixed(2)}</div>
          <div className="admin-stats-label">Avg. Order Value</div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            className="admin-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="date" 
              className="admin-input pl-10 w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="date" 
              className="admin-input pl-10 w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Trend Chart */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Sales Trend</h3>
          <div className="h-80 flex items-center justify-center bg-admin-gray-50/50 rounded-lg">
            <div className="text-center">
              <BarChart className="w-16 h-16 text-admin-gray-400 mx-auto mb-4" />
              <p className="text-admin-gray-600">Sales Trend Chart</p>
              <p className="text-sm text-admin-gray-500 mt-2">Visualization of sales over time</p>
            </div>
          </div>
        </div>

        {/* Product Performance Chart */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Top Selling Products</h3>
          <div className="h-80 flex items-center justify-center bg-admin-gray-50/50 rounded-lg">
            <div className="text-center">
              <PieChart className="w-16 h-16 text-admin-gray-400 mx-auto mb-4" />
              <p className="text-admin-gray-600">Product Performance Chart</p>
              <p className="text-sm text-admin-gray-500 mt-2">Revenue distribution by product</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products and Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Products */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Top Selling Products</h3>
          <div className="admin-table">
            <div className="admin-table-header">
              <div className="admin-table-row">
                <div className="admin-table-cell font-semibold">Product</div>
                <div className="admin-table-cell font-semibold">Units Sold</div>
                <div className="admin-table-cell font-semibold">Revenue</div>
              </div>
            </div>
            <div>
              {productSales.map((product, index) => (
                <div key={index} className="admin-table-row">
                  <div className="admin-table-cell">
                    <p className="font-semibold text-admin-gray-900">{product.name}</p>
                  </div>
                  <div className="admin-table-cell">
                    {product.sales}
                  </div>
                  <div className="admin-table-cell font-semibold">
                    ${product.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Top Customers</h3>
          <div className="admin-table">
            <div className="admin-table-header">
              <div className="admin-table-row">
                <div className="admin-table-cell font-semibold">Customer</div>
                <div className="admin-table-cell font-semibold">Orders</div>
                <div className="admin-table-cell font-semibold">Total Spent</div>
              </div>
            </div>
            <div>
              {topCustomers.map(customer => (
                <div key={customer.id} className="admin-table-row">
                  <div className="admin-table-cell">
                    <p className="font-semibold text-admin-gray-900">{customer.name}</p>
                  </div>
                  <div className="admin-table-cell">
                    {customer.orders}
                  </div>
                  <div className="admin-table-cell font-semibold">
                    ${customer.totalSpent.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;