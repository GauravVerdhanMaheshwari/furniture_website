import React from "react";

function Login() {
  return (
    <div className="mt-25 bg-gray-100 min-h-[70vh] flex items-center justify-center">
      <form className="flex flex-col items-center justify-center w-full max-w-sm mx-auto bg-white shadow-md rounded px-15 py-10 mb-4">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-m font-medium text-gray-700 "
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-m font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-m font-medium text-gray-700"
          >
            Password:
          </label>
          <div className="flex flex-row items-center">
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 inline w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
              placeholder="Enter your password"
            />
            <img
              src="hide.webp"
              alt=""
              className=" cursor-pointer inline w-7 h-7 mt-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
