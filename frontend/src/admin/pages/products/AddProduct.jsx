import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Upload } from 'lucide-react'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
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
    isActive: true,
    isPublished: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Product creation logic would go here
    console.log('Product to create:', product)
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/products" className="admin-btn-secondary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-admin-gray-900">Add New Product</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Information */}
        <div className="lg:col-span-2 admin-glass-card p-6">
          <h2 className="text-xl font-semibold text-admin-gray-900 mb-6">Product Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="admin-input"
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">SKU *</label>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                className="admin-input"
                placeholder="Enter SKU"
                required
              />
            </div>
            
            <div className="form-group md:col-span-2">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="admin-textarea"
                rows="4"
                placeholder="Enter product description"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="admin-select"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Kitchen</option>
                <option value="books">Books</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Brand</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="admin-input"
                placeholder="Enter brand"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Barcode</label>
              <input
                type="text"
                name="barcode"
                value={product.barcode}
                onChange={handleChange}
                className="admin-input"
                placeholder="Enter barcode"
              />
            </div>
          </div>
        </div>
        
        {/* Product Images */}
        <div className="admin-glass-card p-6">
          <h2 className="text-xl font-semibold text-admin-gray-900 mb-6">Product Images</h2>
          
          <div className="border-2 border-dashed border-admin-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-admin-gray-400 mx-auto mb-4" />
            <p className="text-admin-gray-600 mb-4">Drag and drop images here</p>
            <button type="button" className="admin-btn-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Browse Files
            </button>
            <p className="text-admin-gray-500 text-sm mt-4">PNG, JPG up to 5MB</p>
          </div>
          
          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={product.featured}
                onChange={handleChange}
                className="rounded border-admin-gray-300 text-admin-primary focus:ring-admin-primary"
              />
              <span className="ml-2 text-admin-gray-700">Featured Product</span>
            </label>
          </div>
        </div>
        
        {/* Pricing & Inventory */}
        <div className="lg:col-span-2 admin-glass-card p-6">
          <h2 className="text-xl font-semibold text-admin-gray-900 mb-6">Pricing & Inventory</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="form-label">Cost Price *</label>
              <input
                type="number"
                name="costPrice"
                value={product.costPrice}
                onChange={handleChange}
                className="admin-input"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Selling Price *</label>
              <input
                type="number"
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleChange}
                className="admin-input"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Sale Price</label>
              <input
                type="number"
                name="salePrice"
                value={product.salePrice}
                onChange={handleChange}
                className="admin-input"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Current Stock *</label>
              <input
                type="number"
                name="currentStock"
                value={product.currentStock}
                onChange={handleChange}
                className="admin-input"
                placeholder="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Min Stock Level</label>
              <input
                type="number"
                name="minStockLevel"
                value={product.minStockLevel}
                onChange={handleChange}
                className="admin-input"
                placeholder="0"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Max Stock Level</label>
              <input
                type="number"
                name="maxStockLevel"
                value={product.maxStockLevel}
                onChange={handleChange}
                className="admin-input"
                placeholder="0"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Unit</label>
              <select
                name="unit"
                value={product.unit}
                onChange={handleChange}
                className="admin-select"
              >
                <option value="piece">Piece</option>
                <option value="kg">Kilogram</option>
                <option value="bag">Bag</option>
                <option value="carton">Carton</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="form-group">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="onSale"
                  checked={product.onSale}
                  onChange={handleChange}
                  className="rounded border-admin-gray-300 text-admin-primary focus:ring-admin-primary"
                />
                <span className="ml-2 text-admin-gray-700">On Sale</span>
              </label>
            </div>
            
            <div className="form-group">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={product.isActive}
                  onChange={handleChange}
                  className="rounded border-admin-gray-300 text-admin-primary focus:ring-admin-primary"
                />
                <span className="ml-2 text-admin-gray-700">Active</span>
              </label>
            </div>
            
            <div className="form-group">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={product.isPublished}
                  onChange={handleChange}
                  className="rounded border-admin-gray-300 text-admin-primary focus:ring-admin-primary"
                />
                <span className="ml-2 text-admin-gray-700">Published</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="admin-glass-card p-6">
          <h2 className="text-xl font-semibold text-admin-gray-900 mb-6">Actions</h2>
          
          <div className="space-y-4">
            <button type="submit" className="admin-btn-primary w-full">
              Create Product
            </button>
            
            <button type="button" className="admin-btn-secondary w-full">
              Save as Draft
            </button>
            
            <Link to="/admin/products" className="admin-btn-glass w-full text-center">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct