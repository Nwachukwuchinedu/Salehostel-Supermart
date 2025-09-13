import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/components/layout/AdminLayout';
import CustomerLayout from './customer/components/layout/CustomerLayout';
import AdminDashboard from './admin/pages/dashboard/AdminDashboard';
import ProductList from './admin/pages/products/ProductList';
import AddProduct from './admin/pages/products/AddProduct';
import EditProduct from './admin/pages/products/EditProduct';
import InventoryOverview from './admin/pages/inventory/InventoryOverview';
import StockMovements from './admin/pages/inventory/StockMovements';
import StockAdjustments from './admin/pages/inventory/StockAdjustments';
import LowStockAlerts from './admin/pages/inventory/LowStockAlerts';
import PurchaseList from './admin/pages/purchases/PurchaseList';
import CreatePurchase from './admin/pages/purchases/CreatePurchase';
import PurchaseDetails from './admin/pages/purchases/PurchaseDetails';
import SupplierManagement from './admin/pages/purchases/SupplierManagement';
import OrderList from './admin/pages/orders/OrderList';
import OrderDetails from './admin/pages/orders/OrderDetails';
import OrderFulfillment from './admin/pages/orders/OrderFulfillment';
import RefundManagement from './admin/pages/orders/RefundManagement';
import SalesReport from './admin/pages/reports/SalesReport';
import InventoryReport from './admin/pages/reports/InventoryReport';
import ProfitLossReport from './admin/pages/reports/ProfitLossReport';
import CustomerReport from './admin/pages/reports/CustomerReport';
import ProductPerformance from './admin/pages/reports/ProductPerformance';
import UserManagement from './admin/pages/users/UserManagement';
import CustomerList from './admin/pages/users/CustomerList';
import AdminList from './admin/pages/users/AdminList';
import ProductCatalog from './customer/pages/shop/ProductCatalog';
import ProductPage from './customer/pages/shop/ProductPage';
import CategoryPage from './customer/pages/shop/CategoryPage';
import SearchResults from './customer/pages/shop/SearchResults';
import Cart from './customer/pages/cart/Cart';
import Checkout from './customer/pages/checkout/Checkout';
import OrderConfirmation from './customer/pages/checkout/OrderConfirmation';
import CustomerLogin from './customer/pages/auth/CustomerLogin';
import CustomerRegister from './customer/pages/auth/CustomerRegister';
import ForgotPassword from './customer/pages/auth/ForgotPassword';
import ResetPassword from './customer/pages/auth/ResetPassword';
import CustomerProfile from './customer/pages/account/CustomerProfile';
import EditProfile from './customer/pages/account/EditProfile';
import OrderHistory from './customer/pages/account/OrderHistory';
import AddressBook from './customer/pages/account/AddressBook';
import ChangePassword from './customer/pages/account/ChangePassword';
import OrderDetailsCustomer from './customer/pages/orders/OrderDetails';
import TrackOrder from './customer/pages/orders/TrackOrder';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          
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
        </Route>
        
        {/* Customer Authentication Routes */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<ProductCatalog />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          
          {/* Customer Account Routes */}
          <Route path="account">
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id" element={<OrderDetailsCustomer />} />
            <Route path="addresses" element={<AddressBook />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          
          {/* Customer Order Tracking Routes */}
          <Route path="track-order" element={<TrackOrder />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;