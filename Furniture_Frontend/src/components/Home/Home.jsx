import React from "react";
import { Hero, Suggestions } from "./index.js";

function Home() {
  return (
    <>
      <Hero />
      <Suggestions title="✨ NEW" api="/api/new" />
      <Suggestions title="🔥 HOT" api="/api/hot" />
      <Suggestions title="📦 PACKAGES" api="/api/packages" />
    </>
  );
}

export default Home;
