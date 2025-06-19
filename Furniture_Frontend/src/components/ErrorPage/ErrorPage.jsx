// components/ErrorPage.jsx

import React from "react";

/**
 * ErrorPage Component
 * @desc Fallback UI for displaying a generic error when the requested page fails to load
 */
export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F0] p-4">
      {/* Error Card Container */}
      <div className="bg-white border border-red-200 shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="text-5xl mb-4" role="img" aria-label="Error icon">
          🚫
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Oops! Something went wrong.
        </h1>

        {/* Subtext Description */}
        <p className="text-gray-700 mb-6">
          The page you're looking for might be missing or there was a server
          issue.
        </p>

        {/* Navigation Button to Homepage */}
        <a
          href="/"
          className="inline-block bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
