import React from "react";
import { Hero, Suggestions } from "./index.js";

function Home() {
  return (
    <>
      <Hero />
      <Suggestions title="✨ New" api="/api/products/new" />
      <Suggestions title="🔥 Hot" api="/api/products/hot" />
      <Suggestions title="📦 Packages" api="/api/products/package" />
    </>
  );
}

export default Home;
