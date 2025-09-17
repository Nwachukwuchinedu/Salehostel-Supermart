import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Phone,
  User,
  CheckCircle,
  AlertCircle,
  Truck,
  Store,
} from "lucide-react";

const Checkout = () => {
  const [orderData, setOrderData] = useState({
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      whatsappNumber: "",
      callNumber: "",
    },
    deliveryInfo: {
      type: "pickup", // 'pickup' or 'delivery'
      address: "",
      roomNumber: "",
      hostelBlock: "",
      specialInstructions: "",
    },
    paymentInfo: {
      method: "cash", // 'cash', 'transfer', 'pos'
      transferProof: null,
    },
  });

  const [cartItems] = useState([
    {
      id: 1,
      name: "Rice",
      packageType: "Black Rubber",
      price: 3650,
      quantity: 2,
    },
    {
      id: 2,
      name: "Indomie Noodles",
      packageType: "Pack",
      price: 350,
      quantity: 5,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = orderData.deliveryInfo.type === "delivery" ? 500 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (section, field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors((prev) => ({
        ...prev,
        [`${section}.${field}`]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate customer info
    if (!orderData.customerInfo.firstName.trim()) {
      newErrors["customerInfo.firstName"] = "First name is required";
    }
    if (!orderData.customerInfo.lastName.trim()) {
      newErrors["customerInfo.lastName"] = "Last name is required";
    }
    if (!orderData.customerInfo.whatsappNumber.trim()) {
      newErrors["customerInfo.whatsappNumber"] = "WhatsApp number is required";
    }

    // Validate delivery info if delivery is selected
    if (orderData.deliveryInfo.type === "delivery") {
      if (!orderData.deliveryInfo.roomNumber.trim()) {
        newErrors["deliveryInfo.roomNumber"] =
          "Room number is required for delivery";
      }
      if (!orderData.deliveryInfo.hostelBlock.trim()) {
        newErrors["deliveryInfo.hostelBlock"] =
          "Hostel block is required for delivery";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to order confirmation
      navigate("/customer/order-confirmation", {
        state: {
          orderNumber: "ORD-" + Date.now(),
          orderData,
          cartItems,
          total,
        },
      });
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/customer/cart"
            className="flex items-center text-gray-600 hover:text-customer-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-customer-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Customer Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={orderData.customerInfo.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo",
                          "firstName",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent ${
                        errors["customerInfo.firstName"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors["customerInfo.firstName"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["customerInfo.firstName"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={orderData.customerInfo.lastName}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo",
                          "lastName",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent ${
                        errors["customerInfo.lastName"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors["customerInfo.lastName"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["customerInfo.lastName"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={orderData.customerInfo.whatsappNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo",
                          "whatsappNumber",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent ${
                        errors["customerInfo.whatsappNumber"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="+234-XXX-XXX-XXXX"
                    />
                    {errors["customerInfo.whatsappNumber"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["customerInfo.whatsappNumber"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={orderData.customerInfo.callNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo",
                          "callNumber",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                      placeholder="+234-XXX-XXX-XXXX"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={orderData.customerInfo.email}
                      onChange={(e) =>
                        handleInputChange(
                          "customerInfo",
                          "email",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-customer-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Delivery Options
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      orderData.deliveryInfo.type === "pickup"
                        ? "border-customer-primary bg-customer-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="pickup"
                      checked={orderData.deliveryInfo.type === "pickup"}
                      onChange={(e) =>
                        handleInputChange(
                          "deliveryInfo",
                          "type",
                          e.target.value
                        )
                      }
                      className="sr-only"
                    />
                    <Store className="w-6 h-6 text-customer-primary mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Pickup at Shop
                      </p>
                      <p className="text-sm text-gray-600">
                        Free - Ready in 15-30 minutes
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      orderData.deliveryInfo.type === "delivery"
                        ? "border-customer-primary bg-customer-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="delivery"
                      checked={orderData.deliveryInfo.type === "delivery"}
                      onChange={(e) =>
                        handleInputChange(
                          "deliveryInfo",
                          "type",
                          e.target.value
                        )
                      }
                      className="sr-only"
                    />
                    <Truck className="w-6 h-6 text-customer-primary mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Delivery to Room
                      </p>
                      <p className="text-sm text-gray-600">
                        ₦500 - Delivered in 30-60 minutes
                      </p>
                    </div>
                  </label>
                </div>

                {orderData.deliveryInfo.type === "delivery" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Number *
                      </label>
                      <input
                        type="text"
                        value={orderData.deliveryInfo.roomNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "deliveryInfo",
                            "roomNumber",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent ${
                          errors["deliveryInfo.roomNumber"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="e.g., 205"
                      />
                      {errors["deliveryInfo.roomNumber"] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["deliveryInfo.roomNumber"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hostel Block *
                      </label>
                      <select
                        value={orderData.deliveryInfo.hostelBlock}
                        onChange={(e) =>
                          handleInputChange(
                            "deliveryInfo",
                            "hostelBlock",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent ${
                          errors["deliveryInfo.hostelBlock"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Block</option>
                        <option value="Block A">Block A</option>
                        <option value="Block B">Block B</option>
                        <option value="Block C">Block C</option>
                        <option value="Block D">Block D</option>
                      </select>
                      {errors["deliveryInfo.hostelBlock"] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["deliveryInfo.hostelBlock"]}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        value={orderData.deliveryInfo.specialInstructions}
                        onChange={(e) =>
                          handleInputChange(
                            "deliveryInfo",
                            "specialInstructions",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                        placeholder="Any special delivery instructions..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-customer-primary rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-4">
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      orderData.paymentInfo.method === "cash"
                        ? "border-customer-primary bg-customer-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={orderData.paymentInfo.method === "cash"}
                      onChange={(e) =>
                        handleInputChange(
                          "paymentInfo",
                          "method",
                          e.target.value
                        )
                      }
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm">₦</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Cash Payment
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay with cash on pickup/delivery
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      orderData.paymentInfo.method === "transfer"
                        ? "border-customer-primary bg-customer-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={orderData.paymentInfo.method === "transfer"}
                      onChange={(e) =>
                        handleInputChange(
                          "paymentInfo",
                          "method",
                          e.target.value
                        )
                      }
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Bank Transfer
                        </p>
                        <p className="text-sm text-gray-600">
                          Transfer to our account and upload proof
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-customer-primary hover:bg-customer-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
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

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {orderData.deliveryInfo.type === "delivery"
                      ? "Delivery Fee"
                      : "Pickup Fee"}
                  </span>
                  <span className="font-medium">
                    {deliveryFee === 0
                      ? "FREE"
                      : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-customer-primary">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Order Information
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      You will receive a WhatsApp confirmation once your order
                      is placed. Our team will contact you for any
                      clarifications.
                    </p>
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

export default Checkout;
