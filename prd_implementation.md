# SalesHostel - Grocery Store Inventory Management System PRD

## 🎯 Product Overview

### Vision Statement

Build a comprehensive grocery store inventory management system integrated with an e-commerce platform for SalesHostel, enabling efficient stock management, supplier coordination, and customer shopping experiences for staple foods, frozen foods, convenience foods, and household items.

### Business Model

SalesHostel operates as a grocery provision store located at NDDC hostel, shop 12, offering:

- **Staple Foods**: Rice, Garri, Beans, Semovita, Melon
- **Frozen Foods**: Chicken wings, Chicken lap
- **Convenience Foods**: Spaghetti, Noodles, Pasta
- **Sauces/Spices**: Tomato paste, Maggi, Curry, Thyme
- **Cooking Oils**: Palm oil, Groundnut oil, Power oil
- **Groceries**: Milk, Milo, Cornflakes, Sugar, Flour
- **Cleaning Agents**: Detergents, Soaps, Liquid soap
- **Personal Care**: Toothpaste, Sanitary pads, Body spray
- **Stationery**: Notebooks, Biros

### Target Users

- **Admin**: Full system access - manages inventory, assigns roles, processes orders
- **Supplier**: Manages product supply, updates stock levels, handles deliveries
- **Staff**: Assists with inventory management and customer service
- **Customer**: Browses products, places orders, tracks purchases

---

## 📋 Core Features & Requirements

### 1. Role-Based Access Control

- **Admin Role**

  - Complete system access
  - User role assignment (Supplier/Staff)
  - Product and category management
  - Order processing and fulfillment
  - Financial reporting and analytics
  - Stock movement tracking

- **Supplier Role**

  - Add/Edit/Delete products
  - Manage supply deliveries
  - Update stock quantities
  - View supply history
  - Generate supply reports

- **Staff Role**

  - Assist with inventory management
  - Process customer orders
  - Update stock levels
  - View basic reports

- **Customer Role**
  - Browse product catalog by categories
  - View products without login (like Jumia)
  - Add items to cart and checkout
  - Track order history
  - Manage profile and addresses

### 2. Product Catalog System

- **Product Categories**

  - Staple Foods
  - Frozen Foods
  - Convenience Foods
  - Sauces/Spices
  - Cooking Oils
  - Groceries
  - Cleaning Agents
  - Personal Care Products
  - Stationery

- **Product Management**
  - Product Name (e.g., Rice, Beans)
  - Product Group (e.g., Staple Food)
  - Multiple unit types and prices (Cup, Half Rubber, Black Rubber, Paint Rubber, etc.)
  - Product descriptions and tags
  - Stock quantity tracking
  - Product images and specifications

### 3. Inventory Management

- **Stock Tracking**

  - Real-time inventory levels
  - Multiple unit measurements per product
  - Low stock alerts
  - Stock movement recording
  - Automatic updates on sales/supplies

- **Supply Management**
  - New supply entry system
  - Supplier information management
  - Supply date and time tracking
  - Supply history and reports

### 4. Order Management

- **Customer Orders**

  - Shopping cart functionality
  - Order processing workflow
  - Order tracking and status updates
  - Order history and receipts

- **Admin Purchase Orders**
  - Create purchase orders
  - Order summary and editing
  - Cart management for bulk orders
  - Downloadable order summaries

### 5. Reporting & Analytics

- **Stock Reports**

  - Current inventory levels
  - Stock movement history
  - Low stock alerts
  - Category-wise stock analysis

- **Sales Reports**
  - Sales performance by product/category
  - Revenue tracking
  - Customer purchase patterns
  - Supplier performance metrics

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
- **Payment**: Manual payment processing

---

## 📁 Complete Folder Structure

### Backend Structure

