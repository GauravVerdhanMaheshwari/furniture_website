import React, { useEffect, useState } from "react";
import { FurnitureCard } from "./../../index.js";
import { useSelector } from "react-redux";

function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  const handleAddToCart = async (id, quantities) => {
    if (!isLoggedIn || !userId) {
      alert("Please log in to add items to the cart.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
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
        throw new Error(result.message || "Failed to add item to cart");
      }
      alert("Item added to cart successfully!");
    } catch (error) {
      alert("Error sending cart data to server: " + error.message);
      console.error("Failed to send cart data to server:", error);
    }
  };

  const handleIncrement = (id, stock) => {
    if (stock > 0 && (quantities[id] || 1) >= stock) {
      return;
    }
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
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Handle array or object response
        const normalizedProducts = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(normalizedProducts);
        if (normalizedProducts.length === 0 && data.message) {
          setError(`No products found in "${title}" category`); // "No products found"
        }
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [title, api]);

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-2xl text-gray-500">
        <p>{title}</p>
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
        {products.length === 0 ? (
          <p className="my-2 text-2xl font-semibold">No Products Found</p>
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
                userId={userId}
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
