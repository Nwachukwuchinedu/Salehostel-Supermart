import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowLeft, 
  Download, 
  Printer 
} from 'lucide-react';
import customerApi from '../../../shared/services/customerApi';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getOrder(id);
      const orderData = response.data || response;
      setOrder(orderData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      setError('Failed to load order details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customer-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="customer-glass-card p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchOrderDetails}
            className="customer-btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="customer-glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-customer-gray-900 mb-4">Order Not Found</h2>
          <p className="text-customer-gray-600 mb-6">The order you're looking for doesn't exist or is no longer available.</p>
          <Link to="/account/orders" className="customer-btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // Calculate order totals
  const subtotal = (order.items || []).reduce((sum, item) => 
    sum + ((item.price || item.sellingPrice || 0) * (item.quantity || 1)), 0);
  const shipping = order.shippingCost || order.shipping || 0;
  const tax = order.tax || 0;
  const total = order.totalAmount || order.total || (subtotal + shipping + tax);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <Link to="/account/orders" className="flex items-center text-customer-gray-600 hover:text-customer-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-customer-gray-900">Order Details</h1>
            <p className="text-customer-gray-600">Order #{order._id || order.id} • Placed on {new Date(order.createdAt || order.date).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="customer-btn-secondary flex items-center">
              <Printer className="w-5 h-5 mr-2" />
              Print
            </button>
            <button className="customer-btn-secondary flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="customer-glass-card rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {getStatusIcon(order.status)}
            <div className="ml-3">
              <h2 className="text-xl font-semibold text-customer-gray-900">{getStatusText(order.status)}</h2>
              <p className="text-customer-gray-600">Order #{order._id || order.id}</p>
            </div>
          </div>
          {order.estimatedDelivery && (
            <div className="flex items-center text-customer-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Items</h3>
            <div className="space-y-6">
              {(order.items || []).map((item, index) => (
                <div key={item._id || item.id || index} className="flex border-b border-customer-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img 
                      src={item.image || item.images?.[0] || item.product?.image || item.product?.images?.[0] || "https://placehold.co/200x200"} 
                      alt={item.name || item.product?.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-customer-gray-900">{item.name || item.product?.name}</h4>
                    {item.variant && <p className="text-sm text-customer-gray-600">{item.variant}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-customer-gray-900">
                        ₦{(item.price || item.sellingPrice || item.product?.price || item.product?.sellingPrice || 0).toFixed(2)} × {item.quantity || 1}
                      </div>
                      <div className="font-medium text-customer-gray-900">
                        ₦{((item.price || item.sellingPrice || item.product?.price || item.product?.sellingPrice || 0) * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="customer-glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Subtotal</span>
                <span className="text-customer-gray-900">₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Shipping</span>
                <span className="text-customer-gray-900">₦{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-customer-gray-600">Tax</span>
                <span className="text-customer-gray-900">₦{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-customer-gray-200 pt-3 flex justify-between font-semibold">
                <span className="text-customer-gray-900">Total</span>
                <span className="text-customer-gray-900">₦{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Billing Info */}
        <div>
          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Shipping Address</h3>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-customer-gray-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-customer-gray-700">
                <div className="font-medium">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</div>
                <div>{order.shippingAddress?.street || order.shippingAddress?.address}</div>
                <div>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode || order.shippingAddress?.zipCode}</div>
                <div>{order.shippingAddress?.country}</div>
                {order.shippingAddress?.phone && (
                  <div className="mt-2 flex items-center">
                    <Phone className="w-4 h-4 text-customer-gray-400 mr-2" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Billing Address</h3>
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-customer-gray-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-customer-gray-700">
                <div className="font-medium">{order.billingAddress?.firstName} {order.billingAddress?.lastName}</div>
                <div>{order.billingAddress?.street || order.billingAddress?.address}</div>
                <div>{order.billingAddress?.city}, {order.billingAddress?.state} {order.billingAddress?.postalCode || order.billingAddress?.zipCode}</div>
                <div>{order.billingAddress?.country}</div>
                {order.billingAddress?.phone && (
                  <div className="mt-2 flex items-center">
                    <Phone className="w-4 h-4 text-customer-gray-400 mr-2" />
                    <span>{order.billingAddress.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="customer-glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Payment Method</h3>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-customer-gray-400 mr-3" />
              <div>
                <div className="font-medium text-customer-gray-900">
                  {order.paymentMethod ? order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1) : 'Payment Method'}
                </div>
                <div className={`text-sm ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                  {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : 'Pending'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;