import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  MessageCircle,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  ArrowRight,
  Download,
  Share,
} from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    // Redirect if no order data
    if (!orderData) {
      navigate("/customer/cart");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderNumber, orderData: order, cartItems, total } = orderData;
  const estimatedTime =
    order.deliveryInfo.type === "delivery" ? "30-60 minutes" : "15-30 minutes";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We'll get it ready for you.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Order #{orderNumber}
                </h2>
                <p className="text-gray-600">
                  Placed on {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Receipt</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Share className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer & Delivery Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-customer-primary" />
                    Customer Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      {order.customerInfo.firstName}{" "}
                      {order.customerInfo.lastName}
                    </p>
                    <p>
                      <span className="text-gray-600">WhatsApp:</span>{" "}
                      {order.customerInfo.whatsappNumber}
                    </p>
                    {order.customerInfo.callNumber && (
                      <p>
                        <span className="text-gray-600">Phone:</span>{" "}
                        {order.customerInfo.callNumber}
                      </p>
                    )}
                    {order.customerInfo.email && (
                      <p>
                        <span className="text-gray-600">Email:</span>{" "}
                        {order.customerInfo.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    {order.deliveryInfo.type === "delivery" ? (
                      <MapPin className="w-5 h-5 text-customer-primary" />
                    ) : (
                      <Clock className="w-5 h-5 text-customer-primary" />
                    )}
                    {order.deliveryInfo.type === "delivery"
                      ? "Delivery Details"
                      : "Pickup Details"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Type:</span>
                      <span className="capitalize ml-1">
                        {order.deliveryInfo.type === "delivery"
                          ? "Room Delivery"
                          : "Shop Pickup"}
                      </span>
                    </p>
                    {order.deliveryInfo.type === "delivery" ? (
                      <>
                        <p>
                          <span className="text-gray-600">Room:</span>{" "}
                          {order.deliveryInfo.roomNumber}
                        </p>
                        <p>
                          <span className="text-gray-600">Block:</span>{" "}
                          {order.deliveryInfo.hostelBlock}
                        </p>
                        {order.deliveryInfo.specialInstructions && (
                          <p>
                            <span className="text-gray-600">Instructions:</span>{" "}
                            {order.deliveryInfo.specialInstructions}
                          </p>
                        )}
                      </>
                    ) : (
                      <p>
                        <span className="text-gray-600">Location:</span> NDDC
                        Hostel - Shop 12
                      </p>
                    )}
                    <p>
                      <span className="text-gray-600">Estimated Time:</span>{" "}
                      {estimatedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-customer-primary" />
                  Order Items
                </h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.packageType} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>
                      ₦
                      {(
                        total -
                        (order.deliveryInfo.type === "delivery" ? 500 : 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                  {order.deliveryInfo.type === "delivery" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>₦500</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-customer-primary">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-customer-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-customer-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    WhatsApp Confirmation
                  </p>
                  <p className="text-sm text-gray-600">
                    You'll receive a WhatsApp message confirming your order
                    details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-customer-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-customer-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Preparation</p>
                  <p className="text-sm text-gray-600">
                    Our team will prepare your order and notify you when it's
                    ready.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-customer-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  {order.deliveryInfo.type === "delivery" ? (
                    <MapPin className="w-4 h-4 text-customer-primary" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 text-customer-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {order.deliveryInfo.type === "delivery"
                      ? "Delivery"
                      : "Pickup"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.deliveryInfo.type === "delivery"
                      ? `We'll deliver to your room in ${estimatedTime}`
                      : `Your order will be ready for pickup in ${estimatedTime}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/customer/products"
            className="bg-customer-primary hover:bg-customer-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>

          <Link
            to="/customer/account/orders"
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            View Order History
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Need help with your order?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/234XXXXXXXXX?text=Hi, I need help with order ${orderNumber}`}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Support
            </a>
            <a
              href="tel:+234XXXXXXXXX"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
