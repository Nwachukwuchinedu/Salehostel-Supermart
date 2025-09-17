import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/shop/ProductCard";
import Spinner from "../../../shared/ui/components/Spinner";
import Breadcrumb from "../../../shared/ui/components/Breadcrumb";
import Pagination from "../../../shared/ui/components/Pagination";
import Button from "../../../shared/ui/components/Button";

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    brands: [],
    rating: 0,
    inStock: false,
  });
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const availableBrands = ["AudioTech", "TechPro", "SoundMax", "EliteAudio"];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [category, currentPage, sortBy, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock products data
      const mockProducts = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 500) + 50,
        originalPrice: Math.floor(Math.random() * 200) + 300,
        image: "/api/placeholder/300/300",
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 200) + 10,
        brand:
          availableBrands[Math.floor(Math.random() * availableBrands.length)],
        inStock: Math.random() > 0.2,
        isNew: Math.random() > 0.7,
        isFeatured: Math.random() > 0.8,
      }));

      setProducts(mockProducts);
      setTotalPages(5); // Mock pagination
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleBrandToggle = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      brands: [],
      rating: 0,
      inStock: false,
    });
  };

  const breadcrumbItems = [
    { label: "Home", href: "/customer" },
    { label: "Shop", href: "/customer/shop" },
    {
      label:
        category?.charAt(0).toUpperCase() + category?.slice(1) || "Category",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear All
              </Button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        parseInt(e.target.value) || 0,
                        filters.priceRange[1],
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [
                        filters.priceRange[0],
                        parseInt(e.target.value) || 1000,
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
              <div className="space-y-2">
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange("rating", rating)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) =>
                    handleFilterChange("inStock", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  In Stock Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {category?.charAt(0).toUpperCase() + category?.slice(1) ||
                  "All Products"}
              </h1>
              <p className="text-gray-600">
                {loading ? "Loading..." : `${products.length} products found`}
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                  />
                </svg>
                Filters
              </Button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner size="lg" />
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria to find what
                  you're looking for.
                </p>
                <Button onClick={clearFilters} variant="primary">
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
