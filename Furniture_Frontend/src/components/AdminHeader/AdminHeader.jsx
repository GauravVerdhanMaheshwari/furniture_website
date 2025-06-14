import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true); // Controls header visibility on scroll
  const [lastScrollY, setLastScrollY] = useState(0); // Stores previous scroll position
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

  // Active/inactive styles for NavLink
  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] font-semibold"
      : "text-[#FFE8D6] hover:text-[#CB997E] transition-colors duration-300";

  // Detect scroll direction to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#3F4238]/95 text-[#FFE8D6] px-4 py-3 md:py-4 shadow-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to="/admin/home"
          className="text-xl font-bold md:text-2xl tracking-wide"
        >
          Admin Panel
        </NavLink>

        {/* Hamburger Icon - mobile only */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-0.5 bg-[#FFE8D6] mb-1 rounded-sm"></div>
          <div className="w-6 h-0.5 bg-[#FFE8D6] mb-1 rounded-sm"></div>
          <div className="w-6 h-0.5 bg-[#FFE8D6] rounded-sm"></div>
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col md:flex-row md:gap-6 gap-3 text-lg font-medium absolute md:static top-full left-0 w-full md:w-auto bg-[#FFE8D6] text-[#3F4238] md:bg-transparent md:text-[#FFE8D6] px-4 py-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {["home", "products", "orders"].map((item) => (
            <li key={item}>
              <NavLink
                to={`/admin/${item}`}
                className={linkCss}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile & Auth Section */}
        <div className="flex items-center gap-4 ml-4">
          {/* Profile Avatar */}
          <NavLink to="/admin/profile" aria-label="Profile">
            <img
              src="/user.webp"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border border-[#DDBEA9] object-cover"
            />
          </NavLink>

          {/* Login/Logout Button */}
          <NavLink
            to="/admin/login"
            onClick={() => {
              localStorage.removeItem("admin");
              window.location.href = "/admin/login";
            }}
            className="bg-[#B98B73] text-white px-4 py-2 rounded-md hover:bg-[#A5A58D] active:bg-[#6B705C] transition-all duration-300"
          >
            {localStorage.getItem("admin") ? "Logout" : "Login"}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
