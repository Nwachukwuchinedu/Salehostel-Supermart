import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  MapPin,
  Phone,
} from "lucide-react";

const CustomerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount] = useState(3); // This would come from cart context/store
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/customer/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    "Staple Foods",
    "Convenience Foods",
    "Personal Care",
    "Cleaning Agents",
    "Groceries",
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-customer-primary text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>NDDC Hostel - Shop 12</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234-XXX-XXX-XXXX</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                Free delivery on orders over ₦10,000
              </span>
              <Link to="/customer/track-order" className="hover:underline">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/customer" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-customer-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">SalesHostel</h1>
              <p className="text-xs text-gray-600">
                Essential Items for Hostel Life
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button className="md:hidden p-2 text-gray-600 hover:text-customer-primary">
              <Search className="w-6 h-6" />
            </button>

            {/* Favorites */}
            <Link
              to="/customer/favorites"
              className="hidden sm:flex p-2 text-gray-600 hover:text-customer-primary transition-colors"
              title="Favorites"
            >
              <Heart className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link
              to="/customer/cart"
              className="relative p-2 text-gray-600 hover:text-customer-primary transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-customer-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <Link
              to="/customer/account"
              className="hidden sm:flex p-2 text-gray-600 hover:text-customer-primary transition-colors"
              title="My Account"
            >
              <User className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-customer-primary"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden md:flex items-center space-x-8 h-12">
            <Link
              to="/customer/products"
              className="text-gray-700 hover:text-customer-primary font-medium transition-colors"
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/customer/category/${category
                  .toLowerCase()
                  .replace(" ", "-")}`}
                className="text-gray-700 hover:text-customer-primary transition-colors whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
            <Link
              to="/customer/deals"
              className="text-customer-primary font-medium"
            >
              Special Deals
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                to="/customer/products"
                className="block py-2 text-gray-700 hover:text-customer-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/customer/category/${category
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="block py-2 text-gray-700 hover:text-customer-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link
                to="/customer/deals"
                className="block py-2 text-customer-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Special Deals
              </Link>
            </nav>

            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                to="/customer/account"
                className="flex items-center gap-3 py-2 text-gray-700 hover:text-customer-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                My Account
              </Link>
              <Link
                to="/customer/favorites"
                className="flex items-center gap-3 py-2 text-gray-700 hover:text-customer-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                Favorites
              </Link>
              <Link
                to="/customer/track-order"
                className="flex items-center gap-3 py-2 text-gray-700 hover:text-customer-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-5 h-5" />
                Track Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomerHeader;
