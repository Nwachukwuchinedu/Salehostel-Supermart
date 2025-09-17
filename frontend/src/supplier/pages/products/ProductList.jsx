import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react";
import supplierService from "../../../shared/services/supplierService";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import Badge from "../../../shared/ui/components/Badge";
import Modal from "../../../shared/ui/components/Modal";
import Spinner from "../../../shared/ui/components/Spinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await supplierService.getProducts();
      setProducts(response.data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await supplierService.deleteProduct(productToDelete._id);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "out_of_stock":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="text-gray-600">
            Manage products you supply to the supermarket
          </p>
        </div>
        <Button
          onClick={() => setShowProductModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.category}
                  </p>
                  <Badge variant={getStatusColor(product.status)}>
                    {product.status?.replace("_", " ")}
                  </Badge>
                </div>
                {product.images && product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-medium">
                    {product.variants && product.variants.length > 0
                      ? `${formatCurrency(
                          Math.min(...product.variants.map((v) => v.price))
                        )} - ${formatCurrency(
                          Math.max(...product.variants.map((v) => v.price))
                        )}`
                      : formatCurrency(product.basePrice || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock:</span>
                  <span className="font-medium">
                    {product.variants?.reduce(
                      (sum, v) => sum + (v.stock || 0),
                      0
                    ) || 0}{" "}
                    units
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Updated:</span>
                  <span className="text-gray-500">
                    {formatDate(product.updatedAt)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowProductModal(true);
                  }}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setProductToDelete(product);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "No products match your search."
              : "Start by adding your first product."}
          </p>
          <Button onClick={() => setShowProductModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
      >
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "{productToDelete?.name}"? This
            action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
