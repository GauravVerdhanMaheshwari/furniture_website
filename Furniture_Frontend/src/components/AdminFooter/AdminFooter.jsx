import React from "react";
import { NavLink } from "react-router-dom";

function AdminFooter() {
  const linkCss = ({ isActive }) =>
    isActive
      ? "text-pink-600 mx-6 sm:mx-3"
      : "text-white mx-6 transition-all duration-300 ease-in-out hover:text-shadow-[0px_1px_40px] hover:text-pink-600 hover:text-shadow-pink-600/50";
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <div className="flex md:flex-row justify-between items-center">
          <div className=" flex-1 md:flex-none text-pretty">
            <h1 className="text-2xl font-bold mb-2">Geetanjali Furniture</h1>
            <p>© 2025 Geetanjali Furniture. All rights reserved.</p>
          </div>
          <div className="flex flex-col flex-1 md:flex-none md:flex-row">
            <NavLink to="/admin/home" className={linkCss}>
              <h1>Home</h1>
            </NavLink>
            <NavLink to="/admin/products" className={linkCss}>
              <h1>Products</h1>
            </NavLink>
            <NavLink to="/admin/orders" className={linkCss}>
              <h1>Orders</h1>
            </NavLink>
            <NavLink to="/admin/users" className={linkCss}>
              User
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFooter;
