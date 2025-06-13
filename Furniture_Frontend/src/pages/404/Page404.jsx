import React from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

function Page404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-[#FFE8D6] text-[#3F4238]">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#B98B73] mb-4 text-center leading-tight">
        404 - Page Not Found
      </h1>

      <div className="text-center max-w-2xl">
        <p className="text-base sm:text-lg md:text-xl text-[#6B705C] mb-3">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-[#6B705C] mb-3">
          It may have been moved, deleted, or the URL is incorrect.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-[#6B705C] mb-6">
          Let’s help you get back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            to="/"
            className="px-6 py-3 bg-[#CB997E] text-white rounded-lg shadow hover:bg-[#3F4238] transition duration-200 text-base font-medium"
          >
            ⬅ Go Home
          </NavLink>
          <NavLink
            to="/products"
            className="px-6 py-3 bg-[#DDBEA9] text-[#3F4238] border border-[#B98B73] rounded-lg hover:bg-[#B98B73] hover:text-white transition text-base font-medium"
          >
            Browse Products
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Page404;
