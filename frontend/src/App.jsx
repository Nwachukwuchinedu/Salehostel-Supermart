import React from "react";
import { AuthProvider } from "./shared/hooks/useAuth.jsx";
import { CartProvider } from "./shared/hooks/useCart.jsx";
import AppRouter from "./AppRouter";
import "./styles/globals.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <AppRouter />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
