import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Camera, ArrowLeft } from 'lucide-react';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic would go here
    console.log('Profile updated:', profile);
    // Navigate back to profile page
    navigate('/account/profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Link to="/account/profile" className="flex items-center text-customer-gray-600 hover:text-customer-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Profile
        </Link>
      </div>

      <div className="customer-glass-card rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-customer-gray-900 mb-8">Edit Profile</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-customer-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-customer-primary" />
              </div>
              <button 
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-customer-primary rounded-full flex items-center justify-center"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-customer-gray-900">{profile.name}</h2>
              <p className="text-customer-gray-600">Update your profile information</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-customer-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="customer-input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-customer-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="customer-input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-customer-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="customer-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-customer-gray-700 mb-2">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={profile.country}
                onChange={handleChange}
                className="customer-select w-full"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="address" className="block text-sm font-medium text-customer-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="customer-input w-full"
              placeholder="Street address"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-customer-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="customer-input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-customer-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="customer-input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-customer-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={profile.zipCode}
                onChange={handleChange}
                className="customer-input w-full"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Link to="/account/profile" className="customer-btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="customer-btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;