import { CURRENCY } from "./constants";

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: NGN)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = CURRENCY.CODE) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return `${CURRENCY.SYMBOL}0`;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NGN", CURRENCY.SYMBOL);
};

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    return "0";
  }

  return new Intl.NumberFormat("en-NG").format(number);
};

/**
 * Format date
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'medium', 'long', 'relative')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "medium") => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  // Relative time formatting
  if (format === "relative") {
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    // Fall back to regular date format for older dates
    format = "short";
  }

  const options = {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    medium: {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    long: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return new Intl.DateTimeFormat("en-NG", options[format]).format(dateObj);
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Handle Nigerian phone numbers
  if (cleaned.startsWith("234")) {
    // International format: +234 xxx xxx xxxx
    const match = cleaned.match(/^234(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+234 ${match[1]} ${match[2]} ${match[3]}`;
    }
  } else if (cleaned.startsWith("0")) {
    // Local format: 0xxx xxx xxxx
    const match = cleaned.match(/^0(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `0${match[1]} ${match[2]} ${match[3]}`;
    }
  }

  return phone; // Return original if no match
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} total - Total value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, total, decimals = 1) => {
  if (!total || total === 0) return "0%";

  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Format order number
 * @param {string} orderNumber - Order number to format
 * @returns {string} Formatted order number
 */
export const formatOrderNumber = (orderNumber) => {
  if (!orderNumber) return "";

  // Add prefix if not present
  if (!orderNumber.startsWith("#")) {
    return `#${orderNumber}`;
  }

  return orderNumber;
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Format address
 * @param {object} address - Address object
 * @returns {string} Formatted address string
 */
export const formatAddress = (address) => {
  if (!address) return "";

  const parts = [
    address.street,
    address.landmark,
    address.city,
    address.state,
    address.country,
  ].filter(Boolean);

  return parts.join(", ");
};

/**
 * Format stock status
 * @param {number} quantity - Stock quantity
 * @param {number} minLevel - Minimum stock level
 * @returns {object} Stock status with color and text
 */
export const formatStockStatus = (quantity, minLevel = 5) => {
  if (quantity === 0) {
    return {
      text: "Out of Stock",
      color: "text-red-600",
      bgColor: "bg-red-100",
    };
  }

  if (quantity <= minLevel) {
    return {
      text: `Low Stock (${quantity} left)`,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    };
  }

  return {
    text: "In Stock",
    color: "text-green-600",
    bgColor: "bg-green-100",
  };
};
