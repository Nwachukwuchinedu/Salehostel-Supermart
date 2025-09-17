import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../shared/ui/components/Spinner";
import Button from "../../../shared/ui/components/Button";
import Pagination from "../../../shared/ui/components/Pagination";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all");

  const orderStatuses = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
    processing: { label: "Processing", color: "bg-purple-100 text-purple-800" },
    shipped: { label: "Shipped", color: "bg-indigo-100 text-indigo-800" },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
    returned: { label: "Returned", color: "bg-gray-100 text-gray-800" },
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock orders data
      const mockOrders = [
        {
          id: "ORD-2024-001",
          date: "2024-01-15",
          status: "delivered",
          total: 299.99,
          items: [
            {
              id: 1,
              name: "Premium Wireless Headphones",
              image: "/api/placeholder/80/80",
              price: 299.99,
              quantity: 1,
            },
          ],
          shippingAddress: "123 Main St, City, State 12345",
          trackingNumber: "TRK123456789",
        },
        {
          id: "ORD-2024-002",
          date: "2024-01-20",
          status: "shipped",
          total: 149.99,
          items: [
            {
              id: 2,
              name: "Wireless Earbuds",
              image: "/api/placeholder/80/80",
              price: 149.99,
              quantity: 1,
            },
          ],
          shippingAddress: "123 Main St, City, State 12345",
          trackingNumber: "TRK987654321",
        },
        {
          id: "ORD-2024-003",
          date: "2024-01-25",
          status: "processing",
          total: 449.98,
          items: [
            {
              id: 3,
              name: "Gaming Headset",
              image: "/api/placeholder/80/80",
              price: 199.99,
              quantity: 1,
            },
            {
              id: 4,
              name: "USB Cable",
              image: "/api/placeholder/80/80",
              price: 24.99,
              quantity: 1,
            },
            {
              id: 5,
              name: "Phone Case",
              image: "/api/placeholder/80/80",
              price: 29.99,
              quantity: 1,
            },
          ],
          shippingAddress: "123 Main St, City, State 12345",
        },
      ];

      setOrders(mockOrders);
      setTotalPages(3); // Mock pagination
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = orderStatuses[status] || orderStatuses.pending;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}
      >
        {statusConfig.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Order History
          </h1>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
        </div>

        {filteredOrders.length > 0 ? (
          <>
            {/* Orders List */}
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm border"
                >
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order {order.id}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600">
                        <span>Placed on {formatDate(order.date)}</span>
                        <span className="font-semibold text-gray-900">
                          Total: ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × $
                              {item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="text-sm text-gray-600">
                        {order.trackingNumber && (
                          <span>Tracking: {order.trackingNumber}</span>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <Link to={`/customer/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>

                        {order.status === "shipped" && (
                          <Link to={`/customer/orders/${order.id}/track`}>
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          </Link>
                        )}

                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}

                        {["pending", "confirmed"].includes(order.status) && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {filter === "all" ? "No orders yet" : `No ${filter} orders`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === "all"
                  ? "You haven't placed any orders yet. Start shopping to see your order history here."
                  : `You don't have any ${filter} orders at the moment.`}
              </p>

              <div className="space-y-3">
                <Link to="/customer/shop">
                  <Button variant="primary">Start Shopping</Button>
                </Link>

                {filter !== "all" && (
                  <Button variant="outline" onClick={() => setFilter("all")}>
                    View All Orders
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
