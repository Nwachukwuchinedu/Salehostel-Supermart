import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image, Tag, DollarSign, Package, FileText, Hash, QrCode, Calendar, User, Layers } from 'lucide-react';
import adminApi from '../../../shared/services/adminApi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    brand: '',
    sku: '',
    barcode: '',
    sellingPrice: '',
    costPrice: '',
    salePrice: '',
    onSale: false,
    currentStock: '',
    minStockLevel: '',
    maxStockLevel: '',
    unit: 'piece',
    featured: false,
    tags: '',
    metaTitle: '',
    metaDescription: '',
    isActive: true,
    isPublished: false,
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getProduct(id);
      const productData = response.product;
      setProduct(productData);
      
      // Set form data
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        shortDescription: productData.shortDescription || '',
        category: productData.category?._id || productData.category || '',
        brand: productData.brand || '',
        sku: productData.sku || '',
        barcode: productData.barcode || '',
        sellingPrice: productData.sellingPrice || '',
        costPrice: productData.costPrice || '',
        salePrice: productData.salePrice || '',
        onSale: productData.onSale || false,
        currentStock: productData.currentStock || '',
        minStockLevel: productData.minStockLevel || '',
        maxStockLevel: productData.maxStockLevel || '',
        unit: productData.unit || 'piece',
        featured: productData.featured || false,
        tags: productData.tags ? productData.tags.join(', ') : '',
        metaTitle: productData.metaTitle || '',
        metaDescription: productData.metaDescription || '',
        isActive: productData.isActive !== undefined ? productData.isActive : true,
        isPublished: productData.isPublished || false,
      });
      
      // Set image preview if exists
      if (productData.images && productData.images.length > 0) {
        setImagePreview(productData.images[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await adminApi.getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }
    
    if (!formData.sellingPrice || formData.sellingPrice <= 0) {
      newErrors.sellingPrice = 'Valid selling price is required';
    }
    
    if (formData.costPrice && formData.costPrice < 0) {
      newErrors.costPrice = 'Cost price cannot be negative';
    }
    
    if (formData.currentStock === '' || formData.currentStock < 0) {
      newErrors.currentStock = 'Current stock is required and cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setLoading(true);
        const productData = {
          ...formData,
          sellingPrice: parseFloat(formData.sellingPrice),
          costPrice: parseFloat(formData.costPrice || 0),
          salePrice: parseFloat(formData.salePrice || 0),
          currentStock: parseInt(formData.currentStock),
          minStockLevel: parseInt(formData.minStockLevel || 0),
          maxStockLevel: parseInt(formData.maxStockLevel || 0),
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
        };
        
        const response = await adminApi.updateProduct(id, productData);
        if (response.success) {
          navigate('/admin/products');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        // Handle error display
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/admin/products')}
            className="admin-btn-secondary mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-admin-gray-900">Edit Product</h1>
            <p className="text-admin-gray-600">Update product information</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="admin-btn-primary flex items-center"
        >
          {loading ? (
            <div className="loading-spinner w-5 h-5 mr-2"></div>
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-glass-card p-6">
            <h2 className="text-lg font-semibold text-admin-gray-900 mb-4">Product Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Product Name *</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`admin-input pl-10 ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter product name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="form-label">Category *</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`admin-input pl-10 ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                {errors.category && <p className="mt-1 text-red-500 text-sm">{errors.category}</p>}
              </div>

              <div>
                <label className="form-label">Brand</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="admin-input pl-10"
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="admin-input"
                >
                  <option value="piece">Piece</option>
                  <option value="kg">Kilogram</option>
                  <option value="bag">Bag</option>
                  <option value="carton">Carton</option>
                  <option value="liter">Liter</option>
                  <option value="meter">Meter</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="admin-input"
                placeholder="Enter product description"
              />
            </div>

            <div className="mt-4">
              <label className="form-label">Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={2}
                className="admin-input"
                placeholder="Enter short description"
                maxLength={200}
              />
              <p className="text-sm text-admin-gray-500 mt-1">
                {formData.shortDescription.length}/200 characters
              </p>
            </div>

            <div className="mt-4">
              <label className="form-label">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="admin-input"
                placeholder="Enter tags separated by commas"
              />
              <p className="text-sm text-admin-gray-500 mt-1">
                Separate tags with commas (e.g., electronics, smartphone, apple)
              </p>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="admin-glass-card p-6">
            <h2 className="text-lg font-semibold text-admin-gray-900 mb-4">Pricing Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">SKU *</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className={`admin-input pl-10 ${errors.sku ? 'border-red-500' : ''}`}
                    placeholder="Enter SKU"
                  />
                </div>
                {errors.sku && <p className="mt-1 text-red-500 text-sm">{errors.sku}</p>}
              </div>

              <div>
                <label className="form-label">Barcode</label>
                <div className="relative">
                  <QrCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    className="admin-input pl-10"
                    placeholder="Enter barcode"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Selling Price *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`admin-input pl-10 ${errors.sellingPrice ? 'border-red-500' : ''}`}
                    placeholder="0.00"
                  />
                </div>
                {errors.sellingPrice && <p className="mt-1 text-red-500 text-sm">{errors.sellingPrice}</p>}
              </div>

              <div>
                <label className="form-label">Cost Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`admin-input pl-10 ${errors.costPrice ? 'border-red-500' : ''}`}
                    placeholder="0.00"
                  />
                </div>
                {errors.costPrice && <p className="mt-1 text-red-500 text-sm">{errors.costPrice}</p>}
              </div>

              <div>
                <label className="form-label">Sale Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="admin-input pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={formData.onSale}
                    onChange={handleChange}
                    className="admin-checkbox"
                    id="onSale"
                  />
                  <label htmlFor="onSale" className="ml-2 text-admin-gray-700">On Sale</label>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Information */}
          <div className="admin-glass-card p-6">
            <h2 className="text-lg font-semibold text-admin-gray-900 mb-4">SEO Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="Enter meta title"
                  maxLength={60}
                />
                <p className="text-sm text-admin-gray-500 mt-1">
                  {formData.metaTitle.length}/60 characters
                </p>
              </div>

              <div>
                <label className="form-label">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  className="admin-input"
                  placeholder="Enter meta description"
                  maxLength={160}
                />
                <p className="text-sm text-admin-gray-500 mt-1">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="admin-glass-card p-6">
            <h2 className="text-lg font-semibold text-admin-gray-900 mb-4">Product Image</h2>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-admin-gray-100 mb-4">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Product preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-admin-gray-400" />
                  </div>
                )}
              </div>
              
              <label className="admin-btn-secondary cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Image className="w-5 h-5 mr-2" />
                Upload Image
              </label>
              <p className="text-xs text-admin-gray-500 mt-2 text-center">
                JPG, PNG, or GIF (Max 2MB)
              </p>
            </div>
          </div>

          {/* Inventory */}
          <div className="admin-glass-card p-6">
            <h2 className="text-lg font-semibold text-admin-gray-900 mb-4">Inventory</h2>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Current Stock *</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="currentStock"
                    value={formData.currentStock}
                    onChange={handleChange}
                    min="0"
                    className={`admin-input pl-10 ${errors.currentStock ? 'border-red-500' : ''}`}
                    placeholder="0"
                  />
                </div>
                {errors.currentStock && <p className="mt-1 text-red-500 text-sm">{errors.currentStock}</p>}
              </div>

              <div>
                <label className="form-label">Minimum Stock Level</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="minStockLevel"
                    value={formData.minStockLevel}
                    onChange={handleChange}
                    min="0"
                    className="admin-input pl-10"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Maximum Stock Level</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="maxStockLevel"
                    value={formData.maxStockLevel}
                    onChange={handleChange}
                    min="0"
                    className="admin-input pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="admin-glass-card p-6">
            <h2 className="text-lg font-semibold text-admin-gray-900 mb-4">Status</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-admin-gray-900">Active</p>
                  <p className="text-sm text-admin-gray-500">Product is available for sale</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="admin-toggle"
                    id="isActive"
                  />
                  <label htmlFor="isActive" className="admin-toggle-label"></label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-admin-gray-900">Published</p>
                  <p className="text-sm text-admin-gray-500">Product is visible to customers</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="admin-toggle"
                    id="isPublished"
                  />
                  <label htmlFor="isPublished" className="admin-toggle-label"></label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-admin-gray-900">Featured</p>
                  <p className="text-sm text-admin-gray-500">Display in featured products</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="admin-toggle"
                    id="featured"
                  />
                  <label htmlFor="featured" className="admin-toggle-label"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;