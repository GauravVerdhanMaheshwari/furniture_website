import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../../features/adminSlice";

// Move image assets to src/assets/
import viewIcon from "../../../assets/view.webp";
import hideIcon from "../../../assets/hide.webp";

/**
 * AdminLogin Component
 * Handles secure admin login, dispatches user session to Redux,
 * and navigates to admin dashboard upon successful login.
 */
function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACK_END_API;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Show error if URL is not set
  if (!URL) {
    console.error("❌ VITE_BACK_END_API is not defined.");
    return <p className="text-red-600 text-center">API not configured.</p>;
  }

  /**
   * Handle form submission and login logic
   */
  const handleAdminLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${URL}/api/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("✅ Login response:", data);

      if (!res.ok) {
        alert(data.message || "Invalid credentials.");
        return;
      }

      // Save to localStorage and Redux
      const adminID = data._id;
      const adminData = { adminID, isAuthenticated: true };
      localStorage.setItem("admin", JSON.stringify(adminData));
      dispatch(setAdmin(adminData));

      // Redirect to dashboard
      navigate("/admin/home");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6] px-4">
      <div className="w-full max-w-md bg-[#DDBEA9] p-8 rounded-2xl shadow-xl border border-[#C9B8A3]">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-[#3F4238] mb-6">
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
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-[#A5A58D] py-2 px-3 rounded-lg shadow-sm focus:ring-2 focus:ring-[#B98B73] focus:outline-none transition"
            />
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-[#6B705C] mb-1"
            >
              Password
            </label>
            <div className="flex items-center gap-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-[#A5A58D] py-2 px-3 rounded-lg shadow-sm focus:ring-2 focus:ring-[#B98B73] focus:outline-none transition"
              />
              <img
                src={showPassword ? hideIcon : viewIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-bold text-white rounded-lg bg-[#CB997E] hover:bg-[#B98B73] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
