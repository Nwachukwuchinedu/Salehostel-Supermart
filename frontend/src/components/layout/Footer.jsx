import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">SH</span>
                </div>
                <span className="text-xl font-bold text-primary-green font-display">
                  SalesHostel
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md font-primary">
                Your trusted grocery store at NDDC Hostel. We provide fresh
                groceries, household items, and convenience foods with fast
                delivery to your room.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-green transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-secondary">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-secondary">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/categories/staple-foods"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Staple Foods
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories/frozen-foods"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Frozen Foods
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories/groceries"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Groceries
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories/personal-care"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Personal Care
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories/cleaning-agents"
                    className="text-gray-400 hover:text-white transition-colors font-primary"
                  >
                    Cleaning Agents
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm font-primary">
              © 2025 SalesHostel. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors font-primary"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors font-primary"
              >
                Terms of Service
              </Link>
              <Link
                to="/support"
                className="text-gray-400 hover:text-white text-sm transition-colors font-primary"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
