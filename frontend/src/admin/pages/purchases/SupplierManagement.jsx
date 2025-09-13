import React, { useState } from 'react';
import { Building, Plus, Search, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Apple Inc.', contact: 'John Smith', email: 'john@apple.com', phone: '+1 (555) 123-4567', address: '1 Apple Park Way, Cupertino, CA', products: 15, status: 'Active' },
    { id: 2, name: 'Samsung Electronics', contact: 'Sarah Johnson', email: 'sarah@samsung.com', phone: '+1 (555) 234-5678', address: '123 Samsung Blvd, Seoul, South Korea', products: 22, status: 'Active' },
    { id: 3, name: 'Dell Technologies', contact: 'Mike Brown', email: 'mike@dell.com', phone: '+1 (555) 345-6789', address: '456 Dell Drive, Round Rock, TX', products: 18, status: 'Active' },
    { id: 4, name: 'Sony Corporation', contact: 'Lisa Davis', email: 'lisa@sony.com', phone: '+1 (555) 456-7890', address: '789 Sony Street, Tokyo, Japan', products: 12, status: 'Inactive' },
    { id: 5, name: 'Microsoft Corp.', contact: 'David Wilson', email: 'david@microsoft.com', phone: '+1 (555) 567-8901', address: '101 Microsoft Way, Redmond, WA', products: 8, status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? supplier.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Supplier Management</h1>
          <p className="text-admin-gray-600">Manage your suppliers and vendor relationships</p>
        </div>
        <button className="admin-btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Supplier
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">
              <Building className="w-6 h-6" />
            </div>
            <span className="text-admin-primary font-semibold">Total</span>
          </div>
          <div className="admin-stats-number">24</div>
          <div className="admin-stats-label">Suppliers</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <Building className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">Active</span>
          </div>
          <div className="admin-stats-number">21</div>
          <div className="admin-stats-label">Active Suppliers</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-gray-100 text-gray-600">
              <Building className="w-6 h-6" />
            </div>
            <span className="text-gray-600 font-semibold">Inactive</span>
          </div>
          <div className="admin-stats-number">3</div>
          <div className="admin-stats-label">Inactive Suppliers</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search suppliers..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="admin-btn-secondary">
            <Search className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Supplier</div>
            <div className="admin-table-cell font-semibold">Contact</div>
            <div className="admin-table-cell font-semibold">Products</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div>
                  <p className="font-semibold text-admin-gray-900">{supplier.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-admin-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{supplier.email}</span>
                  </div>
                </div>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-admin-gray-400" />
                  <span>{supplier.contact}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-admin-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{supplier.phone}</span>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className="font-semibold text-admin-gray-900">{supplier.products}</span>
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${getStatusClass(supplier.status)}`}>
                  {supplier.status}
                </span>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-admin-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-admin-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;