```
saleshostel-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── inventoryController.js
│   │   ├── supplierController.js
│   │   ├── orderController.js
│   │   ├── reportController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── roleCheck.js
│   │   ├── upload.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Supply.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── StockMovement.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── inventory.js
│   │   ├── suppliers.js
│   │   ├── orders.js
│   │   ├── reports.js
│   │   └── users.js
│   ├── services/
│   │   ├── inventoryService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   └── reportService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── constants.js
│   └── app.js
├── package.json
└── server.js
```

### Frontend Structure

```
saleshostel-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── AdminHeader.jsx
│   │   │       ├── AdminLayout.jsx
│   │   │       └── AdminSidebar.jsx
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   └── AdminDashboard.jsx
│   │   │   ├── inventory/
│   │   │   │   ├── InventoryOverview.jsx
│   │   │   │   ├── LowStockAlerts.jsx
│   │   │   │   ├── StockAdjustments.jsx
│   │   │   │   └── StockMovements.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── OrderFulfillment.jsx
│   │   │   │   ├── OrderList.jsx
│   │   │   │   └── RefundManagement.jsx
│   │   │   ├── products/
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   └── ProductList.jsx
│   │   │   ├── purchases/
│   │   │   │   ├── CreatePurchase.jsx
│   │   │   │   ├── PurchaseDetails.jsx
│   │   │   │   ├── PurchaseList.jsx
│   │   │   │   ├── SupplierManagement.jsx
│   │   │   │   └── Supplies.jsx
│   │   │   ├── reports/
│   │   │   │   ├── CustomerReport.jsx
│   │   │   │   ├── InventoryReport.jsx
│   │   │   │   ├── ProductPerformance.jsx
│   │   │   │   ├── ProfitLossReport.jsx
│   │   │   │   └── SalesReport.jsx
│   │   │   └── users/
│   │   │       ├── AdminList.jsx
│   │   │       ├── CustomerList.jsx
│   │   │       └── UserManagement.jsx
│   │   └── stores/
│   │       ├── adminAuthStore.js
│   │       ├── adminInventoryStore.js
│   │       ├── adminOrderStore.js
│   │       ├── adminProductStore.js
│   │       ├── adminReportStore.js
│   │       └── adminUserStore.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ProductCard.jsx
│   │   └── layout/
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       └── Layout.jsx
│   ├── customer/
│   │   ├── components/
│   │   │   ├── cart/
│   │   │   │   └── CartDropdown.jsx
│   │   │   ├── layout/
│   │   │   │   ├── CustomerFooter.jsx
│   │   │   │   ├── CustomerHeader.jsx
│   │   │   │   └── CustomerLayout.jsx
│   │   │   └── shop/
│   │   │       └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── account/
│   │   │   │   ├── AddressBook.jsx
│   │   │   │   ├── ChangePassword.jsx
│   │   │   │   ├── CustomerProfile.jsx
│   │   │   │   ├── EditProfile.jsx
│   │   │   │   └── OrderHistory.jsx
│   │   │   ├── cart/
│   │   │   │   └── Cart.jsx
│   │   │   ├── checkout/
│   │   │   │   ├── Checkout.jsx
│   │   │   │   └── OrderConfirmation.jsx
│   │   │   ├── errors/
│   │   │   │   └── NotFound.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   └── TrackOrder.jsx
│   │   │   └── shop/
│   │   │       ├── CategoryPage.jsx
│   │   │       ├── ProductCatalog.jsx
│   │   │       ├── ProductPage.jsx
│   │   │       └── SearchResults.jsx
│   │   └── stores/
│   │       ├── cartStore.js
│   │       ├── customerAuthStore.js
│   │       ├── orderStore.js
│   │       ├── productStore.js
│   │       └── profileStore.js
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── errors/
│   │   │   └── NotFound.jsx
│   │   └── public/
│   │       ├── Cart.jsx
│   │       ├── CategoryPage.jsx
│   │       ├── Checkout.jsx
│   │       ├── Home.jsx
│   │       ├── ProductCatalog.jsx
│   │       ├── ProductDetails.jsx
│   │       └── SearchResults.jsx
│   ├── shared/
│   │   ├── animation/
│   │   │   └── index.js
│   │   ├── components/
│   │   │   └── DarkModeToggle.jsx
│   │   ├── hooks/
│   │   │   ├── useApi.jsx
│   │   │   ├── useDebounce.jsx
│   │   │   ├── useLocalStorage.jsx
│   │   │   ├── usePerformance.jsx
│   │   │   └── useSocket.jsx
│   │   ├── services/
│   │   │   ├── adminApi.js
│   │   │   ├── api.js
│   │   │   ├── customerApi.js
│   │   │   ├── socketService.js
│   │   │   └── supplierApi.js
│   │   ├── ui/
│   │   │   ├── components/
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Dropdown.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Table.jsx
│   │   │   └── form/
│   │   │       ├── DatePicker.jsx
│   │   │       ├── FileUpload.jsx
│   │   │       ├── FormField.jsx
│   │   │       ├── Select.jsx
│   │   │       └── TextArea.jsx
│   │   └── utils/
│   │       ├── auth.js
│   │       ├── constants.js
│   │       ├── formatters.js
│   │       ├── helpers.js
│   │       └── validators.js
│   ├── stores/
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   ├── orderStore.js
│   │   └── productStore.js
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── AppRouter.jsx
│   └── main.jsx
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## 💾 Database Schema

### User Schema

```
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  whatsappNumber: String,
  callNumber: String,
  role: {
    type: String,
    enum: ['admin', 'supplier', 'staff', 'customer'],
    default: 'customer'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema

```
{
  name: String, // e.g., "Rice", "Beans"
  productGroup: {
    type: ObjectId,
    ref: 'Category'
  },
  description: String,
  tags: [String],
  units: [{
    unitType: String, // "Cup", "Half Rubber", "Black Rubber", "Paint Rubber"
    price: Number,
    stockQuantity: Number,
    minStockLevel: Number
  }],
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema

```
{
  name: String, // "Staple Foods", "Frozen Foods", etc.
  description: String,
  image: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Supply Schema

```
{
  supplier: ObjectId (ref: User),
  productName: String,
  quantity: String, // "Black Rubber", "Half Rubber", etc.
  numberOfQuantity: Number,
  pricePerUnit: Number,
  totalPrice: Number,
  supplyDate: {
    type: Date,
    default: Date.now
  },
  notes: String,
  status: {
    type: String,
    enum: ['pending', 'received', 'cancelled'],
    default: 'pending'
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema

```
{
  orderNumber: String (auto-generated),
  customer: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    unitType: String, // "Cup", "Half Rubber", etc.
    quantity: Number,
    pricePerUnit: Number,
    totalPrice: Number
  }],
  subtotal: Number,
  deliveryFee: Number,
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  deliveryAddress: {
    street: String,
    landmark: String,
    phone: String
  },
  orderDate: Date,
  deliveryDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema

```
{
  customer: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    unitType: String,
    quantity: Number,
    pricePerUnit: Number
  }],
  lastModified: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Stock Movement Schema

```
{
  product: ObjectId (ref: Product),
  unitType: String,
  movementType: {
    type: String,
    enum: ['supply', 'sale', 'adjustment', 'return']
  },
  quantityBefore: Number,
  quantityChanged: Number,
  quantityAfter: Number,
  reference: String, // Order ID or Supply ID
  performedBy: ObjectId (ref: User),
  reason: String,
  createdAt: Date
}
```

---

## 🔗 API Endpoints

### Authentication & User Management

```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
GET    /api/auth/profile           # Get user profile
PUT    /api/auth/profile           # Update user profile
POST   /api/auth/logout            # User logout
POST   /api/users/assign-role      # Admin assigns roles (admin only)
GET    /api/users                  # Get all users (admin only)
```

### Public Product Browsing (No Authentication Required)

```
GET    /api/public/categories      # Get all categories
GET    /api/public/products        # Get all active products
GET    /api/public/products/:id    # Get single product
GET    /api/public/products/category/:categoryId  # Products by category
GET    /api/public/products/search # Search products
```

### Product Management

```
GET    /api/products               # Get products (role-based)
POST   /api/products               # Create product (admin/supplier)
PUT    /api/products/:id           # Update product (admin/supplier)
DELETE /api/products/:id           # Delete product (admin only)
POST   /api/products/:id/images    # Upload product images
```

### Category Management

```
GET    /api/categories             # Get categories
POST   /api/categories             # Create category (admin only)
PUT    /api/categories/:id         # Update category (admin only)
DELETE /api/categories/:id         # Delete category (admin only)
```

### Supply Management

```
GET    /api/supplies               # Get supplies
POST   /api/supplies               # Create new supply (supplier)
PUT    /api/supplies/:id           # Update supply
GET    /api/supplies/history       # Supply history
```

### Inventory Management

```
GET    /api/inventory              # Get inventory overview
GET    /api/inventory/:productId   # Get product inventory
PUT    /api/inventory/:productId   # Update stock levels
GET    /api/inventory/movements    # Stock movement history
GET    /api/inventory/alerts       # Low stock alerts
```

### Order Management

```
GET    /api/orders                 # Get orders (role-based)
POST   /api/orders                 # Create order (customer)
PUT    /api/orders/:id/status      # Update order status
GET    /api/orders/:id             # Get order details
GET    /api/orders/customer/:id    # Customer order history
```

### Cart Management

```
GET    /api/cart                   # Get user cart
POST   /api/cart/add               # Add item to cart
PUT    /api/cart/update            # Update cart item
DELETE /api/cart/remove            # Remove cart item
DELETE /api/cart/clear             # Clear cart
```

### Reports

```
GET    /api/reports/inventory      # Inventory reports
GET    /api/reports/sales          # Sales reports
GET    /api/reports/supplies       # Supply reports
GET    /api/reports/stock-movement # Stock movement reports
```

---

## 🎨 UI/UX Design Updates

### Public Browsing (Jumia-like Experience)

- **Homepage**: Featured categories and popular products
- **Category Pages**: Grid layout with filters and sorting
- **Product Listing**: Card-based layout with quick add to cart
- **Product Details**: Detailed view with unit selection
- **Cart**: Slide-out cart with quantity management
- **Real-time Search**: Instant search results in dropdown as user types with "No results found" message when applicable

### Admin Interface

- **Dashboard**: Overview with key metrics and alerts
- **Product Management**: CRUD operations with bulk actions
- **User Management**: Role assignment and user monitoring
- **Order Processing**: Order queue with status management
- **Reports**: Charts and downloadable reports

### Supplier Interface

- **Supply Dashboard**: Recent supplies and pending orders
- **Product Supply**: Form to add new supplies
- **Inventory View**: Current stock levels for their products
- **Supply History**: Track all previous supplies

### Staff Interface

- **Order Processing**: Assist with order fulfillment
- **Inventory Updates**: Update stock levels
- **Customer Service**: Handle customer inquiries

### Customer Interface

- **Account Dashboard**: Order history and profile management
- **Wishlist**: Save products for later
- **Order Tracking**: Real-time order status
- **Address Management**: Multiple delivery addresses

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up project structure and database
- [ ] Implement authentication system with role-based access
- [ ] Create basic product and category models
- [ ] Build public product browsing (no auth required)
- [ ] Implement basic cart functionality

### Phase 2: Core Inventory (Week 3-4)

- [ ] Product management system with multiple units
- [ ] Supply management for suppliers
- [ ] Stock tracking and movement logging
- [ ] Inventory alerts and reporting

### Phase 3: Order Management (Week 5-6)

- [ ] Complete order processing workflow
- [ ] Order tracking and status updates
- [ ] Customer order history

### Phase 4: Staff & Supplier Features (Week 7-8)

- [ ] Staff order processing interface
- [ ] Staff inventory management tools
- [ ] Supplier supply management dashboard
- [ ] Supplier product supply workflows
- [ ] Staff customer service tools

### Phase 5: Advanced Features (Week 9-10)

- [ ] Advanced reporting and analytics
- [ ] Bulk operations and data import
- [ ] Mobile optimization
- [ ] Performance optimization

### Phase 6: Testing & Deployment (Week 11-12)

- [ ] Comprehensive testing
- [ ] User acceptance testing
- [ ] Production deployment
- [ ] Training and documentation

---

## 📱 Mobile Optimization

### Touch-Friendly Design

- Large touch targets (44px minimum)
- Swipe gestures for product browsing
- Pull-to-refresh functionality
- Optimized keyboard input

### Performance Considerations

- Image lazy loading
- Progressive web app features
- Offline cart functionality
- Fast loading times

---

## 🔐 Security Considerations

### Authentication & Authorization

- JWT tokens with role-based permissions
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- Secure session management

### Data Protection

- Input validation and sanitization
- File upload security
- Environment variables for sensitive data
- Regular security audits

---

## Recent Updates

### Authentication System Consolidation (September 2025)

1. **Unified Authentication Components**: Consolidated all authentication components (Login, Register, ForgotPassword, ResetPassword) into a single [auth](file://c:\Users\chine\Documents\coding\Salehostel%20Supermart\backend\src\routes\cart.js#L2-L2) folder to eliminate duplication across admin, customer, supplier, and staff sections.

2. **Simplified Routing**: Updated AppRouter.jsx to use common authentication components for all user roles, reducing code duplication and maintenance overhead.

3. **Removed Redundant Components**: Deleted duplicate authentication components from customer, admin, supplier, and staff sections to maintain a single source of truth for authentication UI.

4. **Added Logout Endpoint**: Implemented POST /api/auth/logout endpoint to properly handle user logout across all roles.

### Search Functionality Changes (September 2025)

1. **Real-time Search Implementation**: Added instant search results in the header dropdown as users type, providing immediate feedback without page navigation.

2. **Search Results Display**: Implemented "No results found" message in both desktop and mobile search dropdowns when no products match the search query.

3. **Removed Dedicated Search Page**: Eliminated the separate search results page in favor of an integrated dropdown experience that maintains user context.

4. **View All Results Option**: Added a "View all results" button in the search dropdown for users who want to see a full page of search results.

5. **Mobile Optimization**: Removed search bar from header in small screen resolutions and implemented a more mobile-friendly search experience.

### Payment System Update (September 2025)

1. **Removed Paystack Integration**: Eliminated Paystack payment gateway in favor of manual payment processing.
2. **Manual Payment Processing**: Implemented manual payment handling for order processing.

### Error Page Consolidation (September 2025)

1. **Unified Error Pages**: Consolidated role-specific error pages into a single general error page to eliminate duplication and maintain consistency across all user roles.

2. **Removed Redundant Components**: Deleted duplicate NotFound.jsx components from customer, admin, supplier, and staff sections to maintain a single source of truth for error handling.

### Route Structure Simplification (September 2025)

1. **Merged Customer and Public Routes**: Consolidated customer-specific product browsing routes with public routes since both authenticated and unauthenticated users can access product information through the same interfaces.

2. **Removed Redundant Product Pages**: Eliminated duplicate product detail pages in favor of category-based product browsing to simplify the user experience and reduce code duplication.

3. **Streamlined Navigation**: Simplified the routing structure by removing unnecessary nested routes while maintaining access to customer-specific features like account management and order tracking.

### Implementation Roadmap Update (September 2025)

1. **Added Dedicated Phase for Staff and Supplier Features**: Created a new Phase 4 specifically for implementing staff order processing tools and supplier supply management features to ensure these user roles have the functionality they need.

2. **Extended Timeline**: Adjusted the implementation roadmap to accommodate the additional staff and supplier functionality, extending the project timeline to 12 weeks.
