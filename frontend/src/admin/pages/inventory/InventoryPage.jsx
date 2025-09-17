import React, { useState, useEffect } from "react";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import InventoryTable from "../../components/tables/InventoryTable";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const statusFilters = [
    { value: "", label: "All Items" },
    { value: "in_stock", label: "In Stock" },
    { value: "low_stock", label: "Low Stock" },
    { value: "out_of_stock", label: "Out of Stock" },
  ];

  useEffect(() => {
    fetchInventory();
  }, [currentPage, searchTerm, filterStatus]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock inventory data
      const mockInventory = [
        {
          id: 1,
          productName: "Premium Wireless Headphones",
          variant: "Black",
          sku: "AT-WH-001-BLK",
          currentStock: 25,
          reservedStock: 3,
          minimumStock: 10,
          image: "/api/placeholder/60/60",
          lastUpdated: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          productName: "Gaming Mechanical Keyboard",
          variant: "RGB",
          sku: "KB-GM-002-RGB",
          currentStock: 0,
          reservedStock: 0,
          minimumStock: 5,
          image: "/api/placeholder/60/60",
          lastUpdated: "2024-01-14T14:20:00Z",
        },
        {
          id: 3,
          productName: "Cotton T-Shirt",
          variant: "Medium, Blue",
          sku: "TS-CT-003-M-BLU",
          currentStock: 8,
          reservedStock: 2,
          minimumStock: 15,
          image: "/api/placeholder/60/60",
          lastUpdated: "2024-01-13T09:15:00Z",
        },
        {
          id: 4,
          productName: "Smart Home Hub",
          variant: "Default",
          sku: "SH-HB-004",
          currentStock: 45,
          reservedStock: 5,
          minimumStock: 10,
          image: "/api/placeholder/60/60",
          lastUpdated: "2024-01-12T16:45:00Z",
        },
        {
          id: 5,
          productName: "Yoga Mat Premium",
          variant: "Purple",
          sku: "YM-PR-005-PUR",
          currentStock: 12,
          reservedStock: 1,
          minimumStock: 20,
          image: "/api/placeholder/60/60",
          lastUpdated: "2024-01-11T11:30:00Z",
        },
      ];

      // Apply filters
      let filteredInventory = mockInventory;

      if (searchTerm) {
        filteredInventory = filteredInventory.filter(
          (item) =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterStatus) {
        filteredInventory = filteredInventory.filter((item) => {
          const available = item.currentStock - (item.reservedStock || 0);
          switch (filterStatus) {
            case "out_of_stock":
              return available <= 0;
            case "low_stock":
              return available > 0 && available <= item.minimumStock;
            case "in_stock":
              return available > item.minimumStock;
            default:
              return true;
          }
        });
      }

      setInventory(filteredInventory);
      setTotalPages(Math.ceil(filteredInventory.length / 10));
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (itemId, newStock) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setInventory((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                currentStock: newStock,
                lastUpdated: new Date().toISOString(),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
  };

  const handleViewHistory = (item) => {
    // Navigate to inventory history view
    console.log("View history for:", item);
  };

  const handleBulkUpdate = (selectedItems) => {
    console.log("Bulk update for items:", selectedItems);
    // Implement bulk update logic
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("");
    setCurrentPage(1);
  };

  const getInventoryStats = () => {
    const totalItems = inventory.length;
    const outOfStock = inventory.filter(
      (item) => item.currentStock - (item.reservedStock || 0) <= 0
    ).length;
    const lowStock = inventory.filter((item) => {
      const available = item.currentStock - (item.reservedStock || 0);
      return available > 0 && available <= item.minimumStock;
    }).length;
    const inStock = totalItems - outOfStock - lowStock;

    return { totalItems, outOfStock, lowStock, inStock };
  };

  const stats = getInventoryStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor and manage your product inventory levels
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export Report
          </Button>
          <Button variant="primary">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Import Stock
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalItems}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Stock</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.inStock}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.lowStock}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.outOfStock}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Inventory
            </label>
            <Input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Status
            </label>
            <select
              value={filterStatus}
              onChange={handleStatusFilter}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <InventoryTable
        inventory={inventory}
        loading={loading}
        onUpdateStock={handleUpdateStock}
        onViewHistory={handleViewHistory}
        onBulkUpdate={handleBulkUpdate}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default InventoryPage;
