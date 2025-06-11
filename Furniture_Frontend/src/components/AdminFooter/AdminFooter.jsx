import React from "react";
import { NavLink } from "react-router-dom";

function AdminFooter() {
  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] font-semibold mx-4 md:mx-3 transition-colors"
      : "text-[#FFE8D6] mx-4 md:mx-3 hover:text-[#CB997E] transition-colors duration-300";

  return (
    <footer className="bg-[#3F4238] text-[#FFE8D6] py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Brand Info */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Geetanjali Furniture</h1>
          <p className="text-sm text-[#D4C7B0]">
            © 2025 Geetanjali Furniture. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/admin/home" className={linkCss}>
            Home
          </NavLink>
          <NavLink to="/admin/products" className={linkCss}>
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={linkCss}>
            Orders
          </NavLink>
          <NavLink to="/admin/users" className={linkCss}>
            Users
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
