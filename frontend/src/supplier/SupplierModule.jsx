import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SupplierLayout from "./components/layout/SupplierLayout";

// Supplier Pages (we'll create these)
import SupplierDashboard from "./pages/dashboard/SupplierDashboard";
import SupplyList from "./pages/supplies/SupplyList";
import CreateSupply from "./pages/supplies/CreateSupply";
import SupplyHistory from "./pages/supplies/SupplyHistory";
import ProductList from "./pages/products/ProductList";
import PurchaseOrderList from "./pages/orders/PurchaseOrderList";
import PaymentOverview from "./pages/payments/PaymentOverview";
import SupplierProfile from "./pages/auth/SupplierProfile";

const SupplierModule = () => {
  return (
    <SupplierLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SupplierDashboard />} />

        {/* Supply Management */}
        <Route path="supplies">
          <Route index element={<SupplyList />} />
          <Route path="create" element={<CreateSupply />} />
          <Route path="history" element={<SupplyHistory />} />
        </Route>

        {/* Product Management */}
        <Route path="products" element={<ProductList />} />

        {/* Purchase Orders */}
        <Route path="orders" element={<PurchaseOrderList />} />

        {/* Payments */}
        <Route path="payments" element={<PaymentOverview />} />

        {/* Profile */}
        <Route path="profile" element={<SupplierProfile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </SupplierLayout>
  );
};

export default SupplierModule;
