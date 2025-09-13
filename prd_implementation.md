# Inventory Management System - PRD & Implementation Guide

## 🎯 Product Overview

### Vision Statement
Build a comprehensive Inventory Management System integrated with an e-commerce shopping website to automate stock tracking, prevent overselling, and provide real-time inventory insights for business decision-making.

### Target Users
- **Store Manager/Owner**: Manages inventory, purchases, and business operations
- **Customers**: Shop online with real-time stock availability
- **Admin**: System administration and reporting

---

## 📋 Core Features & Requirements

### 1. Product Management
- **Create/Edit/Delete Products**
  - Basic info: name, description, category, brand
  - Pricing: selling price, cost price, discount
  - Inventory: stock quantity, minimum stock level, unit of measurement
  - Media: product images, gallery
  - SEO: meta title, description, keywords

### 2. Inventory Tracking
- **Real-time Stock Monitoring**
  - Current stock levels per product
  - Stock movement history
  - Automatic stock updates on sales/purchases
  - Low stock alerts and notifications

### 3. Purchase Management
- **Stock Replenishment**
  - Create purchase orders
  - Record supplier information
  - Track purchase costs and margins
  - Bulk import capabilities

### 4. Sales Integration
- **E-commerce Integration**
  - Automatic stock deduction on orders
  - Prevent overselling
  - Order fulfillment tracking
  - Return/refund stock adjustments

### 5. Reporting & Analytics
- **Business Intelligence**
  - Stock levels report
  - Sales performance
  - Profit/loss analysis
  - Inventory turnover
  - Low stock alerts

### 6. User Management
- **Role-Based Access**
  - Admin (full access)
  - Manager (inventory + sales)
  - Staff (limited access)
  - Customer (shopping only)

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: React.js with TypeScript
- **State Management**: Zustand
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer + Cloudinary
- **Real-time**: Socket.io (for live updates)

---

## 📁 Folder Structure

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── inventoryController.js
│   │   ├── purchaseController.js
│   │   ├── orderController.js
│   │   ├── reportController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── upload.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Purchase.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   └── StockMovement.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── inventory.js
│   │   ├── purchases.js
│   │   ├── orders.js
│   │   ├── reports.js
│   │   └── users.js
│   ├── services/
│   │   ├── inventoryService.js
│   │   ├── emailService.js
│   │   └── notificationService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── validators.js
│   └── app.js
├── uploads/
├── package.json
└── server.js
```

### Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Layout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── forms/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── PurchaseForm.jsx
│   │   │   └── OrderForm.jsx
│   │   ├── tables/
│   │   │   ├── ProductTable.jsx
│   │   │   ├── InventoryTable.jsx
│   │   │   └── OrderTable.jsx
│   │   └── charts/
│   │       ├── StockChart.jsx
│   │       └── SalesChart.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── products/
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── AddProduct.jsx
│   │   ├── inventory/
│   │   │   ├── InventoryOverview.jsx
│   │   │   └── StockMovements.jsx
│   │   ├── purchases/
│   │   │   ├── PurchaseList.jsx
│   │   │   └── CreatePurchase.jsx
│   │   ├── orders/
│   │   │   ├── OrderList.jsx
│   │   │   └── OrderDetails.jsx
│   │   ├── reports/
│   │   │   ├── InventoryReport.jsx
│   │   │   └── SalesReport.jsx
│   │   └── shop/
│   │       ├── ProductCatalog.jsx
│   │       ├── ProductPage.jsx
│   │       ├── Cart.jsx
│   │       └── Checkout.jsx
│   ├── stores/
│   │   ├── authStore.js
│   │   ├── productStore.js
│   │   ├── inventoryStore.js
│   │   ├── cartStore.js
│   │   └── orderStore.js
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useProducts.js
│   │   └── useInventory.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── formatters.js
│   └── App.jsx
├── package.json
└── README.md
```

---

