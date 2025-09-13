// Helper functions
class Helpers {
  // Generate random string
  generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Calculate discount
  calculateDiscount(originalPrice, discountPercent) {
    return originalPrice * (discountPercent / 100);
  }

  // Validate email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validate phone number
  validatePhone(phone) {
    const re = /^\+?[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
  }
}

module.exports = new Helpers();