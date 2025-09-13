import React, { useState } from 'react';
import { CreditCard, DollarSign, Filter, Search, CheckCircle, XCircle, Calendar, User, FileText } from 'lucide-react';

const RefundManagement = () => {
  const [refunds, setRefunds] = useState([
    { id: 1, orderNumber: 'ORD-2023-001', customer: 'John Doe', date: '2023-06-15', amount: 1299.98, status: 'Pending', reason: 'Product damaged' },
    { id: 2, orderNumber: 'ORD-2023-002', customer: 'Sarah Johnson', date: '2023-06-14', amount: 299.99, status: 'Approved', reason: 'Wrong item received' },
    { id: 3, orderNumber: 'ORD-2023-003', customer: 'Mike Brown', date: '2023-06-12', amount: 899.99, status: 'Processed', reason: 'Changed mind' },
    { id: 4, orderNumber: 'ORD-2023-004', customer: 'Lisa Davis', date: '2023-06-10', amount: 599.99, status: 'Rejected', reason: 'No reason provided' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          refund.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          refund.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? refund.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'text-amber-600 bg-amber-100';
      case 'Approved': return 'text-blue-600 bg-blue-100';
      case 'Processed': return 'text-green-600 bg-green-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Calendar className="w-4 h-4" />;
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Processed': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const approveRefund = (id) => {
    setRefunds(prev => prev.map(refund => 
      refund.id === id ? { ...refund, status: 'Approved' } : refund
    ));
  };

  const rejectRefund = (id) => {
    setRefunds(prev => prev.map(refund => 
      refund.id === id ? { ...refund, status: 'Rejected' } : refund
    ));
  };

  const processRefund = (id) => {
    setRefunds(prev => prev.map(refund => 
      refund.id === id ? { ...refund, status: 'Processed' } : refund
    ));
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-gray-900">Refund Management</h1>
          <p className="text-admin-gray-600">Manage customer refund requests and process payments</p>
        </div>
        <button className="admin-btn-primary">
          <CreditCard className="w-5 h-5 mr-2" />
          New Refund
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-admin-primary/10 text-admin-primary">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-admin-primary font-semibold">Total</span>
          </div>
          <div className="admin-stats-number">24</div>
          <div className="admin-stats-label">Refund Requests</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-amber-100 text-amber-600">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-amber-600 font-semibold">Pending</span>
          </div>
          <div className="admin-stats-number">6</div>
          <div className="admin-stats-label">Pending Requests</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-green-100 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="text-green-600 font-semibold">Processed</span>
          </div>
          <div className="admin-stats-number">15</div>
          <div className="admin-stats-label">Processed Refunds</div>
        </div>

        <div className="admin-stats-card">
          <div className="flex items-center justify-between mb-4">
            <div className="admin-stats-icon bg-red-100 text-red-600">
              <XCircle className="w-6 h-6" />
            </div>
            <span className="text-red-600 font-semibold">Rejected</span>
          </div>
          <div className="admin-stats-number">3</div>
          <div className="admin-stats-label">Rejected Requests</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search refunds..."
              className="admin-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Processed">Processed</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button className="admin-btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Refunds Table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div className="admin-table-row">
            <div className="admin-table-cell font-semibold">Order</div>
            <div className="admin-table-cell font-semibold">Customer</div>
            <div className="admin-table-cell font-semibold">Date</div>
            <div className="admin-table-cell font-semibold">Amount</div>
            <div className="admin-table-cell font-semibold">Reason</div>
            <div className="admin-table-cell font-semibold">Status</div>
            <div className="admin-table-cell font-semibold">Actions</div>
          </div>
        </div>
        <div>
          {filteredRefunds.map(refund => (
            <div key={refund.id} className="admin-table-row">
              <div className="admin-table-cell">
                <p className="font-semibold text-admin-gray-900">{refund.orderNumber}</p>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-admin-gray-400" />
                  <span>{refund.customer}</span>
                </div>
              </div>
              <div className="admin-table-cell">
                {refund.date}
              </div>
              <div className="admin-table-cell font-semibold">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{refund.amount.toFixed(2)}</span>
                </div>
              </div>
              <div className="admin-table-cell">
                <span className="text-sm">{refund.reason}</span>
              </div>
              <div className="admin-table-cell">
                <span className={`status-badge ${getStatusClass(refund.status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(refund.status)}
                    <span>{refund.status}</span>
                  </div>
                </span>
              </div>
              <div className="admin-table-cell">
                <div className="flex items-center gap-2">
                  {refund.status === 'Pending' && (
                    <>
                      <button 
                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg"
                        onClick={() => approveRefund(refund.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        onClick={() => rejectRefund(refund.id)}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {refund.status === 'Approved' && (
                    <button 
                      className="p-2 text-admin-primary hover:bg-admin-primary/10 rounded-lg"
                      onClick={() => processRefund(refund.id)}
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RefundManagement;