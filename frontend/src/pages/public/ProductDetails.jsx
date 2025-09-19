import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../shared/services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/public/products/${id}`);
      setProduct(response.product);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-gray-500">No Image Available</span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Unit Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Unit</h3>
            <div className="flex flex-wrap gap-2">
              {product.units.map((unit, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedUnit === index
                      ? "border-primary-green bg-primary-green text-white"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedUnit(index)}
                >
                  {unit.unitType} - ₦{unit.price.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="text-3xl font-bold text-primary-green">
              ₦{product.units[selectedUnit]?.price?.toLocaleString() || "N/A"}
            </div>
            <div className="text-gray-500">
              per {product.units[selectedUnit]?.unitType || "unit"}
            </div>
          </div>

          {/* Stock Info */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Availability:</span>
              {product.units[selectedUnit]?.stockQuantity > 0 ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>
            {product.units[selectedUnit]?.stockQuantity > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                {product.units[selectedUnit]?.stockQuantity} items available
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-green-dark transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;