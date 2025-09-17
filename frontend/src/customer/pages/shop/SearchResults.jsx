import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/shop/ProductCard";
import Spinner from "../../../shared/ui/components/Spinner";
import Breadcrumb from "../../../shared/ui/components/Breadcrumb";
import Pagination from "../../../shared/ui/components/Pagination";
import Button from "../../../shared/ui/components/Button";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" },
  ];

  useEffect(() => {
    if (query) {
      searchProducts();
    }
  }, [query, currentPage, sortBy]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock search results
      const mockResults =
        query.toLowerCase().includes("headphone") ||
        query.toLowerCase().includes("audio")
          ? Array.from({ length: 8 }, (_, i) => ({
              id: i + 1,
              name: `${query} Product ${i + 1}`,
              price: Math.floor(Math.random() * 500) + 50,
              originalPrice: Math.floor(Math.random() * 200) + 300,
              image: "/api/placeholder/300/300",
              rating: (Math.random() * 2 + 3).toFixed(1),
              reviewCount: Math.floor(Math.random() * 200) + 10,
              brand: ["AudioTech", "TechPro", "SoundMax"][
                Math.floor(Math.random() * 3)
              ],
              inStock: Math.random() > 0.2,
              isNew: Math.random() > 0.7,
              relevanceScore: Math.random(),
            }))
          : [];

      setProducts(mockResults);
      setTotalResults(mockResults.length);
      setTotalPages(Math.ceil(mockResults.length / 12));

      // Mock search suggestions
      if (mockResults.length === 0) {
        setSuggestions([
          "wireless headphones",
          "bluetooth speakers",
          "gaming headset",
          "earbuds",
          "audio equipment",
        ]);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/customer" },
    { label: "Shop", href: "/customer/shop" },
    { label: `Search: "${query}"` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          {loading ? "Searching..." : `${totalResults} results found`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
      ) : products.length > 0 ? (
        <>
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * 12 + 1}-
              {Math.min(currentPage * 12, totalResults)} of {totalResults}{" "}
              results
            </p>

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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        /* No Results */
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No results found for "{query}"
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching your search. Try different
              keywords or check out our suggestions below.
            </p>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Popular searches:
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const newSearchParams = new URLSearchParams();
                        newSearchParams.set("q", suggestion);
                        window.location.search = newSearchParams.toString();
                      }}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tips */}
            <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Search Tips:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your spelling and try again</li>
                <li>• Use more general keywords</li>
                <li>• Try different product names or brands</li>
                <li>• Browse our categories instead</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button onClick={() => window.history.back()} variant="primary">
                Go Back
              </Button>

              <Button
                onClick={() => (window.location.href = "/customer/shop")}
                variant="outline"
              >
                Browse All Products
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Related Categories */}
      {!loading && products.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Related Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Electronics", "Audio", "Accessories", "Gaming", "Mobile"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    (window.location.href = `/customer/shop/category/${category.toLowerCase()}`)
                  }
                  className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
