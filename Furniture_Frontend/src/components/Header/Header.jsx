import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const userId = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const linkCss = ({ isActive }) =>
    isActive
      ? "text-[#CB997E] underline underline-offset-4 decoration-2"
      : "text-[#3F4238] hover:text-[#B98B73] transition-colors duration-300";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#FFE8D6]/90 backdrop-blur-sm p-4 md:p-5 flex justify-between items-center shadow-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="w-full">
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-[#3F4238] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#3F4238] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#3F4238]"></div>
        </button>

        <ul
          className={`flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-xl font-medium ${
            isMenuOpen
              ? "absolute left-0 top-full bg-[#FFE8D6] w-full p-4 shadow-md"
              : "hidden md:flex"
          }`}
        >
          {["/", "/products", "/about", "/contact"].map((route, i) => (
            <li key={i} className="p-2">
              <NavLink
                to={route}
                className={linkCss}
                onClick={() => setIsMenuOpen(false)}
              >
                {["Home", "Shop", "About Us", "Contact Us"][i]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3 ml-2">
        <NavLink to="/cart" className="w-8 h-8">
          <img src="shopping-cart.webp" alt="cart" className="w-full h-full" />
        </NavLink>
        <NavLink to="/profile" className="w-8 h-8">
          <img src="user.webp" alt="user" className="w-full h-full" />
        </NavLink>

        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              dispatch(setUser({ userID: null, isAuthenticated: false }));
              window.location.href = "/login";
            }}
            className="bg-[#6B705C] text-white px-4 py-2 rounded-lg hover:bg-[#3F4238] transition cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="bg-[#A5A58D] text-white px-4 py-2 rounded-xl hover:bg-[#6B705C] transition cursor-pointer">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </header>
  );
}
