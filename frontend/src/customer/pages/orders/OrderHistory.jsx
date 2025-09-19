import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import customerApi from '../../../shared/services/customerApi';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await customerApi.getOrders();
                const data = res?.data?.orders || res?.orders || res?.data || res || [];
                setOrders(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error('Failed loading orders', err);
                setError('Failed to load your orders.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const getStatusIcon = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'shipped': return <Truck className="w-4 h-4 text-blue-600" />;
            case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
            default: return <Clock className="w-4 h-4 text-amber-600" />;
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
                    <button onClick={() => window.location.reload()} className="customer-btn-primary">Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-customer-gray-900">My Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="customer-glass-card p-8 text-center">
                    <Package className="w-10 h-10 text-customer-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-customer-gray-900 mb-2">You have no orders yet</h3>
                    <p className="text-customer-gray-600 mb-4">Start shopping and your orders will appear here.</p>
                    <Link to="/" className="customer-btn-primary">Shop Now</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id || order.id} className="customer-glass-card p-6 rounded-2xl">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-customer-gray-700">
                                        <span className="font-medium">Order</span>
                                        <span className="text-customer-gray-500">#{order._id || order.id}</span>
                                    </div>
                                    <div className="text-sm text-customer-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div className="mt-3 md:mt-0 flex items-center gap-2">
                                    {getStatusIcon(order.status)}
                                    <span className="text-sm font-medium capitalize">{order.status || 'pending'}</span>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <div className="text-customer-gray-500">Items</div>
                                    <div className="font-medium">{order.items?.length || 0}</div>
                                </div>
                                <div>
                                    <div className="text-customer-gray-500">Total</div>
                                    <div className="font-medium">₦{(order.totalAmount || 0).toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-customer-gray-500">Payment</div>
                                    <div className="font-medium capitalize">{order.paymentStatus || 'pending'}</div>
                                </div>
                                <div className="flex items-center md:justify-end">
                                    <Link to={`/account/orders/${order._id || order.id}`} className="customer-btn-secondary">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;


