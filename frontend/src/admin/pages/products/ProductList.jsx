import React, { useState } from 'react'
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductList = () => {
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      category: "Electronics",
      stock: 15,
      price: 89.99,
      active: true,
      image: "https://placehold.co/100x100/1e40af/white?text=Headphones"
    },
    {
      id: 2,
      name: "Smartphone XYZ Pro",
      sku: "SP-002",
      category: "Electronics",
      stock: 8,
      price: 699.99,
      active: true,
      image: "https://placehold.co/100x100/1e40af/white?text=Smartphone"
    },
    {
      id: 3,
      name: "Fitness Tracker Watch",
      sku: "FTW-003",
      category: "Wearables",
      stock: 25,
      price: 49.99,
      active: true,
      image: "https://placehold.co/100x100/1e40af/white?text=Fitness"
    },
    {
      id: 4,
      name: "Laptop Backpack",
      sku: "LB-004",
      category: "Accessories",
      stock: 0,
      price: 29.99,
      active: false,
      image: "https://placehold.co/100x100/1e40af/white?text=Backpack"
    }
  ])

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
            />
          </div>
          <select className="admin-select">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Wearables</option>
            <option>Accessories</option>
          </select>
          <select className="admin-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Low Stock</option>
          </select>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>
      
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
          {products.map(product => (
            <div key={product.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div className="flex items-center gap-3">
                  <img 
                    src={product.image} 
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
                ${product.price}
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${product.active ? 'status-success' : 'status-danger'}`}>
                  {product.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/products/edit/${product.id}`} className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button className="p-2 text-admin-gray-400 hover:text-red-600">
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
    </div>
  )
}

export default ProductList