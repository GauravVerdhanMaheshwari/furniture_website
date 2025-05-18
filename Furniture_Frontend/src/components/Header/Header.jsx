import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkCss = ({ isActive }) =>
    isActive
      ? "text-orange-500 custom-underline-active"
      : "text-black custom-underline transition-all duration-300 ease-in-out hover:text-shadow-[0px_1px_40px] hover:text-orange-500 hover:text-shadow-orange-400/50";

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
      className={`fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xs text-black p-8 md:p-5 flex justify-between items-center shadow-md transition-all duration-300 ${
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
              to="/"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              <h1>Home</h1>
            </NavLink>
          </li>
          <li className="text-xl md:text-2xl p-2 md:p-3 font-semibold">
            <NavLink
              to="/products"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              <h1>Shop</h1>
            </NavLink>
          </li>
          <li className="text-xl md:text-2xl p-2 md:p-3 font-semibold">
            <NavLink
              to="/about"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              <h1>About Us</h1>
            </NavLink>
          </li>
          <li className="text-xl md:text-2xl p-2 md:p-3 font-semibold">
            <NavLink
              to="/contact"
              className={linkCss}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        <NavLink to="/cart" className="w-8 h-8 mx-4 cursor-pointer flex-1">
          <img
            src="shopping-cart.webp"
            alt="cart"
            className="w-[100%] h-[100%] "
          />
        </NavLink>
        <NavLink to="/profile" className="w-8 h-8 mx-4 cursor-pointer flex-1">
          <img src="user.webp" alt="user" className="w-[100%] h-[100%] " />
        </NavLink>
      </div>
    </header>
  );
}
