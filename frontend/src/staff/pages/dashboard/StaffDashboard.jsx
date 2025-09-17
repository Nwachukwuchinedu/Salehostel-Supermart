import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import staffService from "../../../shared/services/staffService";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import Button from "../../../shared/ui/components/Button";
import Badge from "../../../shared/ui/components/Badge";
import Spinner from "../../../shared/ui/components/Spinner";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeOrders: 0,
      todaySales: 0,
      customersServed: 0,
      lowStockItems: 0,
    },
    orderQueue: [],
    lowStockAlerts: [],
    clockStatus: null,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch order queue
      const queueResponse = await staffService.getOrderQueue();

      // Fetch orders for today's stats
      const ordersResponse = await staffService.getOrders({
        status: "active",
        limit: 50,
      });

      // Fetch low stock alerts
      const stockResponse = await staffService.getLowStockAlerts();

      // Fetch staff performance for today
      const performanceResponse = await staffService.getStaffPerformance({
        period: "today",
      });

      const activeOrders = queueResponse.data?.orders?.length || 0;
      const todaySales = performanceResponse.data?.totalSales || 0;
      const customersServed = performanceResponse.data?.customersServed || 0;
      const lowStockItems = stockResponse.data?.alerts?.length || 0;

      setDashboardData({
        stats: {
          activeOrders,
          todaySales,
          customersServed,
          lowStockItems,
        },
        orderQueue: queueResponse.data?.orders || [],
        lowStockAlerts: stockResponse.data?.alerts || [],
        clockStatus: performanceResponse.data?.clockStatus,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockAction = async () => {
    try {
      if (dashboardData.clockStatus?.status === "clocked_in") {
        await staffService.clockOut();
      } else {
        await staffService.clockIn();
      }
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error("Error with clock action:", error);
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "ready":
        return "success";
      case "preparing":
        return "info";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your daily overview.
        </p>
      </div>

      {/* Clock In/Out */}
      <div className="mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">
              {dashboardData.clockStatus?.status === "clocked_in"
                ? "Clocked In"
                : "Not Clocked In"}
            </p>
            {dashboardData.clockStatus?.clockInTime && (
              <p className="text-sm text-gray-600">
                Since: {formatDate(dashboardData.clockStatus.clockInTime)}
              </p>
            )}
          </div>
          <Button
            onClick={handleClockAction}
            variant={
              dashboardData.clockStatus?.status === "clocked_in"
                ? "outline"
                : "primary"
            }
          >
            <Clock className="w-4 h-4 mr-2" />
            {dashboardData.clockStatus?.status === "clocked_in"
              ? "Clock Out"
              : "Clock In"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-purple-600 text-sm font-semibold">
              Active
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {dashboardData.stats.activeOrders}
          </div>
          <div className="text-gray-600 text-sm">Active Orders</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">Today</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(dashboardData.stats.todaySales)}
          </div>
          <div className="text-gray-600 text-sm">Sales Made</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-blue-600 text-sm font-semibold">
              This shift
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {dashboardData.stats.customersServed}
          </div>
          <div className="text-gray-600 text-sm">Customers Served</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <span
              className={`text-sm font-semibold ${
                dashboardData.stats.lowStockItems > 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {dashboardData.stats.lowStockItems > 0 ? "Urgent" : "Good"}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {dashboardData.stats.lowStockItems}
          </div>
          <div className="text-gray-600 text-sm">Low Stock Items</div>
        </div>
      </div>

      {/* Quick Actions & Order Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Order Queue
              </h3>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                5 Pending
              </span>
            </div>

            <div className="space-y-4">
              {dashboardData.orderQueue.length > 0 ? (
                dashboardData.orderQueue.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(`/staff/orders/${order._id}`)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.orderNumber || `ORD-${order._id.slice(-6)}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customer?.name || "Walk-in Customer"} •{" "}
                        {order.items?.length || 0} items
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <Badge variant={getOrderStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No orders in queue</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/staff/orders/quick-sale")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Process New Order
              </Button>
              <Button
                onClick={() => navigate("/staff/inventory")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Update Stock
              </Button>
              <Button
                onClick={() => navigate("/staff/customers")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Customer Support
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Stock Alerts
            </h3>
            <div className="space-y-3">
              {dashboardData.lowStockAlerts.length > 0 ? (
                dashboardData.lowStockAlerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert._id}
                    className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div className="flex-1">
                      <p className="font-medium text-red-900">
                        {alert.productName}
                      </p>
                      <p className="text-sm text-red-600">
                        Only {alert.currentStock} {alert.unit} left
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/staff/inventory/${alert.productId}`)
                      }
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Package className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">All stock levels good</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
