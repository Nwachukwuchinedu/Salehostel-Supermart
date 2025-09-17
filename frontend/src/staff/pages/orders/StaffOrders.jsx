import React, { useState, useEffect } from "react";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import Spinner from "../../../shared/ui/components/Spinner";

const StaffOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const orderStatuses = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
    packed: { label: "Packed", color: "bg-purple-100 text-purple-800" },
    shipped: { label: "Shipped", color: "bg-green-100 text-green-800" },
    delivered: { label: "Delivered", color: "bg-gray-100 text-gray-800" },
  };

  const priorities = {
    low: { label: "Low", color: "bg-gray-100 text-gray-800" },
    normal: { label: "Normal", color: "bg-blue-100 text-blue-800" },
    high: { label: "High", color: "bg-orange-100 text-orange-800" },
    urgent: { label: "Urgent", color: "bg-red-100 text-red-800" },
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, filterStatus, filterPriority]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockOrders = [
        {
          id: "ORD-2024-001",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          orderDate: "2024-01-15T10:30:00Z",
          status: "pending",
          priority: "high",
          totalAmount: 299.99,
          itemCount: 3,
          shippingAddress: "123 Main St, City, State 12345",
          assignedTo: null,
          notes: "Customer requested expedited shipping",
        },
        {
          id: "ORD-2024-002",
          customerName: "Jane Smith",
          customerEmail: "jane@example.com",
          orderDate: "2024-01-14T14:20:00Z",
          status: "processing",
          priority: "normal",
          totalAmount: 149.99,
          itemCount: 2,
          shippingAddress: "456 Oak Ave, Town, State 67890",
          assignedTo: "Staff Member 1",
          notes: null,
        },
        {
          id: "ORD-2024-003",
          customerName: "Bob Johnson",
          customerEmail: "bob@example.com",
          orderDate: "2024-01-13T09:15:00Z",
          status: "packed",
          priority: "urgent",
          totalAmount: 599.99,
          itemCount: 5,
          shippingAddress: "789 Pine Rd, Village, State 54321",
          assignedTo: "Staff Member 2",
          notes: "Fragile items - handle with care",
        },
      ];

      let filteredOrders = mockOrders;

      if (searchTerm) {
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterStatus) {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === filterStatus
        );
      }

      if (filterPriority) {
        filteredOrders = filteredOrders.filter(
          (order) => order.priority === filterPriority
        );
      }

      setOrders(filteredOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleAssignOrder = async (orderId, staffMember) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, assignedTo: staffMember } : order
        )
      );
    } catch (error) {
      console.error("Failed to assign order:", error);
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

  const getPriorityBadge = (priority) => {
    const priorityConfig = priorities[priority] || priorities.normal;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityConfig.color}`}
      >
        {priorityConfig.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Process and fulfill customer orders
          </p>
        </div>
        <Button variant="outline">Print Pick Lists</Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Orders
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {orders.filter((o) => o.status === "pending").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-semibold text-gray-900">
                {orders.filter((o) => o.status === "processing").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ready to Ship</p>
              <p className="text-2xl font-semibold text-gray-900">
                {orders.filter((o) => o.status === "packed").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {orders.filter((o) => o.priority === "urgent").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <Input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              {Object.entries(orderStatuses).map(([key, status]) => (
                <option key={key} value={key}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Priorities</option>
              {Object.entries(priorities).map(([key, priority]) => (
                <option key={key} value={key}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("");
                setFilterPriority("");
              }}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white shadow-sm rounded-lg">
        {orders.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.id}
                    </h3>
                    {getStatusBadge(order.status)}
                    {getPriorityBadge(order.priority)}
                  </div>

                  <div className="flex items-center space-x-3">
                    {order.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusUpdate(order.id, "processing")
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Processing
                      </Button>
                    )}
                    {order.status === "processing" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "packed")}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Mark as Packed
                      </Button>
                    )}
                    {order.status === "packed" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "shipped")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Ship Order
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Customer</p>
                    <p className="font-medium text-gray-900">
                      {order.customerName}
                    </p>
                    <p className="text-gray-500">{order.customerEmail}</p>
                  </div>

                  <div>
                    <p className="text-gray-600">Order Details</p>
                    <p className="font-medium text-gray-900">
                      {order.itemCount} items • ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-gray-500">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Assigned To</p>
                    <p className="font-medium text-gray-900">
                      {order.assignedTo || "Unassigned"}
                    </p>
                    {!order.assignedTo && (
                      <button
                        onClick={() =>
                          handleAssignOrder(order.id, "Current User")
                        }
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Assign to me
                      </button>
                    )}
                  </div>

                  <div>
                    <p className="text-gray-600">Shipping Address</p>
                    <p className="text-gray-900">{order.shippingAddress}</p>
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> {order.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Orders will appear here when they need processing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffOrders;
