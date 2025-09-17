import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-customer-primary/5 to-customer-secondary/5 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-customer-primary/20 mb-4">
            404
          </div>
          <div className="w-24 h-24 bg-customer-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-customer-primary/60" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/customer"
            className="w-full bg-customer-primary hover:bg-customer-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a
              href="mailto:support@saleshostel.com"
              className="text-customer-primary hover:underline"
            >
              support@saleshostel.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
