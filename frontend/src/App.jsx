import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/public/Home";
import ProductCatalog from "./pages/public/ProductCatalog";
import ProductDetails from "./pages/public/ProductDetails";
import CategoryPage from "./pages/public/CategoryPage";
import Cart from "./pages/public/Cart";
import Checkout from "./pages/public/Checkout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/errors/NotFound";
import useAuthStore from "./stores/authStore";
import useCartStore from "./stores/cartStore";

function App() {
  // Removed store initialization for now to avoid errors
  // Will be added back when stores are fully implemented

  return (
    <Router>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductCatalog />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="categories/:categorySlug" element={<CategoryPage />} />
          <Route path="search" element={<ProductCatalog />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Authentication Routes (No Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
