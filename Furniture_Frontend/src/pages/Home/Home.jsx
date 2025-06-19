import React from "react";
import { Hero, Suggestions } from "../../components/indexComponents.js";

/**
 * Home Page Component
 * Displays the landing page with hero banner and categorized product sections.
 */
function Home() {
  return (
    <div className="bg-[#FFE8D6] text-[#3F4238] min-h-screen pb-16">
      {/* Main container with responsive horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🖼️ Hero Banner */}
        <Hero />

        {/* ✨ New Arrivals Section */}
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6B705C] mb-4">
            ✨ New Arrivals
          </h2>

          <div className="bg-[#DDBEA9] rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl">
            <Suggestions
              title="✨ New"
              api="https://furniture-website-backend-yubt.onrender.com/api/products/new"
            />
          </div>
        </section>

        {/* 🔥 Hot Picks Section */}
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6B705C] mb-4">
            🔥 Hot Picks
          </h2>

          <div className="bg-[#DDBEA9] rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl">
            <Suggestions
              title="🔥 Hot"
              api="https://furniture-website-backend-yubt.onrender.com/api/products/hot"
            />
          </div>
        </section>

        {/* 📦 Package Deals Section */}
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6B705C] mb-4">
            📦 Package Deals
          </h2>

          <div className="bg-[#DDBEA9] rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl">
            <Suggestions
              title="📦 Packages"
              api="https://furniture-website-backend-yubt.onrender.com/api/products/package"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
