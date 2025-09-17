import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../shared/hooks/useCart.jsx";
import Button from "../../../shared/ui/components/Button";
import Spinner from "../../../shared/ui/components/Spinner";
import Breadcrumb from "../../../shared/ui/components/Breadcrumb";
import ProductCard from "../../components/shop/ProductCard";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock product data
      const mockProduct = {
        id: parseInt(id),
        name: "Premium Wireless Headphones",
        description:
          "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort padding.",
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        rating: 4.5,
        reviewCount: 128,
        inStock: true,
        stockQuantity: 15,
        category: "Electronics",
        brand: "AudioTech",
        sku: "AT-WH-001",
        images: [
          "/api/placeholder/600/600",
          "/api/placeholder/600/600",
          "/api/placeholder/600/600",
          "/api/placeholder/600/600",
        ],
        variants: [
          {
            id: 1,
            name: "Black",
            value: "black",
            price: 299.99,
            inStock: true,
          },
          {
            id: 2,
            name: "White",
            value: "white",
            price: 299.99,
            inStock: true,
          },
          {
            id: 3,
            name: "Silver",
            value: "silver",
            price: 319.99,
            inStock: false,
          },
        ],
        features: [
          "Active Noise Cancellation",
          "30-hour battery life",
          "Quick charge (15 min = 3 hours)",
          "Premium comfort padding",
          "Bluetooth 5.0",
          "Built-in microphone",
        ],
        specifications: {
          "Driver Size": "40mm",
          "Frequency Response": "20Hz - 20kHz",
          Impedance: "32 Ohm",
          Weight: "250g",
          Connectivity: "Bluetooth 5.0, 3.5mm jack",
          Battery: "30 hours (ANC on), 40 hours (ANC off)",
        },
      };

      setProduct(mockProduct);
      setSelectedVariant(mockProduct.variants[0]);

      // Mock related products
      setRelatedProducts([
        {
          id: 2,
          name: "Wireless Earbuds",
          price: 149.99,
          image: "/api/placeholder/300/300",
          rating: 4.3,
        },
        {
          id: 3,
          name: "Gaming Headset",
          price: 199.99,
          image: "/api/placeholder/300/300",
          rating: 4.7,
        },
        {
          id: 4,
          name: "Studio Monitors",
          price: 449.99,
          image: "/api/placeholder/300/300",
          rating: 4.6,
        },
      ]);
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: selectedVariant.price,
      image: product.images[0],
      variant: selectedVariant.name,
      quantity,
    });
  };

  const breadcrumbItems = [
    { label: "Home", href: "/customer" },
    { label: "Shop", href: "/customer/shop" },
    {
      label: product?.category || "Category",
      href: `/customer/shop/category/${product?.category?.toLowerCase()}`,
    },
    { label: product?.name || "Product" },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/customer/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                  activeImageIndex === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${selectedVariant?.price || product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.inStock}
                    className={`px-4 py-2 text-sm font-medium rounded-md border ${
                      selectedVariant?.id === variant.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : variant.inStock
                        ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {variant.name}
                    {!variant.inStock && " (Out of Stock)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="px-4 py-2 border border-gray-300 rounded-md min-w-16 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {product.stockQuantity} items available
            </p>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!product.inStock || !selectedVariant?.inStock}
            >
              {product.inStock && selectedVariant?.inStock
                ? "Add to Cart"
                : "Out of Stock"}
            </Button>

            <Button variant="outline" size="lg" className="w-full">
              Add to Wishlist
            </Button>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Key Features
            </h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <svg
                    className="h-4 w-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t border-gray-200 pt-8 mb-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-gray-200"
                >
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
