// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer Component
 * @description Displays the footer with branding and a link to Google Maps.
 */
export default function Footer() {
  return (
    <footer className="bg-[#3F4238] border-t-2 border-[#6B705C] px-4 py-6 md:px-8 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* === Branding & Copyright === */}
        <span className="text-sm md:text-base text-[#FFE8D6] text-center md:text-left">
          © 2025 <span className="font-semibold">Geetanjali Furniture</span>.
          All rights reserved.
        </span>

        {/* === External Link to Google Maps === */}
        <div className="flex space-x-4 md:space-x-5">
          <Link
            to="https://g.co/kgs/HL9xtGk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform duration-200"
            aria-label="Visit Geetanjali Furniture on Google Maps"
          >
            <img
              src="map.webp"
              alt="Geetanjali Furniture Location"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#CB997E] hover:border-[#DDBEA9] transition-colors duration-200"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
