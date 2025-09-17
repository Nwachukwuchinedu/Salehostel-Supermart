import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../../shared/ui/components/Spinner";
import Button from "../../../shared/ui/components/Button";
import Breadcrumb from "../../../shared/ui/components/Breadcrumb";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderStatuses = {
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
      description: "Your order is being processed",
    },
    confirmed: {
      label: "Confirmed",
      color: "bg-blue-100 text-blue-800",
      description: "Your order has been confirmed",
    },
    processing: {
      label: "Processing",
      color: "bg-purple-100 text-purple-800",
      description: "Your order is being prepared",
    },
    shipped: {
      label: "Shipped",
      color: "bg-indigo-100 text-indigo-800",
      description: "Your order is on its way",
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-800",
      description: "Your order has been delivered",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
      description: "Your order has been cancelled",
    },
    returned: {
      label: "Returned",
      color: "bg-gray-100 text-gray-800",
      description: "Your order has been returned",
    },
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock order data
      const mockOrder = {
        id: orderId,
        date: "2024-01-15T10:30:00Z",
        status: "shipped",
        total: 349.97,
        subtotal: 299.98,
        shipping: 9.99,
        tax: 39.0,
        discount: 0,
        items: [
          {
            id: 1,
            name: "Premium Wireless Headphones",
            image: "/api/placeholder/100/100",
            price: 299.99,
            quantity: 1,
            sku: "AT-WH-001",
          },
          {
            id: 2,
            name: "USB-C Cable",
            image: "/api/placeholder/100/100",
            price: 24.99,
            quantity: 1,
            sku: "ACC-USB-001",
          },
        ],
        shippingAddress: {
          firstName: "John",
          lastName: "Doe",
          company: "",
          address1: "123 Main Street",
          address2: "Apt 4B",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
          phone: "+1 (555) 123-4567",
        },
        billingAddress: {
          firstName: "John",
          lastName: "Doe",
          company: "",
          address1: "123 Main Street",
          address2: "Apt 4B",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
          phone: "+1 (555) 123-4567",
        },
        paymentMethod: {
          type: "credit_card",
          last4: "4242",
          brand: "Visa",
        },
        trackingNumber: "TRK123456789",
        estimatedDelivery: "2024-01-18",
        timeline: [
          {
            status: "pending",
            date: "2024-01-15T10:30:00Z",
            description: "Order placed",
          },
          {
            status: "confirmed",
            date: "2024-01-15T11:00:00Z",
            description: "Order confirmed",
          },
          {
            status: "processing",
            date: "2024-01-15T14:30:00Z",
            description: "Order being prepared",
          },
          {
            status: "shipped",
            date: "2024-01-16T09:15:00Z",
            description: "Order shipped",
          },
        ],
      };

      setOrder(mockOrder);
    } catch (err) {
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAddress = (address) => {
    const parts = [
      `${address.firstName} ${address.lastName}`,
      address.company,
      address.address1,
      address.address2,
      `${address.city}, ${address.state} ${address.zipCode}`,
      address.country,
      address.phone,
    ].filter(Boolean);

    return parts;
  };

  const getStatusBadge = (status) => {
    const statusConfig = orderStatuses[status] || orderStatuses.pending;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}
      >
        {statusConfig.label}
      </span>
    );
  };

  const breadcrumbItems = [
    { label: "Home", href: "/customer" },
    { label: "Orders", href: "/customer/orders" },
    { label: `Order ${orderId}` },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
          <Link to="/customer/orders">
            <Button variant="primary">Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Order {order.id}
                </h1>
                <p className="text-gray-600">
                  Placed on {formatDate(order.date)}
                </p>
              </div>

              <div className="mt-4 sm:mt-0">{getStatusBadge(order.status)}</div>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Amount</span>
                <p className="font-semibold text-lg">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              {order.trackingNumber && (
                <div>
                  <span className="text-gray-500">Tracking Number</span>
                  <p className="font-semibold">{order.trackingNumber}</p>
                </div>
              )}

              {order.estimatedDelivery && (
                <div>
                  <span className="text-gray-500">Estimated Delivery</span>
                  <p className="font-semibold">
                    {new Date(order.estimatedDelivery).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-3">
              {order.status === "shipped" && (
                <Link to={`/customer/orders/${order.id}/track`}>
                  <Button variant="primary" size="sm">
                    Track Package
                  </Button>
                </Link>
              )}

              {order.status === "delivered" && (
                <Button variant="outline" size="sm">
                  Reorder Items
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

              <Button variant="outline" size="sm">
                Download Invoice
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Items
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm border mt-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Timeline
                </h2>
              </div>

              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {order.timeline.map((event, eventIdx) => (
                      <li key={eventIdx}>
                        <div className="relative pb-8">
                          {eventIdx !== order.timeline.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                  event.status === order.status
                                    ? "bg-blue-500"
                                    : "bg-gray-400"
                                }`}
                              >
                                <svg
                                  className="h-4 w-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {event.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(event.date)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Addresses */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    ${order.shipping.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${order.tax.toFixed(2)}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">
                      -${order.discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h2>
              </div>

              <div className="p-6">
                <div className="text-sm text-gray-900 space-y-1">
                  {formatAddress(order.shippingAddress).map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Method
                </h2>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {order.paymentMethod.brand} ending in{" "}
                      {order.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-gray-600">Credit Card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
