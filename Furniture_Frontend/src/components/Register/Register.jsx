import React from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleRegister = async () => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (password && (password.length < 8 || password.length > 20)) {
      alert("Password must be between 8 and 20 characters long");
      return;
    } else if (!password && !confirmPassword && !username && !email) {
      alert("Please fill in all fields");
      return;
    }
    const data = {
      username: username,
      email: email,
      password: password,
    };

    console.log("Register data:", data);

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Failed to send register data to server:", error);
    }
  };

  return (
    <div className="mt-20 py-7 bg-gray-100 min-h-[70vh] flex items-center justify-center">
      <form className="flex flex-col items-center justify-center w-full max-w-sm mx-auto bg-white shadow-md rounded px-15 py-10 mb-4">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
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
              alt=""
              className=" cursor-pointer inline w-7 h-7 mt-1"
              onClick={() => {
                () => setShowPassword(!showPassword);
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block text-m font-medium text-gray-700"
          >
            Confirm Password:
          </label>
          <div className="flex flex-row items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              required
              min={8}
              max={20}
              className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
              placeholder="Confirm your password"
            />
            <img
              src={showConfirmPassword ? "hide.webp" : "view.webp"}
              alt=""
              className=" cursor-pointer inline w-7 h-7 mt-1"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mb-4 cursor-pointer active:bg-blue-800 transition duration-300 ease-in-out"
        >
          Register
        </button>
        <NavLink
          to="/login"
          className="text-blue-500 hover:underline mt-2 transition duration-300 ease-in-out hover:text-blue-700"
        >
          Already have an account? Login
        </NavLink>
      </form>
    </div>
  );
}

export default Register;
