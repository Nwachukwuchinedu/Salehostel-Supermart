import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Button from "./Button";
import { useCartStore } from "../../stores/cartStore";
import { formatCurrency } from "../../utils/formatters";

const ProductCard = ({ product }) => {
  const [selectedUnit, setSelectedUnit] = useState(product.units?.[0] || {});
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    if (!selectedUnit || selectedUnit.stockQuantity === 0) return;

    setIsLoading(true);
    try {
      await addItem({
        productId: product._id,
        unitType: selectedUnit.unitType,
        quantity: 1,
        price: selectedUnit.price,
        productName: product.name,
        productImage: product.images?.[0] || null,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isOutOfStock = !selectedUnit || selectedUnit.stockQuantity === 0;
  const isLowStock = selectedUnit && selectedUnit.stockQuantity <= 5;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images?.[0] || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {isLowStock && !isOutOfStock && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Low Stock
            </div>
          )}
          {isOutOfStock && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Out of Stock
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-green transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
        )}

        {/* Unit Selection */}
        {product.units && product.units.length > 1 && (
          <div className="mb-3">
            <select
              value={selectedUnit?.unitType || ""}
              onChange={(e) => {
                const unit = product.units.find(
                  (u) => u.unitType === e.target.value
                );
                setSelectedUnit(unit);
              }}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary-green focus:border-primary-green"
            >
              {product.units.map((unit) => (
                <option key={unit.unitType} value={unit.unitType}>
                  {unit.unitType} - {formatCurrency(unit.price)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary-green">
            {formatCurrency(selectedUnit?.price || 0)}
          </span>
          <span
            className={`text-sm ${
              isOutOfStock
                ? "text-red-600"
                : isLowStock
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {isOutOfStock
              ? "Out of Stock"
              : isLowStock
              ? `Only ${selectedUnit.stockQuantity} left`
              : "In Stock"}
          </span>
        </div>

        {/* Rating (if available) */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          loading={isLoading}
          className="w-full"
          variant={isOutOfStock ? "ghost" : "primary"}
        >
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
