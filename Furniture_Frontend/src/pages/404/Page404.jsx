import React from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

function Page404() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-[#FFE8D6] text-[#3F4238]">
      {/* SEO & Accessibility */}
      <Helmet>
        <title>404 - Page Not Found | Furniture Store</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist. Navigate back to home or browse our products."
        />
      </Helmet>

      {/* Main Heading */}
      <h1
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#B98B73] mb-6 text-center leading-tight"
        role="heading"
        aria-level="1"
      >
        404 - Page Not Found
      </h1>

      {/* Optional Illustration */}
      {/* <img src="/404-illustration.svg" alt="Page not found" className="w-64 mb-6" /> */}

      {/* Informative Paragraphs */}
      <div className="text-center max-w-2xl">
        <p className="text-base sm:text-lg md:text-xl text-[#6B705C] mb-3">
          Uh-oh! Looks like this page took a detour.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-[#6B705C] mb-3">
          It might have been moved, deleted, or the link is broken.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-[#6B705C] mb-6">
          Let’s help you get back on track.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            to="/"
            aria-label="Go to Home Page"
            className="px-6 py-3 bg-[#CB997E] text-white rounded-lg shadow hover:bg-[#3F4238] transition duration-200 text-base font-medium"
          >
            ⬅ Go Home
          </NavLink>

          <NavLink
            to="/products"
            aria-label="Browse Products"
            className="px-6 py-3 bg-[#DDBEA9] text-[#3F4238] border border-[#B98B73] rounded-lg hover:bg-[#B98B73] hover:text-white transition duration-200 text-base font-medium"
          >
            🛒 Browse Products
          </NavLink>
        </div>
      </div>
    </main>
  );
}

export default Page404;
