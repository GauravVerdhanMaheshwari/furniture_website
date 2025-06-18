// src/components/Loading.jsx
import React, { useEffect, useState } from "react";

function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Add a minimum 500ms delay before showing the loader
    const timer = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#F8F1EB] fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-t-[#DDBEA9] border-b-[#A68A64] border-l-transparent border-r-transparent animate-spin"></div>
          <div className="absolute inset-4 rounded-full bg-[#F8F1EB]"></div>
        </div>

        {/* Text */}
        <p className="text-[#7A5C3E] font-semibold text-lg">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}

export default Loading;
