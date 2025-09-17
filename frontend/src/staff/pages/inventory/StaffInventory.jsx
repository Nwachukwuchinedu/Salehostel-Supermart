import React, { useState, useEffect } from "react";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import Spinner from "../../../shared/ui/components/Spinner";

const StaffInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [scanMode, setScanMode] = useState(false);
  const [scannedCode, setScannedCode] = useState("");

  const locations = ["Warehouse A", "Warehouse B", "Store Floor", "Backroom"];

  useEffect(() => {
    fetchInventory();
  }, [searchTerm, filterLocation]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockInventory = [
        {
          id: 1,
          productName: "Wireless Headphones",
          sku: "AT-WH-001",
          location: "Warehouse A",
          currentStock: 25,
          reservedStock: 3,
          lastCounted: "2024-01-15T10:30:00Z",
          status: "in_stock",
          binLocation: "A-12-C",
        },
        {
          id: 2,
          productName: "Gaming Keyboard",
          sku: "KB-GM-002",
          location: "Store Floor",
          currentStock: 0,
          reservedStock: 0,
          lastCounted: "2024-01-14T14:20:00Z",
          status: "out_of_stock",
          binLocation: "SF-03-B",
        },
        {
          id: 3,
          productName: "USB Cable",
          sku: "USB-CB-003",
          location: "Warehouse B",
          currentStock: 8,
          reservedStock: 2,
          lastCounted: "2024-01-13T09:15:00Z",
          status: "low_stock",
          binLocation: "B-05-A",
        },
        {
          id: 4,
          productName: "Phone Case",
          sku: "PC-PH-004",
          location: "Backroom",
          currentStock: 45,
          reservedStock: 5,
          lastCounted: "2024-01-12T16:45:00Z",
          status: "in_stock",
          binLocation: "BR-08-D",
        },
      ];

      let filteredInventory = mockInventory;

      if (searchTerm) {
        filteredInventory = filteredInventory.filter(
          (item) =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.binLocation.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterLocation) {
        filteredInventory = filteredInventory.filter(
          (item) => item.location === filterLocation
        );
      }

      setInventory(filteredInventory);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockUpdate = async (itemId, adjustment, reason) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setInventory((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                currentStock: Math.max(0, item.currentStock + adjustment),
                lastCounted: new Date().toISOString(),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
  };

  const handleBarcodeScan = (code) => {
    const item = inventory.find(
      (item) => item.sku === code || item.binLocation === code
    );

    if (item) {
      // Scroll to item or highlight it
      console.log("Found item:", item);
    } else {
      console.log("Item not found for code:", code);
    }

    setScannedCode("");
  };

  const getStatusBadge = (status, currentStock, reservedStock) => {
    const available = currentStock - reservedStock;

    let statusInfo;
    if (available <= 0) {
      statusInfo = { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    } else if (available <= 10) {
      statusInfo = {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-800",
      };
    } else {
      statusInfo = { label: "In Stock", color: "bg-green-100 text-green-800" };
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
      >
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Track and update inventory levels
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant={scanMode ? "primary" : "outline"}
            onClick={() => setScanMode(!scanMode)}
          >
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
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            {scanMode ? "Exit Scan Mode" : "Scan Mode"}
          </Button>
          <Button variant="outline">Stock Report</Button>
        </div>
      </div>

      {/* Barcode Scanner */}
      {scanMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900">
                Barcode Scanner Active
              </h3>
              <p className="text-sm text-blue-700">
                Scan a product barcode or bin location to quickly find items
              </p>
            </div>
            <div className="flex-shrink-0">
              <Input
                type="text"
                placeholder="Scan or enter code..."
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && scannedCode) {
                    handleBarcodeScan(scannedCode);
                  }
                }}
                className="w-48"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Inventory
            </label>
            <Input
              type="text"
              placeholder="Search by product, SKU, or bin location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterLocation("");
              }}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white shadow-sm rounded-lg">
        {inventory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Counted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </div>
                        <div className="text-sm text-gray-500">
                          SKU: {item.sku}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.location}
                      </div>
                      <div className="text-sm text-gray-500">
                        Bin: {item.binLocation}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.currentStock} available
                      </div>
                      {item.reservedStock > 0 && (
                        <div className="text-sm text-gray-500">
                          {item.reservedStock} reserved
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(
                        item.status,
                        item.currentStock,
                        item.reservedStock
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.lastCounted)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleStockUpdate(item.id, 1, "Manual adjustment")
                          }
                          className="text-green-600 hover:text-green-700"
                        >
                          +1
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleStockUpdate(item.id, -1, "Manual adjustment")
                          }
                          className="text-red-600 hover:text-red-700"
                          disabled={item.currentStock <= 0}
                        >
                          -1
                        </Button>
                        <Button variant="outline" size="sm">
                          Count
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No inventory items found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterLocation
                ? "Try adjusting your filters."
                : "Inventory items will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffInventory;
