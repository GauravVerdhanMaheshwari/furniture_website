import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../../features/adminSlice";
import viewIcon from "../../../assets/view.webp"; // move to assets folder
import hideIcon from "../../../assets/hide.webp"; // move to assets folder

/**
 * AdminLogin Component
 * Handles admin authentication and redirects to dashboard on success.
 */
function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACK_END_API;

  // Return early if the API URL is not defined
  if (!URL) {
    console.error(
      "VITE_BACK_END_API is not defined in the environment variables."
    );
    return null;
  }

  // Handles admin login logic
  const handleAdminLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Admin login response:", result);

      if (response.ok) {
        const adminID = result._id;
        localStorage.setItem(
          "admin",
          JSON.stringify({ adminID, isAuthenticated: true })
        );
        dispatch(setAdmin({ adminID, isAuthenticated: true }));
        navigate("/admin/home");
      } else {
        alert(result.message || "Admin login failed.");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#DDBEA9] rounded-2xl shadow-xl p-8 border border-[#C9B8A3]">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-[#3F4238] text-center mb-6">
          Admin Login
        </h1>

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdminLogin();
          }}
          className="space-y-6"
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-[#6B705C] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-[#A5A58D] rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73] transition"
            />
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-[#6B705C] mb-1"
            >
              Password
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-[#A5A58D] rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73] transition"
              />
              <img
                src={showPassword ? hideIcon : viewIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-6 h-6 cursor-pointer select-none"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#CB997E] text-white font-bold py-2 rounded-lg hover:bg-[#B98B73] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
