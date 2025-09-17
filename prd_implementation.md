# SalesHostel Inventory Management System - PRD & Implementation Guide

## 🎯 Product Overview

### Vision Statement
Build a comprehensive Inventory Management System for SalesHostel - a hostel-based retail business specializing in staple foods, groceries, convenience foods, and personal care products. The system will automate stock tracking, manage supplier relationships, facilitate staff operations, and provide seamless customer ordering with real-time inventory management.

### Business Context
**SalesHostel** operates from NDDC Hostel (Shop 12), selling essential items to hostel residents and local customers. The business focuses on:
- Staple foods (Rice, Garri, Beans, etc.)
- Convenience foods (Noodles, Spaghetti, etc.)
- Groceries (Milk, Cereals, Oils, etc.)
- Personal care products and cleaning agents
- Various packaging sizes (cups, bags, cartons, etc.)

### Target Users
- **Admin**: Full system control, role assignment, financial oversight, reporting
- **Supplier**: Product supply management, inventory restocking, delivery tracking
- **Staff**: Daily operations, customer service, order processing, stock updates
- **Customer**: Product browsing, ordering, account management, order tracking

---

## 📋 Core Features & Requirements

### 1. Role-Based Access Control

#### Admin Role
- **User Management**: Assign roles to suppliers and staff
- **Product Management**: Complete CRUD operations for products
- **Supplier Management**: Add, edit, delete suppliers
- **Purchase Orders**: Create and manage orders to suppliers
- **Financial Reports**: Revenue, profit/loss, inventory valuation
- **System Configuration**: Categories, pricing, discounts
- **Stock Tracking**: Monitor all inventory movements
- **Order Management**: View and manage all customer orders

#### Supplier Role
- **Product Supply**: Add new products to inventory
- **Stock Replenishment**: Update quantities for existing products
- **Supply History**: Track all supplies made
- **Price Updates**: Update wholesale/supply prices
- **Delivery Scheduling**: Manage delivery dates and times
- **Payment Tracking**: View payment status for supplies

#### Staff Role
- **Customer Service**: Process customer orders
- **Inventory Updates**: Update stock levels during sales
- **Daily Operations**: Handle cash sales, customer inquiries
- **Order Fulfillment**: Pack and prepare customer orders
- **Stock Alerts**: Monitor low stock situations
- **Basic Reporting**: Daily sales, stock movements

#### Customer Role
- **Product Browsing**: View available products by category
- **Shopping Cart**: Add items with specific quantities/packages
- **Order Placement**: Place orders for pickup/delivery
- **Order Tracking**: Monitor order status
- **Account Management**: Profile, order history, preferences
- **Favorites**: Save frequently purchased items

### 2. Product Management System

