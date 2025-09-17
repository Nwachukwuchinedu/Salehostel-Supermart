import React, { useState } from "react";
import { Save, X, Plus, Trash2 } from "lucide-react";

const ProductForm = ({ product = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    productGroup: product?.productGroup || "",
    category: product?.category || "",
    description: product?.description || "",
    tags: product?.tags || [],
    variants: product?.variants || [
      {
        packageType: "",
        price: "",
        costPrice: "",
        quantity: "",
        minStockLevel: "",
        unit: "piece",
        isAvailable: true,
      },
    ],
    supplier: product?.supplier || "",
    featured: product?.featured || false,
    isActive: product?.isActive !== false,
  });

  const [newTag, setNewTag] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          packageType: "",
          price: "",
          costPrice: "",
          quantity: "",
          minStockLevel: "",
          unit: "piece",
          isAvailable: true,
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    if (formData.variants.length > 1) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
              placeholder="e.g., Rice"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Group *
            </label>
            <select
              name="productGroup"
              value={formData.productGroup}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
              required
            >
              <option value="">Select Group</option>
              <option value="Staple Foods">Staple Foods</option>
              <option value="Frozen Foods">Frozen Foods</option>
              <option value="Convenience Foods">Convenience Foods</option>
              <option value="Sauces/Spices">Sauces/Spices</option>
              <option value="Cooking Oils">Cooking Oils</option>
              <option value="Groceries">Groceries</option>
              <option value="Biscuits">Biscuits</option>
              <option value="Cleaning Agents">Cleaning Agents</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
            placeholder="Product description..."
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-admin-primary/10 text-admin-primary px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-admin-primary hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
              placeholder="Add tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-admin-primary text-white px-4 py-2 rounded-lg hover:bg-admin-primary/90"
            >
              Add
            </button>
          </div>
        </div>

        {/* Product Variants */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Package Variants *
            </label>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Add Variant
            </button>
          </div>

          <div className="space-y-4">
            {formData.variants.map((variant, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Variant {index + 1}
                  </h4>
                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Type *
                    </label>
                    <select
                      value={variant.packageType}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "packageType",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select Package</option>
                      <option value="Black Rubber">Black Rubber</option>
                      <option value="Half Rubber">Half Rubber</option>
                      <option value="Cup">Cup</option>
                      <option value="Paint Rubber">Paint Rubber</option>
                      <option value="Carton">Carton</option>
                      <option value="Bag">Bag</option>
                      <option value="Bottle">Bottle</option>
                      <option value="Piece">Piece</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price (₦) *
                    </label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost Price (₦) *
                    </label>
                    <input
                      type="number"
                      value={variant.costPrice}
                      onChange={(e) =>
                        handleVariantChange(index, "costPrice", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Stock *
                    </label>
                    <input
                      type="number"
                      value={variant.quantity}
                      onChange={(e) =>
                        handleVariantChange(index, "quantity", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Stock Level *
                    </label>
                    <input
                      type="number"
                      value={variant.minStockLevel}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "minStockLevel",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      value={variant.unit}
                      onChange={(e) =>
                        handleVariantChange(index, "unit", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                    >
                      <option value="piece">Piece</option>
                      <option value="kg">Kilogram</option>
                      <option value="liter">Liter</option>
                      <option value="pack">Pack</option>
                      <option value="box">Box</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={variant.isAvailable}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "isAvailable",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-admin-primary focus:ring-admin-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available for sale
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-admin-primary focus:ring-admin-primary"
              />
              <span className="ml-2 text-sm text-gray-700">
                Featured Product
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-admin-primary focus:ring-admin-primary"
              />
              <span className="ml-2 text-sm text-gray-700">Active Product</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-admin-primary text-white px-6 py-3 rounded-lg hover:bg-admin-primary/90"
          >
            <Save className="w-4 h-4" />
            {product ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
