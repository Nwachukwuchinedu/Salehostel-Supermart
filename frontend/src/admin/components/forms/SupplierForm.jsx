import React, { useState } from "react";
import { Save, X, Plus, Trash2 } from "lucide-react";

const SupplierForm = ({ supplier = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: supplier?.firstName || "",
    lastName: supplier?.lastName || "",
    email: supplier?.email || "",
    whatsappNumber: supplier?.whatsappNumber || "",
    callNumber: supplier?.callNumber || "",
    supplierInfo: {
      companyName: supplier?.supplierInfo?.companyName || "",
      suppliedCategories: supplier?.supplierInfo?.suppliedCategories || [],
      paymentTerms: supplier?.supplierInfo?.paymentTerms || "Net 30",
      isActive: supplier?.supplierInfo?.isActive !== false,
    },
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Staple Foods",
    "Frozen Foods",
    "Convenience Foods",
    "Sauces/Spices",
    "Cooking Oils",
    "Groceries",
    "Biscuits",
    "Cleaning Agents",
    "Personal Care",
    "Stationery",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("supplierInfo.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        supplierInfo: {
          ...prev.supplierInfo,
          [field]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const addCategory = () => {
    if (
      selectedCategory &&
      !formData.supplierInfo.suppliedCategories.includes(selectedCategory)
    ) {
      setFormData((prev) => ({
        ...prev,
        supplierInfo: {
          ...prev.supplierInfo,
          suppliedCategories: [
            ...prev.supplierInfo.suppliedCategories,
            selectedCategory,
          ],
        },
      }));
      setSelectedCategory("");
    }
  };

  const removeCategory = (categoryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      supplierInfo: {
        ...prev.supplierInfo,
        suppliedCategories: prev.supplierInfo.suppliedCategories.filter(
          (cat) => cat !== categoryToRemove
        ),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      role: "supplier",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {supplier ? "Edit Supplier" : "Add New Supplier"}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                placeholder="Enter first name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                placeholder="Enter last name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                placeholder="supplier@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                placeholder="+234-XXX-XXX-XXXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call Number
              </label>
              <input
                type="tel"
                name="callNumber"
                value={formData.callNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                placeholder="+234-XXX-XXX-XXXX"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="supplierInfo.companyName"
                value={formData.supplierInfo.companyName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                placeholder="Enter company name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Terms
              </label>
              <select
                name="supplierInfo.paymentTerms"
                value={formData.supplierInfo.paymentTerms}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
              >
                <option value="Net 7">Net 7 Days</option>
                <option value="Net 15">Net 15 Days</option>
                <option value="Net 30">Net 30 Days</option>
                <option value="Net 60">Net 60 Days</option>
                <option value="COD">Cash on Delivery</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Supplied Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supplied Categories
          </label>

          {/* Current Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.supplierInfo.suppliedCategories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-supplier-primary/10 text-supplier-primary px-3 py-1 rounded-full text-sm"
              >
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="text-supplier-primary hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add Category */}
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent"
            >
              <option value="">Select category to add</option>
              {categories
                .filter(
                  (cat) =>
                    !formData.supplierInfo.suppliedCategories.includes(cat)
                )
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <button
              type="button"
              onClick={addCategory}
              disabled={!selectedCategory}
              className="bg-supplier-primary text-white px-4 py-2 rounded-lg hover:bg-supplier-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="supplierInfo.isActive"
              checked={formData.supplierInfo.isActive}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-admin-primary focus:ring-admin-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Active Supplier</span>
          </label>
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
            {supplier ? "Update Supplier" : "Create Supplier"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;
