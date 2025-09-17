import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, Truck, Shield } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-customer-primary/10 to-customer-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Essential Items for
              <span className="block text-customer-primary">Hostel Life</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your one-stop shop for quality staple foods, groceries, and
              personal care items. Fast delivery right to your hostel room at
              NDDC Hostel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customer/products"
                className="bg-customer-primary hover:bg-customer-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                to="/customer/categories"
                className="bg-white hover:bg-gray-50 text-customer-primary border-2 border-customer-primary px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-customer-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-customer-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick delivery to your hostel room within 30 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-customer-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-customer-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                Fresh and high-quality items sourced from trusted suppliers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-customer-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-customer-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600">
                Safe and secure payment options including cash and transfer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Find everything you need for hostel life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              {
                name: "Staple Foods",
                icon: "🍚",
                color: "bg-green-100 text-green-800",
              },
              {
                name: "Convenience Foods",
                icon: "🍜",
                color: "bg-purple-100 text-purple-800",
              },
              {
                name: "Personal Care",
                icon: "🧴",
                color: "bg-pink-100 text-pink-800",
              },
              {
                name: "Cleaning Agents",
                icon: "🧽",
                color: "bg-blue-100 text-blue-800",
              },
              {
                name: "Groceries",
                icon: "🥛",
                color: "bg-yellow-100 text-yellow-800",
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/customer/category/${category.name
                  .toLowerCase()
                  .replace(" ", "-")}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${category.color}`}
                >
                  View Items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-customer-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-customer-primary-light mb-8 text-lg">
            Join hundreds of satisfied hostel residents who trust SalesHostel
            for their daily needs.
          </p>
          <Link
            to="/customer/register"
            className="bg-white hover:bg-gray-100 text-customer-primary px-8 py-4 rounded-xl text-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
