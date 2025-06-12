import React from "react";
import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFE8D6] text-[#3F4238] px-4">
      <h1 className="text-5xl font-bold text-[#B98B73] mb-4">
        404 - Page Not Found
      </h1>

      <div className="text-center max-w-xl">
        <p className="text-xl text-[#6B705C] mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-xl text-[#6B705C] mb-4">
          It may have been moved or deleted, or the URL might be incorrect.
        </p>
        <p className="text-xl text-[#6B705C] mb-6">
          Please double-check the URL or head back to the home page.
        </p>

        <NavLink
          to="/"
          className="inline-block px-6 py-2 bg-[#CB997E] text-white rounded-lg shadow hover:bg-[#3F4238] transition duration-200 text-lg"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
}

export default Page404;