## 🔗 API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
GET    /api/auth/profile           # Get user profile
PUT    /api/auth/profile           # Update user profile
POST   /api/auth/forgot-password   # Password reset request
POST   /api/auth/reset-password    # Password reset
```

### Product Management
```
GET    /api/products               # Get all products (with pagination, filters)
GET    /api/products/:id           # Get single product
POST   /api/products               # Create new product
PUT    /api/products/:id           # Update product
DELETE /api/products/:id           # Delete product
POST   /api/products/:id/images    # Upload product images
GET    /api/categories             # Get all categories
POST   /api/categories             # Create category
```

### Inventory Management
```
GET    /api/inventory              # Get inventory overview
GET    /api/inventory/:productId   # Get product inventory details
PUT    /api/inventory/:productId   # Manual stock adjustment
GET    /api/inventory/movements    # Get stock movement history
GET    /api/inventory/alerts       # Get low stock alerts
POST   /api/inventory/bulk-update  # Bulk stock update
```

### Purchase Management
```
GET    /api/purchases              # Get all purchases
GET    /api/purchases/:id          # Get single purchase
POST   /api/purchases              # Create new purchase
PUT    /api/purchases/:id          # Update purchase
DELETE /api/purchases/:id          # Delete purchase
POST   /api/purchases/bulk-import  # Bulk import purchases
```

### Order Management (E-commerce)
```
GET    /api/orders                 # Get all orders
GET    /api/orders/:id             # Get single order
POST   /api/orders                 # Create new order
PUT    /api/orders/:id/status      # Update order status
DELETE /api/orders/:id             # Cancel order
GET    /api/orders/customer/:id    # Get customer orders
```

### Shopping Cart
```
GET    /api/cart                   # Get user cart
POST   /api/cart/add               # Add item to cart
PUT    /api/cart/update            # Update cart item
DELETE /api/cart/remove            # Remove item from cart
DELETE /api/cart/clear             # Clear cart
```

### Reports & Analytics
```
GET    /api/reports/inventory      # Inventory levels report
GET    /api/reports/sales          # Sales report
GET    /api/reports/purchases      # Purchase report
GET    /api/reports/profit-loss    # Profit & loss report
GET    /api/reports/top-products   # Best selling products
GET    /api/reports/low-stock      # Low stock report
```

### User Management
```
GET    /api/users                  # Get all users (admin only)
GET    /api/users/:id              # Get single user
POST   /api/users                  # Create new user (admin only)
PUT    /api/users/:id              # Update user
DELETE /api/users/:id              # Delete user (admin only)
PUT    /api/users/:id/role         # Change user role (admin only)
```

---

## 💾 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin, manager, staff, customer),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  name: String,
  description: String,
  category: ObjectId (ref: Category),
  brand: String,
  sku: String (unique),
  barcode: String,
  sellingPrice: Number,
  costPrice: Number,
  unit: String (kg, bag, piece, carton),
  currentStock: Number,
  minStockLevel: Number,
  maxStockLevel: Number,
  images: [String],
  isActive: Boolean,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Purchase Schema
```javascript
{
  purchaseNumber: String (auto-generated),
  supplier: {
    name: String,
    contact: String,
    address: String
  },
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    costPrice: Number,
    totalCost: Number
  }],
  totalAmount: Number,
  purchaseDate: Date,
  receivedDate: Date,
  status: String (pending, received, cancelled),
  notes: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  orderNumber: String (auto-generated),
  customer: {
    name: String,
    email: String,
    phone: String,
    address: Object
  },
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number,
    total: Number
  }],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String (pending, processing, shipped, delivered, cancelled),
  paymentStatus: String (pending, paid, failed, refunded),
  paymentMethod: String,
  shippingMethod: String,
  orderDate: Date,
  shippedDate: Date,
  deliveredDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Stock Movement Schema
```javascript
{
  product: ObjectId (ref: Product),
  movementType: String (purchase, sale, adjustment, return),
  quantity: Number,
  balanceBefore: Number,
  balanceAfter: Number,
  reference: String (order/purchase ID),
  reason: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date
}
```

---

## 🎨 Zustand Store Examples

### Admin Product Store
```javascript
const useAdminProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async (filters = {}) => {
    set({ loading: true });
    try {
      const response = await adminApi.get('/products', { params: filters });
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  addProduct: async (productData) => {
    try {
      const response = await adminApi.post('/products', productData);
      set(state => ({ 
        products: [...state.products, response.data] 
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
  
  updateProduct: async (id, productData) => {
    try {
      const response = await adminApi.put(`/products/${id}`, productData);
      set(state => ({
        products: state.products.map(p => 
          p._id === id ? response.data : p
        )
      }));
    } catch (error) {
      set({ error: error.message });
    }
  }
}));
```

### Customer Cart Store
```javascript
const useCustomerCartStore = create((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (product, quantity = 1) => {
    set(state => {
      const existingItem = state.items.find(item => item.product._id === product._id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { 
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        const newItems = [...state.items, { product, quantity }];
        return { 
          items: newItems,
          total: calculateTotal(newItems)
        };
      }
    });
  },
  
  removeItem: (productId) => {
    set(state => {
      const updatedItems = state.items.filter(item => item.product._id !== productId);
      return { 
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  },
  
  updateQuantity: (productId, quantity) => {
    set(state => {
      const updatedItems = state.items.map(item =>
        item.product._id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return { 
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  },
  
  clearCart: () => set({ items: [], total: 0 })
}));
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation
- [ ] Set up project structure (backend & frontend)
- [ ] Database setup and basic models
- [ ] Authentication system
- [ ] Basic CRUD for products
- [ ] Product catalog (frontend)

### Phase 2: Core Inventory
- [ ] Inventory tracking system
- [ ] Purchase management
- [ ] Stock movement logging
- [ ] Basic reporting

### Phase 3: E-commerce Integration
- [ ] Shopping cart functionality
- [ ] Order processing
- [ ] Automatic stock deduction
- [ ] Order management dashboard

### Phase 4: Advanced Features
- [ ] Low stock alerts
- [ ] Advanced reporting
- [ ] Bulk operations
- [ ] File upload/import

### Phase 5: Polish & Deploy
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Testing
- [ ] Deployment

---

## 🔐 Security Considerations

### Authentication & Authorization
- JWT tokens with refresh mechanism
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Rate limiting on login attempts

### Data Protection
- Input validation and sanitization
- SQL injection prevention (using Mongoose)
- CORS configuration
- Environment variables for sensitive data

### File Upload Security
- File type validation
- File size limits
- Virus scanning (optional)
- Secure file storage (Cloudinary)

---

## 📊 Performance Optimization

### Backend
- Database indexing on frequently queried fields
- Pagination for large datasets
- Caching with Redis (optional)
- API response compression

### Frontend
- Lazy loading of components
- Virtual scrolling for large lists
- Cloudinary optimized image delivery
- Bundle splitting

---

This comprehensive PRD provides everything you need to build a complete Inventory Management System integrated with your e-commerce platform. The modular structure allows you to implement features incrementally while maintaining scalability and maintainability.