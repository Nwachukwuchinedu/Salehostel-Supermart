import React, { useState, useEffect } from 'react'
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import adminApi from '../../../shared/services/adminApi'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await adminApi.getProducts()
      setProducts(response.data.products || response.data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminApi.deleteProduct(productId)
        // Remove the product from the local state
        setProducts(products.filter(product => product._id !== productId))
      } catch (err) {
        console.error('Failed to delete product:', err)
        alert('Failed to delete product. Please try again.')
      }
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true
    const matchesStatus = statusFilter ? 
      (statusFilter === 'Active' ? product.active : 
       statusFilter === 'Inactive' ? !product.active : 
       statusFilter === 'Low Stock' ? product.stock < 10 : true) : true
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-admin-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Products</h1>
          <p className="text-admin-gray-600">Manage your product inventory</p>
        </div>
        <Link to="/admin/products/add" className="admin-btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </div>
      
      {/* Filters & Search */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="admin-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Wearables</option>
            <option>Accessories</option>
          </select>
          <select 
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Low Stock</option>
          </select>
          <button 
            className="admin-btn-secondary"
            onClick={fetchProducts}
          >
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="admin-glass-card p-6 mb-8 bg-red-50 border border-red-200">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-2 admin-btn-primary"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Products Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Product</div>
            <div className="admin-table-cell font-semibold">Category</div>
            <div className="admin-table-cell font-semibold">Stock</div>
            <div className="admin-table-cell font-semibold">Price</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {filteredProducts.map(product => (
            <div key={product._id || product.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div className="flex items-center gap-3">
                  <img 
                    src={product.image || product.images?.[0] || "https://placehold.co/100x100/1e40af/white?text=Product"} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-admin-gray-900">{product.name}</p>
                    <p className="text-sm text-admin-gray-600">{product.sku}</p>
                  </div>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className="status-badge status-info">{product.category}</span>
              </div>
              <div className="admin-table-cell">
                <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.stock}
                </span>
              </div>
              <div className="admin-table-cell font-semibold">
                ₦{product.price}
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${product.active ? 'status-success' : 'status-danger'}`}>
                  {product.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/products/edit/${product._id || product.id}`} className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button 
                    className="p-2 text-admin-gray-400 hover:text-red-600"
                    onClick={() => handleDelete(product._id || product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {filteredProducts.length === 0 && !loading && (
        <div className="admin-glass-card p-12 text-center">
          <p className="text-admin-gray-500">No products found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setCategoryFilter('')
              setStatusFilter('')
            }}
            className="mt-4 admin-btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductList