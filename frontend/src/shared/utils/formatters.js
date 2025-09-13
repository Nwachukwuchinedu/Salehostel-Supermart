// Data formatters

// Format product data
export const formatProduct = (product) => {
  return {
    ...product,
    formattedPrice: product.price ? `₦${product.price.toFixed(2)}` : '₦0.00',
    formattedDiscountPrice: product.discountPrice ? `₦${product.discountPrice.toFixed(2)}` : null,
    discountPercentage: product.price && product.discountPrice 
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
      : 0,
    inStock: product.stock > 0,
    lowStock: product.stock > 0 && product.stock <= 10,
  };
};

// Format order data
export const formatOrder = (order) => {
  return {
    ...order,
    formattedTotal: order.total ? `₦${order.total.toFixed(2)}` : '₦0.00',
    formattedDate: new Date(order.createdAt).toLocaleDateString(),
    statusText: formatOrderStatus(order.status),
    paymentStatusText: formatPaymentStatus(order.paymentStatus),
  };
};

// Format order status
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };
  
  return statusMap[status] || status;
};

// Format payment status
export const formatPaymentStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    refunded: 'Refunded',
  };
  
  return statusMap[status] || status;
};

// Format inventory status
export const formatInventoryStatus = (stock) => {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 10) return 'Low Stock';
  return 'In Stock';
};

// Format user data
export const formatUser = (user) => {
  return {
    ...user,
    fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
    formattedCreatedAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
    roleText: formatUserRole(user.role),
  };
};

// Format user role
export const formatUserRole = (role) => {
  const roleMap = {
    admin: 'Administrator',
    customer: 'Customer',
    super_admin: 'Super Administrator',
  };
  
  return roleMap[role] || role;
};

// Format address
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ].filter(Boolean);
  
  return parts.join(', ');
};

// Format cart item
export const formatCartItem = (item) => {
  return {
    ...item,
    formattedPrice: item.price ? `₦${item.price.toFixed(2)}` : '₦0.00',
    formattedTotal: item.price && item.quantity 
      ? `₦${(item.price * item.quantity).toFixed(2)}` 
      : '₦0.00',
  };
};

// Format report data
export const formatReportData = (data) => {
  return {
    ...data,
    formattedRevenue: data.revenue ? `₦${data.revenue.toFixed(2)}` : '₦0.00',
    formattedProfit: data.profit ? `₦${data.profit.toFixed(2)}` : '₦0.00',
    formattedDate: data.date ? new Date(data.date).toLocaleDateString() : '',
  };
};