import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera } from 'lucide-react';

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    joinDate: 'January 15, 2023',
    totalOrders: 24,
    totalSpent: 2450.75
  });

  const handleSave = () => {
    // Save profile logic would go here
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-customer-gray-900">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="customer-btn-secondary flex items-center"
        >
          <Edit className="w-5 h-5 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-customer-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-customer-primary" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-customer-primary rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <div className="ml-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="customer-input text-2xl font-bold"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-customer-gray-900">{profile.name}</h2>
                )}
                <p className="text-customer-gray-600">Customer since {profile.joinDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-customer-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-customer-gray-500">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="customer-input"
                        />
                      ) : (
                        <p className="text-customer-gray-900">{profile.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-customer-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-customer-gray-500">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="customer-input"
                        />
                      ) : (
                        <p className="text-customer-gray-900">{profile.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Address</h3>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-customer-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-customer-gray-500">Shipping Address</p>
                    {isEditing ? (
                      <textarea
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        className="customer-input"
                        rows="3"
                      />
                    ) : (
                      <p className="text-customer-gray-900">{profile.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="customer-btn-primary"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div>
          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-customer-gray-900 mb-6">Account Statistics</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-customer-gray-500">Total Orders</p>
                <p className="text-3xl font-bold text-customer-gray-900">{profile.totalOrders}</p>
              </div>
              
              <div>
                <p className="text-sm text-customer-gray-500">Total Spent</p>
                <p className="text-3xl font-bold text-customer-gray-900">${profile.totalSpent.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-customer-gray-500">Member Since</p>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-customer-gray-400 mr-2" />
                  <p className="text-customer-gray-900">{profile.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="customer-glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full customer-btn-secondary text-left">
                Edit Profile
              </button>
              <button className="w-full customer-btn-secondary text-left">
                Address Book
              </button>
              <button className="w-full customer-btn-secondary text-left">
                Change Password
              </button>
              <button className="w-full customer-btn-secondary text-left">
                Order History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;