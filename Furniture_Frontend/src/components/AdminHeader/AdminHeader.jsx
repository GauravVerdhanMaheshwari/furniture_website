import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] font-semibold"
      : "text-[#FFE8D6] hover:text-[#CB997E] transition-colors duration-300";

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
      className={`fixed top-0 left-0 w-full z-50 bg-[#3F4238]/95 text-[#FFE8D6] px-4 py-3 md:py-4 shadow-md transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center justify-between">
        {/* Hamburger Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-[#FFE8D6] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#FFE8D6] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#FFE8D6]"></div>
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col md:flex-row gap-3 md:gap-6 text-lg font-medium ${
            isMenuOpen
              ? "absolute top-full left-0 bg-[#FFE8D6] text-[#3F4238] w-full p-4 md:static md:bg-transparent md:text-[#FFE8D6]"
              : "hidden md:flex"
          }`}
        >
          <li>
            <NavLink
              to="/admin/home"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </NavLink>
          </li>
        </ul>

        {/* Profile & Auth */}
        <div className="flex items-center gap-4">
          <NavLink to="/admin/products">
            <img
              src="/user.webp"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border border-[#DDBEA9]"
            />
          </NavLink>
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
