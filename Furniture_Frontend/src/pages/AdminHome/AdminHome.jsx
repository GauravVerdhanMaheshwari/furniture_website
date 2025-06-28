import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

/**
 * Admin Home Dashboard
 * Displays the main admin panel with links to manage products, orders, and admin profile.
 * Includes authentication redirect logic.
 */
function Home() {
  const navigate = useNavigate();

  /**
   * Redirects unauthenticated users to login
   */
  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  /**
   * Navigation card component for reusability
   */
  const NavCard = ({ to, label, bgColor, hoverColor }) => (
    <Link
      to={to}
      className={`block ${bgColor} hover:${hoverColor} text-white font-semibold py-3 rounded-lg shadow transition duration-300 text-center`}
    >
      {label}
    </Link>
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFE8D6] px-4 py-12 mt-20 sm:mt-15">
      <section className="bg-[#DDBEA9] border border-[#C9B8A3] rounded-2xl shadow-lg p-10 w-full max-w-2xl text-center">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-[#3F4238] mb-4">
          Welcome to the Admin Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#6B705C] mb-8">
          Manage your products, orders, and profile efficiently.
        </p>

        {/* Navigation Links */}
        <div className="grid sm:grid-cols-3 gap-4 w-full">
          <NavCard
            to="/admin/products"
            label="Manage Products"
            bgColor="bg-[#CB997E]"
            hoverColor="bg-[#B98B73]"
          />
          <NavCard
            to="/admin/packages"
            label="Manage Packages"
            bgColor="bg-[#B98B73]"
            hoverColor="bg-[#A5A58D]"
          />
          <NavCard
            to="/admin/profile"
            label="Manage Me"
            bgColor="bg-[#6B705C]"
            hoverColor="bg-[#3F4238]"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
