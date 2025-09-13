import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, ShoppingCart, Heart, Menu, X } from 'lucide-react'

const CustomerHeader = ({ onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className="customer-nav hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent">
                Salehostel Supermart
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="customer-nav-item">Home</Link>
              <Link to="/products" className="customer-nav-item">Products</Link>
              <Link to="/categories" className="customer-nav-item">Categories</Link>
              <Link to="/about" className="customer-nav-item">About</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="hidden lg:block w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 pl-10 text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-customer-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Cart */}
              <button
                className="customer-btn-icon relative"
                onClick={onCartToggle}
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="customer-cart-badge">3</span>
              </button>

              {/* User Menu */}
              <button className="customer-btn-icon">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent">
            Salehostel
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              onClick={onCartToggle}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-customer-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <div className={`fixed left-0 top-0 bottom-0 w-80 bg-white transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent">
              Menu
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-6 space-y-4">
            <Link to="/" className="block text-lg font-medium text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="block text-lg font-medium text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/categories" className="block text-lg font-medium text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/deals" className="block text-lg font-medium text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Deals
            </Link>
            <Link to="/about" className="block text-lg font-medium text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>

            <div className="pt-6 border-t border-gray-200 space-y-4">
              <button className="flex items-center gap-3 text-gray-700 py-2">
                <User className="w-5 h-5" />
                <span>Account</span>
              </button>

              <button className="flex items-center gap-3 text-gray-700 py-2">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div className={`fixed inset-0 bg-white z-50 transition-opacity duration-300 lg:hidden ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-customer-primary"
                autoFocus
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search suggestions could go here */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['iPhone', 'MacBook', 'AirPods', 'iPad'].map(term => (
                  <button
                    key={term}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-customer-primary hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerHeader