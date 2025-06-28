import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const handleRegister = async () => {
    setErrorMsg("");

    if (!username || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (password.length < 8 || password.length > 20) {
      setErrorMsg("Password must be between 8 and 20 characters.");
      return;
    }

    const userData = { name: username, email, password, phone };

    try {
      const response = await fetch(`${URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.msg || "Registration failed.");
      }

      alert("Signup successful! Check your email to verify your account.");

      await fetch(`${URL}/api/users/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-20 min-h-screen flex items-center justify-center bg-[#FFE8D6] px-4 py-12 sm:mt-15">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="w-full max-w-lg bg-[#DDBEA9] p-8 sm:p-10 rounded-2xl shadow-2xl text-[#3F4238] space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Create an Account
        </h2>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block font-semibold mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
            className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={20}
              required
              placeholder="Enter your password"
              className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
            />
            <img
              src={showPassword ? "/hide.webp" : "/view.webp"}
              alt="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block font-semibold mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              maxLength={20}
              required
              placeholder="Re-enter your password"
              className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
            />
            <img
              src={showConfirmPassword ? "/hide.webp" : "/view.webp"}
              alt="Toggle confirm password visibility"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your 10-digit phone number"
            className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <p className="text-red-600 text-center text-sm">{errorMsg}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 font-semibold bg-[#CB997E] text-white rounded-md hover:bg-[#B98B73] transition duration-300"
        >
          Register
        </button>

        {/* Link to login */}
        <p className="text-center text-sm text-[#6B705C] mt-4">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-[#3F4238] font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