#### Product Structure
```javascript
Product Schema:
{
  name: String,                    // e.g., "Rice"
  productGroup: String,            // e.g., "Staple Foods"
  category: ObjectId,              // Reference to category
  description: String,
  tags: [String],                  // e.g., ["best quality", "white"]
  
  // Pricing & Packaging
  variants: [{
    packageType: String,           // e.g., "Black Rubber", "Cup", "Carton"
    price: Number,                 // Selling price
    costPrice: Number,             // Purchase/supply price
    quantity: Number,              // Current stock
    minStockLevel: Number,         // Reorder point
    unit: String,                  // e.g., "piece", "kg", "liter"
    isAvailable: Boolean
  }],
  
  // Business Info
  supplier: ObjectId,              // Primary supplier
  image: String,                   // Product image URL
  featured: Boolean,               // Featured on homepage
  isActive: Boolean,
  
  // Tracking
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

#### Product Categories
Based on the provided product list:
1. **Staple Foods** - Rice, Garri, Beans, Semovita, Melon
2. **Frozen Foods** - Chicken wings, Chicken lap
3. **Convenience Foods** - Noodles, Spaghetti, Pasta
4. **Sauces/Spices** - Tomato paste, Maggi, Curry, Thyme
5. **Cooking Oils** - Palm oil, Groundnut oil, Power oil
6. **Groceries** - Milk, Cereals, Butter, Sugar
7. **Biscuits** - Various biscuit brands and sizes
8. **Cleaning Agents** - Detergents, Soaps, Disinfectants
9. **Personal Care** - Toothpaste, Sanitary pads, Body care
10. **Stationery** - Notebooks, Pens, School supplies

### 3. Supply Management System

#### New Supply Process
```javascript
Supply Schema:
{
  supplierName: String,
  supplyItems: [{
    productName: String,           // e.g., "Rice"
    packageType: String,           // e.g., "Black Rubber"
    quantitySupplied: Number,      // Number of packages
    unitCostPrice: Number,         // Cost per package
    totalCost: Number,             // Calculated total
    expiryDate: Date               // If applicable
  }],
  totalAmount: Number,
  supplyDate: Date,                // Auto-recorded
  supplyTime: Date,                // Auto-recorded
  receivedBy: ObjectId,            // Staff/Admin who received
  status: String,                  // "Pending", "Received", "Verified"
  notes: String,
  paymentStatus: String,           // "Pending", "Partial", "Paid"
  createdAt: Date
}
```

### 4. Purchase Order System

#### Admin Purchase Orders
```javascript
PurchaseOrder Schema:
{
  orderNumber: String,             // Auto-generated
  supplier: ObjectId,
  orderItems: [{
    productName: String,
    packageType: String,
    quantityRequested: Number,
    unitPrice: Number,
    totalPrice: Number
  }],
  totalAmount: Number,
  orderDate: Date,
  expectedDelivery: Date,
  status: String,                  // "Draft", "Sent", "Confirmed", "Delivered"
  notes: String,
  createdBy: ObjectId,
  approvedBy: ObjectId,
  createdAt: Date
}
```

### 5. Customer Order Management

#### Customer Order Structure
```javascript
CustomerOrder Schema:
{
  orderNumber: String,
  customer: {
    name: String,
    whatsappNumber: String,
    callNumber: String,
    email: String
  },
  orderItems: [{
    product: ObjectId,
    productName: String,
    packageType: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number
  }],
  subtotal: Number,
  deliveryFee: Number,
  totalAmount: Number,
  orderType: String,               // "Pickup", "Delivery"
  deliveryAddress: String,
  status: String,                  // "Pending", "Confirmed", "Preparing", "Ready", "Delivered"
  paymentMethod: String,           // "Cash", "Transfer", "POS"
  paymentStatus: String,           // "Pending", "Paid"
  orderDate: Date,
  estimatedReady: Date,
  actualReady: Date,
  notes: String,
  handledBy: ObjectId              // Staff member
}
```

### 6. Stock Tracking System

#### Stock Movement Recording
```javascript
StockMovement Schema:
{
  product: ObjectId,
  packageType: String,
  movementType: String,            // "Supply", "Sale", "Adjustment", "Return"
  quantityBefore: Number,
  quantityChanged: Number,         // Positive for increase, negative for decrease
  quantityAfter: Number,
  reference: String,               // Order ID, Supply ID, etc.
  reason: String,
  performedBy: ObjectId,
  date: Date,
  notes: String
}
```

### 7. Reporting System

#### Admin Reports
- **Sales Report**: Daily, weekly, monthly sales analysis
- **Inventory Report**: Current stock levels, low stock alerts
- **Supplier Report**: Supply history, payment status
- **Profit/Loss Report**: Revenue vs costs analysis
- **Product Performance**: Best/worst selling items
- **Customer Analysis**: Order patterns, frequent customers

#### Staff Reports
- **Daily Sales Summary**: Sales handled by staff member
- **Stock Alerts**: Items requiring attention
- **Order Status**: Current orders being processed

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer + Cloudinary
- **Real-time**: Socket.io (for live updates)
- **Payment**: Flutterwave/Paystack integration

---

## 📁 Updated Folder Structure

### Backend Structure
```
saleshotel-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── admin/
│   │   │   ├── adminAuthController.js
│   │   │   ├── adminProductController.js
│   │   │   ├── adminSupplierController.js
│   │   │   ├── adminPurchaseController.js
│   │   │   ├── adminOrderController.js
│   │   │   ├── adminReportController.js
│   │   │   └── adminUserController.js
│   │   ├── supplier/
│   │   │   ├── supplierAuthController.js
│   │   │   ├── supplierProductController.js
│   │   │   ├── supplierSupplyController.js
│   │   │   └── supplierReportController.js
│   │   ├── staff/
│   │   │   ├── staffAuthController.js
│   │   │   ├── staffOrderController.js
│   │   │   ├── staffInventoryController.js
│   │   │   └── staffReportController.js
│   │   └── customer/
│   │       ├── customerAuthController.js
│   │       ├── customerProductController.js
│   │       ├── customerOrderController.js
│   │       └── customerCartController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── adminAuth.js
│   │   ├── supplierAuth.js
│   │   ├── staffAuth.js
│   │   ├── customerAuth.js
│   │   ├── upload.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Supply.js
│   │   ├── PurchaseOrder.js
│   │   ├── CustomerOrder.js
│   │   ├── Cart.js
│   │   ├── Supplier.js
│   │   └── StockMovement.js
│   ├── routes/
│   │   ├── admin/
│   │   ├── supplier/
│   │   ├── staff/
│   │   └── customer/
│   ├── services/
│   │   ├── inventoryService.js
│   │   ├── notificationService.js
│   │   ├── reportService.js
│   │   └── paymentService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── validators.js
│   └── app.js
```

### Frontend Structure (Complete File Breakdown)
```
saleshotel-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── images/
│       ├── logo.png
│       ├── placeholder-product.jpg
│       └── categories/
│           ├── staple-foods.jpg
│           ├── frozen-foods.jpg
│           ├── convenience-foods.jpg
│           ├── cleaning-agents.jpg
│           └── personal-care.jpg
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── AdminHeader.jsx
│   │   │   │   ├── AdminSidebar.jsx
│   │   │   │   ├── AdminBreadcrumb.jsx
│   │   │   │   └── AdminFooter.jsx
│   │   │   ├── forms/
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   ├── ProductVariantForm.jsx
│   │   │   │   ├── PurchaseOrderForm.jsx
│   │   │   │   ├── SupplierForm.jsx
│   │   │   │   ├── CategoryForm.jsx
│   │   │   │   ├── UserForm.jsx
│   │   │   │   └── RoleAssignmentForm.jsx
│   │   │   ├── tables/
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   ├── ProductVariantTable.jsx
│   │   │   │   ├── InventoryTable.jsx
│   │   │   │   ├── CustomerOrderTable.jsx
│   │   │   │   ├── PurchaseOrderTable.jsx
│   │   │   │   ├── SupplierTable.jsx
│   │   │   │   ├── SupplyHistoryTable.jsx
│   │   │   │   ├── StaffTable.jsx
│   │   │   │   ├── CustomerTable.jsx
│   │   │   │   └── UserTable.jsx
│   │   │   ├── charts/
│   │   │   │   ├── RevenueChart.jsx
│   │   │   │   ├── SalesChart.jsx
│   │   │   │   ├── InventoryChart.jsx
│   │   │   │   ├── CategoryPerformanceChart.jsx
│   │   │   │   ├── SupplierPerformanceChart.jsx
│   │   │   │   └── ProfitMarginChart.jsx
│   │   │   ├── modals/
│   │   │   │   ├── ProductModal.jsx
│   │   │   │   ├── ProductVariantModal.jsx
│   │   │   │   ├── StockAdjustmentModal.jsx
│   │   │   │   ├── OrderStatusModal.jsx
│   │   │   │   ├── SupplierModal.jsx
│   │   │   │   ├── UserRoleModal.jsx
│   │   │   │   └── DeleteConfirmationModal.jsx
│   │   │   ├── cards/
│   │   │   │   ├── DashboardStatsCard.jsx
│   │   │   │   ├── RevenueCard.jsx
│   │   │   │   ├── InventoryStatsCard.jsx
│   │   │   │   ├── OrderStatsCard.jsx
│   │   │   │   └── SupplierStatsCard.jsx
│   │   │   └── alerts/
│   │   │       ├── LowStockAlert.jsx
│   │   │       ├── SystemAlert.jsx
│   │   │       ├── PaymentAlert.jsx
│   │   │       └── OrderAlert.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   ├── AdminProfile.jsx
│   │   │   │   └── ChangePassword.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── DashboardOverview.jsx
│   │   │   │   └── QuickActions.jsx
│   │   │   ├── products/
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   ├── ProductVariants.jsx
│   │   │   │   ├── CategoryManagement.jsx
│   │   │   │   └── BulkProductImport.jsx
│   │   │   ├── suppliers/
│   │   │   │   ├── SupplierList.jsx
│   │   │   │   ├── SupplierDetails.jsx
│   │   │   │   ├── AddSupplier.jsx
│   │   │   │   ├── EditSupplier.jsx
│   │   │   │   ├── SupplierPerformance.jsx
│   │   │   │   └── SupplierPayments.jsx
│   │   │   ├── purchases/
│   │   │   │   ├── PurchaseOrderList.jsx
│   │   │   │   ├── CreatePurchaseOrder.jsx
│   │   │   │   ├── PurchaseOrderDetails.jsx
│   │   │   │   ├── EditPurchaseOrder.jsx
│   │   │   │   ├── SupplyHistory.jsx
│   │   │   │   └── PurchaseAnalytics.jsx
│   │   │   ├── inventory/
│   │   │   │   ├── InventoryOverview.jsx
│   │   │   │   ├── StockMovements.jsx
│   │   │   │   ├── StockAdjustments.jsx
│   │   │   │   ├── LowStockAlerts.jsx
│   │   │   │   ├── InventoryValuation.jsx
│   │   │   │   └── StockTaking.jsx
│   │   │   ├── orders/
│   │   │   │   ├── CustomerOrderList.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── OrderFulfillment.jsx
│   │   │   │   ├── RefundManagement.jsx
│   │   │   │   ├── OrderAnalytics.jsx
│   │   │   │   └── OrderHistory.jsx
│   │   │   ├── reports/
│   │   │   │   ├── SalesReport.jsx
│   │   │   │   ├── InventoryReport.jsx
│   │   │   │   ├── ProfitLossReport.jsx
│   │   │   │   ├── CustomerReport.jsx
│   │   │   │   ├── SupplierReport.jsx
│   │   │   │   ├── ProductPerformanceReport.jsx
│   │   │   │   ├── StaffPerformanceReport.jsx
│   │   │   │   └── CustomReports.jsx
│   │   │   └── users/
│   │   │       ├── UserManagement.jsx
│   │   │       ├── StaffList.jsx
│   │   │       ├── CustomerList.jsx
│   │   │       ├── SupplierUserList.jsx
│   │   │       ├── RoleAssignment.jsx
│   │   │       ├── UserPermissions.jsx
│   │   │       └── UserActivity.jsx
│   │   ├── hooks/
│   │   │   ├── useAdminAuth.js
│   │   │   ├── useAdminProducts.js
│   │   │   ├── useAdminSuppliers.js
│   │   │   ├── useAdminInventory.js
│   │   │   ├── useAdminOrders.js
│   │   │   ├── useAdminReports.js
│   │   │   ├── useAdminUsers.js
│   │   │   └── useAdminDashboard.js
│   │   └── stores/
│   │       ├── adminAuthStore.js
│   │       ├── adminProductStore.js
│   │       ├── adminSupplierStore.js
│   │       ├── adminInventoryStore.js
│   │       ├── adminOrderStore.js
│   │       ├── adminUserStore.js
│   │       ├── adminReportStore.js
│   │       └── adminDashboardStore.js
│   │
│   ├── supplier/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── SupplierLayout.jsx
│   │   │   │   ├── SupplierHeader.jsx
│   │   │   │   ├── SupplierSidebar.jsx
│   │   │   │   └── SupplierFooter.jsx
│   │   │   ├── forms/
│   │   │   │   ├── SupplyForm.jsx
│   │   │   │   ├── SupplyItemForm.jsx
│   │   │   │   ├── ProductPriceUpdateForm.jsx
│   │   │   │   ├── DeliveryScheduleForm.jsx
│   │   │   │   └── PaymentRequestForm.jsx
│   │   │   ├── tables/
│   │   │   │   ├── SupplyHistoryTable.jsx
│   │   │   │   ├── ProductSuppliedTable.jsx
│   │   │   │   ├── PurchaseOrderTable.jsx
│   │   │   │   ├── PaymentHistoryTable.jsx
│   │   │   │   └── DeliveryScheduleTable.jsx
│   │   │   ├── cards/
│   │   │   │   ├── SupplyStatsCard.jsx
│   │   │   │   ├── PaymentStatsCard.jsx
│   │   │   │   ├── ProductStatsCard.jsx
│   │   │   │   └── PerformanceCard.jsx
│   │   │   ├── modals/
│   │   │   │   ├── SupplyConfirmationModal.jsx
│   │   │   │   ├── OrderAcceptanceModal.jsx
│   │   │   │   ├── PaymentStatusModal.jsx
│   │   │   │   └── DeliveryModal.jsx
│   │   │   └── alerts/
│   │   │       ├── OrderAlert.jsx
│   │   │       ├── PaymentAlert.jsx
│   │   │       └── DeliveryAlert.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── SupplierLogin.jsx
│   │   │   │   ├── SupplierProfile.jsx
│   │   │   │   └── CompanySettings.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── SupplierDashboard.jsx
│   │   │   │   ├── SupplyOverview.jsx
│   │   │   │   └── QuickSupply.jsx
│   │   │   ├── products/
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── UpdatePrices.jsx
│   │   │   │   └── ProductPerformance.jsx
│   │   │   ├── supplies/
│   │   │   │   ├── SupplyList.jsx
│   │   │   │   ├── CreateSupply.jsx
│   │   │   │   ├── SupplyDetails.jsx
│   │   │   │   ├── SupplyHistory.jsx
│   │   │   │   └── BulkSupply.jsx
│   │   │   ├── orders/
│   │   │   │   ├── PurchaseOrderList.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── OrderConfirmation.jsx
│   │   │   │   ├── DeliverySchedule.jsx
│   │   │   │   └── OrderHistory.jsx
│   │   │   ├── payments/
│   │   │   │   ├── PaymentOverview.jsx
│   │   │   │   ├── PaymentHistory.jsx
│   │   │   │   ├── OutstandingPayments.jsx
│   │   │   │   └── PaymentRequests.jsx
│   │   │   └── reports/
│   │   │       ├── SupplyReport.jsx
│   │   │       ├── PaymentReport.jsx
│   │   │       ├── ProductReport.jsx
│   │   │       └── PerformanceReport.jsx
│   │   ├── hooks/
│   │   │   ├── useSupplierAuth.js
│   │   │   ├── useSupplierProducts.js
│   │   │   ├── useSupplierSupplies.js
│   │   │   ├── useSupplierOrders.js
│   │   │   ├── useSupplierPayments.js
│   │   │   └── useSupplierReports.js
│   │   └── stores/
│   │       ├── supplierAuthStore.js
│   │       ├── supplierProductStore.js
│   │       ├── supplierSupplyStore.js
│   │       ├── supplierOrderStore.js
│   │       ├── supplierPaymentStore.js
│   │       └── supplierReportStore.js
│   │
│   ├── staff/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── StaffLayout.jsx
│   │   │   │   ├── StaffHeader.jsx
│   │   │   │   ├── StaffSidebar.jsx
│   │   │   │   └── StaffFooter.jsx
│   │   │   ├── forms/
│   │   │   │   ├── QuickSaleForm.jsx
│   │   │   │   ├── OrderStatusForm.jsx
│   │   │   │   ├── StockUpdateForm.jsx
│   │   │   │   ├── CustomerOrderForm.jsx
│   │   │   │   └── InventoryAdjustmentForm.jsx
│   │   │   ├── tables/
│   │   │   │   ├── ActiveOrderTable.jsx
│   │   │   │   ├── CompletedOrderTable.jsx
│   │   │   │   ├── InventoryTable.jsx
│   │   │   │   ├── DailySalesTable.jsx
│   │   │   │   └── StockMovementTable.jsx
│   │   │   ├── cards/
│   │   │   │   ├── OrderStatsCard.jsx
│   │   │   │   ├── SalesStatsCard.jsx
│   │   │   │   ├── InventoryStatsCard.jsx
│   │   │   │   └── PerformanceCard.jsx
│   │   │   ├── widgets/
│   │   │   │   ├── OrderQueue.jsx
│   │   │   │   ├── InventoryAlerts.jsx
│   │   │   │   ├── QuickActions.jsx
│   │   │   │   └── CustomerService.jsx
│   │   │   ├── modals/
│   │   │   │   ├── OrderDetailsModal.jsx
│   │   │   │   ├── StockUpdateModal.jsx
│   │   │   │   ├── CustomerInfoModal.jsx
│   │   │   │   └── OrderCancellationModal.jsx
│   │   │   └── alerts/
│   │   │       ├── UrgentOrderAlert.jsx
│   │   │       ├── LowStockAlert.jsx
│   │   │       ├── SystemAlert.jsx
│   │   │       └── CustomerAlert.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── StaffLogin.jsx
│   │   │   │   ├── StaffProfile.jsx
│   │   │   │   └── ShiftSettings.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── StaffDashboard.jsx
│   │   │   │   ├── OrderOverview.jsx
│   │   │   │   └── DailyTasks.jsx
│   │   │   ├── orders/
│   │   │   │   ├── ActiveOrders.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── OrderProcessing.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   ├── QuickSale.jsx
│   │   │   │   └── CustomerOrders.jsx
│   │   │   ├── inventory/
│   │   │   │   ├── InventoryView.jsx
│   │   │   │   ├── StockUpdate.jsx
│   │   │   │   ├── StockAlerts.jsx
│   │   │   │   ├── StockMovements.jsx
│   │   │   │   └── InventorySearch.jsx
│   │   │   ├── customers/
│   │   │   │   ├── CustomerService.jsx
│   │   │   │   ├── CustomerOrders.jsx
│   │   │   │   ├── CustomerSupport.jsx
│   │   │   │   └── CustomerFeedback.jsx
│   │   │   └── reports/
│   │   │       ├── DailySalesReport.jsx
│   │   │       ├── ShiftReport.jsx
│   │   │       ├── InventoryReport.jsx
│   │   │       └── CustomerReport.jsx
│   │   ├── hooks/
│   │   │   ├── useStaffAuth.js
│   │   │   ├── useStaffOrders.js
│   │   │   ├── useStaffInventory.js
│   │   │   ├── useStaffSales.js
│   │   │   ├── useStaffCustomers.js
│   │   │   └── useStaffReports.js
│   │   └── stores/
│   │       ├── staffAuthStore.js
│   │       ├── staffOrderStore.js
│   │       ├── staffInventoryStore.js
│   │       ├── staffSalesStore.js
│   │       ├── staffCustomerStore.js
│   │       └── staffReportStore.js
│   │
│   ├── customer/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── CustomerLayout.jsx
│   │   │   │   ├── CustomerHeader.jsx
│   │   │   │   ├── CustomerNavbar.jsx
│   │   │   │   ├── CustomerFooter.jsx
│   │   │   │   ├── MobileMenu.jsx
│   │   │   │   └── MobileHeader.jsx
│   │   │   ├── shop/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductFilter.jsx
│   │   │   │   ├── ProductSearch.jsx
│   │   │   │   ├── ProductSort.jsx
│   │   │   │   ├── CategoryFilter.jsx
│   │   │   │   ├── PackageSelector.jsx
│   │   │   │   ├── PriceFilter.jsx
│   │   │   │   └── FeaturedProducts.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   ├── CartSidebar.jsx
│   │   │   │   ├── CartDropdown.jsx
│   │   │   │   ├── MiniCart.jsx
│   │   │   │   ├── CartIcon.jsx
│   │   │   │   └── EmptyCart.jsx
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutForm.jsx
│   │   │   │   ├── CustomerInfoForm.jsx
│   │   │   │   ├── DeliveryOptionsForm.jsx
│   │   │   │   ├── PaymentMethodForm.jsx
│   │   │   │   ├── OrderSummary.jsx
│   │   │   │   ├── OrderConfirmation.jsx
│   │   │   │   └── WhatsAppNotification.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderCard.jsx
│   │   │   │   ├── OrderStatus.jsx
│   │   │   │   ├── OrderTracking.jsx
│   │   │   │   ├── OrderActions.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   └── ReorderButton.jsx
│   │   │   ├── account/
│   │   │   │   ├── ProfileForm.jsx
│   │   │   │   ├── AddressForm.jsx
│   │   │   │   ├── PasswordChangeForm.jsx
│   │   │   │   ├── ContactForm.jsx
│   │   │   │   └── PreferencesForm.jsx
│   │   │   ├── favorites/
│   │   │   │   ├── FavoritesList.jsx
│   │   │   │   ├── FavoriteButton.jsx
│   │   │   │   └── QuickReorder.jsx
│   │   │   └── common/
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       ├── SuccessMessage.jsx
│   │   │       ├── Pagination.jsx
│   │   │       ├── Rating.jsx
│   │   │       ├── CategoryBadge.jsx
│   │   │       ├── PriceBadge.jsx
│   │   │       └── StockIndicator.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── CustomerLogin.jsx
│   │   │   │   ├── CustomerRegister.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── ResetPassword.jsx
│   │   │   │   └── EmailVerification.jsx
│   │   │   ├── home/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── FeaturedProducts.jsx
│   │   │   │   ├── Categories.jsx
│   │   │   │   └── SpecialOffers.jsx
│   │   │   ├── shop/
│   │   │   │   ├── ProductCatalog.jsx
│   │   │   │   ├── ProductPage.jsx
│   │   │   │   ├── CategoryPage.jsx
│   │   │   │   ├── SearchResults.jsx
│   │   │   │   ├── PackageSelection.jsx
│   │   │   │   └── ProductComparison.jsx
│   │   │   ├── cart/
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── OrderConfirmation.jsx
│   │   │   │   └── PaymentSuccess.jsx
│   │   │   ├── account/
│   │   │   │   ├── CustomerProfile.jsx
│   │   │   │   ├── EditProfile.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   ├── AddressBook.jsx
│   │   │   │   ├── ChangePassword.jsx
│   │   │   │   ├── Favorites.jsx
│   │   │   │   └── AccountSettings.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── TrackOrder.jsx
│   │   │   │   ├── OrderSupport.jsx
│   │   │   │   └── ReorderPage.jsx
│   │   │   └── support/
│   │   │       ├── ContactUs.jsx
│   │   │       ├── FAQ.jsx
│   │   │       ├── Help.jsx
│   │   │       └── WhatsAppSupport.jsx
│   │   ├── hooks/
│   │   │   ├── useCustomerAuth.js
│   │   │   ├── useProducts.js
│   │   │   ├── useCart.js
│   │   │   ├── useOrders.js
│   │   │   ├── useProfile.js
│   │   │   ├── useFavorites.js
│   │   │   ├── useSearch.js
│   │   │   └── useCheckout.js
│   │   └── stores/
│   │       ├── customerAuthStore.js
│   │       ├── productStore.js
│   │       ├── cartStore.js
│   │       ├── orderStore.js
│   │       ├── profileStore.js
│   │       ├── favoriteStore.js
│   │       ├── searchStore.js
│   │       └── checkoutStore.js
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── TextArea.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── Checkbox.jsx
│   │   │   │   ├── Radio.jsx
│   │   │   │   ├── Switch.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Dialog.jsx
│   │   │   │   ├── Dropdown.jsx
│   │   │   │   ├── Tooltip.jsx
│   │   │   │   ├── Popover.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Notification.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Tabs.jsx
│   │   │   │   ├── Accordion.jsx
│   │   │   │   ├── Slider.jsx
│   │   │   │   ├── Progress.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── Divider.jsx
│   │   │   │   └── Skeleton.jsx
│   │   │   ├── forms/
│   │   │   │   ├── FormField.jsx
│   │   │   │   ├── FormGroup.jsx
│   │   │   │   ├── FormLabel.jsx
│   │   │   │   ├── FormError.jsx
│   │   │   │   ├── FormSuccess.jsx
│   │   │   │   ├── FileUpload.jsx
│   │   │   │   ├── ImageUpload.jsx
│   │   │   │   ├── DatePicker.jsx
│   │   │   │   ├── TimePicker.jsx
│   │   │   │   ├── SearchInput.jsx
│   │   │   │   └── AutoComplete.jsx
│   │   │   ├── navigation/
│   │   │   │   ├── Breadcrumb.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── Steps.jsx
│   │   │   │   └── BackButton.jsx
│   │   │   ├── feedback/
│   │   │   │   ├── LoadingState.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ErrorState.jsx
│   │   │   │   ├── SuccessState.jsx
│   │   │   │   └── ConfirmationDialog.jsx
│   │   │   └──

