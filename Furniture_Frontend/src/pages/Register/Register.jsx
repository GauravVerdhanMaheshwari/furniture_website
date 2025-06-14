import React from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // Handle user registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    } else if (password.length < 8 || password.length > 20) {
      return alert("Password must be between 8 and 20 characters long.");
    } else if (!username || !email || !password || !confirmPassword) {
      return alert("Please fill in all required fields.");
    }

    const userData = { name: username, email, password, address, phone };

    try {
      const response = await fetch(`${URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Clear form and redirect on success
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
        setPhone("");
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        alert("Registration failed. Try a different email.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-20 py-12 bg-[#FFE8D6] min-h-[80vh] flex justify-center items-start">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="bg-[#DDBEA9] w-full max-w-lg px-10 py-12 rounded-2xl shadow-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-[#3F4238] mb-6">
          Create an Account
        </h2>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-[#3F4238] mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-[#3F4238] mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-[#3F4238] mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              minLength={8}
              maxLength={20}
              required
              className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md shadow-sm focus:outline-none"
            />
            <img
              src={showPassword ? "/hide.webp" : "/view.webp"}
              alt={showPassword ? "Hide" : "View"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-[#3F4238] mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              minLength={8}
              maxLength={20}
              required
              className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md shadow-sm focus:outline-none"
            />
            <img
              src={showConfirmPassword ? "/hide.webp" : "/view.webp"}
              alt={showConfirmPassword ? "Hide" : "View"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-[#3F4238] mb-1">
            Address (optional)
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            rows={3}
            className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-[#3F4238] mb-1">
            Phone (10 digits)
          </label>
          <input
            id="phone"
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border border-[#D4C7B0] py-2 px-3 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#CB997E] text-white font-semibold py-2 rounded-md hover:bg-[#B98B73] transition-all"
        >
          Register
        </button>

        {/* Login Redirect */}
        <div className="text-center mt-4 text-sm text-[#6B705C]">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-[#3F4238] hover:underline font-medium"
          >
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
