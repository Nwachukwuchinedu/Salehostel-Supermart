import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Package, ShoppingCart, PackagePlus, PackageMinus, Filter, Calendar, Search } from 'lucide-react';
import adminApi from '../../../shared/services/adminApi';

const StockMovements = () => {
  const [movements, setMovements] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const loadMovements = async () => {
      try {
        const res = await adminApi.getStockMovements();
        const data = res.data?.movements || [];
        const rows = data.map(m => ({
          id: m._id,
          product: m.product?.name || 'Product',
          sku: m.product?._id?.slice(-6) || '',
          type: (m.type || '').toUpperCase().includes('OUT') ? 'OUT' : (m.type || '').toUpperCase().includes('IN') ? 'IN' : 'ADJUST',
          quantity: m.quantity,
          date: new Date(m.createdAt).toLocaleDateString(),
          user: `${m.createdBy?.firstName || ''} ${m.createdBy?.lastName || ''}`.trim() || '—',
          reference: `${m.referenceType || ''}-${String(m.referenceId || '').slice(-6)}`
        }));
        setMovements(rows);
      } catch (e) {
        console.error('Failed loading stock movements', e);
      }
    };
    loadMovements();
  }, []);

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter ? movement.date === dateFilter : true;
    const matchesType = typeFilter ? movement.type === typeFilter : true;

    return matchesSearch && matchesDate && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'IN': return <PackagePlus className="w-5 h-5 text-green-500" />;
      case 'OUT': return <PackageMinus className="w-5 h-5 text-red-500" />;
      default: return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'IN': return 'Stock In';
      case 'OUT': return 'Stock Out';
      default: return 'Adjustment';
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'IN': return 'text-green-600 bg-green-100';
      case 'OUT': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Stock Movements</h1>
          <p className="text-admin-gray-600">Track all inventory movements and adjustments</p>
        </div>
        <button className="admin-btn-primary">
          <PackagePlus className="w-5 h-5 mr-2" />
          Add Movement
        </button>
      </div>

      {/* Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movements..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input
              type="date"
              className="admin-input pl-10 w-full"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <select
            className="admin-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Movements Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Product</div>
            <div className="admin-table-cell font-semibold">Type</div>
            <div className="admin-table-cell font-semibold">Quantity</div>
            <div className="admin-table-cell font-semibold">Date</div>
            <div className="admin-table-cell font-semibold">User</div>
            <div className="admin-table-cell font-semibold">Reference</div>
          </div>
        </div>
        <div>
          {filteredMovements.map(movement => (
            <div key={movement.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div>
                  <p className="font-semibold text-admin-gray-900">{movement.product}</p>
                  <p className="text-sm text-admin-gray-600">{movement.sku}</p>
                </div>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  {getTypeIcon(movement.type)}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeClass(movement.type)}`}>
                    {getTypeText(movement.type)}
                  </span>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className={`font-semibold ${movement.type === 'IN' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {movement.type === 'OUT' ? '-' : '+'}{movement.quantity}
                </span>
              </div>
              <div className="admin-table-cell">
                {movement.date}
              </div>
              <div className="admin-table-cell">
                {movement.user}
              </div>
              <div className="admin-table-cell">
                <span className="text-admin-primary font-medium">{movement.reference}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockMovements;