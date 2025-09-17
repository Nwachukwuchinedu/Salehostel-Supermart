import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../../shared/ui/components/Spinner";
import Button from "../../../shared/ui/components/Button";
import Breadcrumb from "../../../shared/ui/components/Breadcrumb";

const TrackOrder = () => {
  const { orderId } = useParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrackingData();
  }, [orderId]);

  const fetchTrackingData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock tracking data
      const mockTrackingData = {
        orderId: orderId,
        trackingNumber: "TRK123456789",
        carrier: "FedEx",
        status: "in_transit",
        estimatedDelivery: "2024-01-18T17:00:00Z",
        currentLocation: "New York, NY Distribution Center",
        packageDetails: {
          weight: "1.2 lbs",
          dimensions: '12" x 8" x 4"',
          service: "FedEx Ground",
        },
        timeline: [
          {
            status: "label_created",
            location: "Los Angeles, CA",
            date: "2024-01-15T14:30:00Z",
            description: "Shipping label created",
          },
          {
            status: "picked_up",
            location: "Los Angeles, CA Facility",
            date: "2024-01-16T09:15:00Z",
            description: "Package picked up by carrier",
          },
          {
            status: "in_transit",
            location: "Phoenix, AZ Distribution Center",
            date: "2024-01-16T18:45:00Z",
            description: "Package in transit",
          },
          {
            status: "in_transit",
            location: "Denver, CO Distribution Center",
            date: "2024-01-17T08:20:00Z",
            description: "Package in transit",
          },
          {
            status: "in_transit",
            location: "New York, NY Distribution Center",
            date: "2024-01-17T22:10:00Z",
            description: "Package arrived at destination facility",
          },
        ],
        deliveryAddress: {
          name: "John Doe",
          address: "123 Main Street, Apt 4B",
          city: "New York, NY 10001",
        },
      };

      setTrackingData(mockTrackingData);
    } catch (err) {
      setError("Failed to load tracking information");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      label_created: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      picked_up: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8l6 6 6-6"
          />
        </svg>
      ),
      in_transit: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      out_for_delivery: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      delivered: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    };

    return icons[status] || icons.in_transit;
  };

  const getStatusColor = (status, isActive = false) => {
    if (isActive) {
      return "bg-blue-500 text-white";
    }

    const colors = {
      label_created: "bg-gray-400 text-white",
      picked_up: "bg-yellow-500 text-white",
      in_transit: "bg-blue-500 text-white",
      out_for_delivery: "bg-orange-500 text-white",
      delivered: "bg-green-500 text-white",
    };

    return colors[status] || "bg-gray-300 text-gray-600";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      label_created: "Label Created",
      picked_up: "Picked Up",
      in_transit: "In Transit",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
    };

    return labels[status] || "Unknown Status";
  };

  const breadcrumbItems = [
    { label: "Home", href: "/customer" },
    { label: "Orders", href: "/customer/orders" },
    { label: `Order ${orderId}`, href: `/customer/orders/${orderId}` },
    { label: "Track Package" },
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

  if (error || !trackingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tracking Information Not Available
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find tracking information for this order.
          </p>
          <Link to={`/customer/orders/${orderId}`}>
            <Button variant="primary">Back to Order Details</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Tracking Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Track Your Package
                </h1>
                <p className="text-gray-600">
                  Order {trackingData.orderId} • {trackingData.carrier}{" "}
                  {trackingData.trackingNumber}
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    trackingData.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : trackingData.status === "out_for_delivery"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {getStatusLabel(trackingData.status)}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Current Location</span>
                <p className="font-semibold">{trackingData.currentLocation}</p>
              </div>

              <div>
                <span className="text-gray-500">Estimated Delivery</span>
                <p className="font-semibold">
                  {new Date(trackingData.estimatedDelivery).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>

              <div>
                <span className="text-gray-500">Service Type</span>
                <p className="font-semibold">
                  {trackingData.packageDetails.service}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Package Journey
                </h2>
              </div>

              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {trackingData.timeline.map((event, eventIdx) => {
                      const isLatest =
                        eventIdx === trackingData.timeline.length - 1;
                      return (
                        <li key={eventIdx}>
                          <div className="relative pb-8">
                            {eventIdx !== trackingData.timeline.length - 1 ? (
                              <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span
                                  className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(
                                    event.status,
                                    isLatest
                                  )}`}
                                >
                                  {getStatusIcon(event.status)}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5">
                                <div>
                                  <p
                                    className={`text-sm font-medium ${
                                      isLatest
                                        ? "text-blue-600"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {event.description}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {event.location}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(event.date)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Delivery Information
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Your package will be delivered to:</p>
                    <p className="font-medium mt-1">
                      {trackingData.deliveryAddress.name}
                      <br />
                      {trackingData.deliveryAddress.address}
                      <br />
                      {trackingData.deliveryAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Details & Actions */}
          <div className="space-y-8">
            {/* Package Details */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Package Details
                </h2>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tracking Number</span>
                  <span className="text-gray-900 font-mono">
                    {trackingData.trackingNumber}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Carrier</span>
                  <span className="text-gray-900">{trackingData.carrier}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-900">
                    {trackingData.packageDetails.weight}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="text-gray-900">
                    {trackingData.packageDetails.dimensions}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h2>
              </div>

              <div className="p-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() =>
                    window.open(
                      `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingData.trackingNumber}`,
                      "_blank"
                    )
                  }
                >
                  View on {trackingData.carrier} Website
                </Button>

                <Link to={`/customer/orders/${orderId}`}>
                  <Button variant="outline" className="w-full justify-center">
                    View Order Details
                  </Button>
                </Link>

                <Button variant="outline" className="w-full justify-center">
                  Update Delivery Preferences
                </Button>

                <Button variant="outline" className="w-full justify-center">
                  Report an Issue
                </Button>
              </div>
            </div>

            {/* Delivery Updates */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Stay Updated
                </h2>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Get notifications about your delivery status
                </p>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      SMS notifications
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Email notifications
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
