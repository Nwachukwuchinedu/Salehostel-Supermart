import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Eye, Plus, Check } from "lucide-react";

const ProductCard = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart?.(product, selectedVariant);
      // Show success feedback
      setTimeout(() => setIsAddingToCart(false), 1000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setIsAddingToCart(false);
    }
  };

  const getLowestPrice = () => {
    return Math.min(...product.variants.map((v) => v.price));
  };

  const getHighestPrice = () => {
    return Math.max(...product.variants.map((v) => v.price));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const isLowStock = selectedVariant.stock <= 5;
  const isOutOfStock = selectedVariant.stock === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/images/placeholder-product.jpg";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Low Stock
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onToggleFavorite?.(product.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-600 hover:text-red-500"
            }`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <Link
            to={`/customer/product/${product.id}`}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-blue-600 transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAddingToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isAddingToCart ? (
              <>
                <Check className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/customer/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Package Variants */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Package:</p>
            {product.variants.length > 1 && (
              <button
                onClick={() => setShowVariants(!showVariants)}
                className="text-xs text-blue-600 hover:underline"
              >
                {showVariants ? "Hide" : "Show all"} ({product.variants.length})
              </button>
            )}
          </div>

          <div className="space-y-2">
            {(showVariants ? product.variants : [selectedVariant]).map(
              (variant, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedVariant(variant)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedVariant === variant
                      ? "bg-blue-600/10 border border-blue-600"
                      : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">
                    {variant.packageType}
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    ₦{variant.price.toLocaleString()}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          {isOutOfStock ? (
            <p className="text-sm text-red-600 font-medium">Out of Stock</p>
          ) : isLowStock ? (
            <p className="text-sm text-amber-600 font-medium">
              Only {selectedVariant.stock} left!
            </p>
          ) : (
            <p className="text-sm text-green-600 font-medium">
              In Stock ({selectedVariant.stock} available)
            </p>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            {getLowestPrice() !== getHighestPrice() ? (
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="text-xl font-bold text-blue-600">
                  ₦{getLowestPrice().toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-blue-600">
                ₦{selectedVariant.price.toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAddingToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            title="Add to cart"
          >
            {isAddingToCart ? (
              <Check className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
