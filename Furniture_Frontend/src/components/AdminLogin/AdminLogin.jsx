import React from "react";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="mt-20 h-[73vh] flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-red-500 my-3">Admin Login</h1>
      </div>
      <form action="" className="flex flex-col w-[30%] mx-auto">
        <div className="my-4">
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
        <div className="my-4">
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
        <div className="my-4">
          <label
            htmlFor="password"
            className="block text-m font-medium text-gray-700"
          >
            Password:
          </label>
          <div className="flex flex-row items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              min={8}
              max={20}
              required
              className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
              placeholder="Enter your password"
            />
            <img
              src={showPassword ? "hide.webp" : "view.webp"}
              alt={showPassword ? "Hide" : "View"}
              className=" cursor-pointer inline w-7 h-7 mt-1"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
