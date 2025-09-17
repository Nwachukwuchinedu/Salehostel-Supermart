import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Heart,
  Star,
} from "lucide-react";

const ProductCatalog = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Rice",
      category: "Staple Foods",
      image: "/images/products/rice.jpg",
      rating: 4.5,
      reviews: 128,
      variants: [
        { packageType: "Black Rubber", price: 3650, stock: 15 },
        { packageType: "Half Rubber", price: 1825, stock: 8 },
        { packageType: "Cup", price: 150, stock: 50 },
      ],
      featured: true,
    },
    {
      id: 2,
      name: "Indomie Noodles",
      category: "Convenience Foods",
      image: "/images/products/indomie.jpg",
      rating: 4.8,
      reviews: 256,
      variants: [
        { packageType: "Carton", price: 4200, stock: 12 },
        { packageType: "Pack", price: 350, stock: 45 },
      ],
      featured: true,
    },
    {
      id: 3,
      name: "Palm Oil",
      category: "Cooking Oils",
      image: "/images/products/palm-oil.jpg",
      rating: 4.3,
      reviews: 89,
      variants: [
        { packageType: "Bottle (1L)", price: 1200, stock: 25 },
        { packageType: "Bottle (500ml)", price: 650, stock: 30 },
      ],
      featured: false,
    },
    {
      id: 4,
      name: "Garri",
      category: "Staple Foods",
      image: "/images/products/garri.jpg",
      rating: 4.2,
      reviews: 67,
      variants: [
        { packageType: "Paint Rubber", price: 2800, stock: 6 },
        { packageType: "Cup", price: 120, stock: 40 },
      ],
      featured: false,
    },
    {
      id: 5,
      name: "Maggi Cubes",
      category: "Sauces/Spices",
      image: "/images/products/maggi.jpg",
      rating: 4.7,
      reviews: 145,
      variants: [
        { packageType: "Pack (50 cubes)", price: 850, stock: 20 },
        { packageType: "Pack (10 cubes)", price: 180, stock: 35 },
      ],
      featured: true,
    },
    {
      id: 6,
      name: "Peak Milk",
      category: "Groceries",
      image: "/images/products/peak-milk.jpg",
      rating: 4.6,
      reviews: 198,
      variants: [
        { packageType: "Tin (400g)", price: 650, stock: 18 },
        { packageType: "Sachet (20g)", price: 50, stock: 100 },
      ],
      featured: false,
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const categories = [
    "All",
    "Staple Foods",
    "Convenience Foods",
    "Cooking Oils",
    "Sauces/Spices",
    "Groceries",
    "Personal Care",
    "Cleaning Agents",
  ];

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const minPrice = Math.min(...product.variants.map((v) => v.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return (
            Math.min(...a.variants.map((v) => v.price)) -
            Math.min(...b.variants.map((v) => v.price))
          );
        case "price-high":
          return (
            Math.min(...b.variants.map((v) => v.price)) -
            Math.min(...a.variants.map((v) => v.price))
          );
        case "rating":
          return b.rating - a.rating;
        case "featured":
          return b.featured - a.featured;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, priceRange, products]);

  const addToCart = (product, variant) => {
    // Add to cart logic here
    console.log("Adding to cart:", product.name, variant.packageType);
  };

  const toggleFavorite = (productId) => {
    // Toggle favorite logic here
    console.log("Toggle favorite:", productId);
  };

  const getLowestPrice = (variants) => {
    return Math.min(...variants.map((v) => v.price));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/images/placeholder-product.jpg";
          }}
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-customer-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Available packages:</p>
          <div className="space-y-1">
            {product.variants.slice(0, 2).map((variant, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-700">{variant.packageType}</span>
                <span className="font-semibold text-gray-900">
                  ₦{variant.price.toLocaleString()}
                </span>
              </div>
            ))}
            {product.variants.length > 2 && (
              <p className="text-xs text-gray-500">
                +{product.variants.length - 2} more options
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-xl font-bold text-customer-primary">
              ₦{getLowestPrice(product.variants).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => addToCart(product, product.variants[0])}
            className="bg-customer-primary hover:bg-customer-primary/90 text-white p-3 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customer-primary focus:border-transparent"
              />
            </div>

            {/* Filters and View */}
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-customer-primary focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-customer-primary focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="featured">Featured First</option>
              </select>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-customer-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-customer-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
