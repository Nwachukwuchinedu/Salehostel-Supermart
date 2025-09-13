import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Search, 
  ArrowLeft 
} from 'lucide-react';

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample tracking data
  const trackingData = {
    trackingNumber: 'TRK123456789',
    status: 'in_transit',
    estimatedDelivery: '2023-06-20',
    progress: [
      { 
        id: 1, 
        status: 'order_placed', 
        title: 'Order Placed', 
        description: 'Your order has been placed successfully', 
        date: '2023-06-15', 
        time: '10:30 AM', 
        completed: true 
      },
      { 
        id: 2, 
        status: 'processing', 
        title: 'Processing', 
        description: 'We are preparing your order for shipment', 
        date: '2023-06-16', 
        time: '2:15 PM', 
        completed: true 
      },
      { 
        id: 3, 
        status: 'shipped', 
        title: 'Shipped', 
        description: 'Your order has been shipped', 
        date: '2023-06-17', 
        time: '9:45 AM', 
        completed: true 
      },
      { 
        id: 4, 
        status: 'in_transit', 
        title: 'In Transit', 
        description: 'Your order is on the way', 
        date: null, 
        time: null, 
        completed: false 
      },
      { 
        id: 5, 
        status: 'out_for_delivery', 
        title: 'Out for Delivery', 
        description: 'Your order is out for delivery', 
        date: null, 
        time: null, 
        completed: false 
      },
      { 
        id: 6, 
        status: 'delivered', 
        title: 'Delivered', 
        description: 'Your order has been delivered', 
        date: null, 
        time: null, 
        completed: false 
      }
    ],
    currentLocation: 'Distribution Center - New York, NY',
    estimatedTime: '2-3 business days'
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (trackingNumber === trackingData.trackingNumber) {
        setOrder(trackingData);
      } else {
        setOrder(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    
    if (status === 'in_transit') {
      return <Truck className="w-6 h-6 text-customer-primary" />;
    }
    
    return <div className="w-6 h-6 rounded-full border-2 border-customer-gray-300" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <Link to="/account/orders" className="flex items-center text-customer-gray-600 hover:text-customer-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-customer-gray-900 mb-2">Track Your Order</h1>
        <p className="text-customer-gray-600">Enter your tracking number to get real-time updates</p>
      </div>

      {/* Tracking Form */}
      <div className="customer-glass-card rounded-2xl p-6 mb-8">
        <form onSubmit={handleTrackOrder} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter tracking number..."
                className="customer-input pl-10 w-full"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="customer-btn-primary whitespace-nowrap"
              disabled={isLoading}
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </button>
          </div>
        </form>
      </div>

      {order ? (
        <div>
          {/* Order Status */}
          <div className="customer-glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-customer-gray-900">Order #{order.trackingNumber}</h2>
                <p className="text-customer-gray-600">Estimated delivery: {order.estimatedDelivery}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="customer-badge-primary">In Transit</span>
              </div>
            </div>

            <div className="flex items-center text-customer-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Current location: {order.currentLocation}</span>
            </div>

            <div className="flex items-center text-customer-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>Estimated time: {order.estimatedTime}</span>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className="customer-glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-customer-gray-900 mb-6">Tracking Progress</h3>
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-customer-gray-200 transform -translate-x-1/2"></div>
              
              <div className="space-y-8">
                {order.progress.map((step, index) => (
                  <div key={step.id} className="relative flex">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center z-10">
                      {getStatusIcon(step.status, step.completed)}
                    </div>
                    <div className="ml-4 pb-8">
                      <h4 className={`font-medium ${step.completed ? 'text-customer-gray-900' : 'text-customer-gray-500'}`}>
                        {step.title}
                      </h4>
                      <p className={`text-sm ${step.completed ? 'text-customer-gray-600' : 'text-customer-gray-400'}`}>
                        {step.description}
                      </p>
                      {step.date && (
                        <p className="text-xs text-customer-gray-500 mt-1">
                          {step.date} at {step.time}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : order === null && trackingNumber && !isLoading ? (
        <div className="customer-glass-card rounded-2xl p-12 text-center">
          <Package className="w-16 h-16 text-customer-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-customer-gray-900 mb-2">Order Not Found</h3>
          <p className="text-customer-gray-600 mb-6">
            We couldn't find an order with tracking number: <span className="font-mono">{trackingNumber}</span>
          </p>
          <p className="text-customer-gray-500 text-sm">
            Please check your tracking number and try again.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default TrackOrder;