import React, { useState, useEffect } from "react";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import ProductTable from "../../components/tables/ProductTable";
import ProductModal from "../../components/modals/ProductModal";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
  ];
  const statuses = ["active", "inactive", "draft", "archived"];

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, filterCategory, filterStatus]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock products data
      const mockProducts = [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          sku: "AT-WH-001",
          category: "Electronics",
          subcategory: "Audio",
          price: 299.99,
          comparePrice: 399.99,
          stock: 25,
          status: "active",
          image: "/api/placeholder/100/100",
          createdAt: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          name: "Gaming Mechanical Keyboard",
          sku: "KB-GM-002",
          category: "Electronics",
          subcategory: "Accessories",
          price: 149.99,
          stock: 0,
          status: "active",
          image: "/api/placeholder/100/100",
          createdAt: "2024-01-14T14:20:00Z",
        },
        {
          id: 3,
          name: "Cotton T-Shirt",
          sku: "TS-CT-003",
          category: "Clothing",
          subcategory: "Shirts",
          price: 29.99,
          stock: 150,
          status: "active",
          image: "/api/placeholder/100/100",
          createdAt: "2024-01-13T09:15:00Z",
        },
        {
          id: 4,
          name: "Smart Home Hub",
          sku: "SH-HB-004",
          category: "Electronics",
          subcategory: "Smart Home",
          price: 199.99,
          stock: 8,
          status: "draft",
          image: "/api/placeholder/100/100",
          createdAt: "2024-01-12T16:45:00Z",
        },
        {
          id: 5,
          name: "Yoga Mat Premium",
          sku: "YM-PR-005",
          category: "Sports",
          subcategory: "Fitness",
          price: 79.99,
          stock: 45,
          status: "inactive",
          image: "/api/placeholder/100/100",
          createdAt: "2024-01-11T11:30:00Z",
        },
      ];

      // Apply filters
      let filteredProducts = mockProducts;

      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterCategory) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filterCategory
        );
      }

      if (filterStatus) {
        filteredProducts = filteredProducts.filter(
          (product) => product.status === filterStatus
        );
      }

      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / 10));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleViewProduct = (product) => {
    // Navigate to product detail view
    console.log("View product:", product);
  };

  const handleSaveProduct = async (productData) => {
    try {
      setModalLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (selectedProduct) {
        // Update existing product
        setProducts((prev) =>
          prev.map((p) =>
            p.id === selectedProduct.id
              ? { ...p, ...productData, id: selectedProduct.id }
              : p
          )
        );
      } else {
        // Add new product
        const newProduct = {
          ...productData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };
        setProducts((prev) => [newProduct, ...prev]);
      }

      setShowProductModal(false);
    } catch (error) {
      throw new Error("Failed to save product");
    } finally {
      setModalLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setModalLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterStatus("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your product catalog and inventory
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <Button onClick={handleAddProduct} variant="primary">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <Input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={handleCategoryFilter}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={handleStatusFilter}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <ProductTable
        products={products}
        loading={loading}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onView={handleViewProduct}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        loading={modalLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone and will remove all associated data."
        itemName={selectedProduct?.name}
        loading={modalLoading}
        type="danger"
      />
    </div>
  );
};

export default ProductsPage;
