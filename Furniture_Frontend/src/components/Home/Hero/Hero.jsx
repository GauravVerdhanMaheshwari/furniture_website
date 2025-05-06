import React from "react";

function Hero() {
  return (
    <div className="bg-gray-100 flex mt-25">
      <div className="bg-gray-200 flex-1/5 flex flex-col justify-center items-end p-20">
        <h1 className="text-4xl">Welcome to our shop</h1>
        <p className="text-lg mt-4">Find the best furniture for you</p>
        <button className="mt-6 px-5 py-2.5 rounded bg-red-200">
          Shop Now !
        </button>
      </div>
      <div className="flex-1/5 flex justify-center items-center">
        <img src="hero_image.jpg" alt="" className="h-full w-full" />
      </div>
    </div>
  );
}

export default Hero;
