import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Shield, Truck, Check } from 'lucide-react';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    sameAsShipping: true,
  });

  const cartItems = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Smartphone', price: 699.99, quantity: 1, image: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process checkout logic would go here
    console.log('Checkout data:', formData);
    setCurrentStep(4); // Move to confirmation step
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Link to="/cart" className="flex items-center text-customer-gray-600 hover:text-customer-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Cart
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-customer-gray-900 mb-8">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center mb-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step 
                    ? 'bg-customer-primary text-white' 
                    : 'bg-customer-gray-200 text-customer-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step 
                      ? 'bg-customer-primary' 
                      : 'bg-customer-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
            <div className="ml-4 text-customer-gray-600">
              {currentStep === 1 && 'Information'}
              {currentStep === 2 && 'Shipping'}
              {currentStep === 3 && 'Payment'}
            </div>
          </div>
          
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}>
              <div className="customer-glass-card rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold text-customer-gray-900 mb-6">Contact Information</h2>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-customer-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="customer-input w-full"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="customer-glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-customer-gray-900 mb-6">Shipping Address</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-customer-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="customer-input w-full"
                      placeholder="John"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-customer-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="customer-input w-full"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-customer-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="customer-input w-full"
                    placeholder="123 Main St"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="apartment" className="block text-sm font-medium text-customer-gray-700 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="customer-input w-full"
                    placeholder="Apartment or suite number"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-customer-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="customer-input w-full"
                      placeholder="New York"
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
                      value={formData.state}
                      onChange={handleChange}
                      className="customer-input w-full"
                      placeholder="NY"
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
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="customer-input w-full"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-customer-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="customer-select w-full"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-customer-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="customer-input w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Link to="/cart" className="customer-btn-secondary">
                  Back to Cart
                </Link>
                <button type="submit" className="customer-btn-primary">
                  Continue to Shipping
                </button>
              </div>
            </form>
          )}
          
          {/* Step 2: Shipping Method */}
          {currentStep === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }}>
              <div className="customer-glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-customer-gray-900 mb-6">Shipping Method</h2>
                
                <div className="space-y-4">
                  <div className="border border-customer-gray-300 rounded-lg p-4 cursor-pointer hover:border-customer-primary">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standard"
                        name="shipping"
                        value="standard"
                        className="customer-radio"
                        defaultChecked
                      />
                      <label htmlFor="standard" className="ml-3 flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span className="font-medium text-customer-gray-900">Standard Shipping</span>
                          <span className="font-medium">₦15.99</span>
                        </div>
                        <p className="text-customer-gray-600">5-7 business days</p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="border border-customer-gray-300 rounded-lg p-4 cursor-pointer hover:border-customer-primary">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="express"
                        name="shipping"
                        value="express"
                        className="customer-radio"
                      />
                      <label htmlFor="express" className="ml-3 flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span className="font-medium text-customer-gray-900">Express Shipping</span>
                          <span className="font-medium">₦29.99</span>
                        </div>
                        <p className="text-customer-gray-600">2-3 business days</p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="border border-customer-gray-300 rounded-lg p-4 cursor-pointer hover:border-customer-primary">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="overnight"
                        name="shipping"
                        value="overnight"
                        className="customer-radio"
                      />
                      <label htmlFor="overnight" className="ml-3 flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span className="font-medium text-customer-gray-900">Overnight Shipping</span>
                          <span className="font-medium">₦49.99</span>
                        </div>
                        <p className="text-customer-gray-600">1 business day</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(1)}
                  className="customer-btn-secondary"
                >
                  Back to Information
                </button>
                <button type="submit" className="customer-btn-primary">
                  Continue to Payment
                </button>
              </div>
            </form>
          )}
          
          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="customer-glass-card rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold text-customer-gray-900 mb-6">Payment Method</h2>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-5 h-5 text-customer-gray-500 mr-2" />
                    <span className="font-medium text-customer-gray-900">Credit Card</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-customer-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="customer-input w-full"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-customer-gray-700 mb-2">
                        Expiration Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="customer-input w-full"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-customer-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="customer-input w-full"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-customer-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="customer-input w-full"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="border-t border-customer-gray-200 pt-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sameAsShipping"
                      name="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onChange={handleChange}
                      className="customer-checkbox"
                    />
                    <label htmlFor="sameAsShipping" className="ml-2 text-customer-gray-700">
                      Billing address same as shipping address
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(2)}
                  className="customer-btn-secondary"
                >
                  Back to Shipping
                </button>
                <button type="submit" className="customer-btn-primary">
                  Complete Order
                </button>
              </div>
            </form>
          )}
          
          {/* Step 4: Order Confirmation */}
          {currentStep === 4 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-customer-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-customer-primary" />
              </div>
              <h2 className="text-3xl font-bold text-customer-gray-900 mb-4">Thank You for Your Order!</h2>
              <p className="text-customer-gray-600 mb-2">A confirmation email has been sent to {formData.email}</p>
              <p className="text-customer-gray-600 mb-8">Order #ORD-2023-001</p>
              
              <div className="customer-glass-card rounded-2xl p-6 max-w-md mx-auto mb-8">
                <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-customer-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-customer-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-customer-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-customer-gray-200 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="customer-btn-primary">
                  Continue Shopping
                </Link>
                <Link to="/account/orders" className="customer-btn-secondary">
                  View Order Details
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="customer-glass-card rounded-2xl p-6 sticky top-8">
            <h2 className="text-xl font-bold text-customer-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-customer-gray-900">{item.name}</h3>
                    <p className="text-customer-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-customer-gray-900">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Subtotal</span>
                <span className="font-medium">₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Shipping</span>
                <span className="font-medium">₦{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Tax</span>
                <span className="font-medium">₦{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-customer-gray-200 pt-4 flex justify-between">
                <span className="text-customer-gray-900 font-bold">Total</span>
                <span className="text-customer-gray-900 font-bold text-lg">₦{total.toFixed(2)}</span>
              </div>
            </div>
            
            {currentStep < 4 && (
              <div className="bg-customer-primary/5 border border-customer-primary/20 rounded-lg p-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-customer-primary mr-2" />
                  <span className="text-sm text-customer-primary font-medium">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-xs text-customer-gray-600 mt-2">
                  Your payment information is encrypted and secure
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;