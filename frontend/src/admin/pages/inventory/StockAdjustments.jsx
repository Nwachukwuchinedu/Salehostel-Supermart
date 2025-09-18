import React, { useEffect, useMemo, useState } from 'react';
import { PackagePlus, PackageMinus, Package, Plus, Minus, Save, X, Search } from 'lucide-react';
import adminApi from '../../../shared/services/adminApi';
import api from '../../../shared/services/api';

const StockAdjustments = () => {
  const [adjustments, setAdjustments] = useState([]);

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('');

  const [newAdjustment, setNewAdjustment] = useState({
    currentStock: 0,
    adjustment: 0,
    reason: ''
  });

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/public/products');
        setProducts(res.data?.products || []);
      } catch (e) {
        console.error('Failed to load products', e);
      }
    };
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const onSelectProduct = (p) => {
    setSelectedProduct(p);
    setSelectedUnit('');
    setNewAdjustment({ currentStock: 0, adjustment: 0, reason: '' });
  };

  const onSelectUnit = (u) => {
    setSelectedUnit(u.unitType);
    setNewAdjustment(prev => ({ ...prev, currentStock: u.stockQuantity }));
  };

  const addAdjustment = async () => {
    if (!selectedProduct || !selectedUnit) return;
    const newQty = (newAdjustment.currentStock || 0) + (newAdjustment.adjustment || 0);
    if (newQty < 0) return;
    if (!newAdjustment.reason) return;

    try {
      setLoading(true);
      await adminApi.adjustStock({
        productId: selectedProduct._id,
        unitType: selectedUnit,
        quantity: newQty,
        reason: newAdjustment.reason,
      });
      setAdjustments([{
        id: Date.now(),
        product: selectedProduct.name,
        sku: selectedProduct._id.slice(-6),
        currentStock: newAdjustment.currentStock,
        newStock: newQty,
        difference: newQty - (newAdjustment.currentStock || 0),
        reason: newAdjustment.reason,
      }, ...adjustments]);
      setIsAdding(false);
      setSelectedProduct(null);
      setSelectedUnit('');
      setNewAdjustment({ currentStock: 0, adjustment: 0, reason: '' });
    } catch (e) {
      console.error('Failed to adjust stock', e);
    } finally {
      setLoading(false);
    }
  };

  const cancelAdjustment = () => {
    setSelectedProduct(null);
    setSelectedUnit('');
    setNewAdjustment({ currentStock: 0, adjustment: 0, reason: '' });
    setIsAdding(false);
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Stock Adjustments</h1>
          <p className="text-admin-gray-600">Manually adjust inventory levels and track changes</p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => setIsAdding(true)}
        >
          <PackagePlus className="w-5 h-5 mr-2" />
          New Adjustment
        </button>
      </div>

      {/* Add Adjustment Form */}
      {isAdding && (
        <div className="admin-glass-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Add New Stock Adjustment</h3>

          {/* Product Search */}
          <div className="mb-4">
            <label className="form-label">Product</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
              <input
                type="text"
                className="admin-input pl-10 w-full"
                placeholder="Search product by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {query && (
              <div className="mt-2 max-h-48 overflow-auto border rounded-lg">
                {filteredProducts.slice(0, 10).map(p => (
                  <button key={p._id} className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={() => onSelectProduct(p)}>
                    {p.name}
                  </button>
                ))}
                {filteredProducts.length === 0 && <div className="px-3 py-2 text-sm text-gray-500">No products found</div>}
              </div>
            )}
          </div>

          {/* Unit Selection */}
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Unit</label>
                <select className="admin-select w-full" value={selectedUnit} onChange={(e) => onSelectUnit(selectedProduct.units.find(u => u.unitType === e.target.value) || { unitType: '', stockQuantity: 0 })}>
                  <option value="">Select unit</option>
                  {selectedProduct.units.map(u => (
                    <option key={u.unitType} value={u.unitType}>{u.unitType}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Current Stock</label>
                <input type="number" className="admin-input" value={newAdjustment.currentStock} readOnly />
              </div>
            </div>
          )}

          {/* Adjustment Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Adjustment</label>
              <input
                type="number"
                className="admin-input"
                placeholder="0"
                value={newAdjustment.adjustment}
                onChange={(e) => setNewAdjustment(prev => ({ ...prev, adjustment: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="lg:col-span-2">
              <label className="form-label">Reason for Adjustment</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Enter reason for adjustment"
                value={newAdjustment.reason}
                onChange={(e) => setNewAdjustment(prev => ({ ...prev, reason: e.target.value }))}
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                className="admin-btn-primary flex-1"
                onClick={addAdjustment}
                disabled={loading || !selectedProduct || !selectedUnit || !newAdjustment.reason}
              >
                <Save className="w-5 h-5 mr-2" />
                Save
              </button>
              <button
                className="admin-btn-secondary p-3"
                onClick={cancelAdjustment}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adjustments Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Product</div>
            <div className="admin-table-cell font-semibold">Current Stock</div>
            <div className="admin-table-cell font-semibold">Adjustment</div>
            <div className="admin-table-cell font-semibold">New Stock</div>
            <div className="admin-table-cell font-semibold">Reason</div>
            <div className="admin-table-cell font-semibold">Date</div>
          </div>
        </div>
        <div>
          {adjustments.map(adjustment => (
            <div key={adjustment.id} className="admin-table-row">
              <div className="admin-table-cell">
                <div>
                  <p className="font-semibold text-admin-gray-900">{adjustment.product}</p>
                  <p className="text-sm text-admin-gray-600">{adjustment.sku}</p>
                </div>
              </div>
              <div className="admin-table-cell">
                {adjustment.currentStock}
              </div>
              <div className="admin-table-cell">
                <span className={`font-semibold ${adjustment.difference > 0 ? 'text-green-600' :
                    adjustment.difference < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                  {adjustment.difference > 0 ? '+' : ''}{adjustment.difference}
                </span>
              </div>
              <div className="admin-table-cell">
                <span className={`font-semibold ${adjustment.newStock > adjustment.currentStock ? 'text-green-600' :
                    adjustment.newStock < adjustment.currentStock ? 'text-red-600' : 'text-gray-600'
                  }`}>
                  {adjustment.newStock}
                </span>
              </div>
              <div className="admin-table-cell">
                {adjustment.reason}
              </div>
              <div className="admin-table-cell">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockAdjustments;