import React, { useState, useEffect } from 'react';
import { Heart, Share2, Star, Truck, Shield, RotateCcw, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import customerApi from '../../../shared/services/customerApi';

const ProductPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      
      // Fetch product details
      const productResponse = await customerApi.getProduct(id);
      const productData = productResponse.data || productResponse;
      setProduct(productData);
      
      // Set default selections if available
      if (productData.sizes && productData.sizes.length > 0) {
        setSelectedSize(productData.sizes[0]);
      }
      if (productData.colors && productData.colors.length > 0) {
        setSelectedColor(productData.colors[0]);
      }
      
      // Fetch related products (this is a simplified approach)
      const relatedResponse = await customerApi.getProducts({ 
        category: productData.category,
        limit: 4
      });
      const relatedData = relatedResponse.data?.products || relatedResponse.data || [];
      setRelatedProducts(relatedData.filter(p => (p._id || p.id) !== id).slice(0, 4));
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch product data:', err);
      setError('Failed to load product data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log('Added to cart:', { product, quantity, selectedSize, selectedColor });
    // For now, just navigate to cart
    navigate('/cart');
  };

  const handleBuyNow = () => {
    // Buy now logic would go here
    console.log('Buy now:', { product, quantity, selectedSize, selectedColor });
    // For now, just navigate to checkout
    navigate('/checkout');
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchProductData}
            className="customer-btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If product is not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="customer-glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-customer-gray-900 mb-4">Product Not Found</h2>
          <p className="text-customer-gray-600 mb-6">The product you're looking for doesn't exist or is no longer available.</p>
          <button 
            onClick={() => navigate('/')}
            className="customer-btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-customer-gray-500 hover:text-customer-primary">Home</a>
          </li>
          <li>
            <div className="flex items-center">
              <span className="text-customer-gray-400 mx-2">/</span>
              <a href="/products" className="text-customer-gray-500 hover:text-customer-primary">Products</a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="text-customer-gray-400 mx-2">/</span>
              <span className="text-customer-gray-700">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img 
              src={product.images?.[selectedImage] || product.image || "https://placehold.co/600x600"} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {(product.images || [product.image]).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-xl overflow-hidden border-2 ${
                  selectedImage === index 
                    ? 'border-customer-primary' 
                    : 'border-customer-gray-200 hover:border-customer-gray-300'
                }`}
              >
                <img 
                  src={image || "https://placehold.co/200x200"} 
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <span className="text-customer-gray-500 text-sm">{product.brand}</span>
            <h1 className="text-3xl font-bold text-customer-gray-900 mt-1">{product.name}</h1>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 4.5) 
                        ? 'text-amber-400 fill-current' 
                        : 'text-customer-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-customer-gray-600">
                {product.rating || 4.5} ({product.reviewCount || 12} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-customer-gray-900">₦{product.price || product.sellingPrice || 99.99}</span>
              {product.originalPrice && product.originalPrice > (product.price || product.sellingPrice || 99.99) && (
                <>
                  <span className="ml-3 text-xl text-customer-gray-500 line-through">₦{product.originalPrice}</span>
                  <span className="ml-3 bg-customer-primary/10 text-customer-primary px-2 py-1 rounded-md text-sm font-medium">
                    {product.discount || Math.round(((product.originalPrice - (product.price || product.sellingPrice || 99.99)) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {(product.stock || product.currentStock || 10) > 0 ? (
              <span className="inline-flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-customer-gray-700 mb-6">{product.description || product.shortDescription || 'No description available for this product.'}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-customer-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size
                        ? 'border-customer-primary bg-customer-primary/10 text-customer-primary'
                        : 'border-customer-gray-300 text-customer-gray-700 hover:border-customer-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-customer-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedColor === color
                        ? 'border-customer-primary bg-customer-primary/10 text-customer-primary'
                        : 'border-customer-gray-300 text-customer-gray-700 hover:border-customer-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-customer-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="p-2 rounded-l-lg border border-customer-gray-300 hover:bg-customer-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-y border-customer-gray-300 py-2"
              />
              <button
                onClick={incrementQuantity}
                className="p-2 rounded-r-lg border border-customer-gray-300 hover:bg-customer-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="customer-btn-primary flex-1 flex items-center justify-center"
              disabled={(product.stock || product.currentStock || 10) === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="customer-btn-secondary flex-1"
              disabled={(product.stock || product.currentStock || 10) === 0}
            >
              Buy Now
            </button>
            <button className="p-3 border border-customer-gray-300 rounded-lg hover:bg-customer-gray-100">
              <Heart className="w-5 h-5 text-customer-gray-600" />
            </button>
            <button className="p-3 border border-customer-gray-300 rounded-lg hover:bg-customer-gray-100">
              <Share2 className="w-5 h-5 text-customer-gray-600" />
            </button>
          </div>

          {/* Product Info */}
          <div className="border-t border-customer-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-customer-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-customer-gray-900">Free Shipping</p>
                  <p className="text-xs text-customer-gray-500">On orders over ₦50</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-customer-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-customer-gray-900">2 Year Warranty</p>
                  <p className="text-xs text-customer-gray-500">Included</p>
                </div>
              </div>
              <div className="flex items-center">
                <RotateCcw className="w-5 h-5 text-customer-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-customer-gray-900">30-Day Returns</p>
                  <p className="text-xs text-customer-gray-500">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-customer-gray-200">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-customer-primary py-4 text-customer-primary font-medium">
              Description
            </button>
            <button className="border-b-2 border-transparent py-4 text-customer-gray-500 hover:text-customer-gray-700 hover:border-customer-gray-300">
              Features
            </button>
            <button className="border-b-2 border-transparent py-4 text-customer-gray-500 hover:text-customer-gray-700 hover:border-customer-gray-300">
              Specifications
            </button>
            <button className="border-b-2 border-transparent py-4 text-customer-gray-500 hover:text-customer-gray-700 hover:border-customer-gray-300">
              Reviews
            </button>
          </nav>
        </div>
        <div className="py-8">
          <h3 className="text-xl font-semibold text-customer-gray-900 mb-4">Product Description</h3>
          <p className="text-customer-gray-700 mb-6">{product.description || product.shortDescription || 'No description available for this product.'}</p>
          <p className="text-customer-gray-700">
            {product.description || product.shortDescription || 'No additional information available for this product.'}
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-customer-gray-900 mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id || relatedProduct.id} className="customer-product-card">
              <div className="customer-product-image">
                <img 
                  src={relatedProduct.image || relatedProduct.images?.[0] || "https://placehold.co/300x300"} 
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="customer-product-info">
                <h3 className="customer-product-title">{relatedProduct.name}</h3>
                <div className="customer-product-price">₦{relatedProduct.price || relatedProduct.sellingPrice || 99.99}</div>
                <button className="customer-btn-primary w-full mt-3">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;