---

## 🔗 API Endpoints

### Admin Endpoints
```
# User Management
POST   /api/admin/users                    # Create user (supplier/staff)
GET    /api/admin/users                    # Get all users
PUT    /api/admin/users/:id/role           # Assign role
DELETE /api/admin/users/:id               # Delete user

# Product Management
GET    /api/admin/products                 # Get all products
POST   /api/admin/products                 # Create product
PUT    /api/admin/products/:id             # Update product
DELETE /api/admin/products/:id             # Delete product

# Supplier Management
GET    /api/admin/suppliers                # Get all suppliers
POST   /api/admin/suppliers                # Create supplier
PUT    /api/admin/suppliers/:id            # Update supplier

# Purchase Orders
GET    /api/admin/purchase-orders          # Get purchase orders
POST   /api/admin/purchase-orders          # Create purchase order
PUT    /api/admin/purchase-orders/:id      # Update purchase order
DELETE /api/admin/purchase-orders/:id      # Delete purchase order

# Reports
GET    /api/admin/reports/sales            # Sales reports
GET    /api/admin/reports/inventory        # Inventory reports
GET    /api/admin/reports/suppliers        # Supplier reports
```

### Supplier Endpoints
```
# Product Supply
POST   /api/supplier/supplies              # Create new supply
GET    /api/supplier/supplies              # Get supply history
PUT    /api/supplier/supplies/:id          # Update supply

# Products
GET    /api/supplier/products              # Get products I supply
PUT    /api/supplier/products/:id/price    # Update product price

# Orders from Admin
GET    /api/supplier/orders                # Get purchase orders from admin
PUT    /api/supplier/orders/:id/confirm    # Confirm order
```

