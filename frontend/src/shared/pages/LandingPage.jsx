import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">SalesHostel</h1>
                <p className="text-sm text-gray-600">NDDC Hostel - Shop 12</p>
              </div>
            </div>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Supply Chain Management
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive inventory management system for SalesHostel - managing
            products, suppliers, staff operations, and customer orders all in
            one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/customer/products"
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Admin Control
            </h3>
            <p className="text-gray-600">
              Complete system oversight with user management, financial reports,
              and business analytics.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Supplier Portal
            </h3>
            <p className="text-gray-600">
              Streamlined supply management with inventory tracking and payment
              monitoring.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Staff Operations
            </h3>
            <p className="text-gray-600">
              Efficient order processing, inventory updates, and customer
              service tools.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Customer Shopping
            </h3>
            <p className="text-gray-600">
              Easy product browsing, ordering system, and real-time order
              tracking.
            </p>
          </div>
        </div>

        {/* Product Categories */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Product Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
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
            ].map((category) => (
              <div
                key={category}
                className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/80 transition-colors"
              >
                <p className="font-medium text-gray-900">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-md border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 SalesHostel Supply Chain Management System. All rights
              reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              NDDC Hostel - Shop 12 | Inventory & Order Management
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
