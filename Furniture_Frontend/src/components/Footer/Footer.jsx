import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer Component
 * @description Displays the footer with branding and a link to Google Maps.
 */

const showOnMap = "https://maps.app.goo.gl/nbFpTDnLcQetCCby9";

export default function Footer() {
  return (
    <footer className="bg-[#3F4238] border-t-2 border-[#6B705C] px-4 py-6 md:px-8 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* === Branding Text === */}
        <p className="text-sm md:text-base text-[#FFE8D6] text-center md:text-left">
          © 2025 <span className="font-semibold">Geetanjali Furniture</span>.
          All rights reserved.
        </p>

        {/* === Google Maps Link with Icon === */}
        <Link
          to={showOnMap}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          aria-label="Visit Geetanjali Furniture on Google Maps"
        >
          <img
            src="/map.webp"
            alt="Geetanjali Furniture Location"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#CB997E] hover:border-[#DDBEA9] transition-colors duration-200"
          />
          <span className="hidden sm:inline text-[#FFE8D6] text-sm md:text-base font-medium">
            View on Map
          </span>
        </Link>
      </div>
    </footer>
  );
}
