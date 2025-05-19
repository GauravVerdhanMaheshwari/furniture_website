import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white p-3 md:p-5 border-y w-full">
      <div className="container mx-auto py-2 md:py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm md:text-base text-gray-500 text-center md:text-left">
          © 2025 YourCompany. All rights reserved.
        </span>

        <div className="flex space-x-4 md:space-x-5">
          <Link
            to="https://g.co/kgs/HL9xtGk"
            target="_blank"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <img src="map.webp" alt="map" className="w-8 h-8 md:w-10 md:h-10" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
