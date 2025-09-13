import React, { useState } from 'react';
import { ArrowUpDown, Package, ShoppingCart, PackagePlus, PackageMinus, Filter, Calendar, Search } from 'lucide-react';

const StockMovements = () => {
  const [movements, setMovements] = useState([
    { id: 1, product: 'iPhone 15 Pro Max', sku: 'IPH15PM', type: 'IN', quantity: 20, date: '2023-06-15', user: 'John Admin', reference: 'PO-2023-001' },
    { id: 2, product: 'MacBook Pro 16"', sku: 'MBP16', type: 'OUT', quantity: 5, date: '2023-06-14', user: 'Sarah Manager', reference: 'SO-2023-045' },
    { id: 3, product: 'AirPods Pro', sku: 'APP2023', type: 'IN', quantity: 50, date: '2023-06-12', user: 'Mike Supervisor', reference: 'PO-2023-002' },
    { id: 4, product: 'Samsung Galaxy S24', sku: 'SGS24', type: 'OUT', quantity: 8, date: '2023-06-10', user: 'Lisa Sales', reference: 'SO-2023-044' },
    { id: 5, product: 'iPad Air', sku: 'IPDA2023', type: 'IN', quantity: 15, date: '2023-06-08', user: 'John Admin', reference: 'PO-2023-003' },
    { id: 6, product: 'Dell XPS 13', sku: 'DXPS13', type: 'OUT', quantity: 3, date: '2023-06-05', user: 'Sarah Manager', reference: 'SO-2023-043' },
    { id: 7, product: 'Sony WH-1000XM5', sku: 'SWHXM5', type: 'IN', quantity: 25, date: '2023-06-01', user: 'Mike Supervisor', reference: 'PO-2023-004' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

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
                <span className={`font-semibold ${
                  movement.type === 'IN' ? 'text-green-600' : 'text-red-600'
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