// Placeholder controller - will implement functions later
const adminPurchaseController = {
  getPurchases: (req, res) => {
    res.json({ message: 'Get all purchases' });
  },
  createPurchase: (req, res) => {
    res.json({ message: 'Create new purchase' });
  },
  updatePurchase: (req, res) => {
    res.json({ message: 'Update purchase' });
  },
  deletePurchase: (req, res) => {
    res.json({ message: 'Delete purchase' });
  },
  bulkImportPurchases: (req, res) => {
    res.json({ message: 'Bulk import purchases' });
  }
};

module.exports = adminPurchaseController;