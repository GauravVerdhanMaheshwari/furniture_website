import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setShowHeader(currentScrollY < lastScrollY || currentScrollY < 10);
        setLastScrollY(currentScrollY);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // NavLink styling
  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] underline underline-offset-4 decoration-2"
      : "text-[#3F4238] hover:text-[#B98B73] transition-colors duration-300";

  // Logout logic
  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    dispatch(setUser({ userID: null, isAuthenticated: false }));
    window.location.href = "/login";
  }, [dispatch]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#FFE8D6]/90 backdrop-blur-sm p-4 md:p-5 shadow-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-0.5 bg-[#3F4238] mb-1 last:mb-0 rounded"
            />
          ))}
        </button>

        {/* Nav Links */}
        <ul
          className={`flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-xl font-medium ${
            isMenuOpen
              ? "absolute left-0 top-full bg-[#FFE8D6] w-full p-4 shadow-md animate-slide-down z-40"
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
              <NavLink to={to} className={linkCss}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Controls */}
        <div className="flex items-center gap-3 ml-4">
          {/* Profile */}
          {isLoggedIn && (
            <NavLink
              to="/profile"
              className="w-8 h-8 hover:scale-105 transition"
              aria-label="Profile"
            >
              <img
                src="/user.webp"
                alt="User Profile"
                className="w-full h-full rounded-full"
              />
            </NavLink>
          )}

          {/* Auth Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#6B705C] text-white px-4 py-2 rounded-lg hover:bg-[#3F4238] transition duration-300"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" aria-label="Login">
              <button className="bg-[#A5A58D] text-white px-4 py-2 rounded-xl hover:bg-[#6B705C] transition duration-300">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
