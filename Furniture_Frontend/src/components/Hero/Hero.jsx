import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFE8D6] flex flex-col md:flex-row min-h-[60vh] mt-20">
      <div className="bg-[#DDBEA9] w-full md:w-1/2 flex flex-col justify-center items-center md:items-end p-8 md:p-20">
        <h1 className="text-3xl md:text-5xl font-semibold text-[#3F4238] text-center md:text-right">
          Welcome to Our Shop
        </h1>
        <p className="text-lg md:text-xl mt-4 text-[#6B705C] text-center md:text-right">
          Find timeless furniture tailored for you
        </p>
        <button
          className="mt-6 px-6 py-3 rounded-xl bg-[#CB997E] text-[#3F4238] font-bold text-lg md:text-xl hover:bg-[#B98B73] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center min-h-[300px] md:min-h-0">
        <img
          src="hero_img.webp"
          alt="Hero furniture"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Hero;
