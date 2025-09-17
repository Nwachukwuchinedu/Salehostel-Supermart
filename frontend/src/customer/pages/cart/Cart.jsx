import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Rice",
      image: "/images/products/rice.jpg",
      price: 3650,
      quantity: 2,
      packageType: "Black Rubber",
      sku: "RICE-BR-001",
    },
    {
      id: 2,
      name: "Indomie Noodles",
      image: "/images/products/indomie.jpg",
      price: 350,
      quantity: 5,
      packageType: "Pack",
      sku: "NOODLE-PK-001",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API
      // const response = await customerApi.getCart();
      // const cartData = response.data || response;
      // setCartItems(Array.isArray(cartData) ? cartData : (cartData.items || []));
      setError(null);
    } catch (err) {
      console.error("Failed to fetch cart data:", err);
      setError("Failed to load cart data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Update quantity in UI immediately for better UX
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Update on backend - replace with actual API call
      // await customerApi.updateCartItem({
      //   productId: itemId,
      //   quantity: newQuantity
      // });
    } catch (err) {
      console.error("Failed to update cart item:", err);
      // Revert UI change on error
      fetchCartData();
      alert("Failed to update item quantity. Please try again.");
    }
  };

  const removeItem = async (itemId) => {
    try {
      // Remove from UI immediately for better UX
      setCartItems(cartItems.filter((item) => item.id !== itemId));

      // Remove from backend - replace with actual API call
      // await customerApi.removeFromCart({
      //   productId: itemId
      // });
    } catch (err) {
      console.error("Failed to remove cart item:", err);
      // Revert UI change on error
      fetchCartData();
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 10000 ? 0 : 500; // Free delivery over ₦10,000
  const total = subtotal + deliveryFee;

  useEffect(() => {
    fetchCartData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customer-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchCartData}
            className="bg-customer-primary hover:bg-customer-primary/90 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/customer/products"
            className="flex items-center text-gray-600 hover:text-customer-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added anything to your cart yet
                </p>
                <Link
                  to="/customer/products"
                  className="bg-customer-primary hover:bg-customer-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            e.target.src = "/images/placeholder-product.jpg";
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-gray-600">{item.packageType}</p>
                            <p className="text-sm text-gray-500">
                              SKU: {item.sku}
                            </p>
                          </div>

                          <div className="mt-2 sm:mt-0">
                            <p className="text-xl font-bold text-customer-primary">
                              ₦{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center mb-4 sm:mb-0">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 border border-gray-300 rounded-l-lg hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-16 text-center border-y border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-customer-primary"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 border border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <p className="text-lg font-semibold text-gray-900">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-medium">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₦${deliveryFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-gray-500">
                      Free delivery on orders over ₦10,000
                    </p>
                  )}
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-gray-900 font-bold text-lg">
                      Total
                    </span>
                    <span className="text-gray-900 font-bold text-xl">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  to="/customer/checkout"
                  className="w-full bg-customer-primary hover:bg-customer-primary/90 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </Link>

                <div className="mt-6 text-center">
                  <Link
                    to="/customer/products"
                    className="text-customer-primary hover:text-customer-primary/80 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Secure checkout guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
