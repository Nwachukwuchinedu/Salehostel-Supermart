import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomerLayout from "./components/layout/CustomerLayout";

// Customer Pages
import HomePage from "./pages/home/HomePage";
import ProductCatalog from "./pages/shop/ProductCatalog";
import ProductPage from "./pages/shop/ProductPage";
import CategoryPage from "./pages/shop/CategoryPage";
import SearchResults from "./pages/shop/SearchResults";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import OrderConfirmation from "./pages/checkout/OrderConfirmation";
import CustomerLogin from "./pages/auth/CustomerLogin";
import CustomerRegister from "./pages/auth/CustomerRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CustomerProfile from "./pages/account/CustomerProfile";
import EditProfile from "./pages/account/EditProfile";
import OrderHistory from "./pages/account/OrderHistory";
import AddressBook from "./pages/account/AddressBook";
import ChangePassword from "./pages/account/ChangePassword";
import OrderDetails from "./pages/orders/OrderDetails";
import TrackOrder from "./pages/orders/TrackOrder";
import NotFound from "./pages/errors/NotFound";

const CustomerModule = () => {
  return (
    <CustomerLayout>
      <Routes>
        <Route index element={<HomePage />} />

        {/* Authentication Routes */}
        <Route path="login" element={<CustomerLogin />} />
        <Route path="register" element={<CustomerRegister />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {/* Shopping Routes */}
        <Route path="products" element={<ProductCatalog />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="category/:id" element={<CategoryPage />} />
        <Route path="search" element={<SearchResults />} />

        {/* Cart & Checkout */}
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />

        {/* Account Management */}
        <Route path="account">
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="addresses" element={<AddressBook />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Order Tracking */}
        <Route path="track-order" element={<TrackOrder />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CustomerLayout>
  );
};

export default CustomerModule;
