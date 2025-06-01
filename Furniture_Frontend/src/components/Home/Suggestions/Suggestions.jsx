import React, { useEffect, useState } from "react";
import { FurnitureCard } from "./../../index.js";

function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = async (id, quantities) => {
    try {
      const response = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "683c89fd2d0a92ad8f27d92d", // Replace with real user ID if you have auth
          items: [
            {
              productId: id,
              quantity: quantities[id] || 1,
            },
          ],
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert("Failed to add item to cart: " + result.message);
        console.error("Error adding to cart:", result);
        console.log("Request payload:", {
          userId: "683c89fd2d0a92ad8f27d92d",
          items: [
            {
              productId: id,
              quantity: quantities[id] || 1,
            },
          ],
        });

        throw new Error(result.message || "Failed to add item to cart");
      }
      alert("Item added to cart successfully!");
      console.log("Server response:", result);
    } catch (error) {
      alert("Error sending cart data to server: " + error.message);
      console.error("Failed to send cart data to server:", error);
    }
  };

  const handleIncrement = (id) => {
    let prevQuantity = (quantities[id] || 1) + 1;
    setQuantities((prev) => ({
      ...prev,
      [id]: prevQuantity,
    }));
    console.log("Incremented quantity for ID:", id, "to", prevQuantity);
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
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Only run this if the response is OK
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
              _id,
              name,
              company,
              price,
              description,
              imageUrl,
              inStock,
              stock,
            }) => (
              <FurnitureCard
                key={_id}
                id={_id}
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
