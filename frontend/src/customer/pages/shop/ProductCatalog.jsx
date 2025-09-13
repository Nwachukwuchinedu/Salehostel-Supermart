import React, { useState } from 'react'
import ProductCard from '../../components/shop/ProductCard'

const ProductCatalog = () => {
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      discount: 30,
      rating: 4.5,
      reviewCount: 124,
      stock: 15,
      isNew: true,
      image: "https://placehold.co/300x300/7c3aed/white?text=Headphones"
    },
    {
      id: 2,
      name: "Smartphone XYZ Pro",
      price: 699.99,
      originalPrice: 799.99,
      discount: 12,
      rating: 4.8,
      reviewCount: 89,
      stock: 8,
      image: "https://placehold.co/300x300/7c3aed/white?text=Smartphone"
    },
    {
      id: 3,
      name: "Fitness Tracker Watch",
      price: 49.99,
      originalPrice: 79.99,
      discount: 37,
      rating: 4.2,
      reviewCount: 56,
      stock: 25,
      image: "https://placehold.co/300x300/7c3aed/white?text=Fitness+Watch"
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      rating: 4.6,
      reviewCount: 203,
      stock: 0,
      image: "https://placehold.co/300x300/7c3aed/white?text=Speaker"
    },
    {
      id: 5,
      name: "Laptop Backpack",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.3,
      reviewCount: 78,
      stock: 42,
      isNew: true,
      image: "https://placehold.co/300x300/7c3aed/white?text=Backpack"
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      rating: 4.1,
      reviewCount: 156,
      stock: 30,
      image: "https://placehold.co/300x300/7c3aed/white?text=Charger"
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-customer-primary/10 via-transparent to-customer-secondary/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
                <span className="bg-gradient-to-r from-customer-primary to-customer-secondary bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                Amazing Products
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Explore our curated collection of premium products with real-time inventory and lightning-fast delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="customer-btn-primary">
                  <span>Shop Now</span>
                </button>
                <button className="customer-btn-glass">
                  <span>View Categories</span>
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="customer-glass-card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://placehold.co/600x400/7c3aed/white?text=Featured+Product" 
                  alt="Featured Product"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">Premium Headphones</h3>
                  <p className="text-customer-primary font-bold text-2xl mt-2">$89.99</p>
                  <button className="customer-btn-primary w-full mt-4">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked products that our customers love most
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="customer-product-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductCatalog