import React, { useState } from 'react';
import { User, Search, Filter, Download, Eye, Edit, Trash2, Plus, Shield } from 'lucide-react';

const AdminList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', status: 'Active', lastLogin: '2023-06-15 14:30' },
    { id: 2, name: 'Manager User', email: 'manager@example.com', role: 'Manager', status: 'Active', lastLogin: '2023-06-14 09:15' },
    { id: 3, name: 'Support User', email: 'support@example.com', role: 'Support', status: 'Active', lastLogin: '2023-06-10 16:45' },
    { id: 4, name: 'Sales User', email: 'sales@example.com', role: 'Sales', status: 'Inactive', lastLogin: '2023-05-28 11:20' },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-success';
      case 'Inactive': return 'status-warning';
      default: return 'status-default';
    }
  };

  const getRoleClass = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-100 text-red-800';
      case 'Manager': return 'bg-blue-100 text-blue-800';
      case 'Support': return 'bg-green-100 text-green-800';
      case 'Sales': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Admin Users</h1>
          <p className="text-admin-gray-600">Manage administrator accounts and permissions</p>
        </div>
        <button className="admin-btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Admin
        </button>
      </div>

      {/* Search and Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search admin users..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="admin-select">
            <option value="">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Manager">Manager</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
          </select>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Admin User</div>
            <div className="admin-table-cell font-semibold">Role</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Last Login</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {admins.map((admin) => (
            <div key={admin.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-admin-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-admin-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-admin-gray-900">{admin.name}</p>
                    <p className="text-sm text-admin-gray-600">{admin.email}</p>
                  </div>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleClass(admin.role)}`}>
                  {admin.role}
                </span>
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${getStatusClass(admin.status)}`}>
                  {admin.status}
                </span>
              </div>
              <div className="admin-table-cell">
                {admin.lastLogin}
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-admin-gray-600">Showing 1 to 4 of 4 admin users</p>
        <div className="flex gap-2">
          <button className="admin-btn-secondary">Previous</button>
          <button className="admin-btn-primary">1</button>
          <button className="admin-btn-secondary">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminList;