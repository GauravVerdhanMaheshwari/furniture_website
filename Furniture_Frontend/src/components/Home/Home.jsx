import React from "react";
import { Hero, Suggestions } from "./index.js";

function Home() {
  return (
    <>
      <Hero />
      <Suggestions
        title="✨ New"
        api="https://furniture-website-backend-yubt.onrender.com/api/products/new"
      />
      <Suggestions
        title="🔥 Hot"
        api="https://furniture-website-backend-yubt.onrender.com/api/products/hot"
      />
      <Suggestions
        title="📦 Packages"
        api="https://furniture-website-backend-yubt.onrender.com/api/products/package"
      />
    </>
  );
}

export default Home;
