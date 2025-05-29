import React from "react";
import { Hero, Suggestions } from "./index.js";

function Home() {
  return (
    <>
      <Hero />
      <Suggestions title="Top Picks" api="/api/products" />

      {/* <Suggestions title="🔥 HOT" api="/api/products" />
      <Suggestions title="📦 PACKAGES" api="/api/products" /> */}
    </>
  );
}

export default Home;
