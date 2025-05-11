import React, { useEffect } from "react";

function Furniture() {
  useEffect(() => {
    fetch("http://localhost:3000/api/furniture")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div>
      <h1>Furniture</h1>
    </div>
  );
}

export default Furniture;
