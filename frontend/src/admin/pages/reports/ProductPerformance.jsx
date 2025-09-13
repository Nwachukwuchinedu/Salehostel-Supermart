import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, ShoppingCart, Star, Filter, Download, Printer, Search } from 'lucide-react';

const ProductPerformance = () => {
  const [dateRange, setDateRange] = useState({ start: '2023-06-01', end: '2023-06-30' });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for top selling products
  const topProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', category: 'Electronics', sales: 1240, revenue: 1240000, stock: 15, rating: 4.8 },
    { id: 2, name: 'MacBook Pro 16"', category: 'Computers', sales: 890, revenue: 1335000, stock: 8, rating: 4.7 },
    { id: 3, name: 'AirPods Pro', category: 'Audio', sales: 2100, revenue: 420000, stock: 42, rating: 4.6 },
    { id: 4, name: 'iPad Air', category: 'Tablets', sales: 750, revenue: 450000, stock: 22, rating: 4.5 },
    { id: 5, name: 'Samsung Galaxy S23', category: 'Electronics', sales: 980, revenue: 784000, stock: 18, rating: 4.4 },
  ];
  
  // Sample data for product categories
  const categoryData = [
    { name: 'Electronics', sales: 4500, revenue: 3200000 },
    { name: 'Clothing', sales: 3200, revenue: 180000 },
    { name: 'Home Goods', sales: 2800, revenue: 210000 },
    { name: 'Books', sales: 2100, revenue: 84000 },
    { name: 'Toys', sales: 1500, revenue: 90000 },
  ];
  
  // Sample data for product views vs purchases
  const conversionData = [
    { product: 'iPhone 15 Pro Max', views: 15000, purchases: 1240, conversion: 8.3 },
    { product: 'MacBook Pro 16"', views: 8500, purchases: 890, conversion: 10.5 },
    { product: 'AirPods Pro', views: 25000, purchases: 2100, conversion: 8.4 },
    { product: 'iPad Air', views: 9200, purchases: 750, conversion: 8.2 },
    { product: 'Samsung Galaxy S23', views: 12000, purchases: 980, conversion: 8.2 },
  ];
  
  // Sample data for inventory turnover
  const turnoverData = [
    { product: 'iPhone 15 Pro Max', turnover: 12.5 },
    { product: 'MacBook Pro 16"', turnover: 8.2 },
    { product: 'AirPods Pro', turnover: 25.8 },
    { product: 'iPad Air', turnover: 9.7 },
    { product: 'Samsung Galaxy S23', turnover: 11.3 },
  ];
  
  const COLORS = ['#1e40af', '#8b5cf6', '#059669', '#f59e0b', '#ef4444'];
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Product Performance</h1>
          <p className="text-admin-gray-600">Analyze product sales, revenue, and performance metrics</p>
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
      
      {/* Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button className="admin-btn-primary w-full">Apply Filters</button>
          </div>
        </div>
      </div>
      
      {/* Product Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-blue-600 font-semibold">Total Products</span>
          </div>
          <div className="admin-stats-number">2,847</div>
          <div className="admin-stats-label">Active products</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">Total Sales</span>
          </div>
          <div className="admin-stats-number">15,240</div>
          <div className="admin-stats-label">Units sold</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-purple-100 text-purple-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-purple-600 font-semibold">Total Revenue</span>
          </div>
          <div className="admin-stats-number">₦5.2M</div>
          <div className="admin-stats-label">Product revenue</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-amber-100 text-amber-600">
              <Star className="w-6 h-6" />
            </div>
            <span className="text-amber-600 font-semibold">Avg. Rating</span>
          </div>
          <div className="admin-stats-number">4.5</div>
          <div className="admin-stats-label">Customer satisfaction</div>
        </div>
      </div>
      
      {/* Product Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Selling Products */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Top Selling Products</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProducts}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="name" stroke="var(--admin-gray-500)" />
                <YAxis stroke="var(--admin-gray-500)" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'sales') return [value, 'Units Sold'];
                    if (name === 'revenue') return [formatCurrency(value), 'Revenue'];
                    return [value, name];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-glass)', 
                    borderColor: 'var(--admin-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Bar dataKey="sales" name="Units Sold" fill="var(--admin-primary)" />
                <Bar dataKey="revenue" name="Revenue" fill="var(--admin-secondary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Product Categories */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Sales by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                  nameKey="name"
                  label={({ name, sales }) => `${name}: ${sales}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === 'sales') return [value, 'Units Sold'];
                    if (name === 'revenue') return [formatCurrency(props.payload.revenue), 'Revenue'];
                    return [value, name];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-glass)', 
                    borderColor: 'var(--admin-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Product Performance Table */}
      <div className="admin-glass-card p-6 mb-8">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Product Performance</h3>
        <div className="admin-table">
          <div className="admin-table-header">
            <div className="admin-table-row">
              <div className="admin-table-cell font-semibold">Product</div>
              <div className="admin-table-cell font-semibold">Category</div>
              <div className="admin-table-cell font-semibold">Sales</div>
              <div className="admin-table-cell font-semibold">Revenue</div>
              <div className="admin-table-cell font-semibold">Stock</div>
              <div className="admin-table-cell font-semibold">Rating</div>
              <div className="admin-table-cell font-semibold">Conversion</div>
            </div>
          </div>
          <div>
            {topProducts.map((product) => (
              <div key={product.id} className="admin-table-row">
                <div className="admin-table-cell">
                  <p className="font-semibold text-admin-gray-900">{product.name}</p>
                </div>
                <div className="admin-table-cell">
                  <span className="status-badge status-info">{product.category}</span>
                </div>
                <div className="admin-table-cell">
                  {product.sales.toLocaleString()}
                </div>
                <div className="admin-table-cell">
                  {formatCurrency(product.revenue)}
                </div>
                <div className="admin-table-cell">
                  <span className={product.stock < 10 ? 'text-amber-600 font-semibold' : 'text-admin-gray-900'}>
                    {product.stock}
                  </span>
                </div>
                <div className="admin-table-cell">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <div className="admin-table-cell">
                  <span className="font-semibold text-green-600">
                    {Math.round((product.sales / (product.sales + Math.floor(Math.random() * 1000) + 500)) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conversion Rates */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Conversion Rates</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conversionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="product" stroke="var(--admin-gray-500)" />
                <YAxis 
                  stroke="var(--admin-gray-500)" 
                  yAxisId="left"
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  stroke="var(--admin-gray-500)" 
                  orientation="right" 
                  yAxisId="right"
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'conversion') return [`${value}%`, 'Conversion Rate'];
                    if (name === 'views') return [value, 'Views'];
                    if (name === 'purchases') return [value, 'Purchases'];
                    return [value, name];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-glass)', 
                    borderColor: 'var(--admin-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Bar yAxisId="right" dataKey="views" name="Views" fill="var(--admin-primary)" />
                <Bar yAxisId="right" dataKey="purchases" name="Purchases" fill="var(--admin-secondary)" />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="conversion" 
                  name="Conversion %" 
                  stroke="var(--admin-success)" 
                  strokeWidth={3}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Inventory Turnover */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Inventory Turnover</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={turnoverData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="product" stroke="var(--admin-gray-500)" />
                <YAxis stroke="var(--admin-gray-500)" />
                <Tooltip 
                  formatter={(value) => [value, 'Turnover Rate']}
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-glass)', 
                    borderColor: 'var(--admin-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Bar dataKey="turnover" name="Turnover Rate" fill="var(--admin-warning)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;