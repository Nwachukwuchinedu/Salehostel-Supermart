import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, ShoppingCart, DollarSign, TrendingUp, Filter, Download, Printer, MapPin, Calendar } from 'lucide-react';

const CustomerReport = () => {
  const [dateRange, setDateRange] = useState({ start: '2023-06-01', end: '2023-06-30' });
  
  // Sample data for customer growth
  const customerGrowthData = [
    { month: 'Jan', newCustomers: 120, returningCustomers: 85 },
    { month: 'Feb', newCustomers: 150, returningCustomers: 92 },
    { month: 'Mar', newCustomers: 180, returningCustomers: 110 },
    { month: 'Apr', newCustomers: 210, returningCustomers: 135 },
    { month: 'May', newCustomers: 190, returningCustomers: 142 },
    { month: 'Jun', newCustomers: 240, returningCustomers: 165 },
  ];
  
  // Sample data for customer demographics
  const demographicsData = [
    { name: '18-25', value: 22 },
    { name: '26-35', value: 35 },
    { name: '36-45', value: 28 },
    { name: '46-55', value: 10 },
    { name: '55+', value: 5 },
  ];
  
  // Sample data for top customers
  const topCustomers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', totalSpent: 5420, orders: 12, lastOrder: '2023-06-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', totalSpent: 4890, orders: 9, lastOrder: '2023-06-18' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', totalSpent: 4250, orders: 7, lastOrder: '2023-06-10' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', totalSpent: 3980, orders: 11, lastOrder: '2023-06-20' },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', totalSpent: 3750, orders: 8, lastOrder: '2023-06-12' },
  ];
  
  // Sample data for customer locations
  const locationData = [
    { country: 'United States', customers: 1250, percentage: 45 },
    { country: 'Canada', customers: 320, percentage: 12 },
    { country: 'United Kingdom', customers: 280, percentage: 10 },
    { country: 'Australia', customers: 210, percentage: 8 },
    { country: 'Germany', customers: 180, percentage: 6 },
    { country: 'Other', customers: 530, percentage: 19 },
  ];
  
  const COLORS = ['#1e40af', '#8b5cf6', '#059669', '#f59e0b', '#ef4444'];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Customer Report</h1>
          <p className="text-admin-gray-600">Analyze customer behavior, demographics, and engagement</p>
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
      
      {/* Customer Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-blue-600 font-semibold">Total Customers</span>
          </div>
          <div className="admin-stats-number">8,420</div>
          <div className="admin-stats-label">Active customers</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">New Customers</span>
          </div>
          <div className="admin-stats-number">1,240</div>
          <div className="admin-stats-label">This month</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-purple-100 text-purple-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-purple-600 font-semibold">Avg. Orders</span>
          </div>
          <div className="admin-stats-number">2.4</div>
          <div className="admin-stats-label">Per customer</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-amber-100 text-amber-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-amber-600 font-semibold">Avg. Spend</span>
          </div>
          <div className="admin-stats-number">$245</div>
          <div className="admin-stats-label">Per customer</div>
        </div>
      </div>
      
      {/* Customer Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Customer Growth Chart */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Customer Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={customerGrowthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="month" stroke="var(--admin-gray-500)" />
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
                <Bar dataKey="newCustomers" name="New Customers" fill="var(--admin-primary)" />
                <Bar dataKey="returningCustomers" name="Returning Customers" fill="var(--admin-secondary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Customer Demographics */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Customer Demographics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
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
      
      {/* Top Customers */}
      <div className="admin-glass-card p-6 mb-8">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Top Customers</h3>
        <div className="admin-table">
          <div className="admin-table-header">
            <div className="admin-table-row">
              <div className="admin-table-cell font-semibold">Customer</div>
              <div className="admin-table-cell font-semibold">Email</div>
              <div className="admin-table-cell font-semibold">Total Spent</div>
              <div className="admin-table-cell font-semibold">Orders</div>
              <div className="admin-table-cell font-semibold">Last Order</div>
            </div>
          </div>
          <div>
            {topCustomers.map((customer) => (
              <div key={customer.id} className="admin-table-row">
                <div className="admin-table-cell">
                  <p className="font-semibold text-admin-gray-900">{customer.name}</p>
                </div>
                <div className="admin-table-cell">
                  {customer.email}
                </div>
                <div className="admin-table-cell">
                  <span className="font-semibold text-admin-primary">${customer.totalSpent}</span>
                </div>
                <div className="admin-table-cell">
                  {customer.orders}
                </div>
                <div className="admin-table-cell">
                  {customer.lastOrder}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Customer Locations */}
      <div className="admin-glass-card p-6">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Customer Locations</h3>
        <div className="admin-table">
          <div className="admin-table-header">
            <div className="admin-table-row">
              <div className="admin-table-cell font-semibold">Country</div>
              <div className="admin-table-cell font-semibold">Customers</div>
              <div className="admin-table-cell font-semibold">Percentage</div>
              <div className="admin-table-cell font-semibold">Growth</div>
            </div>
          </div>
          <div>
            {locationData.map((location, index) => (
              <div key={index} className="admin-table-row">
                <div className="admin-table-cell">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-admin-gray-400" />
                    <span className="font-semibold text-admin-gray-900">{location.country}</span>
                  </div>
                </div>
                <div className="admin-table-cell">
                  {location.customers.toLocaleString()}
                </div>
                <div className="admin-table-cell">
                  {location.percentage}%
                </div>
                <div className="admin-table-cell">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">+{Math.floor(Math.random() * 10) + 1}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReport;