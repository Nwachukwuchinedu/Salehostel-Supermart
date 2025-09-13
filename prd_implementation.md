# Inventory Management System - PRD & Implementation Guide

## 🎯 Product Overview

### Vision Statement
Build a comprehensive Inventory Management System integrated with an e-commerce shopping website to automate stock tracking, prevent overselling, and provide real-time inventory insights for business decision-making.

### Target Users
- **Admin/Manager**: Full system access - manages inventory, products, purchases, orders, and business operations
- **Customer**: Shopping interface - browses products, makes purchases, tracks orders
- **System**: Automated inventory tracking and stock management

---

## 📋 Core Features & Requirements

### 1. Role-Based Access Control
- **Admin/Manager Role**
  - Complete inventory management
  - Product CRUD operations
  - Purchase order management
  - Order fulfillment and tracking
  - Analytics and reporting
  - User management
  - System configuration

- **Customer Role**
  - Browse product catalog
  - Add items to cart
  - Place orders
  - View order history
  - Update profile information
  - Track order status

### 2. Admin Features
- **Product Management**
  - Create/Edit/Delete Products
  - Bulk product operations
  - Category management
  - Inventory tracking
  - Price management

- **Inventory Control**
  - Real-time stock monitoring
  - Stock movement history
  - Purchase order creation
  - Low stock alerts
  - Automatic stock updates

- **Order Management**
  - View all customer orders
  - Update order status
  - Process refunds/returns
  - Order analytics

- **Reporting & Analytics**
  - Sales performance
  - Inventory reports
  - Profit/loss analysis
  - Customer analytics

### 3. Customer Features
- **Shopping Experience**
  - Product browsing and search
  - Shopping cart management
  - Secure checkout process
  - Order placement

- **Account Management**
  - User registration/login
  - Profile management
  - Order history
  - Order tracking

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer + Cloudinary
- **Real-time**: Socket.io (for live updates)
- **UI Components**: Headless UI (for accessibility)

---

## 📁 Restructured Folder Structure

### Backend Structure (Role-Separated Routes & Controllers)
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── admin/
│   │   │   ├── adminAuthController.js
│   │   │   ├── adminProductController.js
│   │   │   ├── adminInventoryController.js
│   │   │   ├── adminPurchaseController.js
│   │   │   ├── adminOrderController.js
│   │   │   ├── adminReportController.js
│   │   │   └── adminUserController.js
│   │   └── customer/
│   │       ├── customerAuthController.js
│   │       ├── customerProductController.js
│   │       ├── customerOrderController.js
│   │       ├── customerCartController.js
│   │       └── customerProfileController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── adminAuth.js
│   │   ├── customerAuth.js
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
│   │   ├── Cart.js
│   │   └── StockMovement.js
│   ├── routes/
│   │   ├── admin/
│   │   │   ├── adminAuth.js
│   │   │   ├── adminProducts.js
│   │   │   ├── adminInventory.js
│   │   │   ├── adminPurchases.js
│   │   │   ├── adminOrders.js
│   │   │   ├── adminReports.js
│   │   │   └── adminUsers.js
│   │   └── customer/
│   │       ├── customerAuth.js
│   │       ├── customerProducts.js
│   │       ├── customerOrders.js
│   │       ├── customerCart.js
│   │       └── customerProfile.js
│   ├── services/
│   │   ├── inventoryService.js
│   │   ├── emailService.js
│   │   ├── notificationService.js
│   │   └── orderService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── validators.js
│   └── app.js
├── uploads/
├── package.json
└── server.js
```

### Frontend Structure (Separated Admin & Customer Interfaces)
```
frontend/
├── public/
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── AdminHeader.jsx
│   │   │   │   ├── AdminSidebar.jsx
│   │   │   │   └── AdminBreadcrumb.jsx
│   │   │   ├── forms/
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   ├── PurchaseForm.jsx
│   │   │   │   ├── CategoryForm.jsx
│   │   │   │   └── UserForm.jsx
│   │   │   ├── tables/
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   ├── InventoryTable.jsx
│   │   │   │   ├── OrderTable.jsx
│   │   │   │   ├── PurchaseTable.jsx
│   │   │   │   └── UserTable.jsx
│   │   │   ├── charts/
│   │   │   │   ├── StockChart.jsx
│   │   │   │   ├── SalesChart.jsx
│   │   │   │   ├── RevenueChart.jsx
│   │   │   │   └── InventoryChart.jsx
│   │   │   ├── modals/
│   │   │   │   ├── ProductModal.jsx
│   │   │   │   ├── StockAdjustmentModal.jsx
│   │   │   │   └── OrderStatusModal.jsx
│   │   │   └── alerts/
│   │   │       ├── LowStockAlert.jsx
│   │   │       └── SystemAlert.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   └── AdminProfile.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── DashboardStats.jsx
│   │   │   ├── products/
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   └── CategoryManagement.jsx
│   │   │   ├── inventory/
│   │   │   │   ├── InventoryOverview.jsx
│   │   │   │   ├── StockMovements.jsx
│   │   │   │   ├── StockAdjustments.jsx
│   │   │   │   └── LowStockAlerts.jsx
│   │   │   ├── purchases/
│   │   │   │   ├── PurchaseList.jsx
│   │   │   │   ├── CreatePurchase.jsx
│   │   │   │   ├── PurchaseDetails.jsx
│   │   │   │   └── SupplierManagement.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderList.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── OrderFulfillment.jsx
│   │   │   │   └── RefundManagement.jsx
│   │   │   ├── reports/
│   │   │   │   ├── SalesReport.jsx
│   │   │   │   ├── InventoryReport.jsx
│   │   │   │   ├── ProfitLossReport.jsx
│   │   │   │   ├── CustomerReport.jsx
│   │   │   │   └── ProductPerformance.jsx
│   │   │   └── users/
│   │   │       ├── UserManagement.jsx
│   │   │       ├── CustomerList.jsx
│   │   │       └── AdminList.jsx
│   │   ├── hooks/
│   │   │   ├── useAdminAuth.js
│   │   │   ├── useAdminProducts.js
│   │   │   ├── useAdminInventory.js
│   │   │   ├── useAdminOrders.js
│   │   │   └── useAdminReports.js
│   │   └── stores/
│   │       ├── adminAuthStore.js
│   │       ├── adminProductStore.js
│   │       ├── adminInventoryStore.js
│   │       ├── adminOrderStore.js
│   │       ├── adminUserStore.js
│   │       └── adminReportStore.js
│   ├── customer/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── CustomerLayout.jsx
│   │   │   │   ├── CustomerHeader.jsx
│   │   │   │   ├── CustomerNavbar.jsx
│   │   │   │   ├── CustomerFooter.jsx
│   │   │   │   └── MobileMenu.jsx
│   │   │   ├── shop/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductFilter.jsx
│   │   │   │   ├── ProductSearch.jsx
│   │   │   │   ├── ProductSort.jsx
│   │   │   │   └── CategoryFilter.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   ├── CartDropdown.jsx
│   │   │   │   └── MiniCart.jsx
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutForm.jsx
│   │   │   │   ├── BillingForm.jsx
│   │   │   │   ├── ShippingForm.jsx
│   │   │   │   ├── PaymentForm.jsx
│   │   │   │   └── OrderSummary.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderCard.jsx
│   │   │   │   ├── OrderStatus.jsx
│   │   │   │   ├── OrderTracking.jsx
│   │   │   │   └── OrderActions.jsx
│   │   │   └── common/
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       ├── SuccessMessage.jsx
│   │   │       ├── Pagination.jsx
│   │   │       └── Rating.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── CustomerLogin.jsx
│   │   │   │   ├── CustomerRegister.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   ├── shop/
│   │   │   │   ├── ProductCatalog.jsx
│   │   │   │   ├── ProductPage.jsx
│   │   │   │   ├── CategoryPage.jsx
│   │   │   │   └── SearchResults.jsx
│   │   │   ├── cart/
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   └── OrderConfirmation.jsx
│   │   │   ├── account/
│   │   │   │   ├── CustomerProfile.jsx
│   │   │   │   ├── EditProfile.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   ├── AddressBook.jsx
│   │   │   │   └── ChangePassword.jsx
│   │   │   └── orders/
│   │   │       ├── OrderDetails.jsx
│   │   │       └── TrackOrder.jsx
│   │   ├── hooks/
│   │   │   ├── useCustomerAuth.js
│   │   │   ├── useProducts.js
│   │   │   ├── useCart.js
│   │   │   ├── useOrders.js
│   │   │   └── useProfile.js
│   │   └── stores/
│   │       ├── customerAuthStore.js
│   │       ├── productStore.js
│   │       ├── cartStore.js
│   │       ├── orderStore.js
│   │       └── profileStore.js
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Dropdown.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Table.jsx
│   │   │   └── forms/
│   │   │       ├── FormField.jsx
│   │   │       ├── Select.jsx
│   │   │       ├── TextArea.jsx
│   │   │       ├── FileUpload.jsx
│   │   │       └── DatePicker.jsx
│   │   ├── hooks/
│   │   │   ├── useApi.js
│   │   │   ├── useLocalStorage.js
│   │   │   ├── useDebounce.js
│   │   │   └── useSocket.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── adminApi.js
│   │   │   ├── customerApi.js
│   │   │   └── socketService.js
│   │   └── utils/
│   │       ├── constants.js
│   │       ├── helpers.js
│   │       ├── formatters.js
│   │       ├── validators.js
│   │       └── auth.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── admin.css
│   │   └── customer.css
│   ├── App.jsx
│   ├── AppRouter.jsx
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🔗 Role-Based API Endpoints

### Admin/Manager Endpoints (Protected Routes)
```
# Authentication
POST   /api/admin/auth/login           # Admin login
POST   /api/admin/auth/logout          # Admin logout
GET    /api/admin/auth/profile         # Get admin profile
PUT    /api/admin/auth/profile         # Update admin profile

# Product Management
GET    /api/admin/products             # Get all products with admin data
POST   /api/admin/products             # Create new product
PUT    /api/admin/products/:id         # Update product
DELETE /api/admin/products/:id         # Delete product
POST   /api/admin/products/bulk        # Bulk product operations
GET    /api/admin/categories           # Get all categories
POST   /api/admin/categories           # Create category
PUT    /api/admin/categories/:id       # Update category
DELETE /api/admin/categories/:id       # Delete category

# Inventory Management
GET    /api/admin/inventory            # Get full inventory overview
PUT    /api/admin/inventory/:id        # Manual stock adjustment
GET    /api/admin/inventory/movements  # Get stock movement history
GET    /api/admin/inventory/alerts     # Get low stock alerts
POST   /api/admin/inventory/adjust     # Bulk stock adjustments

# Purchase Management
GET    /api/admin/purchases            # Get all purchases
POST   /api/admin/purchases            # Create new purchase
PUT    /api/admin/purchases/:id        # Update purchase
DELETE /api/admin/purchases/:id        # Delete purchase
POST   /api/admin/purchases/bulk       # Bulk import purchases

# Order Management
GET    /api/admin/orders               # Get all customer orders
GET    /api/admin/orders/:id           # Get single order details
PUT    /api/admin/orders/:id/status    # Update order status
POST   /api/admin/orders/:id/refund    # Process refund
GET    /api/admin/orders/analytics     # Order analytics

# User Management
GET    /api/admin/users                # Get all users
POST   /api/admin/users                # Create new user
PUT    /api/admin/users/:id            # Update user
DELETE /api/admin/users/:id            # Delete user
PUT    /api/admin/users/:id/status     # Activate/deactivate user

# Reports & Analytics
GET    /api/admin/reports/sales        # Sales reports
GET    /api/admin/reports/inventory    # Inventory reports
GET    /api/admin/reports/profit-loss  # Profit & loss reports
GET    /api/admin/reports/customers    # Customer analytics
GET    /api/admin/reports/products     # Product performance
```

### Customer Endpoints (Public & Protected Routes)
```
# Authentication
POST   /api/customer/auth/register     # Customer registration
POST   /api/customer/auth/login        # Customer login
POST   /api/customer/auth/logout       # Customer logout
GET    /api/customer/auth/profile      # Get customer profile
PUT    /api/customer/auth/profile      # Update customer profile
POST   /api/customer/auth/forgot       # Forgot password
POST   /api/customer/auth/reset        # Reset password

# Product Browsing (Public)
GET    /api/customer/products          # Get products for shop (public)
GET    /api/customer/products/:id      # Get single product (public)
GET    /api/customer/products/search   # Search products (public)
GET    /api/customer/categories        # Get categories (public)
GET    /api/customer/products/featured # Get featured products

# Shopping Cart (Protected)
GET    /api/customer/cart              # Get user cart
POST   /api/customer/cart/add          # Add item to cart
PUT    /api/customer/cart/update       # Update cart item
DELETE /api/customer/cart/remove       # Remove item from cart
DELETE /api/customer/cart/clear        # Clear cart

# Orders (Protected)
GET    /api/customer/orders            # Get customer orders
POST   /api/customer/orders            # Create new order
GET    /api/customer/orders/:id        # Get single order
GET    /api/customer/orders/:id/track  # Track order status
```

---

## 💾 Updated Database Schema

### User Schema (Role-Based)
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Customer-specific fields
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  // Admin-specific fields
  permissions: [{
    type: String,
    enum: ['products', 'inventory', 'orders', 'users', 'reports']
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema (Enhanced for E-commerce)
```javascript
{
  name: String,
  description: String,
  shortDescription: String,
  category: ObjectId (ref: Category),
  brand: String,
  sku: String (unique),
  barcode: String,
  
  // Pricing
  sellingPrice: Number,
  costPrice: Number,
  salePrice: Number,
  onSale: {
    type: Boolean,
    default: false
  },
  
  // Inventory
  currentStock: Number,
  minStockLevel: Number,
  maxStockLevel: Number,
  unit: String (kg, bag, piece, carton),
  
  // E-commerce specific
  images: [String],
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  metaTitle: String,
  metaDescription: String,
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  
  // Tracking
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema (Customer Shopping)
```javascript
{
  customer: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: {
      type: Number,
      min: 1
    },
    price: Number, // Price at time of adding to cart
    total: Number
  }],
  subtotal: Number,
  lastModified: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Tailwind CSS Configuration

### Tailwind Config (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Admin Theme
        admin: {
          primary: '#1e40af', // Blue-700
          secondary: '#64748b', // Slate-500
          success: '#059669', // Emerald-600
          warning: '#d97706', // Amber-600
          danger: '#dc2626', // Red-600
          dark: '#1e293b', // Slate-800
          light: '#f8fafc', // Slate-50
        },
        // Customer Theme
        customer: {
          primary: '#7c3aed', // Violet-600
          secondary: '#4b5563', // Gray-600
          accent: '#f59e0b', // Amber-500
          success: '#10b981', // Emerald-500
          warning: '#f59e0b', // Amber-500
          danger: '#ef4444', // Red-500
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### Global Styles (globals.css)
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom base styles */
@layer base {
  body {
    @apply font-sans text-gray-900 bg-gray-50;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-semibold;
  }
}

/* Custom components */
@layer components {
  /* Admin Components */
  .admin-btn-primary {
    @apply bg-admin-primary hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .admin-btn-secondary {
    @apply bg-admin-secondary hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .admin-card {
    @apply bg-white border border-gray-200 rounded-lg shadow-sm p-6;
  }
  
  .admin-input {
    @apply border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-admin-primary focus:border-transparent;
  }
  
  /* Customer Components */
  .customer-btn-primary {
    @apply bg-customer-primary hover:bg-violet-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200;
  }
  
  .customer-btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200;
  }
  
  .customer-card {
    @apply bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden;
  }
  
  .customer-input {
    @apply border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-customer-primary focus:border-transparent;
  }
  
  /* Common Components */
  .form-group {
    @apply space-y-2;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700;
  }
  
  .form-error {
    @apply text-sm text-red-600 mt-1;
  }
  
  .loading-spinner {
    @apply animate-spin rounded-full h-8 w-8 border-b-2 border-current;
  }
  
  .fade-in {
    @apply animate-fade-in;
  }
  
  .slide-up {
    @apply animate-slide-up;
  }
}
```

---

## 🎨 Updated UI/UX Design Integration

### Design Philosophy Alignment with Role-Based Architecture

#### Vision Statement
Create a cutting-edge inventory management and e-commerce platform that combines modern design trends with exceptional user experience. The design should feel premium, intuitive, and emotionally engaging while maintaining distinct visual languages for admin and customer interfaces.

#### Role-Specific Design Principles
- **Admin Interface**: Professional, data-focused, efficient workflows
- **Customer Interface**: Engaging, conversion-optimized, brand-centric
- **Shared Components**: Consistent design tokens with contextual variations

---

## 🌈 Updated Design System

### Color Palette (Role-Separated)

#### Admin Theme Colors
```css
/* Admin Primary */
--admin-primary: #1E40AF;     /* Blue-700 - Professional */
--admin-primary-dark: #1E3A8A; /* Blue-800 */
--admin-primary-light: #DBEAFE; /* Blue-100 */

/* Admin Secondary */
--admin-secondary: #64748B;    /* Slate-500 */
--admin-success: #059669;      /* Emerald-600 */
--admin-warning: #D97706;      /* Amber-600 */
--admin-danger: #DC2626;       /* Red-600 */

/* Admin Neutrals */
--admin-bg: #F8FAFC;          /* Slate-50 */
--admin-surface: #FFFFFF;      /* White */
--admin-border: #E2E8F0;       /* Slate-200 */
--admin-text: #1E293B;         /* Slate-800 */
--admin-text-muted: #64748B;   /* Slate-500 */

/* Admin Glass Effects */
--admin-glass: rgba(30, 64, 175, 0.05);
--admin-glass-border: rgba(30, 64, 175, 0.1);
```

#### Customer Theme Colors
```css
/* Customer Primary */
--customer-primary: #7C3AED;    /* Violet-600 - Modern */
--customer-primary-dark: #6D28D9; /* Violet-700 */
--customer-primary-light: #EDE9FE; /* Violet-100 */

/* Customer Accent */
--customer-accent: #F59E0B;      /* Amber-500 - Conversion */
--customer-secondary: #EC4899;    /* Pink-500 - Engaging */
--customer-success: #10B981;      /* Emerald-500 */

/* Customer Neutrals */
--customer-bg: #FAFAFA;          /* Gray-50 */
--customer-surface: #FFFFFF;      /* White */
--customer-border: #E5E7EB;       /* Gray-200 */
--customer-text: #111827;         /* Gray-900 */
--customer-text-muted: #6B7280;   /* Gray-500 */

/* Customer Glass Effects */
--customer-glass: rgba(124, 58, 237, 0.05);
--customer-glass-border: rgba(124, 58, 237, 0.1);
```

### Typography System (Role-Optimized)
```css
/* Font Families */
--font-admin: 'Inter', system-ui, sans-serif;        /* Clean, readable */
--font-customer: 'Poppins', system-ui, sans-serif;   /* Friendly, modern */
--font-display: 'Montserrat', system-ui, sans-serif; /* Headlines, branding */

/* Admin Typography Scale */
--admin-text-xs: 0.75rem;    /* 12px - Table data */
--admin-text-sm: 0.875rem;   /* 14px - Secondary text */
--admin-text-base: 1rem;     /* 16px - Body text */
--admin-text-lg: 1.125rem;   /* 18px - Emphasis */
--admin-text-xl: 1.25rem;    /* 20px - Small headings */
--admin-text-2xl: 1.5rem;    /* 24px - Section headers */
--admin-text-3xl: 1.875rem;  /* 30px - Page titles */

/* Customer Typography Scale */
--customer-text-sm: 0.875rem;   /* 14px - Labels */
--customer-text-base: 1rem;     /* 16px - Body */
--customer-text-lg: 1.125rem;   /* 18px - Product descriptions */
--customer-text-xl: 1.25rem;    /* 20px - Product names */
--customer-text-2xl: 1.5rem;    /* 24px - Section headers */
--customer-text-3xl: 1.875rem;  /* 30px - Category titles */
--customer-text-4xl: 2.25rem;   /* 36px - Hero text */
--customer-text-5xl: 3rem;      /* 48px - Major headlines */
```

---

## 🎨 Component Design Specifications (Role-Based)

### Admin Interface Components

#### Admin Navigation
```css
.admin-sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--admin-border);
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
}

.admin-nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--admin-text-muted);
  transition: all 0.2s ease;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
}

.admin-nav-item:hover {
  background: var(--admin-glass);
  color: var(--admin-primary);
  transform: translateX(4px);
}

.admin-nav-item.active {
  background: var(--admin-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}
```

#### Admin Cards
```css
.admin-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.admin-card:hover {
  border-color: var(--admin-primary-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.admin-stat-card {
  background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-dark));
  color: white;
  border: none;
}

.admin-chart-card {
  background: var(--admin-glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--admin-glass-border);
}
```

#### Admin Tables
```css
.admin-table {
  width: 100%;
  background: var(--admin-surface);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.admin-table th {
  background: var(--admin-bg);
  padding: 1rem;
  text-align: left;
  font-family: var(--font-admin);
  font-weight: 600;
  color: var(--admin-text);
  border-bottom: 1px solid var(--admin-border);
}

.admin-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--admin-border);
  font-family: var(--font-admin);
}

.admin-table tr:hover {
  background: var(--admin-glass);
}
```

### Customer Interface Components

#### Customer Header
```css
.customer-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--customer-border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.customer-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.customer-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--customer-primary), var(--customer-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### Product Cards
```css
.product-card {
  background: var(--customer-surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--customer-primary-light);
}

.product-image {
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-info {
  padding: 1.5rem;
}

.product-name {
  font-family: var(--font-customer);
  font-size: var(--customer-text-xl);
  font-weight: 600;
  color: var(--customer-text);
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: var(--customer-text-lg);
  font-weight: 700;
  color: var(--customer-primary);
}
```

#### Shopping Cart
```css
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid var(--customer-border);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
}

.cart-sidebar.open {
  transform: translateX(0);
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--customer-border);
  transition: background 0.2s ease;
}

.cart-item:hover {
  background: var(--customer-glass);
}
```

---

## 🎭 Role-Specific Animations

### Admin Animations (Subtle & Professional)
```css
/* Data Loading Animation */
.admin-skeleton {
  background: linear-gradient(
    90deg,
    var(--admin-border) 25%,
    var(--admin-bg) 50%,
    var(--admin-border) 75%
  );
  background-size: 200% 100%;
  animation: admin-shimmer 1.5s infinite;
}

@keyframes admin-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Chart Entrance */
.admin-chart-enter {
  opacity: 0;
  transform: translateY(20px);
  animation: admin-slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes admin-slide-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Status Updates */
.admin-status-update {
  animation: admin-pulse 2s infinite;
}

@keyframes admin-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

### Customer Animations (Engaging & Dynamic)
```css
/* Hero Text Animation */
.customer-hero-text {
  opacity: 0;
  transform: translateY(30px);
  animation: customer-hero-enter 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes customer-hero-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Product Hover Effects */
.product-card-hover {
  position: relative;
  overflow: hidden;
}

.product-card-hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(124, 58, 237, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.product-card-hover:hover::before {
  left: 100%;
}

/* Add to Cart Animation */
.add-to-cart-btn {
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn.success {
  background: var(--customer-success);
  animation: customer-success-pulse 0.6s ease;
}

@keyframes customer-success-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

---

## 📱 Role-Specific Page Layouts

### Admin Dashboard Layout
```jsx
// Admin Dashboard Structure
<div className="admin-layout">
  <AdminSidebar />
  <div className="admin-main">
    <AdminHeader />
    <div className="admin-content">
      <div className="admin-stats-grid">
        <StatsCard title="Total Products" value="2,547" change="+12%" />
        <StatsCard title="Low Stock Items" value="23" change="-5%" />
        <StatsCard title="Orders Today" value="156" change="+18%" />
        <StatsCard title="Revenue" value="₦45,230" change="+22%" />
      </div>
      
      <div className="admin-charts-grid">
        <ChartCard title="Sales Overview" />
        <ChartCard title="Inventory Levels" />
      </div>
      
      <div className="admin-tables-section">
        <RecentOrdersTable />
        <LowStockTable />
      </div>
    </div>
  </div>
</div>
```

### Customer Shop Layout
```jsx
// Customer Shop Structure
<div className="customer-layout">
  <CustomerHeader />
  <main className="customer-main">
    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Discover Amazing Products</h1>
        <p className="hero-subtitle">Shop the latest collection</p>
        <button className="hero-cta">Shop Now</button>
      </div>
    </section>
    
    {/* Featured Products */}
    <section className="featured-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
    
    {/* Categories */}
    <section className="categories-section">
      <CategoryGrid />
    </section>
  </main>
  <CustomerFooter />
  <CartSidebar />
</div>
```

---

## 🎨 Zustand Store Examples (Role-Separated)

### Admin Product Store
```javascript
import { create } from 'zustand';
import { adminApi } from '../../shared/services/adminApi';

const useAdminProductStore = create((set, get) => ({
  // State
  products: [],
  categories: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    status: 'all',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },

  // Actions
  fetchProducts: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminApi.get('/products', { 
        params: { ...get().filters, ...filters } 
      });
      set({ 
        products: response.data.products,
        pagination: response.data.pagination,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addProduct: async (productData) => {
    set({ loading: true });
    try {
      const response = await adminApi.post('/products', productData);
      set(state => ({ 
        products: [response.data, ...state.products],
        loading: false 
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await adminApi.put(`/products/${id}`, productData);
      set(state => ({
        products: state.products.map(p => 
          p._id === id ? response.data : p
        ),
        selectedProduct: response.data
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await adminApi.delete(`/products/${id}`);
      set(state => ({
        products: state.products.filter(p => p._id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().fetchProducts();
  },

  clearFilters: () => {
    set({
      filters: {
        category: '',
        status: 'all',
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      }
    });
    get().fetchProducts();
  }
}));
```

### Customer Shopping Store
```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { customerApi } from '../../shared/services/customerApi';

const useCustomerStore = create(
  persist(
    (set, get) => ({
      // Products State
      products: [],
      categories: [],
      featuredProducts: [],
      searchResults: [],
      loading: false,
      searchLoading: false,

      // Cart State
      cartItems: [],
      cartTotal: 0,
      cartCount: 0,
      isCartOpen: false,

      // Filters & Search
      filters: {
        category: '',
        priceRange: [0, 1000],
        sortBy: 'featured',
        search: ''
      },

      // Product Actions
      fetchProducts: async (filters = {}) => {
        set({ loading: true });
        try {
          const response = await customerApi.get('/products', { 
            params: filters 
          });
          set({ 
            products: response.data,
            loading: false 
          });
        } catch (error) {
          set({ loading: false });
        }
      },

      fetchFeaturedProducts: async () => {
        try {
          const response = await customerApi.get('/products/featured');
          set({ featuredProducts: response.data });
        } catch (error) {
          console.error('Error fetching featured products:', error);
        }
      },

      searchProducts: async (query) => {
        if (!query.trim()) {
          set({ searchResults: [], searchLoading: false });
          return;
        }

        set({ searchLoading: true });
        try {
          const response = await customerApi.get('/products/search', {
            params: { q: query }
          });
          set({ 
            searchResults: response.data,
            searchLoading: false 
          });
        } catch (error) {
          set({ searchLoading: false });
        }
      },

      // Cart Actions
      addToCart: (product, quantity = 1) => {
        set(state => {
          const existingItem = state.cartItems.find(
            item => item.product._id === product._id
          );

          let updatedItems;
          if (existingItem) {
            updatedItems = state.cartItems.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            updatedItems = [
              ...state.cartItems,
              { product, quantity, id: Date.now() }
            ];
          }

          const total = updatedItems.reduce(
            (sum, item) => sum + (item.product.sellingPrice * item.quantity),
            0
          );

          const count = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            cartItems: updatedItems,
            cartTotal: total,
            cartCount: count
          };
        });
      },

      removeFromCart: (itemId) => {
        set(state => {
          const updatedItems = state.cartItems.filter(item => item.id !== itemId);
          const total = updatedItems.reduce(
            (sum, item) => sum + (item.product.sellingPrice * item.quantity),
            0
          );
          const count = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            cartItems: updatedItems,
            cartTotal: total,
            cartCount: count
          };
        });
      },

      updateCartQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        set(state => {
          const updatedItems = state.cartItems.map(item =>
            item.id === itemId
              ? { ...item, quantity }
              : item
          );

          const total = updatedItems.reduce(
            (sum, item) => sum + (item.product.sellingPrice * item.quantity),
            0
          );

          const count = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            cartItems: updatedItems,
            cartTotal: total,
            cartCount: count
          };
        });
      },

      clearCart: () => {
        set({
          cartItems: [],
          cartTotal: 0,
          cartCount: 0
        });
      },

      toggleCart: () => {
        set(state => ({ isCartOpen: !state.isCartOpen }));
      },

      // Filter Actions
      setFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters }
        }));
        get().fetchProducts(get().filters);
      },

      clearFilters: () => {
        set({
          filters: {
            category: '',
            priceRange: [0, 1000],
            sortBy: 'featured',
            search: ''
          }
        });
        get().fetchProducts();
      }
    }),
    {
      name: 'customer-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartTotal: state.cartTotal,
        cartCount: state.cartCount
      })
    }
  )
);