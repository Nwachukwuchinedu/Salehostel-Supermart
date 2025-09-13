import React, { useState } from 'react';
import { Heart, Share2, Star, Truck, Shield, RotateCcw, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const navigate = useNavigate();

  // Sample product data
  const product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    brand: 'SoundMax',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    sku: 'SM-WH-001',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue'],
    description: 'Experience premium sound quality with our wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.2 connectivity',
      'Built-in microphone for calls',
      'Foldable design for travel',
      'Quick charge technology'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g'
    }
  };

  const relatedProducts = [
    { id: 2, name: 'Wireless Earbuds', price: 89.99, image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Bluetooth Speaker', price: 129.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Gaming Headset', price: 149.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165ee67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'Over-Ear Headphones', price: 79.99, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
  ];

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
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
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
                  src={image} 
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
                      i < Math.floor(product.rating) 
                        ? 'text-amber-400 fill-current' 
                        : 'text-customer-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-customer-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-customer-gray-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="ml-3 text-xl text-customer-gray-500 line-through">${product.originalPrice}</span>
                  <span className="ml-3 bg-customer-primary/10 text-customer-primary px-2 py-1 rounded-md text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
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
          <p className="text-customer-gray-700 mb-6">{product.description}</p>

          {/* Size Selection */}
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

          {/* Color Selection */}
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
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="customer-btn-secondary flex-1"
              disabled={!product.inStock}
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
                  <p className="text-xs text-customer-gray-500">On orders over $50</p>
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
          <p className="text-customer-gray-700 mb-6">{product.description}</p>
          <p className="text-customer-gray-700">
            These premium wireless headphones deliver exceptional sound quality with active noise cancellation technology. 
            With up to 30 hours of battery life, you can enjoy your music all day long. The comfortable over-ear design 
            ensures you can wear them for extended periods without discomfort. The foldable design makes them perfect 
            for travel, and the quick charge technology means you can get hours of playback with just a few minutes of charging.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-customer-gray-900 mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="customer-product-card">
              <div className="customer-product-image">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="customer-product-info">
                <h3 className="customer-product-title">{relatedProduct.name}</h3>
                <div className="customer-product-price">${relatedProduct.price}</div>
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