import React, { useState } from "react";
import Button from "../../../shared/ui/components/Button";
import Avatar from "../../../shared/ui/components/Avatar";
import Pagination from "../../../shared/ui/components/Pagination";

const UserTable = ({
  users = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    return sortConfig.direction === "asc" ? (
      <svg
        className="w-4 h-4 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
        />
      </svg>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { label: "Admin", color: "bg-purple-100 text-purple-800" },
      staff: { label: "Staff", color: "bg-blue-100 text-blue-800" },
      supplier: { label: "Supplier", color: "bg-green-100 text-green-800" },
      customer: { label: "Customer", color: "bg-gray-100 text-gray-800" },
    };

    const config = roleConfig[role] || roleConfig.customer;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Active", color: "bg-green-100 text-green-800" },
      inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800" },
      suspended: { label: "Suspended", color: "bg-red-100 text-red-800" },
      pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
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
          <h3 className="text-lg font-medium text-gray-900">Users</h3>
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                {selectedUsers.length} selected
              </span>
              <Button variant="outline" size="sm">
                Bulk Actions
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
                    selectedUsers.length === users.length && users.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-1">
                  <span>User</span>
                  {getSortIcon("name")}
                </div>
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  {getSortIcon("email")}
                </div>
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center space-x-1">
                  <span>Role</span>
                  {getSortIcon("role")}
                </div>
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon("status")}
                </div>
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("lastLogin")}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Login</span>
                  {getSortIcon("lastLogin")}
                </div>
              </th>

              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center space-x-1">
                  <span>Joined</span>
                  {getSortIcon("createdAt")}
                </div>
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) =>
                      handleSelectUser(user.id, e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      size="md"
                      className="mr-4"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">ID: {user.id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  {user.phone && (
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(user.role)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(user.status)}
                    {user.status === "active" && (
                      <button
                        onClick={() => onToggleStatus?.(user.id, "inactive")}
                        className="text-xs text-gray-500 hover:text-red-600"
                        title="Deactivate user"
                      >
                        Deactivate
                      </button>
                    )}
                    {user.status === "inactive" && (
                      <button
                        onClick={() => onToggleStatus?.(user.id, "active")}
                        className="text-xs text-gray-500 hover:text-green-600"
                        title="Activate user"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin ? (
                    <div>
                      <div>{new Date(user.lastLogin).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(user.lastLogin).toLocaleTimeString()}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Never</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView?.(user)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit?.(user)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(user)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && !loading && (
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new user.
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

export default UserTable;
