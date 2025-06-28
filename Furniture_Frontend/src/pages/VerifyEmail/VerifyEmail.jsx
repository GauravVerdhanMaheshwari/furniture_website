// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACK_END_API
          }/api/users/verify-email?token=${token}`
        );
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
        } else {
          console.error(data.msg);
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);

  const renderMessage = () => {
    switch (status) {
      case "verifying":
        return (
          <>
            <div className="loader mb-4"></div>
            <p className="text-[#6B705C] font-medium">
              Verifying your email...
            </p>
          </>
        );
      case "success":
        return (
          <>
            <p className="text-green-600 font-semibold text-lg">
              ✅ Email verified successfully!
            </p>
            <Link
              to="/login"
              className="inline-block mt-4 px-5 py-2 bg-[#B5838D] text-white rounded hover:bg-[#6B705C] transition"
            >
              Go to Login
            </Link>
          </>
        );
      case "error":
        return (
          <>
            <p className="text-red-600 font-semibold text-lg">
              ❌ Invalid or expired verification link.
            </p>
            <Link
              to="/resend-verification"
              className="inline-block mt-4 px-5 py-2 bg-[#B5838D] text-white rounded hover:bg-[#6B705C] transition"
            >
              Resend Verification
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F1EB] px-4 sm:mt-15">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#3F4238] mb-2">
          Email Verification
        </h2>
        {renderMessage()}
      </div>
    </div>
  );
}

export default VerifyEmail;
