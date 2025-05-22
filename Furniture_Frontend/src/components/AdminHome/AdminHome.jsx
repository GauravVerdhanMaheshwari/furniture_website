import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col items-center justify-center mt-4 text-center">
        <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
        <p className="mt-2 text-gray-600">
          Here you can manage products, orders, and users.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <a
            href="/admin/products"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Manage Products
          </a>
          <a
            href="/admin/orders"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Manage Orders
          </a>
          <a
            href="/admin/users"
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Manage Users
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
