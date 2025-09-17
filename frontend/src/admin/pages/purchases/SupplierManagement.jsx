import React, { useState, useEffect } from "react";
import {
  Building,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import adminApi from "../../../shared/services/adminApi";
import { formatDate } from "../../../shared/utils/formatters";
import Button from "../../../shared/ui/components/Button";
import Badge from "../../../shared/ui/components/Badge";
import Modal from "../../../shared/ui/components/Modal";
import Spinner from "../../../shared/ui/components/Spinner";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getSuppliers();
      const supplierData = response.data?.suppliers || [];
      setSuppliers(supplierData);

      // Calculate stats
      const total = supplierData.length;
      const active = supplierData.filter((s) => s.status === "active").length;
      const pending = supplierData.filter(
        (s) => s.verificationStatus === "pending"
      ).length;
      const suspended = supplierData.filter(
        (s) => s.status === "suspended"
      ).length;

      setStats({ total, active, pending, suspended });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySupplier = async (supplierId, action) => {
    try {
      if (action === "verify") {
        await adminApi.verifySupplier(supplierId, {
          status: "verified",
          notes: "Supplier verified by admin",
        });
      } else if (action === "suspend") {
        await adminApi.suspendSupplier(supplierId, {
          reason: "Administrative action",
          notes: "Supplier suspended by admin",
        });
      }
      fetchSuppliers(); // Refresh data
      setShowVerificationModal(false);
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await adminApi.deleteSupplier(supplierId);
      fetchSuppliers(); // Refresh data
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? supplier.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "suspended":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getVerificationVariant = (status) => {
    switch (status) {
      case "verified":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Supplier Management
          </h1>
          <p className="text-gray-600">
            Manage your suppliers and vendor relationships
          </p>
        </div>
        <Button onClick={() => setShowSupplierModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 font-semibold">Total</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-gray-600 text-sm">Suppliers</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 font-semibold">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
          <div className="text-gray-600 text-sm">Active Suppliers</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-amber-600 font-semibold">Pending</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.pending}
          </div>
          <div className="text-gray-600 text-sm">Pending Verification</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-red-600 font-semibold">Suspended</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.suspended}
          </div>
          <div className="text-gray-600 text-sm">Suspended</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <Button variant="outline">
            <Search className="w-5 h-5 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {supplier.businessName}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{supplier.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{supplier.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{supplier.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={getVerificationVariant(
                          supplier.verificationStatus
                        )}
                      >
                        {supplier.verificationStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(supplier.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedSupplier(supplier);
                            setShowSupplierModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {supplier.verificationStatus === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedSupplier(supplier);
                              setShowVerificationModal(true);
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteSupplier(supplier._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Building className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No suppliers found
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm
                        ? "No suppliers match your search."
                        : "Start by adding your first supplier."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Modal */}
      <Modal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        title="Verify Supplier"
      >
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Do you want to verify "{selectedSupplier?.businessName}"?
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowVerificationModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                handleVerifySupplier(selectedSupplier?._id, "suspend")
              }
            >
              Suspend
            </Button>
            <Button
              onClick={() =>
                handleVerifySupplier(selectedSupplier?._id, "verify")
              }
            >
              Verify
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SupplierManagement;
