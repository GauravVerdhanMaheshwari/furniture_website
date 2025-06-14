import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const handleLogin = async () => {
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const data = { username, email, password };

    try {
      const response = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userID: result.user._id,
            isAuthenticated: true,
          })
        );

        dispatch(
          setUser({
            userID: result.user._id,
            isAuthenticated: true,
          })
        );

        navigate("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="mt-20 py-10 bg-[#FFE8D6] min-h-[70vh] flex items-center justify-center">
      <form
        className="flex flex-col items-center w-full max-w-sm bg-[#DDBEA9] shadow-xl rounded-lg px-10 py-10"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-[#3F4238]">Login</h2>

        <div className="mb-4 w-full">
          <label
            htmlFor="username"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6 w-full">
          <label
            htmlFor="password"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Password:
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
              placeholder="Enter your password"
              minLength={8}
              maxLength={20}
              autoComplete="on"
              required
            />
            <img
              src={showPassword ? "hide.webp" : "view.webp"}
              alt="toggle password"
              className="cursor-pointer w-6 h-6 ml-2"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#6B705C] text-white font-semibold py-2 rounded-md hover:bg-[#3F4238] transition duration-300"
        >
          Login
        </button>

        <NavLink
          to="/register"
          className="mt-4 text-sm text-[#CB997E] hover:underline transition duration-200"
        >
          Don’t have an account? Register here
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
