// Placeholder controller - will implement functions later
const customerProductController = {
  getProducts: (req, res) => {
    res.json({ message: 'Get products for shop (public)' });
  },
  getProduct: (req, res) => {
    res.json({ message: 'Get single product (public)' });
  },
  searchProducts: (req, res) => {
    res.json({ message: 'Search products (public)' });
  },
  getCategories: (req, res) => {
    res.json({ message: 'Get categories (public)' });
  },
  getFeaturedProducts: (req, res) => {
    res.json({ message: 'Get featured products' });
  }
};

module.exports = customerProductController;