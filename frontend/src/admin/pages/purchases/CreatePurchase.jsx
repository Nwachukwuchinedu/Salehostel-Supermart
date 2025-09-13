import React, { useState } from 'react';
import { Plus, Save, X, Trash2, Package, DollarSign, Calendar, User, Building } from 'lucide-react';

const CreatePurchase = () => {
  const [purchaseData, setPurchaseData] = useState({
    supplier: '',
    poNumber: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: '',
    notes: ''
  });

  const [items, setItems] = useState([
    { id: 1, product: '', sku: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const [suppliers] = useState([
    { id: 1, name: 'Apple Inc.', contact: 'John Smith', email: 'john@apple.com' },
    { id: 2, name: 'Samsung Electronics', contact: 'Sarah Johnson', email: 'sarah@samsung.com' },
    { id: 3, name: 'Dell Technologies', contact: 'Mike Brown', email: 'mike@dell.com' },
    { id: 4, name: 'Sony Corporation', contact: 'Lisa Davis', email: 'lisa@sony.com' },
  ]);

  const handlePurchaseDataChange = (field, value) => {
    setPurchaseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems(prev => [
      ...prev,
      { id: prev.length + 1, product: '', sku: '', quantity: 1, unitPrice: 0, total: 0 }
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Create Purchase Order</h1>
          <p className="text-admin-gray-600">Create a new purchase order for supplier</p>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-secondary">
            <X className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button className="admin-btn-primary">
            <Save className="w-5 h-5 mr-2" />
            Save Purchase Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Purchase Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-glass-card p-6">
            <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Purchase Order Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Supplier</label>
                <select 
                  className="admin-select"
                  value={purchaseData.supplier}
                  onChange={(e) => handlePurchaseDataChange('supplier', e.target.value)}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">PO Number</label>
                <input 
                  type="text" 
                  className="admin-input"
                  placeholder="PO-2023-XXX"
                  value={purchaseData.poNumber}
                  onChange={(e) => handlePurchaseDataChange('poNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Order Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input 
                    type="date" 
                    className="admin-input pl-10"
                    value={purchaseData.orderDate}
                    onChange={(e) => handlePurchaseDataChange('orderDate', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Expected Delivery</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                  <input 
                    type="date" 
                    className="admin-input pl-10"
                    value={purchaseData.expectedDelivery}
                    onChange={(e) => handlePurchaseDataChange('expectedDelivery', e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Notes</label>
                <textarea 
                  className="admin-textarea"
                  rows="3"
                  placeholder="Additional notes for this purchase order"
                  value={purchaseData.notes}
                  onChange={(e) => handlePurchaseDataChange('notes', e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="admin-glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-admin-gray-900">Items</h3>
              <button 
                className="admin-btn-primary"
                onClick={addItem}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Item
              </button>
            </div>
            
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-12 md:col-span-4">
                    <label className="form-label">Product</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      placeholder="Product name"
                      value={item.product}
                      onChange={(e) => handleItemChange(item.id, 'product', e.target.value)}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="form-label">SKU</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      placeholder="SKU"
                      value={item.sku}
                      onChange={(e) => handleItemChange(item.id, 'sku', e.target.value)}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="form-label">Quantity</label>
                    <input 
                      type="number" 
                      className="admin-input"
                      placeholder="Qty"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="form-label">Unit Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
                      <input 
                        type="number" 
                        className="admin-input pl-10"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="col-span-5 md:col-span-1">
                    <label className="form-label">Total</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={`$${item.total.toFixed(2)}`}
                      readOnly
                    />
                  </div>
                  <div className="col-span-1">
                    <button 
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="admin-glass-card p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-admin-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-admin-gray-600">Subtotal</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-admin-gray-600">Tax (8%)</span>
                <span className="font-medium">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="border-t border-admin-gray-200/50 pt-3 flex justify-between">
                <span className="text-admin-gray-900 font-semibold">Total</span>
                <span className="text-admin-gray-900 font-bold text-lg">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <button className="admin-btn-primary w-full mb-3">
              <Save className="w-5 h-5 mr-2" />
              Save Purchase Order
            </button>
            
            <button className="admin-btn-secondary w-full">
              <X className="w-5 h-5 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchase;