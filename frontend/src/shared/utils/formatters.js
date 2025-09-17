// Data formatters

// Format currency
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "₦0.00";
  return `₦${Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Format date
export const formatDate = (date, options = {}) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return dateObj.toLocaleDateString("en-US", defaultOptions);
};

// Format date and time
export const formatDateTime = (date) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(date);
};

// Format number with commas
export const formatNumber = (number) => {
  if (number === null || number === undefined) return "0";
  return Number(number).toLocaleString("en-NG");
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return "0%";
  return `${Number(value).toFixed(decimals)}%`;
};

// Format product data
export const formatProduct = (product) => {
  return {
    ...product,
    formattedPrice: formatCurrency(product.price),
    formattedDiscountPrice: product.discountPrice
      ? formatCurrency(product.discountPrice)
      : null,
    discountPercentage:
      product.price && product.discountPrice
        ? Math.round(
            ((product.price - product.discountPrice) / product.price) * 100
          )
        : 0,
    inStock: product.stock > 0,
    lowStock: product.stock > 0 && product.stock <= 10,
  };
};

// Format order data
export const formatOrder = (order) => {
  return {
    ...order,
    formattedTotal: formatCurrency(order.total),
    formattedDate: formatDate(order.createdAt),
    statusText: formatOrderStatus(order.status),
    paymentStatusText: formatPaymentStatus(order.paymentStatus),
  };
};

// Format order status
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };

  return statusMap[status] || status;
};

// Format payment status
export const formatPaymentStatus = (status) => {
  const statusMap = {
    pending: "Pending",
    completed: "Completed",
    failed: "Failed",
    refunded: "Refunded",
  };

  return statusMap[status] || status;
};

// Format inventory status
export const formatInventoryStatus = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
};

// Format user data
export const formatUser = (user) => {
  return {
    ...user,
    fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    formattedCreatedAt: formatDate(user.createdAt),
    roleText: formatUserRole(user.role),
  };
};

// Format user role
export const formatUserRole = (role) => {
  const roleMap = {
    admin: "Administrator",
    customer: "Customer",
    super_admin: "Super Administrator",
  };

  return roleMap[role] || role;
};

// Format address
export const formatAddress = (address) => {
  if (!address) return "";

  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ].filter(Boolean);

  return parts.join(", ");
};

// Format cart item
export const formatCartItem = (item) => {
  return {
    ...item,
    formattedPrice: formatCurrency(item.price),
    formattedTotal: formatCurrency(item.price * item.quantity),
  };
};

// Format report data
export const formatReportData = (data) => {
  return {
    ...data,
    formattedRevenue: formatCurrency(data.revenue),
    formattedProfit: formatCurrency(data.profit),
    formattedDate: formatDate(data.date),
  };
};
