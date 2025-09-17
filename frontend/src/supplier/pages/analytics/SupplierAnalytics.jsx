import React, { useState, useEffect } from "react";
import Spinner from "../../../shared/ui/components/Spinner";

const SupplierAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" },
  ];

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockAnalytics = {
        revenue: {
          total: 45678.9,
          growth: 12.5,
          trend: "up",
        },
        orders: {
          total: 156,
          growth: 8.3,
          trend: "up",
        },
        products: {
          total: 89,
          growth: -2.1,
          trend: "down",
        },
        customers: {
          total: 34,
          growth: 15.7,
          trend: "up",
        },
        topProducts: [
          { name: "Wireless Headphones", sales: 45, revenue: 6749.55 },
          { name: "Gaming Keyboard", sales: 32, revenue: 4799.68 },
          { name: "USB Cables", sales: 78, revenue: 1013.22 },
          { name: "Phone Cases", sales: 56, revenue: 1399.44 },
          { name: "Mouse Pads", sales: 23, revenue: 367.77 },
        ],
        recentOrders: [
          {
            id: "PO-2024-001",
            customer: "TechMart",
            amount: 2499.99,
            status: "shipped",
          },
          {
            id: "PO-2024-002",
            customer: "ElectroWorld",
            amount: 1899.5,
            status: "processing",
          },
          {
            id: "PO-2024-003",
            customer: "GadgetHub",
            amount: 3299.75,
            status: "confirmed",
          },
        ],
        monthlyRevenue: [
          { month: "Jan", revenue: 12500 },
          { month: "Feb", revenue: 15200 },
          { month: "Mar", revenue: 18900 },
          { month: "Apr", revenue: 22100 },
          { month: "May", revenue: 19800 },
          { month: "Jun", revenue: 25400 },
        ],
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <svg
        className="w-4 h-4 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 11l5-5m0 0l5 5m-5-5v12"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 13l-5 5m0 0l-5-5m5 5V6"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your business performance and insights
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(analytics.revenue.total)}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon(analytics.revenue.trend)}
              <span
                className={`text-sm font-medium ${
                  analytics.revenue.trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {analytics.revenue.growth}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analytics.orders.total}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon(analytics.orders.trend)}
              <span
                className={`text-sm font-medium ${
                  analytics.orders.trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {analytics.orders.growth}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Products
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {analytics.products.total}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon(analytics.products.trend)}
              <span
                className={`text-sm font-medium ${
                  analytics.products.trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {Math.abs(analytics.products.growth)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Customers
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {analytics.customers.total}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon(analytics.customers.trend)}
              <span
                className={`text-sm font-medium ${
                  analytics.customers.trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {analytics.customers.growth}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.sales} units sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h3>
          <div className="space-y-4">
            {analytics.recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency(order.amount)}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "shipped"
                        ? "bg-green-100 text-green-800"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Trend
        </h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              Revenue chart would be displayed here
            </p>
            <p className="text-xs text-gray-400">
              Integration with charting library needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierAnalytics;
