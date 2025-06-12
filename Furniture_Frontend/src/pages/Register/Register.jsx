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

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (password && (password.length < 8 || password.length > 20)) {
      alert("Password must be between 8 and 20 characters long");
      return;
    } else if (!password || !confirmPassword || !username || !email) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      name: username,
      email,
      password,
      address,
      phone,
    };

    try {
      const response = await fetch(
        "https://furniture-website-backend-yubt.onrender.com/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
        setPhone("");
        alert("Registration successful");
        location.href = "/login";
      }
    } catch (error) {
      alert("Registration failed. Please try again. Maybe use another email.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-20 py-10 bg-[#FFE8D6] min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="flex flex-col items-center w-full max-w-md bg-[#DDBEA9] shadow-xl rounded-xl px-10 py-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#3F4238]">Register</h2>

        {/* Username */}
        <div className="mb-4 w-full">
          <label
            htmlFor="username"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            required
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4 w-full">
          <label
            htmlFor="password"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Password:
          </label>
          <div className="flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              minLength={8}
              maxLength={20}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
            />
            <img
              src={showPassword ? "hide.webp" : "view.webp"}
              alt={showPassword ? "Hide" : "View"}
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 w-6 h-6 cursor-pointer"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 w-full">
          <label
            htmlFor="confirm-password"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Confirm Password:
          </label>
          <div className="flex items-center">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              minLength={8}
              maxLength={20}
              required
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
            />
            <img
              src={showConfirmPassword ? "hide.webp" : "view.webp"}
              alt={showConfirmPassword ? "Hide" : "View"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-2 w-6 h-6 cursor-pointer"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4 w-full">
          <label
            htmlFor="address"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Address:
          </label>
          <textarea
            id="address"
            value={address}
            placeholder="Enter your address"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
            rows={3}
          ></textarea>
        </div>

        {/* Phone */}
        <div className="mb-4 w-full">
          <label
            htmlFor="phone"
            className="block text-base font-medium text-[#3F4238] mb-1"
          >
            Phone:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            pattern="[0-9]{10}"
            maxLength={10}
            required
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-[#D4C7B0] rounded-md shadow-sm py-2 px-3 focus:outline-none"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#CB997E] text-white font-semibold py-2 rounded-md hover:bg-[#B98B73] transition duration-300"
        >
          Register
        </button>

        {/* Login Link */}
        <NavLink
          to="/login"
          className="mt-4 text-sm text-[#6B705C] hover:text-[#3F4238] hover:underline transition duration-200"
        >
          Already have an account? Login
        </NavLink>
      </form>
    </div>
  );
}

export default Register;
