// src/components/Loading.jsx
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F1EB]">
      <div className="text-center">
        <div className="animate-spin border-4 border-t-[#DDBEA9] border-b-[#A68A64] border-l-transparent border-r-transparent rounded-full w-16 h-16 mx-auto mb-4"></div>
        <p className="text-[#7A5C3E] font-semibold text-lg">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}

export default Loading;
