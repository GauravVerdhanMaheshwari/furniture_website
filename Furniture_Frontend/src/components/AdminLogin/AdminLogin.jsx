import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../../features/adminSlice";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://furniture-website-backend-yubt.onrender.com/api/owner/profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();
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
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#DDBEA9] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3F4238] text-center mb-6">
          Admin Login
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdminLogin();
          }}
          className="space-y-5"
        >
          <div>
            <label htmlFor="email" className="block font-medium text-[#6B705C]">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full border border-[#A5A58D] rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-[#6B705C]"
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
                className="mt-1 w-full border border-[#A5A58D] rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
              />
              <img
                src={showPassword ? "hide.webp" : "view.webp"}
                alt={showPassword ? "Hide" : "View"}
                className="w-7 h-7 mt-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#CB997E] text-white font-semibold py-2 rounded-md hover:bg-[#B98B73] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
