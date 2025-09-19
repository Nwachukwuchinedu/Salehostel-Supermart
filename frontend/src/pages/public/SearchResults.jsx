import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../shared/services/api";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.searchProducts(query);
      setProducts(response.products || []);
    } catch (err) {
      setError("Failed to fetch search results");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          {loading ? "Searching..." : `${products.length} results found`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner w-8 h-8"></div>
        </div>
      ) : (
        <div>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching "{query}"
              </p>
              <p className="text-gray-400 mt-2">
                Try different keywords or browse our categories
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 truncate">
                      {product.description}
                    </p>
                    <div className="mt-3">
                      <span className="text-lg font-bold text-primary-green">
                        ₦{product.units[0]?.price?.toLocaleString() || "N/A"}
                      </span>
                      {product.units[0]?.unitType && (
                        <span className="text-gray-500 text-sm ml-2">
                          /{product.units[0].unitType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;