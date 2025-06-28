import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * ErrorPage Component
 * @desc Fallback UI for displaying a generic error when the requested page fails to load
 */
export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F0] px-4 py-10">
      {/* Error Card Container */}
      <div className="bg-white border border-red-200 shadow-xl rounded-2xl p-6 sm:p-10 max-w-md w-full text-center">
        {/* Error Icon */}
        <div
          className="text-6xl mb-4 animate-bounce"
          role="img"
          aria-label="Error icon"
        >
          🚫
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-3">
          Oops! Something went wrong.
        </h1>

        {/* Subtext Description */}
        <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
          The page you're looking for doesn't exist, or an unexpected error
          occurred.
        </p>

        {/* Navigation Button to Homepage */}
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
