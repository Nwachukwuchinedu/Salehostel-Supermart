import React, { useState, useEffect } from 'react'
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  AlertTriangle,
  DollarSign,
  Eye,
  Plus,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import adminApi from '../../../shared/services/adminApi'

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalUsers: 0,
      lowStockItems: 0,
      pendingOrders: 0
    },
    recentOrders: [],
    topProducts: [],
    salesData: [],
    loading: true
  })

  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    loadDashboardData()
  }, [dateRange])

  const loadDashboardData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, loading: true }))

      // Simulate API calls - replace with actual API calls
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        adminApi.getInventoryOverview(),
        adminApi.getOrders(),
        adminApi.getProducts()
      ])

      // Mock data for demonstration
      setDashboardData({
        stats: {
          totalProducts: 247,
          totalOrders: 89,
          totalRevenue: 1250000,
          totalUsers: 156,
          lowStockItems: 12,
          pendingOrders: 8
        },
        recentOrders: [
          { id: 'ORD-001', customer: 'John Doe', amount: 15500, status: 'completed', date: '2024-01-15' },
          { id: 'ORD-002', customer: 'Jane Smith', amount: 8900, status: 'pending', date: '2024-01-15' },
          { id: 'ORD-003', customer: 'Mike Johnson', amount: 12300, status: 'processing', date: '2024-01-14' },
          { id: 'ORD-004', customer: 'Sarah Wilson', amount: 18700, status: 'completed', date: '2024-01-14' },
          { id: 'ORD-005', customer: 'David Brown', amount: 6500, status: 'pending', date: '2024-01-13' }
        ],
        topProducts: [
          { name: 'Rice (Black Rubber)', sales: 45, revenue: 67500 },
          { name: 'Beans (Half Rubber)', sales: 32, revenue: 48000 },
          { name: 'Garri (Paint Rubber)', sales: 28, revenue: 42000 },
          { name: 'Palm Oil (Bottle)', sales: 25, revenue: 37500 },
          { name: 'Noodles (Pack)', sales: 22, revenue: 33000 }
        ],
        salesData: [
          { date: '2024-01-09', sales: 45000 },
          { date: '2024-01-10', sales: 52000 },
          { date: '2024-01-11', sales: 48000 },
          { date: '2024-01-12', sales: 61000 },
          { date: '2024-01-13', sales: 55000 },
          { date: '2024-01-14', sales: 67000 },
          { date: '2024-01-15', sales: 59000 }
        ],
        loading: false
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      setDashboardData(prev => ({ ...prev, loading: false }))
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: 'admin-badge-success',
      pending: 'admin-badge-warning',
      processing: 'admin-badge-primary',
      cancelled: 'admin-badge-danger'
    }
    return statusClasses[status] || 'admin-badge-gray'
  }

  if (dashboardData.loading) {
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
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-blue-100 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{dashboardData.stats.totalProducts.toLocaleString()}</div>
          <div className="admin-stats-label">Total Products</div>
          <div className="admin-stats-change positive">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% from last month
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{dashboardData.stats.totalOrders.toLocaleString()}</div>
          <div className="admin-stats-label">Total Orders</div>
          <div className="admin-stats-change positive">
            <TrendingUp className="w-4 h-4 mr-1" />
            +8% from last month
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-yellow-100 text-yellow-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{formatCurrency(dashboardData.stats.totalRevenue)}</div>
          <div className="admin-stats-label">Total Revenue</div>
          <div className="admin-stats-change positive">
            <TrendingUp className="w-4 h-4 mr-1" />
            +15% from last month
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-purple-100 text-purple-600">
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="admin-stats-number">{dashboardData.stats.totalUsers.toLocaleString()}</div>
          <div className="admin-stats-label">Total Users</div>
          <div className="admin-stats-change positive">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5% from last month
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-admin-gray-900">Low Stock Alerts</h3>
              <span className="admin-badge-warning">{dashboardData.stats.lowStockItems} items</span>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-admin-gray-900">Rice (Black Rubber)</p>
                    <p className="text-xs text-admin-gray-600">Only 5 units left</p>
                  </div>
                </div>
                <button className="admin-btn-sm admin-btn-primary">Restock</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-admin-gray-900">Beans (Half Rubber)</p>
                    <p className="text-xs text-admin-gray-600">Only 3 units left</p>
                  </div>
                </div>
                <button className="admin-btn-sm admin-btn-primary">Restock</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-admin-gray-900">Palm Oil (Bottle)</p>
                    <p className="text-xs text-admin-gray-600">Only 2 units left</p>
                  </div>
                </div>
                <button className="admin-btn-sm admin-btn-primary">Restock</button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-admin-gray-200">
              <button className="admin-btn-secondary w-full">
                View All Alerts
              </button>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-admin-gray-900">Pending Orders</h3>
              <span className="admin-badge-primary">{dashboardData.stats.pendingOrders} orders</span>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="space-y-3">
              {dashboardData.recentOrders.filter(order => order.status === 'pending').slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-admin-gray-900">{order.id}</p>
                    <p className="text-xs text-admin-gray-600">{order.customer} • {formatCurrency(order.amount)}</p>
                  </div>
                  <button className="admin-btn-sm admin-btn-primary">Process</button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-admin-gray-200">
              <button className="admin-btn-secondary w-full">
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-admin-gray-900">Sales Overview</h3>
              <div className="flex items-center gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="admin-form-select text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="h-64 flex items-center justify-center bg-admin-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-admin-gray-400 mx-auto mb-2" />
                <p className="text-admin-gray-500">Sales chart will be displayed here</p>
                <p className="text-sm text-admin-gray-400">Integration with chart library needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-admin-gray-900">Top Products</h3>
              <button className="admin-btn-ghost">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </button>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="space-y-4">
              {dashboardData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-admin-primary/10 text-admin-primary rounded-lg flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-admin-gray-900">{product.name}</p>
                      <p className="text-xs text-admin-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-admin-gray-900">{formatCurrency(product.revenue)}</p>
                    <p className="text-xs text-admin-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-admin-gray-900">Recent Orders</h3>
            <div className="flex items-center gap-2">
              <button className="admin-btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="admin-btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="admin-btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead className="admin-table-header">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="admin-table-body">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{formatCurrency(order.amount)}</td>
                  <td>
                    <span className={`admin-badge ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="admin-btn-ghost admin-btn-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="admin-btn-ghost admin-btn-sm">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="admin-pagination">
          <div className="admin-pagination-info">
            Showing 1 to 5 of 89 orders
          </div>
          <div className="admin-pagination-controls">
            <button className="admin-pagination-btn" disabled>Previous</button>
            <button className="admin-pagination-btn active">1</button>
            <button className="admin-pagination-btn">2</button>
            <button className="admin-pagination-btn">3</button>
            <button className="admin-pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard