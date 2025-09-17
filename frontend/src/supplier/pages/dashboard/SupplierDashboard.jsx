import React, { useState, useEffect } from "react";
import {
  Package,
  TrendingUp,
  Clock,
  DollarSign,
  Plus,
  Eye,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import supplierService from "../../../shared/services/supplierService";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import Spinner from "../../../shared/ui/components/Spinner";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalSupplies: 0,
      totalValue: 0,
      activeProducts: 0,
      pendingPayments: 0,
      avgSupplyValue: 0,
    },
    recentSupplies: [],
    recentOrders: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch supplies data
      const suppliesResponse = await supplierService.getSupplies({
        limit: 5,
        sort: "-createdAt",
      });

      // Fetch products data
      const productsResponse = await supplierService.getProducts({
        status: "active",
      });

      // Fetch purchase orders
      const ordersResponse = await supplierService.getPurchaseOrders({
        limit: 5,
        sort: "-createdAt",
      });

      // Calculate stats
      const totalSupplies = suppliesResponse.data?.supplies?.length || 0;
      const totalValue =
        suppliesResponse.data?.supplies?.reduce(
          (sum, supply) => sum + (supply.totalValue || 0),
          0
        ) || 0;
      const activeProducts = productsResponse.data?.products?.length || 0;
      const pendingPayments =
        suppliesResponse.data?.supplies
          ?.filter((supply) => supply.paymentStatus === "pending")
          ?.reduce((sum, supply) => sum + (supply.totalValue || 0), 0) || 0;
      const avgSupplyValue = totalSupplies > 0 ? totalValue / totalSupplies : 0;

      setDashboardData({
        stats: {
          totalSupplies,
          totalValue,
          activeProducts,
          pendingPayments,
          avgSupplyValue,
        },
        recentSupplies: suppliesResponse.data?.supplies || [],
        recentOrders: ordersResponse.data?.orders || [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-900">Supplier Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your supply overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">
              Total Value
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(dashboardData.stats.totalValue)}
          </div>
          <div className="text-gray-600 text-sm">Total Supplies</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 text-sm font-semibold">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {dashboardData.stats.activeProducts}
          </div>
          <div className="text-gray-600 text-sm">Products Supplied</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-amber-600 text-sm font-semibold">
              Pending
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(dashboardData.stats.pendingPayments)}
          </div>
          <div className="text-gray-600 text-sm">Awaiting Payment</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">
              Average
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(dashboardData.stats.avgSupplyValue)}
          </div>
          <div className="text-gray-600 text-sm">Avg. Supply Value</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/supplier/supplies/create")}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Record New Supply
            </button>
            <button
              onClick={() => navigate("/supplier/orders")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Purchase Orders
            </button>
            <button
              onClick={() => navigate("/supplier/products")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Manage Products
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {dashboardData.recentSupplies.length > 0 ? (
              dashboardData.recentSupplies.slice(0, 3).map((supply) => (
                <div
                  key={supply._id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      supply.status === "delivered"
                        ? "bg-green-500"
                        : supply.status === "confirmed"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Supply {supply.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      {supply.productName} - {formatCurrency(supply.totalValue)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(supply.createdAt)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}

            {dashboardData.recentOrders.length > 0 &&
              dashboardData.recentOrders.slice(0, 2).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      New Purchase Order
                    </p>
                    <p className="text-sm text-gray-600">
                      Order #{order.orderNumber} -{" "}
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
