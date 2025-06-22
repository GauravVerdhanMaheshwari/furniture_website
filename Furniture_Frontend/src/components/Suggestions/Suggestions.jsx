import React, { useEffect, useState } from "react";
import { FurnitureCard } from "../indexComponents.js";
import { useSelector } from "react-redux";

/**
 * Suggestions component fetches and displays furniture products dynamically.
 *
 * @param {string} title - Section heading.
 * @param {string} api - API endpoint to fetch suggested products.
 */
function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const userId = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  // Fetch product data on mount or api/title change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error(`Status ${response.status}`);

        const data = await response.json();
        const productList = Array.isArray(data) ? data : data.products || [];

        setProducts(productList);
        if (productList.length === 0 && data.message) {
          setError(`No products found in "${title}" category`);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [api, title]);

  // Show loading state
  if (loading) {
    return (
      <div className="text-center p-6 bg-[#FFE8D6] text-[#3F4238]">
        <p className="text-lg animate-pulse">Loading products...</p>
      </div>
    );
  }

  // Handle API error
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
          products.map((product) => (
            <FurnitureCard
              key={product._id}
              id={product._id}
              userId={userId}
              name={product.name}
              company={product.company}
              price={product.price}
              description={product.description}
              imageURL={product.images?.[0]}
              images={product.images || []}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Suggestions;
