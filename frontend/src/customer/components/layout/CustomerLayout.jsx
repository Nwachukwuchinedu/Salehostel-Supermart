import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import CustomerFooter from "./CustomerFooter";

const CustomerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CustomerHeader />
      <main className="flex-1">{children || <Outlet />}</main>
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;
