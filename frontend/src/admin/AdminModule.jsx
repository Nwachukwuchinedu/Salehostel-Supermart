import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";

// Admin Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import InventoryOverview from "./pages/inventory/InventoryOverview";
import StockMovements from "./pages/inventory/StockMovements";
import StockAdjustments from "./pages/inventory/StockAdjustments";
import LowStockAlerts from "./pages/inventory/LowStockAlerts";
import PurchaseList from "./pages/purchases/PurchaseList";
import CreatePurchase from "./pages/purchases/CreatePurchase";
import PurchaseDetails from "./pages/purchases/PurchaseDetails";
import SupplierManagement from "./pages/purchases/SupplierManagement";
import OrderList from "./pages/orders/OrderList";
import OrderDetails from "./pages/orders/OrderDetails";
import OrderFulfillment from "./pages/orders/OrderFulfillment";
import RefundManagement from "./pages/orders/RefundManagement";
import SalesReport from "./pages/reports/SalesReport";
import InventoryReport from "./pages/reports/InventoryReport";
import ProfitLossReport from "./pages/reports/ProfitLossReport";
import CustomerReport from "./pages/reports/CustomerReport";
import ProductPerformance from "./pages/reports/ProductPerformance";
import UserManagement from "./pages/users/UserManagement";
import CustomerList from "./pages/users/CustomerList";
import AdminList from "./pages/users/AdminList";

const AdminModule = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* Product Management */}
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>

        {/* Inventory Management */}
        <Route path="inventory">
          <Route index element={<InventoryOverview />} />
          <Route path="movements" element={<StockMovements />} />
          <Route path="adjustments" element={<StockAdjustments />} />
          <Route path="alerts" element={<LowStockAlerts />} />
        </Route>

        {/* Purchase Management */}
        <Route path="purchases">
          <Route index element={<PurchaseList />} />
          <Route path="create" element={<CreatePurchase />} />
          <Route path=":id" element={<PurchaseDetails />} />
          <Route path="suppliers" element={<SupplierManagement />} />
        </Route>

        {/* Order Management */}
        <Route path="orders">
          <Route index element={<OrderList />} />
          <Route path=":id" element={<OrderDetails />} />
          <Route path=":id/fulfillment" element={<OrderFulfillment />} />
          <Route path="refunds" element={<RefundManagement />} />
        </Route>

        {/* Reports */}
        <Route path="reports">
          <Route index element={<SalesReport />} />
          <Route path="inventory" element={<InventoryReport />} />
          <Route path="profit-loss" element={<ProfitLossReport />} />
          <Route path="customers" element={<CustomerReport />} />
          <Route path="product-performance" element={<ProductPerformance />} />
        </Route>

        {/* User Management */}
        <Route path="users">
          <Route index element={<UserManagement />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="admins" element={<AdminList />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminModule;
