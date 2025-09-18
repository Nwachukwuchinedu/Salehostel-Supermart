import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const ProductCatalog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-primary-green hover:text-primary-green-dark"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Catalog
          </h1>
          <p className="text-gray-600 mb-4">
            This page will show all products when the backend is connected.
          </p>
          <p className="text-sm text-gray-500">
            Phase 1: Foundation - Basic structure is ready
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
