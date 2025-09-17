import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2, Heart } from "lucide-react";

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onMoveToFavorites,
  className = "",
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.variant.stock) return;

    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await onRemoveItem(item.id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMoveToFavorites = async () => {
    if (onMoveToFavorites) {
      setIsUpdating(true);
      try {
        await onMoveToFavorites(item.product.id);
        await onRemoveItem(item.id);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const subtotal = item.quantity * item.variant.price;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-4 ${
        isUpdating ? "opacity-50" : ""
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/customer/product/${item.product.id}`}>
            <img
              src={item.product.image || "/images/placeholder-product.jpg"}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
              onError={(e) => {
                e.target.src = "/images/placeholder-product.jpg";
              }}
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link
                to={`/customer/product/${item.product.id}`}
                className="font-semibold text-gray-900 hover:text-customer-primary transition-colors line-clamp-2"
              >
                {item.product.name}
              </Link>

              <div className="mt-1 space-y-1">
                <p className="text-sm text-gray-600">
                  Package: {item.variant.packageType}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {item.product.category}
                </p>
                {item.variant.stock <= 5 && (
                  <p className="text-sm text-amber-600 font-medium">
                    Only {item.variant.stock} left in stock
                  </p>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-right ml-4">
              <p className="text-lg font-bold text-customer-primary">
                ₦{item.variant.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">per item</p>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                  className="p-2 text-gray-600 hover:text-customer-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= item.variant.stock || isUpdating}
                  className="p-2 text-gray-600 hover:text-customer-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {onMoveToFavorites && (
                  <button
                    onClick={handleMoveToFavorites}
                    disabled={isUpdating}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:cursor-not-allowed"
                    title="Move to favorites"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={handleRemove}
                  disabled={isUpdating}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:cursor-not-allowed"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ₦{subtotal.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                {item.quantity} × ₦{item.variant.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Stock Warning */}
          {item.quantity > item.variant.stock && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                <strong>Stock Alert:</strong> Only {item.variant.stock} items
                available. Please adjust quantity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
