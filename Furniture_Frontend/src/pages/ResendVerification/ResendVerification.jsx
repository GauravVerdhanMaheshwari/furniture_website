// src/pages/ResendVerification.jsx
import React, { useState } from "react";
import axios from "axios";

function ResendVerification() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/resend-verification`,
        { email }
      );
      setMsg(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to resend verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F5EC] p-4 text-center sm:mt-15">
      <h2 className="text-2xl font-semibold mb-4">Resend Verification Email</h2>
      <form onSubmit={handleResend} className="space-y-4 w-full max-w-md">
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[#DDBEA9] text-white font-semibold px-4 py-2 rounded hover:bg-[#cfa98f] w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Resend Email"}
        </button>
      </form>
      {msg && <p className="mt-4 text-green-600">{msg}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

export default ResendVerification;
