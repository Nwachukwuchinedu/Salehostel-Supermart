import React, { useState, useEffect } from "react";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import Spinner from "../../../shared/ui/components/Spinner";

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const orderStatuses = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
    processing: { label: "Processing", color: "bg-purple-100 text-purple-800" },
    shipped: { label: "Shipped", color: "bg-green-100 text-green-800" },
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, filterStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockOrders = [
        {
          id: "PO-2024-001",
          customerName: "TechMart Store",
          customerEmail: "orders@techmart.com",
          orderDate: "2024-01-15T10:30:00Z",
          status: "pending",
          totalAmount: 2499.99,
          itemCount: 5,
          shippingAddress: "123 Business Ave, Tech City, TC 12345",
        },
        {
          id: "PO-2024-002",
          customerName: "ElectroWorld",
          customerEmail: "purchasing@electroworld.com",
          orderDate: "2024-01-14T14:20:00Z",
          status: "confirmed",
          totalAmount: 1899.5,
          itemCount: 3,
          shippingAddress: "456 Retail Blvd, Commerce City, CC 67890",
        },
        {
          id: "PO-2024-003",
          customerName: "GadgetHub",
          customerEmail: "orders@gadgethub.com",
          orderDate: "2024-01-13T09:15:00Z",
          status: "processing",
          totalAmount: 3299.75,
          itemCount: 8,
          shippingAddress: "789 Digital St, Innovation Park, IP 54321",
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
      month: "short",
      day: "numeric",
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
          <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage incoming orders from customers
          </p>
        </div>
        <Button variant="outline">Export Orders</Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="flex items-end">
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("");
              }}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

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
                  </div>

                  <div className="flex items-center space-x-3">
                    {order.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusUpdate(order.id, "confirmed")
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Confirm Order
                      </Button>
                    )}
                    {order.status === "confirmed" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusUpdate(order.id, "processing")
                        }
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Start Processing
                      </Button>
                    )}
                    {order.status === "processing" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "shipped")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark as Shipped
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                    <p className="text-gray-600">Shipping Address</p>
                    <p className="text-gray-900">{order.shippingAddress}</p>
                  </div>
                </div>
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
              Orders will appear here when customers place them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierOrders;
