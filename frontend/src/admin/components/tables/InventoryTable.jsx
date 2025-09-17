import React, { useState } from "react";
import Button from "../../../shared/ui/components/Button";
import Pagination from "../../../shared/ui/components/Pagination";

const InventoryTable = ({
  inventory = [],
  loading = false,
  onUpdateStock,
  onViewHistory,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingStock, setEditingStock] = useState({});

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(inventory.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const handleStockUpdate = async (item) => {
    const newStock = editingStock[item.id];
    if (newStock !== undefined && newStock !== item.currentStock) {
      await onUpdateStock?.(item.id, parseInt(newStock));
      setEditingStock((prev) => {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      });
    }
  };

  const getStockStatus = (current, minimum) => {
    if (current <= 0) {
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    } else if (current <= minimum) {
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { label: "In Stock", color: "bg-green-100 text-green-800" };
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Inventory Management
          </h3>
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                {selectedItems.length} selected
              </span>
              <Button variant="outline" size="sm">
                Bulk Update
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedItems.length === inventory.length &&
                    inventory.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reserved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => {
              const status = getStockStatus(
                item.currentStock,
                item.minimumStock
              );
              const available = item.currentStock - (item.reservedStock || 0);

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) =>
                        handleSelectItem(item.id, e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={item.image || "/api/placeholder/40/40"}
                          alt={item.productName}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.variant || "Default"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.sku}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingStock[item.id] !== undefined ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={editingStock[item.id]}
                          onChange={(e) =>
                            setEditingStock((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                          min="0"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStockUpdate(item)}
                          className="text-green-600 hover:text-green-700"
                        >
                          ✓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setEditingStock((prev) => {
                              const updated = { ...prev };
                              delete updated[item.id];
                              return updated;
                            })
                          }
                          className="text-red-600 hover:text-red-700"
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() =>
                          setEditingStock((prev) => ({
                            ...prev,
                            [item.id]: item.currentStock,
                          }))
                        }
                      >
                        {item.currentStock}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.reservedStock || 0}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {available}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewHistory?.(item)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        History
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {inventory.length === 0 && !loading && (
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
            No inventory items
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start by adding products to track inventory.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
