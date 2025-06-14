import React, { useEffect, useState } from "react";
import { FurnitureCard } from "../indexComponents.js";
import { useSelector } from "react-redux";

function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const userId = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  // Add product to user's cart
  const handleAddToCart = async (id, quantities) => {
    if (!isLoggedIn || !userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          items: [{ productId: id, quantity: quantities[id] || 1 }],
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert("Failed to add item to cart: " + result.message);
        throw new Error(result.message || "Failed to add item to cart");
      }

      alert("Item added to cart successfully!");
    } catch (error) {
      alert("Error sending cart data to server: " + error.message);
    }
  };

  // Increase quantity handler
  const handleIncrement = (id, stock) => {
    if (stock > 0 && (quantities[id] || 1) >= stock) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // Decrease quantity handler
  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  // Fetch product suggestions based on `api` prop
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(api);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const normalizedProducts = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(normalizedProducts);

        if (normalizedProducts.length === 0 && data.message) {
          setError(`No products found in "${title}" category`);
        }
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [title, api]);

  // Show loading message
  if (loading) {
    return (
      <div className="text-center p-6 bg-[#FFE8D6] text-[#3F4238]">
        <p className="text-lg animate-pulse">Loading products...</p>
      </div>
    );
  }

  // Handle fetch error
  if (error) {
    return (
      <div className="text-center p-6 bg-[#FFE8D6] text-[#6B705C]">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-lg italic">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-[#FFE8D6] px-4 py-6 flex flex-col items-center">
      {/* Section Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CB997E] text-center">
        {title}
      </h1>

      {/* Product Grid */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {products.length === 0 ? (
          <p className="text-xl font-medium text-[#6B705C]">
            No Products Found
          </p>
        ) : (
          products.map(
            ({
              _id,
              name,
              company,
              price,
              description,
              images,
              inStock,
              stock,
            }) => (
              <FurnitureCard
                key={_id}
                id={_id}
                userId={userId}
                name={name}
                company={company}
                price={price}
                description={description}
                inStock={inStock}
                stock={stock}
                imageURL={images?.[0]}
                images={images || []}
                quantities={quantities}
                handleAddToCart={handleAddToCart}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            )
          )
        )}
      </div>
    </section>
  );
}

export default Suggestions;
