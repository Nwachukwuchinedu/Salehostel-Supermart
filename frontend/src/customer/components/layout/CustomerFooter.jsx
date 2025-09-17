import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";

const CustomerFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-customer-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">SalesHostel</h3>
                <p className="text-sm text-gray-400">
                  Essential Items for Hostel Life
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for quality staple foods, groceries, and
              essential items. Serving the NDDC Hostel community with
              convenience and reliability.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-customer-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-customer-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-customer-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-customer-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/customer/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/category/staple-foods"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Staple Foods
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/category/convenience-foods"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Convenience Foods
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/category/personal-care"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/deals"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/customer/account"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/track-order"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/returns"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-customer-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400">NDDC Hostel - Shop 12</p>
                  <p className="text-gray-400">University Campus</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-customer-primary flex-shrink-0" />
                <a
                  href="tel:+234XXXXXXXXX"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +234-XXX-XXX-XXXX
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-customer-primary flex-shrink-0" />
                <a
                  href="https://wa.me/234XXXXXXXXX"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-customer-primary flex-shrink-0" />
                <a
                  href="mailto:info@saleshostel.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@saleshostel.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-customer-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400">Mon - Sat: 7:00 AM - 10:00 PM</p>
                  <p className="text-gray-400">Sunday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400">
                Get notified about new products and special offers
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-customer-primary focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-customer-primary hover:bg-customer-primary/90 text-white px-6 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SalesHostel. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;
