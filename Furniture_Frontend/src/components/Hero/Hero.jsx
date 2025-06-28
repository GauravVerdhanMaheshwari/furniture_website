import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hero Component
 * @description Main landing section with intro text and CTA button.
 */
function Hero() {
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  return (
    <section className="bg-[#FFE8D6] flex flex-col md:flex-row mt-20 md:mt-15 min-h-[70vh]">
      {/* === Left Section: Text Content === */}
      <div className="bg-[#DDBEA9] w-full md:w-1/2 flex flex-col justify-center items-center md:items-end p-8 md:p-20 gap-4">
        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#3F4238] text-center md:text-right leading-tight">
          Welcome to Our Shop
        </h1>

        {/* Subtext / Description */}
        <p className="text-lg md:text-xl text-[#6B705C] text-center md:text-right max-w-md">
          Find timeless furniture tailored just for you – quality meets comfort.
        </p>

        {/* Call-to-Action Button */}
        <button
          onClick={() => navigate("/products")}
          className="mt-2 px-6 py-3 rounded-xl bg-[#CB997E] text-[#3F4238] font-semibold text-lg md:text-xl hover:bg-[#B98B73] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
        >
          View Shop
        </button>
      </div>

      {/* === Right Section: Hero Image === */}
      <div className="w-full md:w-1/2 flex justify-center items-center min-h-[300px] md:min-h-0 mb:hidden">
        <img
          src="hero_img.webp"
          alt="Beautiful modern furniture"
          className="w-full h-full object-cover rounded-none md:rounded-l-xl shadow-lg"
          loading="lazy" // Improves performance for large images
        />
      </div>
    </section>
  );
}

export default Hero;
