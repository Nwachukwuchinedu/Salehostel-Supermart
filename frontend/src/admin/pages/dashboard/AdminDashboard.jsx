import React, { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Users,
  TrendingUp,
  Package,
  Truck,
  FileText,
  Plus,
  Edit,
  Eye,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    todayRevenue: 48500,
    todayOrders: 47,
    lowStockItems: 12,
    activeSuppliers: 5,
    totalProducts: 156,
    pendingOrders: 8,
    monthlyRevenue: 1250000,
    monthlyGrowth: 12.5,
  });

  const [recentOrders] = useState([
    {
      id: "ORD-001",
      customerName: "John Doe",
      items: 3,
      total: 4500,
      status: "pending",
      time: "5 min ago",
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      items: 2,
      total: 2800,
      status: "confirmed",
      time: "12 min ago",
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      items: 5,
      total: 7200,
      status: "preparing",
      time: "18 min ago",
    },
    {
      id: "ORD-004",
      customerName: "Sarah Wilson",
      items: 1,
      total: 1500,
      status: "ready",
      time: "25 min ago",
    },
    {
      id: "ORD-005",
      customerName: "David Brown",
      items: 4,
      total: 6300,
      status: "delivered",
      time: "32 min ago",
    },
  ]);

  const [lowStockAlerts] = useState([
    {
      product: "Rice",
      variant: "Black Rubber",
      stock: 2,
      minLevel: 10,
      status: "critical",
    },
    {
      product: "Indomie Noodles",
      variant: "Carton",
      stock: 5,
      minLevel: 15,
      status: "warning",
    },
    {
      product: "Palm Oil",
      variant: "Bottle",
      stock: 8,
      minLevel: 20,
      status: "warning",
    },
    {
      product: "Garri",
      variant: "Cup",
      stock: 3,
      minLevel: 12,
      status: "critical",
    },
  ]);

  const getOrderStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-100 text-amber-800",
      confirmed: "bg-blue-100 text-blue-800",
      preparing: "bg-purple-100 text-purple-800",
      ready: "bg-green-100 text-green-800",
      delivered: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStockAlertColor = (status) => {
    return status === "critical"
      ? "bg-red-50 border-red-200"
      : "bg-amber-50 border-amber-200";
  };

  const getStockAlertIcon = (status) => {
    return status === "critical" ? "text-red-600" : "text-amber-600";
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at SalesHostel today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-admin-primary hover:bg-admin-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Quick Actions
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-admin-primary to-green-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-admin-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-admin-primary" />
            </div>
            <span className="text-green-600 text-sm font-semibold">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₦{stats.todayRevenue.toLocaleString()}
          </div>
          <div className="text-gray-600 text-sm">Today's Revenue</div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">+8</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.todayOrders}
          </div>
          <div className="text-gray-600 text-sm">Orders Today</div>
        </div>

        {/* Low Stock Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-red-600 text-sm font-semibold">-3</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.lowStockItems}
          </div>
          <div className="text-gray-600 text-sm">Low Stock Items</div>
        </div>

        {/* Suppliers Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-blue-600 text-sm font-semibold">
              2 active
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.activeSuppliers}
          </div>
          <div className="text-gray-600 text-sm">Active Suppliers</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Orders
                </h3>
                <button className="text-admin-primary hover:text-admin-primary/80 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.customerName} • {order.items} items
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₦{order.total.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <button className="p-1 text-gray-400 hover:text-admin-primary">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-admin-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-admin-primary hover:bg-admin-primary/90 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                <Package className="w-4 h-4" />
                Add New Product
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Create Purchase Order
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                Assign Staff Role
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Stock Alerts
              </h3>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                {
                  lowStockAlerts.filter((item) => item.status === "critical")
                    .length
                }{" "}
                Critical
              </span>
            </div>
            <div className="space-y-3">
              {lowStockAlerts.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${getStockAlertColor(
                    item.status
                  )}`}
                >
                  <AlertTriangle
                    className={`w-5 h-5 ${getStockAlertIcon(item.status)}`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product}</p>
                    <p className="text-sm text-gray-600">
                      {item.variant} • {item.stock} left
                    </p>
                    <p className="text-xs text-gray-500">
                      Min: {item.minLevel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-admin-primary hover:text-admin-primary/80 text-sm font-medium">
              View All Alerts
            </button>
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-semibold text-gray-900">
                  ₦{stats.monthlyRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Growth</span>
                <span className="font-semibold text-green-600">
                  +{stats.monthlyGrowth}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Products</span>
                <span className="font-semibold text-gray-900">
                  {stats.totalProducts}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-semibold text-amber-600">
                  {stats.pendingOrders}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
