import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StaffLayout from "./components/layout/StaffLayout";

// Staff Pages (we'll create these)
import StaffDashboard from "./pages/dashboard/StaffDashboard";
import ActiveOrders from "./pages/orders/ActiveOrders";
import OrderHistory from "./pages/orders/OrderHistory";
import QuickSale from "./pages/orders/QuickSale";
import InventoryView from "./pages/inventory/InventoryView";
import StockUpdate from "./pages/inventory/StockUpdate";
import CustomerService from "./pages/customers/CustomerService";
import DailySalesReport from "./pages/reports/DailySalesReport";
import StaffProfile from "./pages/auth/StaffProfile";

const StaffModule = () => {
  return (
    <StaffLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StaffDashboard />} />

        {/* Order Management */}
        <Route path="orders">
          <Route index element={<ActiveOrders />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="quick-sale" element={<QuickSale />} />
        </Route>

        {/* Inventory */}
        <Route path="inventory">
          <Route index element={<InventoryView />} />
          <Route path="update" element={<StockUpdate />} />
        </Route>

        {/* Customer Service */}
        <Route path="customers" element={<CustomerService />} />

        {/* Reports */}
        <Route path="reports" element={<DailySalesReport />} />

        {/* Profile */}
        <Route path="profile" element={<StaffProfile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </StaffLayout>
  );
};

export default StaffModule;
