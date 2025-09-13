import React, { useState } from 'react';
import { Users, UserPlus, Search, Filter, Download, Upload } from 'lucide-react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">User Management</h1>
          <p className="text-admin-gray-600">Manage customers and admin users</p>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-secondary">
            <Upload className="w-5 h-5 mr-2" />
            Import Users
          </button>
          <button className="admin-btn-secondary">
            <Download className="w-5 h-5 mr-2" />
            Export Users
          </button>
          <button className="admin-btn-primary">
            <UserPlus className="w-5 h-5 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="flex border-b border-admin-gray-200">
          <button
            className={`pb-4 px-6 font-medium ${
              activeTab === 'customers'
                ? 'text-admin-primary border-b-2 border-admin-primary'
                : 'text-admin-gray-500 hover:text-admin-gray-700'
            }`}
            onClick={() => setActiveTab('customers')}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customers
            </div>
          </button>
          <button
            className={`pb-4 px-6 font-medium ${
              activeTab === 'admins'
                ? 'text-admin-primary border-b-2 border-admin-primary'
                : 'text-admin-gray-500 hover:text-admin-gray-700'
            }`}
            onClick={() => setActiveTab('admins')}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Admin Users
            </div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="admin-glass-card p-6">
        {activeTab === 'customers' ? (
          <div>
            <h2 className="text-xl font-semibold text-admin-gray-900 mb-4">Customer Management</h2>
            <p className="text-admin-gray-600">Manage customer accounts and permissions.</p>
            <div className="mt-8 text-center py-12">
              <Users className="w-16 h-16 text-admin-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-admin-gray-900 mb-2">Customer Management</h3>
              <p className="text-admin-gray-600 mb-4">Customer management features will be implemented here.</p>
              <button className="admin-btn-primary">View Customer List</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-admin-gray-900 mb-4">Admin User Management</h2>
            <p className="text-admin-gray-600">Manage admin accounts and permissions.</p>
            <div className="mt-8 text-center py-12">
              <Users className="w-16 h-16 text-admin-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-admin-gray-900 mb-2">Admin Management</h3>
              <p className="text-admin-gray-600 mb-4">Admin user management features will be implemented here.</p>
              <button className="admin-btn-primary">View Admin List</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;