### Staff Endpoints
```
# Customer Orders
GET    /api/staff/orders                   # Get customer orders
PUT    /api/staff/orders/:id/status        # Update order status
POST   /api/staff/orders                   # Create walk-in order

# Inventory
GET    /api/staff/inventory                # View inventory
PUT    /api/staff/inventory/:id            # Update stock levels
GET    /api/staff/inventory/alerts         # Low stock alerts

# Reports
GET    /api/staff/reports/daily            # Daily sales report
```

### Customer Endpoints
```
# Authentication
POST   /api/customer/auth/register         # Customer registration
POST   /api/customer/auth/login            # Customer login

# Products
GET    /api/customer/products              # Browse products
GET    /api/customer/products/:id          # Get product details
GET    /api/customer/categories            # Get categories

# Shopping
GET    /api/customer/cart                  # Get cart
POST   /api/customer/cart/add              # Add to cart
PUT    /api/customer/cart/update           # Update cart
DELETE /api/customer/cart/remove           # Remove from cart

# Orders
POST   /api/customer/orders                # Place order
GET    /api/customer/orders                # Get order history
GET    /api/customer/orders/:id            # Get order details
```

---

## 💾 Database Schema

### User Schema (4 Roles)
```javascript
{
  firstName: String,
  lastName: String,
  whatsappNumber: String,
  callNumber: String,
  email: String (unique),
  password: String (hashed),
  role: {
    type: String,
    enum: ['admin', 'supplier', 'staff', 'customer'],
    required: true
  },
  
  // Role-specific fields
  supplierInfo: {
    companyName: String,
    suppliedCategories: [String],
    paymentTerms: String,
    isActive: Boolean
  },
  
  staffInfo: {
    employeeId: String,
    shiftTimes: String,
    permissions: [String],
    isActive: Boolean
  },
  
  // Customer-specific
  deliveryAddresses: [String],
  favoriteProducts: [ObjectId],
  
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema (Multi-variant)
```javascript
{
  name: String,                    // "Rice"
  productGroup: String,            // "Staple Foods"
  category: ObjectId,
  description: String,
  tags: [String],
  
  variants: [{
    packageType: String,           // "Black Rubber", "Cup", etc.
    price: Number,
    costPrice: Number,
    currentStock: Number,
    minStockLevel: Number,
    maxStockLevel: Number,
    unit: String,
    isAvailable: { type: Boolean, default: true }
  }],
  
  supplier: ObjectId,
  images: [String],
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Supply Schema
```javascript
{
  supplierName: String,
  supplier: ObjectId,
  supplyItems: [{
    product: ObjectId,
    productName: String,
    packageType: String,
    quantitySupplied: Number,
    unitCostPrice: Number,
    totalCost: Number,
    expiryDate: Date
  }],
  totalAmount: Number,
  supplyDate: { type: Date, default: Date.now },
  supplyTime: { type: Date, default: Date.now },
  receivedBy: ObjectId,
  status: {
    type: String,
    enum: ['Pending', 'Received', 'Verified'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Partial', 'Paid'],
    default: 'Pending'
  },
  notes: String,
  createdAt: Date
}
```

### Customer Order Schema
```javascript
{
  orderNumber: String (auto-generated),
  customer: ObjectId,
  customerInfo: {
    name: String,
    whatsappNumber: String,
    callNumber: String,
    email: String
  },
  orderItems: [{
    product: ObjectId,
    productName: String,
    packageType: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number
  }],
  subtotal: Number,
  deliveryFee: { type: Number, default: 0 },
  totalAmount: Number,
  
  orderType: {
    type: String,
    enum: ['Pickup', 'Delivery'],
    default: 'Pickup'
  },
  deliveryAddress: String,
  
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Transfer', 'POS'],
    default: 'Cash'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  
  orderDate: { type: Date, default: Date.now },
  estimatedReady: Date,
  actualReady: Date,
  notes: String,
  handledBy: ObjectId,
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Role-Specific UI Components

### Admin Dashboard
- **Revenue Overview**: Daily, weekly, monthly earnings
- **Inventory Status**: Stock levels, low stock alerts
- **Order Management**: All customer orders across staff
- **Supplier Performance**: Supply history, payment status
- **User Management**: Role assignment interface
- **Product Management**: CRUD operations with variants

### Supplier Dashboard
- **Supply History**: All supplies made with status
- **Product Catalog**: Products they supply with current prices
- **Order Requests**: Purchase orders from admin
- **Payment Tracking**: Outstanding payments, payment history
- **Performance Metrics**: Supply frequency, reliability scores

### Staff Dashboard
- **Active Orders**: Current customer orders to process
- **Inventory Quick View**: Stock levels for common items
- **Daily Sales**: Running total of sales made
- **Customer Service**: Order modification, customer support
- **Stock Alerts**: Items requiring immediate attention

### Customer Interface
- **Product Catalog**: Browse by category with package options
- **Shopping Cart**: Multi-variant products with package selection
- **Order Tracking**: Real-time order status updates
- **Favorites**: Quick reorder of frequently purchased items
- **Account Management**: Profile, order history, delivery addresses

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Database setup with 4-role user system
- [ ] Authentication system for all roles
- [ ] Basic product management with variants
- [ ] Category system setup

### Phase 2: Core Inventory (Week 3-4)
- [ ] Supply management system
- [ ] Stock movement tracking
- [ ] Purchase order system
- [ ] Basic reporting

### Phase 3: Customer Interface (Week 5-6)
- [ ] Customer registration/login
- [ ] Product browsing with package selection
- [ ] Shopping cart functionality
- [ ] Order placement system

### Phase 4: Operations (Week 7-8)
- [ ] Staff order processing interface
- [ ] Real-time stock updates
- [ ] Order status tracking
- [ ] Payment integration

### Phase 5: Advanced Features (Week 9-10)
- [ ] Advanced reporting for all roles
- [ ] WhatsApp integration for notifications
- [ ] Location services for delivery
- [ ] Performance analytics

---

## 📱 Mobile Optimization

Given the hostel environment, mobile optimization is crucial:

### Customer Mobile App Features
- **Quick Reorder**: One-tap reorder of favorite items
- **WhatsApp Integration**: Order confirmations via WhatsApp
- **Location Services**: Auto-detect hostel location
- **Offline Viewing**: Cache product catalog for offline browsing
- **Push Notifications**: Order status updates

### Staff Mobile Interface
- **Order Processing**: Mobile-friendly order management
- **Inventory Updates**: Quick stock level adjustments
- **Customer Communication**: Direct WhatsApp integration
- **Barcode Scanning**: For quick product identification

---

## 📊 Key Success Metrics

### Business Metrics
- **Order Volume**: Daily/weekly order counts
- **Revenue Growth**: Month-over-month revenue increase
- **Inventory Turnover**: How quickly products sell
- **Customer Retention**: Repeat customer percentage
- **Staff Efficiency**: Orders processed per hour

### Technical Metrics
- **Response Time**: < 2s for product loading
- **Uptime**: 99.5% system availability
- **Mobile Performance**: < 3s mobile page load
- **Error Rate**: < 1% transaction failures

---

This updated PRD reflects the actual SalesHostel business model with the correct product categories, 4-role system, and hostel-based retail operations. The system is designed to handle the specific requirements of package variants, supplier relationships, and the unique operational needs of a hostel-based business.