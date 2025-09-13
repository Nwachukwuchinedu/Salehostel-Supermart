import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, MapPin, Home, Building, Mail, Phone } from 'lucide-react';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'Home',
      recipient: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'office',
      name: 'Office',
      recipient: 'John Doe',
      street: '456 Business Ave, Suite 100',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ]);

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5 text-customer-primary" />;
      case 'office':
        return <Building className="w-5 h-5 text-customer-primary" />;
      default:
        return <MapPin className="w-5 h-5 text-customer-primary" />;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'office':
        return 'Office';
      default:
        return 'Other';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-customer-gray-900">Address Book</h1>
          <p className="text-customer-gray-600">Manage your shipping addresses</p>
        </div>
        <Link to="/account/address/add" className="customer-btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Address
        </Link>
      </div>

      {addresses.length === 0 ? (
        <div className="customer-glass-card rounded-2xl p-12 text-center">
          <MapPin className="w-16 h-16 text-customer-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-customer-gray-900 mb-2">No addresses saved</h3>
          <p className="text-customer-gray-600 mb-6">Add your first address to get started</p>
          <Link to="/account/address/add" className="customer-btn-primary">
            Add Address
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="customer-glass-card rounded-2xl p-6 relative">
              {address.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="bg-customer-primary text-white text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                </div>
              )}
              
              <div className="flex items-start mb-4">
                <div className="mr-3 mt-1">
                  {getTypeIcon(address.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-customer-gray-900">{address.name}</h3>
                  <p className="text-sm text-customer-gray-600">{getTypeText(address.type)}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-customer-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-customer-gray-700">
                    <div>{address.recipient}</div>
                    <div>{address.street}</div>
                    <div>{address.city}, {address.state} {address.zipCode}</div>
                    <div>{address.country}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-customer-gray-400 mr-2" />
                  <span className="text-customer-gray-700">{address.phone}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Link 
                  to={`/account/address/edit/${address.id}`} 
                  className="flex items-center text-customer-primary hover:text-customer-secondary"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Link>
                <button 
                  onClick={() => handleDeleteAddress(address.id)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBook;