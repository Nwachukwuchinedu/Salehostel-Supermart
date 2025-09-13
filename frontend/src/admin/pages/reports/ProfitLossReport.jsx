import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, CreditCard, Filter, Download, Printer } from 'lucide-react';

const ProfitLossReport = () => {
  const [dateRange, setDateRange] = useState({ start: '2023-06-01', end: '2023-06-30' });
  
  // Sample data for revenue and expenses
  const financialData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Mar', revenue: 48000, expenses: 38000, profit: 10000 },
    { month: 'Apr', revenue: 61000, expenses: 42000, profit: 19000 },
    { month: 'May', revenue: 55000, expenses: 39000, profit: 16000 },
    { month: 'Jun', revenue: 67000, expenses: 45000, profit: 22000 },
  ];
  
  // Sample data for expense breakdown
  const expenseData = [
    { name: 'Cost of Goods', value: 45 },
    { name: 'Marketing', value: 15 },
    { name: 'Operations', value: 20 },
    { name: 'Salaries', value: 12 },
    { name: 'Other', value: 8 },
  ];
  
  // Sample data for payment methods
  const paymentData = [
    { method: 'Credit Card', amount: 125000, percentage: 45 },
    { method: 'PayPal', amount: 85000, percentage: 31 },
    { method: 'Bank Transfer', amount: 45000, percentage: 16 },
    { method: 'Cash', amount: 22000, percentage: 8 },
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
          <h1 className="text-3xl font-bold text-admin-gray-900">Profit & Loss Report</h1>
          <p className="text-admin-gray-600">Analyze revenue, expenses, and profitability</p>
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
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">Total Revenue</span>
          </div>
          <div className="admin-stats-number">$324,500</div>
          <div className="admin-stats-label">All sales revenue</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-red-100 text-red-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-red-600 font-semibold">Total Expenses</span>
          </div>
          <div className="admin-stats-number">$187,300</div>
          <div className="admin-stats-label">Operating costs</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-blue-600 font-semibold">Net Profit</span>
          </div>
          <div className="admin-stats-number">$137,200</div>
          <div className="admin-stats-label">Revenue - Expenses</div>
        </div>
        
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-purple-100 text-purple-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-purple-600 font-semibold">Profit Margin</span>
          </div>
          <div className="admin-stats-number">42.3%</div>
          <div className="admin-stats-label">Net profit / Revenue</div>
        </div>
      </div>
      
      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue vs Expenses Chart */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Revenue vs Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={financialData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" />
                <XAxis dataKey="month" stroke="var(--admin-gray-500)" />
                <YAxis 
                  stroke="var(--admin-gray-500)" 
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  contentStyle={{ 
                    backgroundColor: 'var(--admin-glass)', 
                    borderColor: 'var(--admin-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue" 
                  stroke="var(--admin-primary)" 
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Expenses" 
                  stroke="var(--admin-danger)" 
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Expense Breakdown */}
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Expense Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
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
      
      {/* Payment Methods */}
      <div className="admin-glass-card p-6 mb-8">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-6">Payment Methods</h3>
        <div className="admin-table">
          <div className="admin-table-header">
            <div className="admin-table-row">
              <div className="admin-table-cell font-semibold">Payment Method</div>
              <div className="admin-table-cell font-semibold">Amount</div>
              <div className="admin-table-cell font-semibold">Percentage</div>
              <div className="admin-table-cell font-semibold">Transactions</div>
            </div>
          </div>
          <div>
            {paymentData.map((method, index) => (
              <div key={index} className="admin-table-row">
                <div className="admin-table-cell">
                  <p className="font-semibold text-admin-gray-900">{method.method}</p>
                </div>
                <div className="admin-table-cell">
                  {formatCurrency(method.amount)}
                </div>
                <div className="admin-table-cell">
                  {method.percentage}%
                </div>
                <div className="admin-table-cell">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-admin-primary h-2 rounded-full" 
                      style={{ width: `${method.percentage}%` }}
                    ></div>
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

export default ProfitLossReport;