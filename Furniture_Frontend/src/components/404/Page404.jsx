import React from "react";
import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <div className="mt-30 h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl text-red-500 my-3 ">404 - Page Not Found</h1>
      <p className="text-gray-500 my-5 text-xl">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-gray-500 my-5 text-xl">
        It might have been removed, or the URL might be incorrect.
      </p>
      <p className="text-gray-500 my-5 text-xl">
        Please check the URL or go back to the home page.
      </p>
      <NavLink
        to="/"
        className="text-blue-500 my-3 text-2xl hover:underline duration-200 ease-in-out"
      >
        Go to Home
      </NavLink>
    </div>
  );
}

export default Page404;
