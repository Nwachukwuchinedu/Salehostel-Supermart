import React, { useState } from 'react';
import { Filter, Grid, List, ChevronDown, Star, ShoppingCart } from 'lucide-react';
import ProductCard from '../../components/shop/ProductCard';

const CategoryPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample category data
  const category = {
    name: 'Electronics',
    description: 'Discover the latest electronics at unbeatable prices',
    productCount: 1247
  };
  
  // Sample products data
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, originalPrice: 249.99, discount: 20, rating: 4.5, reviewCount: 128, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: true },
    { id: 2, name: 'Smartphone', price: 699.99, originalPrice: 799.99, discount: 12, rating: 4.7, reviewCount: 89, image: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: true },
    { id: 3, name: 'Laptop', price: 1299.99, originalPrice: 1499.99, discount: 13, rating: 4.8, reviewCount: 56, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: true },
    { id: 4, name: 'Tablet', price: 399.99, originalPrice: 449.99, discount: 11, rating: 4.3, reviewCount: 72, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: true },
    { id: 5, name: 'Smart Watch', price: 249.99, originalPrice: 299.99, discount: 17, rating: 4.6, reviewCount: 94, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: true },
    { id: 6, name: 'Bluetooth Speaker', price: 89.99, originalPrice: 99.99, discount: 10, rating: 4.2, reviewCount: 67, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: true },
    { id: 7, name: 'Gaming Console', price: 499.99, originalPrice: 549.99, discount: 9, rating: 4.9, reviewCount: 112, image: 'https://images.unsplash.com/photo-1590658268037-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: true },
    { id: 8, name: 'Camera', price: 899.99, originalPrice: 999.99, discount: 10, rating: 4.7, reviewCount: 43, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', inStock: false },
  ];
  
  // Sample filter options
  const filters = {
    brands: ['Apple', 'Samsung', 'Sony', 'Microsoft', 'Google', 'Amazon'],
    priceRanges: [
      { label: 'Under ₦50', min: 0, max: 50 },
      { label: '₦50 - ₦100', min: 50, max: 100 },
      { label: '₦100 - ₦500', min: 100, max: 500 },
      { label: 'Over ₦500', min: 500, max: Infinity }
    ],
    ratings: [4, 3, 2, 1]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-customer-gray-500 hover:text-customer-primary">Home</a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="text-customer-gray-400 mx-2">/</span>
              <span className="text-customer-gray-700">{category.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-customer-gray-900 mb-4">{category.name}</h1>
        <p className="text-customer-gray-600 max-w-2xl mx-auto">{category.description}</p>
        <p className="mt-4 text-customer-gray-500">{category.productCount} products</p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="customer-btn-secondary flex items-center md:hidden"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-customer-gray-700">Filters:</span>
            <button className="customer-btn-filter">Brand</button>
            <button className="customer-btn-filter">Price</button>
            <button className="customer-btn-filter">Rating</button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-customer-gray-700 mr-2">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="customer-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
          
          <div className="flex border border-customer-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-customer-primary text-white' : 'text-customer-gray-500 hover:bg-customer-gray-100'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-customer-primary text-white' : 'text-customer-gray-500 hover:bg-customer-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="md:hidden mb-8 p-6 customer-glass-card rounded-2xl">
          <div className="mb-6">
            <h3 className="font-medium text-customer-gray-900 mb-3">Brand</h3>
            <div className="space-y-2">
              {filters.brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    className="customer-checkbox"
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 text-customer-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-customer-gray-900 mb-3">Price Range</h3>
            <div className="space-y-2">
              {filters.priceRanges.map((range) => (
                <div key={range.label} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`price-${range.label}`}
                    className="customer-checkbox"
                  />
                  <label htmlFor={`price-${range.label}`} className="ml-2 text-customer-gray-700">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-customer-gray-900 mb-3">Rating</h3>
            <div className="space-y-2">
              {filters.ratings.map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`rating-${rating}`}
                    className="customer-checkbox"
                  />
                  <label htmlFor={`rating-${rating}`} className="ml-2 text-customer-gray-700 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating 
                              ? 'text-amber-400 fill-current' 
                              : 'text-customer-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden md:flex gap-8">
        <div className="w-64 flex-shrink-0">
          <div className="customer-glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-customer-gray-900 mb-4">Filters</h2>
            
            <div className="mb-6">
              <button className="flex items-center justify-between w-full text-left font-medium text-customer-gray-900 mb-3">
                Brand
                <ChevronDown className="w-5 h-5" />
              </button>
              <div className="space-y-2">
                {filters.brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      className="customer-checkbox"
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2 text-customer-gray-700">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <button className="flex items-center justify-between w-full text-left font-medium text-customer-gray-900 mb-3">
                Price Range
                <ChevronDown className="w-5 h-5" />
              </button>
              <div className="space-y-2">
                {filters.priceRanges.map((range) => (
                  <div key={range.label} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`price-${range.label}`}
                      className="customer-checkbox"
                    />
                    <label htmlFor={`price-${range.label}`} className="ml-2 text-customer-gray-700">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <button className="flex items-center justify-between w-full text-left font-medium text-customer-gray-900 mb-3">
                Rating
                <ChevronDown className="w-5 h-5" />
              </button>
              <div className="space-y-2">
                {filters.ratings.map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      className="customer-checkbox"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-customer-gray-700 flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating 
                                ? 'text-amber-400 fill-current' 
                                : 'text-customer-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2">& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {products.map((product) => (
                <div key={product.id} className="customer-glass-card rounded-2xl p-6 flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold text-customer-gray-900">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-amber-400 fill-current' 
                                : 'text-customer-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-customer-gray-600">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-xl font-bold text-customer-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="ml-2 text-lg text-customer-gray-500 line-through">${product.originalPrice}</span>
                          <span className="ml-2 bg-customer-primary/10 text-customer-primary px-2 py-1 rounded-md text-sm">
                            {product.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    <div className="mt-4">
                      <button className="customer-btn-primary flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-12">
            <p className="text-customer-gray-600">Showing 1 to 8 of {category.productCount} products</p>
            <div className="flex gap-2">
              <button className="customer-btn-secondary">Previous</button>
              <button className="customer-btn-primary">1</button>
              <button className="customer-btn-secondary">2</button>
              <button className="customer-btn-secondary">3</button>
              <button className="customer-btn-secondary">Next</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Products */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-12">
          <p className="text-customer-gray-600">Showing 1 to 8 of {category.productCount} products</p>
          <div className="flex gap-2">
            <button className="customer-btn-secondary">Previous</button>
            <button className="customer-btn-primary">1</button>
            <button className="customer-btn-secondary">2</button>
            <button className="customer-btn-secondary">3</button>
            <button className="customer-btn-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;