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
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5EC] px-4 py-12 sm:mt-15">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#3F4238] text-center mb-6">
          Resend Verification Email
        </h2>

        <form onSubmit={handleResend} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-[#3F4238]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-[#D4C7B0] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-md text-white transition duration-300 ${
              loading
                ? "bg-[#C1A48D] cursor-not-allowed"
                : "bg-[#DDBEA9] hover:bg-[#B98B73]"
            }`}
          >
            {loading ? "Sending..." : "Resend Email"}
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-green-600 font-medium">{msg}</p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}

export default ResendVerification;
