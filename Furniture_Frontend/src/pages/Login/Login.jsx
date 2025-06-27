import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result?.notVerified && result?.email) {
          setUnverifiedEmail(result.email);
          setErrorMsg(result.message || "Please verify your email first.");
        } else {
          throw new Error(result.message || "Login failed.");
        }
        return;
      }

      const userPayload = {
        userID: result.user._id,
        isAuthenticated: true,
        isVerified: result.user.isVerified ? "true" : "false",
      };

      // Storing user data in localStorage and sessionStorage
      localStorage.setItem("user", JSON.stringify(userPayload));
      localStorage.setItem("userName", JSON.stringify(result.user.name));
      sessionStorage.setItem("userName", JSON.stringify(result.user.name));
      sessionStorage.setItem("userEmail", JSON.stringify(result.user.email));
      sessionStorage.setItem("userPhoneNumber", result.user.phone);
      sessionStorage.setItem(
        "isVerified",
        result.user.isVerified ? "true" : "false"
      );
      dispatch(setUser(userPayload)); // storing the data in Redux store
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="mt-18 py-10 bg-[#FFE8D6] min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-full max-w-md bg-[#DDBEA9] rounded-2xl shadow-2xl px-8 py-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#3F4238] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-sm text-[#6B705C] mb-6">
          Please login to continue
        </p>

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
            onChange={(e) => {
              setEmail(e.target.value);
              setUnverifiedEmail("");
              setErrorMsg("");
            }}
            placeholder="you@example.com"
            className="w-full px-3 py-2 border border-[#D4C7B0] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
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
              placeholder="••••••••"
              minLength={8}
              maxLength={20}
              required
              className="w-full px-3 py-2 border border-[#D4C7B0] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
            />
            <img
              src={showPassword ? "hide.webp" : "view.webp"}
              alt="Toggle password visibility"
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        {unverifiedEmail && (
          <p className="text-sm text-center mt-2">
            Haven’t verified?{" "}
            <NavLink
              to={`/resend-verification?email=${encodeURIComponent(
                unverifiedEmail
              )}`}
              className="text-blue-600 hover:underline"
            >
              Click here to resend
            </NavLink>
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#6B705C] hover:bg-[#3F4238] text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Login
        </button>

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
