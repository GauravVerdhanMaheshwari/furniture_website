// components/AdminFooter.jsx

import React from "react";
import { NavLink } from "react-router-dom";

/**
 * AdminFooter Component
 * @desc Displays the footer section of the admin panel with navigation links
 */
function AdminFooter() {
  /**
   * @desc Returns the appropriate class name based on whether a NavLink is active
   * @param {object} param0 - Destructured object from NavLink to check active state
   * @returns {string} CSS class names for NavLink
   */
  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] font-semibold mx-3 md:mx-4 transition-colors duration-200"
      : "text-[#FFE8D6] mx-3 md:mx-4 hover:text-[#CB997E] transition-colors duration-200";

  return (
    <footer className="bg-[#3F4238] text-[#FFE8D6] py-6 px-6 border-t border-[#6c6f63]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-[#FFE8D6]">
            Geetanjali Furniture
          </h1>
          <p className="text-sm md:text-base text-[#D4C7B0] mt-1">
            © 2025 Geetanjali Furniture. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-end items-center gap-3 md:gap-5">
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
        </nav>
      </div>
    </footer>
  );
}

export default AdminFooter;
