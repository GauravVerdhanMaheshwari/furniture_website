import React from "react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F0] p-4">
      {/* Error container box */}
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center border border-red-200">
        {/* Error icon or emoji */}
        <div className="text-5xl mb-4">🚫</div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Oops! Something went wrong.
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-6">
          The page couldn't be loaded. It might be missing, or there was a
          server issue.
        </p>

        {/* Optional button for navigation */}
        <a
          href="/"
          className="inline-block bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors duration-200"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
