// src/components/Loading.jsx
import React, { useEffect, useState } from "react";

/**
 * Loading Component
 * @description Displays a styled full-screen spinner with a brief delay
 *              to avoid showing the loader for quick transitions.
 */
function Loading() {
  const [show, setShow] = useState(false); // Controls when loader becomes visible

  useEffect(() => {
    // Delay display to avoid flicker during fast loads
    const timer = setTimeout(() => setShow(true), 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Prevent rendering until delay is completed
  if (!show) return null;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#F8F1EB]"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        {/* Spinner Animation */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Spinning ring */}
          <div
            className="absolute inset-0 rounded-full border-4 
                          border-t-[#DDBEA9] border-b-[#A68A64] 
                          border-l-transparent border-r-transparent 
                          animate-spin"
          ></div>
          {/* Inner circle to give a donut appearance */}
          <div className="absolute inset-4 rounded-full bg-[#F8F1EB]"></div>
        </div>

        {/* Loading Message */}
        <p className="text-[#7A5C3E] font-semibold text-lg">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}

export default Loading;
