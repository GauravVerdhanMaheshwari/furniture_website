import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 flex flex-col md:flex-row min-h-[60vh] mt-25">
      <div className="bg-gray-200 w-full md:w-1/2 flex flex-col justify-center items-center md:items-end p-8 md:p-20">
        <h1 className="text-2xl md:text-4xl text-center md:text-right">
          Welcome to our shop
        </h1>
        <p className="text-base md:text-lg mt-4 text-center md:text-right">
          Find the best furniture for you
        </p>
        <button
          className="mt-6 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-red-200 cursor-pointer hover:bg-red-300 hover:scale-105 transition-all duration-300 text-black font-bold text-lg md:text-xl active:scale-95 active:bg-red-400"
          onClick={() => navigate("/products")}
        >
          Shop Now !
        </button>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center min-h-[300px] md:min-h-0">
        <img
          src="hero_image.jpg"
          alt="Hero furniture"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Hero;
