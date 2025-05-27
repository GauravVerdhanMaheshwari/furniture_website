import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkCss = ({ isActive }) =>
    isActive
      ? "text-pink-600"
      : "text-black transition-all duration-300 ease-in-out hover:text-shadow-[0px_1px_40px] hover:text-pink-600 hover:text-shadow-pink-600/50";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-gray-800/95 backdrop-blur-xs text-black p-8 md:p-5 flex justify-between items-center shadow-md transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="w-full">
        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>

        {/* Navigation Links */}
        <ul
          className={`
          flex flex-col md:flex-row gap-2 md:gap-5
          ${
            isMenuOpen
              ? "absolute left-0 top-full bg-white/90 w-full p-4"
              : "hidden md:flex"
          }
        `}
        >
          <li className="text-xl md:text-2xl p-2 md:p-3 font-semibold">
            <NavLink
              to="/admin/home"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              <h1>Home</h1>
            </NavLink>
          </li>
          <li className="text-xl md:text-2xl p-2 md:p-3 font-semibold">
            <NavLink
              to="/admin/products"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              <h1>Products</h1>
            </NavLink>
          </li>
          <li className="text-xl md:text-2xl p-2 md:p-3 font-semibold">
            <NavLink
              to="/admin/orders"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              <h1>Orders</h1>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></button>
        </div>
        <NavLink to="/admin/profile" className="flex items-center gap-2">
          <img
            src="user.webp"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </NavLink>
        <NavLink
          to="/admin/login"
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-all duration-300 ease-in-out active:bg-red-700"
        >
          Logout
        </NavLink>
      </div>
    </header>
  );
}
