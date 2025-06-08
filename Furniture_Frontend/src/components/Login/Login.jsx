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

  const handleLogin = async () => {
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const data = { username, email, password };

    try {
      const response = await fetch(
        "https://furniture-website-backend-yubt.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

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
    <div className="mt-20 py-7 bg-gray-100 min-h-[70vh] flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto bg-white shadow-md rounded px-15 py-10 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-m font-medium text-gray-700"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
            placeholder="Enter your username"
            required
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
            placeholder="Enter your email"
            required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 inline w-80 border border-gray-300 rounded-md shadow-sm py-2 px-2 text-start"
              placeholder="Enter your password"
              minLength={8}
              maxLength={20}
              autoComplete="on"
              required
            />
            <img
              src={showPassword ? "hide.webp" : "view.webp"}
              alt=""
              className="cursor-pointer inline w-7 h-7 mt-1 ml-2"
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

        <NavLink
          to="/register"
          className="text-blue-500 hover:underline mt-2 transition duration-300 ease-in-out"
        >
          Don't have an account? Register here
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
