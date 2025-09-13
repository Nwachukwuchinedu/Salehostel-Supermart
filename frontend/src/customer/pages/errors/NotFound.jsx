import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Graphic */}
        <div className="mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-4 pl-12 text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-customer-primary focus:border-transparent shadow-glass-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="customer-btn-primary flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="customer-btn-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="text-customer-primary hover:text-customer-secondary font-medium">
              Browse Products
            </Link>
            <Link to="/categories" className="text-customer-primary hover:text-customer-secondary font-medium">
              Shop by Category
            </Link>
            <Link to="/contact" className="text-customer-primary hover:text-customer-secondary font-medium">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;