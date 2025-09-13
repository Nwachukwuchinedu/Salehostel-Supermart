import React from 'react'
import { 
  Package, 
  ShoppingBag, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react'

const AdminDashboard = () => {
  // Sample stats data
  const stats = [
    {
      title: "Total Products",
      value: "2,547",
      change: "+12%",
      icon: Package,
      color: "admin-primary",
      isPositive: true
    },
    {
      title: "Orders Today",
      value: "1,248",
      change: "+18%",
      icon: ShoppingBag,
      color: "admin-success",
      isPositive: true
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5%",
      icon: AlertTriangle,
      color: "admin-warning",
      isPositive: false
    },
    {
      title: "Revenue Today",
      value: "$48,392",
      change: "+22%",
      icon: DollarSign,
      color: "admin-success",
      isPositive: true
    }
  ]

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Dashboard</h1>
          <p className="text-admin-gray-600">Overview of your store performance</p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="admin-stats-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`admin-stats-icon bg-${stat.color}/10 text-${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {stat.isPositive ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="admin-stats-number">{stat.value}</div>
              <div className="admin-stats-label">{stat.title}</div>
              <div className={`text-sm mt-2 ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last period
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Sales Overview</h3>
          <div className="h-64 bg-admin-gray-50/50 rounded-lg flex items-center justify-center">
            <span className="text-admin-gray-500">Sales Chart Component</span>
          </div>
        </div>
        
        <div className="admin-glass-card p-6">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Inventory Status</h3>
          <div className="h-64 bg-admin-gray-50/50 rounded-lg flex items-center justify-center">
            <span className="text-admin-gray-500">Inventory Chart Component</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="admin-glass-card p-6">
        <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-admin-gray-50/50 rounded-lg">
            <div className="w-10 h-10 bg-admin-primary/10 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-admin-primary" />
            </div>
            <div className="flex-1">
              <p className="text-admin-gray-900 font-medium">New product added</p>
              <p className="text-admin-gray-600 text-sm">iPhone 15 Pro Max added to inventory</p>
            </div>
            <span className="text-admin-gray-500 text-sm">2 mins ago</span>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-admin-gray-50/50 rounded-lg">
            <div className="w-10 h-10 bg-admin-success/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-admin-success" />
            </div>
            <div className="flex-1">
              <p className="text-admin-gray-900 font-medium">New order received</p>
              <p className="text-admin-gray-600 text-sm">Order #12345 for $299.99</p>
            </div>
            <span className="text-admin-gray-500 text-sm">15 mins ago</span>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-admin-gray-50/50 rounded-lg">
            <div className="w-10 h-10 bg-admin-warning/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-admin-warning" />
            </div>
            <div className="flex-1">
              <p className="text-admin-gray-900 font-medium">Low stock alert</p>
              <p className="text-admin-gray-600 text-sm">Wireless Headphones stock is low (5 items left)</p>
            </div>
            <span className="text-admin-gray-500 text-sm">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard