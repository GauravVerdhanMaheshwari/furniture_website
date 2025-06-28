import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

/**
 * Admin Home Dashboard
 * Displays main admin panel with links to manage products, packages, and profile.
 */
function Home() {
  const navigate = useNavigate();

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  /**
   * Navigation card for each admin section
   */
  const NavCard = ({ to, label, bgColor, hoverColor }) => (
    <Link
      to={to}
      className={`w-full text-center py-4 px-6 rounded-xl font-semibold text-white shadow-md transition duration-300 ${bgColor} hover:${hoverColor}`}
    >
      {label}
    </Link>
  );

  return (
    <main className="min-h-screen bg-[#FFE8D6] flex items-center justify-center px-4 py-16 sm:py-20">
      <section className="bg-[#DDBEA9] w-full max-w-3xl p-8 sm:p-10 rounded-2xl shadow-xl border border-[#C9B8A3]">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#3F4238] mb-4">
          🛠️ Admin Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-center text-[#6B705C] mb-8">
          Manage products, packages, and your profile efficiently.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
