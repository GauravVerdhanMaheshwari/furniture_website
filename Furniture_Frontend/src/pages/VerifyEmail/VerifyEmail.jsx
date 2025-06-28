// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

  return (



<div className="md:mt-15 min-h-screen flex items-center justify-center bg-[#F8F1EB]">
      <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
        {status === "verifying" && <p>⏳ Verifying your email...</p>}
        {status === "success" && (
          <p className="text-green-600 font-semibold">
            ✅ Email verified successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-semibold">
            ❌ Invalid or expired link.
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
