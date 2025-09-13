import React, { useState } from 'react'
import { Heart, ShoppingCart, Eye, Star, Shuffle } from 'lucide-react'

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    // Add cart animation
    const button = e.currentTarget
    button.classList.add('animate-pulse')
    setTimeout(() => button.classList.remove('animate-pulse'), 300)
    // Add to cart logic would go here
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    // Wishlist logic would go here
  }

  return (
    <div 
      className="customer-product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="customer-product-image">
        <img 
          src={product.image || "https://placehold.co/300x300"} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Overlay Actions */}
        <div className={`customer-product-overlay transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={toggleWishlist}
            className={`customer-btn-icon transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/20 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button className="customer-btn-icon bg-white/20 text-gray-700 hover:bg-blue-500 hover:text-white">
            <Eye className="w-5 h-5" />
          </button>
          
          <button className="customer-btn-icon bg-white/20 text-gray-700 hover:bg-green-500 hover:text-white">
            <Shuffle className="w-5 h-5" />
          </button>
        </div>
        
        {/* Product Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.isNew && (
            <span className="animate-bounce bg-customer-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span className="animate-pulse bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              -{product.discount}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Only {product.stock} left!
            </span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="customer-product-info">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 transition-colors ${
                  i < Math.floor(product.rating || 4.5) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviewCount || 12})</span>
        </div>
        
        {/* Title */}
        <h3 className="customer-product-title group-hover:text-customer-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="customer-product-price">${product.price || 99.99}</span>
          {product.originalPrice && product.originalPrice > (product.price || 99.99) && (
            <span className="text-gray-500 line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
              Save ${((product.originalPrice || 120) - (product.price || 99.99)).toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="mt-3">
          {(product.stock || 10) > 10 ? (
            <div className="flex items-center text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              In Stock
            </div>
          ) : (product.stock || 10) > 0 ? (
            <div className="flex items-center text-amber-600 text-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
              Low Stock ({product.stock || 10} left)
            </div>
          ) : (
            <div className="flex items-center text-red-600 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Out of Stock
            </div>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={(product.stock || 10) === 0}
          className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
            (product.stock || 10) > 0
              ? 'customer-btn-primary hover:shadow-lg active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{(product.stock || 10) > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard