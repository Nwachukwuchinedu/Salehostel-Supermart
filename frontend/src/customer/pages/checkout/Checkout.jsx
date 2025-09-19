import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Shield, Truck, Check } from 'lucide-react';
import customerApi from '../../../shared/services/customerApi';

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
    country: 'Nigeria',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    sameAsShipping: true,
    shippingMethod: 'standard'
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [createdOrder, setCreatedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      setLoading(true);

      // Fetch cart data
      const cartResponse = await customerApi.getCart();
      const cartData = cartResponse.data || cartResponse;
      setCartItems(Array.isArray(cartData) ? cartData : (cartData.items || []));

      // Fetch user profile for pre-filling form
      try {
        const profileResponse = await customerApi.getProfile();
        const profileData = profileResponse.data || profileResponse;
        setFormData(prev => ({
          ...prev,
          email: profileData.email || '',
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          phone: profileData.phone || ''
        }));

        // Fetch user addresses
        try {
          const addressResponse = await customerApi.getAddresses();
          const addressData = addressResponse.data || addressResponse;
          setAddresses(Array.isArray(addressData) ? addressData : []);

          // Pre-fill with default address if available
          const defaultAddress = Array.isArray(addressData) ? addressData.find(addr => addr.isDefault) : null;
          if (defaultAddress) {
            setFormData(prev => ({
              ...prev,
              address: defaultAddress.street || '',
              apartment: defaultAddress.apartment || '',
              city: defaultAddress.city || '',
              state: defaultAddress.state || '',
              zipCode: defaultAddress.postalCode || defaultAddress.zipCode || '',
              country: defaultAddress.country || 'Nigeria'
            }));
          }
        } catch (addrErr) {
          console.log('Could not fetch addresses:', addrErr);
        }
      } catch (profileErr) {
        console.log('Could not fetch profile:', profileErr);
      }

      setError(null);
    } catch (err) {
      console.error('Failed to fetch checkout data:', err);
      setError('Failed to load checkout data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddressSelect = (address) => {
    setFormData(prev => ({
      ...prev,
      address: address.street || '',
      apartment: address.apartment || '',
      city: address.city || '',
      state: address.state || '',
      zipCode: address.postalCode || address.zipCode || '',
      country: address.country || 'Nigeria'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          product: item.product?._id || item.product?.id || item._id || item.id,
          quantity: item.quantity,
          price: item.price || item.sellingPrice || item.product?.price || item.product?.sellingPrice,
          unitType: item.unitType || item.selectedUnitType || item.product?.unitType
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone
        },
        billingAddress: formData.sameAsShipping ? {
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone
        } : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone
        },
        paymentMethod: 'card',
        shippingMethod: formData.shippingMethod,
        notes: ''
      };

      // Create order
      const response = await customerApi.createOrder(orderData);
      const orderPayload = response?.data?.order || response?.order || response?.data || response;
      setCreatedOrder(orderPayload);

      // Clear cart after successful order
      try {
        await customerApi.clearCart();
      } catch (clearErr) {
        console.log('Cart clear failed (non-blocking):', clearErr);
      }
      setCartItems([]);

      // Move to confirmation step
      setCurrentStep(4);
    } catch (err) {
      console.error('Checkout failed:', err);
      setError('Checkout failed. Please try again.');
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || item.sellingPrice || item.product?.price || item.product?.sellingPrice || 0) * item.quantity), 0);
  const shipping = formData.shippingMethod === 'express' ? 29.99 :
    formData.shippingMethod === 'overnight' ? 49.99 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (loading && cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customer-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="customer-glass-card p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchCheckoutData}
            className="customer-btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step
                  ? 'bg-customer-primary text-white'
                  : 'bg-customer-gray-200 text-customer-gray-500'
                  }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${currentStep > step
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

                {addresses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-customer-gray-900 mb-3">Select Saved Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div
                          key={address._id || address.id}
                          className="border border-customer-gray-300 rounded-lg p-4 cursor-pointer hover:border-customer-primary"
                          onClick={() => handleAddressSelect(address)}
                        >
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-customer-gray-500 mr-2" />
                            <div>
                              <p className="font-medium">{address.firstName} {address.lastName}</p>
                              <p className="text-sm text-customer-gray-600">{address.street}</p>
                              <p className="text-sm text-customer-gray-600">{address.city}, {address.state}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                      placeholder="Lagos"
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
                      placeholder="Lagos"
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
                      placeholder="100001"
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
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
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
                    placeholder="+234 801 234 5678"
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
                  <div
                    className="border border-customer-gray-300 rounded-lg p-4 cursor-pointer hover:border-customer-primary"
                    onClick={() => setFormData(prev => ({ ...prev, shippingMethod: 'standard' }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standard"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleChange}
                        className="customer-radio"
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

                  <div
                    className="border border-customer-gray-300 rounded-lg p-4 cursor-pointer hover:border-customer-primary"
                    onClick={() => setFormData(prev => ({ ...prev, shippingMethod: 'express' }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="express"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleChange}
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

                  <div
                    className="border border-customer-gray-300 rounded-lg p-4 cursor-pointer hover:border-customer-primary"
                    onClick={() => setFormData(prev => ({ ...prev, shippingMethod: 'overnight' }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="overnight"
                        name="shippingMethod"
                        value="overnight"
                        checked={formData.shippingMethod === 'overnight'}
                        onChange={handleChange}
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
                <button
                  type="submit"
                  className="customer-btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Complete Order'}
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
              <p className="text-customer-gray-600 mb-8">Order details will be available in your account</p>

              <div className="customer-glass-card rounded-2xl p-6 max-w-md mx-auto mb-8">
                <h3 className="text-lg font-semibold text-customer-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-customer-gray-600">Subtotal</span>
                    <span>₦{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-customer-gray-600">Shipping</span>
                    <span>₦{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-customer-gray-600">Tax</span>
                    <span>₦{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-customer-gray-200 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₦{total.toFixed(2)}</span>
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
                <div key={item._id || item.id} className="flex">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.image || item.images?.[0] || item.product?.image || item.product?.images?.[0] || "https://placehold.co/300x300"}
                      alt={item.name || item.product?.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-customer-gray-900">{item.name || item.product?.name}</h3>
                    <p className="text-customer-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-customer-gray-900">
                    ₦{((item.price || item.sellingPrice || item.product?.price || item.product?.sellingPrice || 0) * item.quantity).toFixed(2)}
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