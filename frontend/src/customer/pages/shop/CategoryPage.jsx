import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, ChevronDown, Star, ShoppingCart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/shop/ProductCard';
import api from '../../../shared/services/api';

const CategoryPage = () => {
  const { id, slug } = useParams();
  const categoryKey = id || slug;
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ brands: [], priceRanges: [], ratings: [] });
  const [debug, setDebug] = useState({ slug, id, resolvedCategoryId: '', logs: [] });

  const pushLog = (label, payload) => {
    // eslint-disable-next-line no-console
    console.log(label, payload);
    setDebug(prev => ({ ...prev, logs: [...prev.logs, { label, payload }] }));
  };

  useEffect(() => {
    fetchCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryKey]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      setProducts([]);
      setError(null);

      let resolvedCategory = null;
      if (slug) {
        const catUrl = `/public/categories/${slug}`;
        pushLog('GET ' + catUrl, null);
        const catRes = await api.get(catUrl);
        pushLog('Category by slug response', catRes.data);
        resolvedCategory = catRes.data?.category || null;
      }

      if (resolvedCategory) {
        setCategory(resolvedCategory);
      }

      const categoryId = resolvedCategory?._id || id || '';
      setDebug(prev => ({ ...prev, resolvedCategoryId: categoryId }));
      pushLog('Resolved categoryId', categoryId);
      if (!categoryId) {
        pushLog('Missing categoryId, aborting products fetch', null);
        setLoading(false);
        return;
      }

      const prodUrl = '/public/products';
      const params = { category: categoryId, limit: 48 };
      pushLog('GET ' + prodUrl + ' params:', params);
      const productsResponse = await api.get(prodUrl, { params });
      pushLog('Products by category response', productsResponse.data);
      const productsData = productsResponse.data?.products || [];
      setProducts(productsData);

      const uniqueBrands = [...new Set(productsData.map(p => p.brand).filter(Boolean))];
      setFilters({
        brands: uniqueBrands,
        priceRanges: [
          { label: 'Under ₦50', min: 0, max: 50 },
          { label: '₦50 - ₦100', min: 50, max: 100 },
          { label: '₦100 - ₦500', min: 100, max: 500 },
          { label: 'Over ₦500', min: 500, max: Infinity }
        ],
        ratings: [4, 3, 2, 1]
      });

      setError(null);
    } catch (err) {
      pushLog('Error fetching category/products', err?.response?.data || err?.message || err);
      setError('Failed to load category data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-500">Debug: slug={slug} id={id} resolvedId={debug.resolvedCategoryId}</div>
          <button className="customer-btn-secondary" onClick={fetchCategoryData}>Retry</button>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customer-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="customer-glass-card p-8 text-center">
          <div className="text-xs text-gray-500 mb-2">Debug: slug={slug} id={id} resolvedId={debug.resolvedCategoryId}</div>
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchCategoryData} className="customer-btn-primary">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Debug panel */}
      <div className="mb-4 text-xs text-gray-500">
        <div>Debug: slug={slug} id={id} resolvedId={debug.resolvedCategoryId} • products={products.length}</div>
      </div>

      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-customer-gray-500 hover:text-customer-primary">Home</a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="text-customer-gray-400 mx-2">/</span>
              <span className="text-customer-gray-700">{category?.name || 'Category'}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-customer-gray-900 mb-4">{category?.name || 'Category'}</h1>
        <p className="text-customer-gray-600 max-w-2xl mx-auto">{category?.description || 'Products in this category'}</p>
        <p className="mt-4 text-customer-gray-500">{products.length} products</p>
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
                          className={`w-4 h-4 ${i < rating
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
                            className={`w-4 h-4 ${i < rating
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
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {products.map((product) => (
                <div key={product._id || product.id} className="customer-glass-card rounded-2xl p-6 flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={product.image || product.images?.[0] || "https://placehold.co/300x300"}
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
                            className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5)
                              ? 'text-amber-400 fill-current'
                              : 'text-customer-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-customer-gray-600">
                        {product.rating || 4.5} ({product.reviewCount || 12})
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-xl font-bold text-customer-gray-900">₦{product.price || product.sellingPrice || 99.99}</span>
                      {product.originalPrice && product.originalPrice > (product.price || product.sellingPrice || 99.99) && (
                        <>
                          <span className="ml-2 text-lg text-customer-gray-500 line-through">₦{product.originalPrice}</span>
                          <span className="ml-2 bg-customer-primary/10 text-customer-primary px-2 py-1 rounded-md text-sm">
                            {product.discount || Math.round(((product.originalPrice - (product.price || product.sellingPrice || 99.99)) / product.originalPrice) * 100)}% OFF
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
            <p className="text-customer-gray-600">Showing 1 to {products.length} of {products.length} products</p>
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
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-12">
          <p className="text-customer-gray-600">Showing 1 to {products.length} of {products.length} products</p>
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