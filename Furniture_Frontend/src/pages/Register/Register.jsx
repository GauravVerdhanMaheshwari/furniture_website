import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
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

    const userData = {
      name: username,
      email,
      password,
      address,
      phone,
    };

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
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-18 py-12 bg-[#FFE8D6] min-h-[80vh] flex justify-center items-start">
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

        {/* 👤 Username */}
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

        {/* 📧 Email */}
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

        {/* 🔑 Password */}
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
              alt="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* 🔁 Confirm Password */}
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
              alt="toggle confirm password visibility"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* 🏠 Address */}
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

        {/* 📞 Phone */}
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

        {/* ⚠️ Error Message */}
        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        {/* 🚀 Register Button */}
        <button
          type="submit"
          className="w-full bg-[#CB997E] text-white font-semibold py-2 rounded-md hover:bg-[#B98B73] transition-all"
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          Register
        </button>

        {/* 🔁 Link to Login */}
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
