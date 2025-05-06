import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const linkCss = ({ isActive }) =>
    isActive
      ? "text-orange-500 custom-underline-active"
      : "text-black custom-underline transition-all duration-300 ease-in-out hover:text-shadow-[0px_1px_40px] hover:text-orange-500 hover: text-shadow-orange-400/50";

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
      className={`fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xs text-black p-5 flex shadow-md transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav>
        <ul className="flex gap-5">
          <li className="text-2xl p-3 font-semibold">
            <NavLink to="/" className={linkCss}>
              <h1>Home</h1>
            </NavLink>
          </li>
          <li className="text-2xl p-3 font-semibold ">
            <NavLink to="/about" className={linkCss}>
              <h1>About Me</h1>
            </NavLink>
          </li>
          <li className="text-2xl p-3 font-semibold">
            <NavLink to="/projects" className={linkCss}>
              <h1>Projects</h1>
            </NavLink>
          </li>
          <li className="text-2xl p-3 font-semibold">
            <NavLink to="/blogs" className={linkCss}>
              Blogs
            </NavLink>
          </li>
          <li className="text-2xl p-3 font-semibold">
            <NavLink to="/contact" className={linkCss}>
              Contact Me
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
    