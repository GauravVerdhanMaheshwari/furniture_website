import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../../features/adminSlice";

// ✅ Use from public/ directly
const viewIcon = "/view.webp";
const hideIcon = "/hide.webp";

/**
 * AdminLogin Component
 */
function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACK_END_API;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!URL) {
    console.error("❌ VITE_BACK_END_API is not defined.");
    return (
      <p className="text-red-600 text-center py-4">
        API not configured. Please set <strong>VITE_BACK_END_API</strong>.
      </p>
    );
  }

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

      if (!res.ok) {
        alert(data.message || "Invalid credentials.");
        return;
      }

      const adminID = data._id;
      const adminData = { adminID, isAuthenticated: true };
      localStorage.setItem("admin", JSON.stringify(adminData));
      dispatch(setAdmin(adminData));

      navigate("/admin/home");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFE8D6] px-4 py-16 sm:py-20 mt-20 sm:mt-15">
      <section className="w-full max-w-md bg-[#DDBEA9] border border-[#C9B8A3] rounded-2xl shadow-lg p-8 sm:p-10">
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
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-[#6B705C] mb-1"
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
              className="w-full py-2 px-3 rounded-lg border border-[#A5A58D] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-[#6B705C] mb-1"
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
                className="w-full py-2 px-3 rounded-lg border border-[#A5A58D] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73] transition"
              />
              <img
                src={showPassword ? hideIcon : viewIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-6 h-6 cursor-pointer select-none"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-[#CB997E] hover:bg-[#B98B73] rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;
