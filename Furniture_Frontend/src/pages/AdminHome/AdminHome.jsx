import React from "react";
import { Link } from "react-router-dom"; // Use Link instead of <a> for SPA routing

/**
 * Admin Home Dashboard
 * Renders a landing page for the admin with navigation to Products, Orders, and Profile sections.
 * Redirects to login if not authenticated.
 */
function Home() {
  // Redirect if not logged in as admin
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#FFE8D6] px-4 py-12">
      <section className="bg-[#DDBEA9] rounded-2xl shadow-lg p-10 max-w-2xl w-full text-center border border-[#C9B8A3]">
        <h1 className="text-4xl font-extrabold text-[#3F4238] mb-4">
          Welcome to the Admin Dashboard
        </h1>
        <p className="text-lg text-[#6B705C] mb-8">
          Manage your products, orders, and profile efficiently.
        </p>

        {/* Dashboard navigation buttons */}
        <div className="grid sm:grid-cols-3 gap-4 w-full">
          <Link
            to="/admin/products"
            className="block bg-[#CB997E] hover:bg-[#B98B73] text-white font-semibold py-3 rounded-lg shadow transition duration-300"
          >
            Manage Products
          </Link>

          <Link
            to="/admin/orders"
            className="block bg-[#B98B73] hover:bg-[#A5A58D] text-white font-semibold py-3 rounded-lg shadow transition duration-300"
          >
            Manage Orders
          </Link>

          <Link
            to="/admin/profile"
            className="block bg-[#6B705C] hover:bg-[#3F4238] text-white font-semibold py-3 rounded-lg shadow transition duration-300"
          >
            Manage Me
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
