import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';
import useAdminAuthStore from '../../stores/adminAuthStore';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const navigate = useNavigate();
  const { admin, getProfile, updateProfile, loading, error } = useAdminAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          address: {
            street: profile.address?.street || '',
            city: profile.address?.city || '',
            state: profile.address?.state || '',
            zipCode: profile.address?.zipCode || '',
            country: profile.address?.country || ''
          }
        });
      }
    };

    fetchProfile();
  }, [getProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested address fields
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await updateProfile(formData);
    if (result) {
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    useAdminAuthStore.getState().logout();
    navigate('/admin/login');
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Admin Profile</h1>
          <p className="text-admin-gray-600">Manage your admin account information</p>
        </div>
        <button
          onClick={handleLogout}
          className="admin-btn-secondary"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="admin-glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-admin-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-admin-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-admin-gray-900">{admin?.name || 'Admin User'}</h2>
              <p className="text-admin-gray-600">{admin?.email || 'admin@example.com'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="admin-btn-secondary flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.name || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter your email"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.email || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                Street Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter street address"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.address.street || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter city"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.address.city || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                State/Province
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter state/province"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.address.state || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                ZIP/Postal Code
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter ZIP/postal code"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.address.zipCode || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-gray-700 mb-2">
                Country
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="Enter country"
                />
              ) : (
                <p className="text-admin-gray-900">{formData.address.country || 'Not provided'}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="admin-btn-primary flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner w-4 h-4"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;