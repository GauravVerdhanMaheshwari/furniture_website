import React from "react";

function AdminHeader() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/admin/home" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/admin/products" className="hover:text-gray-300">
                  Products
                </a>
              </li>
              <li>
                <a href="/admin/orders" className="hover:text-gray-300">
                  Orders
                </a>
              </li>
              <li>
                <a href="/admin/users" className="hover:text-gray-300">
                  Users
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default AdminHeader;
