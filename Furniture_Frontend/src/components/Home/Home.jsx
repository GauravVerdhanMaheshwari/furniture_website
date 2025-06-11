import React from "react";
import { Hero, Suggestions } from "./index.js";

function Home() {
  return (
    <div className="bg-[#FFE8D6] text-[#3F4238] min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#6B705C] mb-4">✨ New</h2>
          <div className="bg-[#DDBEA9] rounded-lg shadow-md p-4">
            <Suggestions api="https://furniture-website-backend-yubt.onrender.com/api/products/new" />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#6B705C] mb-4">🔥 Hot</h2>
          <div className="bg-[#DDBEA9] rounded-lg shadow-md p-4">
            <Suggestions api="https://furniture-website-backend-yubt.onrender.com/api/products/hot" />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#6B705C] mb-4">
            📦 Packages
          </h2>
          <div className="bg-[#DDBEA9] rounded-lg shadow-md p-4">
            <Suggestions api="https://furniture-website-backend-yubt.onrender.com/api/products/package" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
