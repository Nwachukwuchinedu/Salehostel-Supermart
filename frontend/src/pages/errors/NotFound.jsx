import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import Button from "../../components/common/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-green opacity-20">
            404
          </div>
          <div className="relative -mt-16">
            <div className="w-32 h-32 mx-auto bg-primary-green-light rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-primary-green" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might
          have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full" size="large">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>

          <button onClick={() => window.history.back()} className="w-full">
            <Button variant="outline" className="w-full" size="large">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Or try these popular pages:
          </p>
          <div className="space-y-2">
            <Link
              to="/products"
              className="block text-primary-green hover:text-primary-green-dark text-sm"
            >
              Browse All Products
            </Link>
            <Link
              to="/categories"
              className="block text-primary-green hover:text-primary-green-dark text-sm"
            >
              Shop by Categories
            </Link>
            <Link
              to="/cart"
              className="block text-primary-green hover:text-primary-green-dark text-sm"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
