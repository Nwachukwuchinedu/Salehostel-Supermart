import React, { useEffect, useMemo, useState } from 'react';
import { PackagePlus, Search, Filter, RefreshCcw, Plus, XCircle, Eye } from 'lucide-react';
import supplierApi from '../../../shared/services/supplierApi';

const Supplies = () => {
    const [supplies, setSupplies] = useState([]);
    const [stats, setStats] = useState({ totalSupplies: 0, pendingSupplies: 0, receivedSupplies: 0, cancelledSupplies: 0, thisMonthValue: 0 });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchAll = async () => {
        try {
            setLoading(true);
            const [listRes, statsRes] = await Promise.all([
                supplierApi.getSupplies({ page, pageSize, status: status || undefined }),
                supplierApi.getSupplyStats(),
            ]);
            setSupplies(listRes.data?.supplies || []);
            setStats(statsRes.data?.stats || {});
        } catch (e) {
            console.error('Failed to load supplies', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, status]);

    const filtered = useMemo(() => {
        if (!search) return supplies;
        const q = search.toLowerCase();
        return supplies.filter(s =>
            (s.productName || '').toLowerCase().includes(q) ||
            (s.quantity || '').toLowerCase().includes(q)
        );
    }, [supplies, search]);

    const createQuick = async () => {
        try {
            setLoading(true);
            // Simple quick-create demo; in real UI use a modal form
            const payload = {
                productName: 'Rice',
                quantity: 'Bag',
                numberOfQuantity: 1,
                pricePerUnit: 1000,
                notes: 'Quick entry',
            };
            await supplierApi.createSupply(payload);
            await fetchAll();
        } catch (e) {
            console.error('Failed to create supply', e);
        } finally {
            setLoading(false);
        }
    };

    const cancelSupply = async (id) => {
        try {
            setLoading(true);
            await supplierApi.cancelSupply(id);
            await fetchAll();
        } catch (e) {
            console.error('Failed to cancel supply', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-admin-gray-900">Supplies</h1>
                    <p className="text-admin-gray-600">Manage supplier supply entries and statuses</p>
                </div>
                <div className="flex gap-3">
                    <button className="admin-btn-secondary" onClick={fetchAll} disabled={loading}>
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Refresh
                    </button>
                    <button className="admin-btn-primary" onClick={createQuick} disabled={loading}>
                        <PackagePlus className="w-5 h-5 mr-2" />
                        Quick Create
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="admin-stats-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">Σ</div>
                        <span className="text-admin-primary font-semibold">Total</span>
                    </div>
                    <div className="admin-stats-number">{stats.totalSupplies || 0}</div>
                    <div className="admin-stats-label">All supplies</div>
                </div>
                <div className="admin-stats-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="admin-stats-icon bg-amber-100 text-amber-600">P</div>
                        <span className="text-amber-600 font-semibold">Pending</span>
                    </div>
                    <div className="admin-stats-number">{stats.pendingSupplies || 0}</div>
                    <div className="admin-stats-label">Awaiting receipt</div>
                </div>
                <div className="admin-stats-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="admin-stats-icon bg-green-100 text-green-600">R</div>
                        <span className="text-green-600 font-semibold">Received</span>
                    </div>
                    <div className="admin-stats-number">{stats.receivedSupplies || 0}</div>
                    <div className="admin-stats-label">Completed</div>
                </div>
                <div className="admin-stats-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="admin-stats-icon bg-red-100 text-red-600">₦</div>
                        <span className="text-red-600 font-semibold">This Month</span>
                    </div>
                    <div className="admin-stats-number">₦{Number(stats.thisMonthValue || 0).toLocaleString()}</div>
                    <div className="admin-stats-label">Value received</div>
                </div>
            </div>

            {/* Filters */}
            <div className="admin-glass-card p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search product/quantity..."
                            className="admin-input pl-10 w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="admin-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="admin-btn-secondary">
                        <Filter className="w-5 h-5 mr-2" />
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="admin-table">
                <div className="admin-table-header">
                    <div className="admin-table-row">
                        <div className="admin-table-cell font-semibold">Product</div>
                        <div className="admin-table-cell font-semibold">Unit</div>
                        <div className="admin-table-cell font-semibold">Qty</div>
                        <div className="admin-table-cell font-semibold">Price/Unit</div>
                        <div className="admin-table-cell font-semibold">Total</div>
                        <div className="admin-table-cell font-semibold">Status</div>
                        <div className="admin-table-cell font-semibold">Date</div>
                        <div className="admin-table-cell font-semibold">Actions</div>
                    </div>
                </div>
                <div>
                    {filtered.map(s => (
                        <div key={s._id} className="admin-table-row">
                            <div className="admin-table-cell">
                                <div className="font-semibold text-admin-gray-900">{s.productName}</div>
                            </div>
                            <div className="admin-table-cell">{s.quantity}</div>
                            <div className="admin-table-cell">{s.numberOfQuantity}</div>
                            <div className="admin-table-cell">₦{Number(s.pricePerUnit).toLocaleString()}</div>
                            <div className="admin-table-cell">₦{Number(s.totalPrice).toLocaleString()}</div>
                            <div className="admin-table-cell">
                                <span className={`status-badge ${s.status === 'pending' ? 'status-warning' : s.status === 'received' ? 'status-success' : 'status-danger'}`}>{s.status}</span>
                            </div>
                            <div className="admin-table-cell">{new Date(s.createdAt).toLocaleDateString()}</div>
                            <div className="admin-table-cell">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-admin-gray-400 hover:text-admin-primary" title="View">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    {s.status === 'pending' && (
                                        <button className="p-2 text-admin-gray-400 hover:text-red-600" title="Cancel" onClick={() => cancelSupply(s._id)}>
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination (simple) */}
            <div className="flex justify-end mt-4 gap-2">
                <button className="admin-btn-secondary" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                <button className="admin-btn-secondary" onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Supplies;
