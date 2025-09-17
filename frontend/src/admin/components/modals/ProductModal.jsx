import React, { useState, useEffect } from "react";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import FormGroup from "../../../shared/ui/form/FormGroup";
import FormLabel from "../../../shared/ui/form/FormLabel";
import FormError from "../../../shared/ui/form/FormError";
import Spinner from "../../../shared/ui/components/Spinner";

const ProductModal = ({
  isOpen,
  onClose,
  onSave,
  product = null,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    status: "draft",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        sku: product.sku || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        status: product.status || "draft",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
        status: "draft",
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(parseFloat(formData.price)))
      newErrors.price = "Valid price is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: formData.stock ? parseInt(formData.stock) : 0,
    };

    try {
      await onSave(productData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message || "Failed to save product" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {product ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <FormGroup>
                  <FormLabel htmlFor="name" required>
                    Product Name
                  </FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    placeholder="Enter product name"
                  />
                  <FormError message={errors.name} />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product description"
                  />
                </FormGroup>

                <div className="grid grid-cols-2 gap-4">
                  <FormGroup>
                    <FormLabel htmlFor="sku" required>
                      SKU
                    </FormLabel>
                    <Input
                      id="sku"
                      name="sku"
                      type="text"
                      value={formData.sku}
                      onChange={handleChange}
                      error={!!errors.sku}
                      placeholder="PROD-001"
                    />
                    <FormError message={errors.sku} />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="category" required>
                      Category
                    </FormLabel>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Sports">Sports</option>
                    </select>
                    <FormError message={errors.category} />
                  </FormGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormGroup>
                    <FormLabel htmlFor="price" required>
                      Price ($)
                    </FormLabel>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      error={!!errors.price}
                      placeholder="0.00"
                    />
                    <FormError message={errors.price} />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="stock">Stock Quantity</FormLabel>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </FormGroup>
                </div>

                <FormGroup>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </FormGroup>

                {errors.submit && <FormError message={errors.submit} />}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full sm:ml-3 sm:w-auto"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Saving...
                  </>
                ) : product ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mt-3 w-full sm:mt-0 sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
