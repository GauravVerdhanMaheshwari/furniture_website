import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";

/**
 * Header Component
 * @description Renders the sticky header with navigation, auth controls, and responsive mobile menu.
 */
export default function Header() {
  // State to manage header visibility on scroll
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State to toggle mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  /**
   * Dynamic styles for navigation links
   */
  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] underline underline-offset-4 decoration-2"
      : "text-[#3F4238] hover:text-[#B98B73] transition-colors duration-300";

  /**
   * Handles auto-hide/show of header on scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /**
   * Handles logout: clears localStorage and resets user state
   */
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser({ userID: null, isAuthenticated: false }));
    window.location.href = "/login";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#FFE8D6]/90 backdrop-blur-sm p-4 md:p-5 flex justify-between items-center shadow-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* === Navigation Section === */}
      <nav className="w-full">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-6 h-0.5 bg-[#3F4238] mb-1 last:mb-0" />
          ))}
        </button>

        {/* Nav Links */}
        <ul
          className={`flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-xl font-medium ${
            isMenuOpen
              ? "absolute left-0 top-full bg-[#FFE8D6] w-full p-4 shadow-md animate-slide-down"
              : "hidden md:flex"
          }`}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Shop" },
            { to: "/packages", label: "Packages" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact Us" },
          ].map(({ to, label }) => (
            <li key={to} className="p-2">
              <NavLink
                to={to}
                className={linkCss}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* === User Section === */}
      <div className="flex items-center gap-3 ml-2">
        {/* Profile Icon */}
        <NavLink
          to="/profile"
          className="w-8 h-8 hover:scale-105 transition"
          aria-label="Profile"
        >
          <img src="user.webp" alt="Profile" className="w-full h-full" />
        </NavLink>

        {/* Login/Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-[#6B705C] text-white px-4 py-2 rounded-lg hover:bg-[#3F4238] transition duration-300"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="bg-[#A5A58D] text-white px-4 py-2 rounded-xl hover:bg-[#6B705C] transition duration-300">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </header>
  );
}
