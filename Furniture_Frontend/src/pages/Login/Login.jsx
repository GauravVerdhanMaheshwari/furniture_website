import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";

/**
 * Login Component
 * Handles user authentication via username, email, and password.
 */
function Login() {
  // 🔐 Input States
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  /**
   * Handles login logic:
   * - Validates input
   * - Sends POST request to backend
   * - Stores user in Redux and localStorage
   */
  const handleLogin = async () => {
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");

      // ✅ Save user info
      const userPayload = { userID: result.user._id, isAuthenticated: true };
      localStorage.setItem("user", JSON.stringify(userPayload));
      dispatch(setUser(userPayload));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="mt-20 py-10 bg-[#FFE8D6] min-h-[70vh] flex items-center justify-center">
      {/* 🧾 Login Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-full max-w-md bg-[#DDBEA9] rounded-2xl shadow-2xl px-8 py-10 space-y-6"
      >
        {/* 🔓 Header */}
        <h2 className="text-3xl font-bold text-center text-[#3F4238] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-sm text-[#6B705C] mb-6">
          Please login to continue
        </p>

        {/* 👤 Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#3F4238] mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-[#D4C7B0] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
            placeholder="e.g. johndoe"
            required
          />
        </div>

        {/* 📧 Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#3F4238] mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[#D4C7B0] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* 🔑 Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#3F4238] mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[#D4C7B0] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
              placeholder="••••••••"
              minLength={8}
              maxLength={20}
              required
            />
            {/* 👁️ Toggle Password Visibility */}
            <img
              src={showPassword ? "hide.webp" : "view.webp"}
              alt="Toggle password visibility"
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </div>

        {/* 🔘 Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#6B705C] hover:bg-[#3F4238] text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Login
        </button>

        {/* 🧭 Navigation to Register */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <NavLink
            to="/register"
            className="text-[#CB997E] font-medium hover:underline"
          >
            Register here
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
