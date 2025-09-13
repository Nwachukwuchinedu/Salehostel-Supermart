import React, { useState } from 'react';
import { PackagePlus, PackageMinus, Package, Plus, Minus, Save, X } from 'lucide-react';

const StockAdjustments = () => {
  const [adjustments, setAdjustments] = useState([
    { id: 1, product: 'iPhone 15 Pro Max', sku: 'IPH15PM', currentStock: 15, newStock: 15, difference: 0, reason: 'Initial stock' },
    { id: 2, product: 'MacBook Pro 16"', sku: 'MBP16', currentStock: 3, newStock: 5, difference: 2, reason: 'Received shipment' },
    { id: 3, product: 'AirPods Pro', sku: 'APP2023', currentStock: 0, newStock: 0, difference: 0, reason: 'Out of stock' },
  ]);

  const [newAdjustment, setNewAdjustment] = useState({
    product: '',
    sku: '',
    currentStock: 0,
    adjustment: 0,
    reason: ''
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleAdjustmentChange = (field, value) => {
    setNewAdjustment(prev => ({
      ...prev,
      [field]: value,
      newStock: field === 'adjustment' ? prev.currentStock + parseInt(value || 0) : prev.newStock,
      difference: field === 'adjustment' ? parseInt(value || 0) : prev.difference
    }));
  };

  const addAdjustment = () => {
    if (newAdjustment.product && newAdjustment.reason) {
      const adjustment = {
        id: adjustments.length + 1,
        ...newAdjustment,
        newStock: newAdjustment.currentStock + newAdjustment.adjustment,
        difference: newAdjustment.adjustment
      };
      
      setAdjustments([adjustment, ...adjustments]);
      setNewAdjustment({
        product: '',
        sku: '',
        currentStock: 0,
        adjustment: 0,
        reason: ''
      });
      setIsAdding(false);
    }
  };

  const cancelAdjustment = () => {
    setNewAdjustment({
      product: '',
      sku: '',
      currentStock: 0,
      adjustment: 0,
      reason: ''
    });
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="form-label">Product</label>
              <input 
                type="text" 
                className="admin-input"
                placeholder="Product name"
                value={newAdjustment.product}
                onChange={(e) => handleAdjustmentChange('product', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">SKU</label>
              <input 
                type="text" 
                className="admin-input"
                placeholder="SKU"
                value={newAdjustment.sku}
                onChange={(e) => handleAdjustmentChange('sku', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Current Stock</label>
              <input 
                type="number" 
                className="admin-input"
                placeholder="0"
                value={newAdjustment.currentStock}
                onChange={(e) => handleAdjustmentChange('currentStock', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="form-label">Adjustment</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  className="admin-input flex-1"
                  placeholder="0"
                  value={newAdjustment.adjustment}
                  onChange={(e) => handleAdjustmentChange('adjustment', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="lg:col-span-4">
              <label className="form-label">Reason for Adjustment</label>
              <input 
                type="text" 
                className="admin-input"
                placeholder="Enter reason for adjustment"
                value={newAdjustment.reason}
                onChange={(e) => handleAdjustmentChange('reason', e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2">
              <button 
                className="admin-btn-primary flex-1"
                onClick={addAdjustment}
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
                <span className={`font-semibold ${
                  adjustment.difference > 0 ? 'text-green-600' : 
                  adjustment.difference < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {adjustment.difference > 0 ? '+' : ''}{adjustment.difference}
                </span>
              </div>
              <div className="admin-table-cell">
                <span className={`font-semibold ${
                  adjustment.newStock > adjustment.currentStock ? 'text-green-600' : 
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