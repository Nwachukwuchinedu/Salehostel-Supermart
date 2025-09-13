import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CustomerHeader from './CustomerHeader'
import CustomerFooter from './CustomerFooter'
import CartSidebar from '../cart/CartDropdown'

const CustomerLayout = () => {
  console.log("CustomerLayout component rendering");
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CustomerHeader onCartToggle={() => setIsCartOpen(true)} />

      <main className="pt-20">
        <Outlet />
      </main>

      <CustomerFooter />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}

export default CustomerLayout