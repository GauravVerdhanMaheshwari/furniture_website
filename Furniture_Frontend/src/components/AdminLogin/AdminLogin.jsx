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
      console.log("Admin login result:", result);

      if (response.ok) {
        const adminID = result._id;
        console.log(adminID);

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
    <div className="mt-25 min-h-[73vh] flex flex-col justify-center px-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-red-500 my-3">Admin Login</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdminLogin();
        }}
        className="flex flex-col w-full max-w-md mx-auto"
      >
        <div className="my-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
            placeholder="Enter your email"
          />
        </div>
        <div className="my-4">
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password:
          </label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
              placeholder="Enter your password"
            />
            <img
              src={showPassword ? "hide.webp" : "view.webp"}
              alt={showPassword ? "Hide" : "View"}
              className="cursor-pointer w-7 h-7 mt-1"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 my-1 px-8 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
