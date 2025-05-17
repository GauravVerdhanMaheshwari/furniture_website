import React, { useEffect, useState } from "react";
import { FurnitureCard } from "./../../index.js";

function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = async (id, name, quantities) => {
    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          quantity: quantities,
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Failed to send cart data to server:", error);
    }
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [api]);

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">
        {title}
      </h1>
      <div className="flex flex-wrap justify-center pt-0 px-2 md:px-4 pb-2 md:pb-4">
        {loading ? (
          <p className="my-2 text-3xl font-bold">Loading...</p>
        ) : error ? (
          <p className="my-2 text-3xl font-bold text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="my-2 text-3xl font-bold">No Products Found</p>
        ) : (
          products.map(
            ({
              id,
              name,
              company,
              price,
              description,
              imageUrl,
              inStock,
              stock,
            }) => (
              <FurnitureCard
                key={id}
                id={id}
                name={name}
                company={company}
                price={price}
                description={description}
                inStock={inStock}
                stock={stock}
                imageUrl={imageUrl}
                quantities={quantities}
                handleAddToCart={handleAddToCart}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

export default Suggestions;
