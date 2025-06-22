// components/AdminHeader.jsx

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Admin Header Component
 * @desc Sticky header with responsive navigation, scroll-hide effect, and login/logout functionality
 */
export default function Header() {
  // State to manage header visibility on scroll
  const [showHeader, setShowHeader] = useState(true);

  // Stores the last scroll position
  const [lastScrollY, setLastScrollY] = useState(0);

  // Controls mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * @desc Returns className string for NavLink depending on active state
   * @param {Object} isActive - Determines if NavLink is currently active
   */
  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] font-semibold"
      : "text-[#FFE8D6] hover:text-[#CB997E] transition-colors duration-300";

  /**
   * @desc Handle header visibility based on scroll direction
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /**
   * @desc Handle admin logout logic
   */
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#3F4238]/95 text-[#FFE8D6] px-4 py-3 md:py-4 shadow-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* === Brand Logo === */}
        <NavLink
          to="/admin/home"
          className="text-xl font-bold md:text-2xl tracking-wide"
        >
          Admin Panel
        </NavLink>

        {/* === Mobile Hamburger Icon === */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-0.5 bg-[#FFE8D6] mb-1 last:mb-0 rounded-sm"
            />
          ))}
        </button>

        {/* === Navigation Links === */}
        <ul
          className={`flex flex-col md:flex-row md:gap-6 gap-3 text-lg font-medium absolute md:static top-full left-0 w-full md:w-auto bg-[#FFE8D6] text-[#3F4238] md:bg-transparent md:text-[#FFE8D6] px-4 py-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {["home", "products"].map((item) => (
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

        {/* === Profile & Auth Section === */}
        <div className="flex items-center gap-4 ml-4">
          {/* Avatar */}
          <NavLink to="/admin/profile" aria-label="Admin Profile">
            <img
              src="/user.webp"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border border-[#DDBEA9] object-cover"
            />
          </NavLink>

          {/* Login / Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-[#B98B73] text-white px-4 py-2 rounded-md hover:bg-[#A5A58D] active:bg-[#6B705C] transition-all duration-300"
          >
            {localStorage.getItem("admin") ? "Logout" : "Login"}
          </button>
        </div>
      </nav>
    </header>
  );
}
