import React, { useEffect, useState } from "react";
import { FurnitureCard } from "../../components/indexComponents.js";
import { useSelector } from "react-redux";

/**
 * Furniture Component
 * Displays a list of filtered furniture products and handles cart interaction.
 *
 * Props:
 * - company: string (optional) → filters by company
 * - furnitureProduct: string (optional) → search term for product name
 * - priceValue: number (optional) → max price filter
 * - searchTerm: string (optional) → global search filter
 */
function Furniture({ company, furnitureProduct, priceValue, searchTerm }) {
  const [products, setProducts] = useState([]); // All products fetched from the backend
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered result
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [quantities, setQuantities] = useState({}); // Stores quantity for each product
  const [error, setError] = useState(null); // Error state

  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const userId = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  /**
   * ➕ Increments the quantity of a specific product
   */
  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  /**
   * ➖ Decrements the quantity of a specific product (min 1)
   */
  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  /**
   * 🛒 Adds a selected product and quantity to the user's cart
   */
  const handleAddToCart = async (userId, productId, quantity) => {
    if (!isLoggedIn || !userId) {
      alert("You must be logged in to add items to the cart.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`${URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          items: [{ productId, quantity }],
        }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to add to cart");

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Failed to send cart data to server:", error);
      alert("Something went wrong while adding to cart.");
    }
  };

  /**
   * 🔄 Fetch product list from backend on component mount
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * 🔍 Filters product list based on passed props
   */
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCompany = !company || product.company === company;
      const matchesProduct =
        !furnitureProduct ||
        product.name.toLowerCase().includes(furnitureProduct.toLowerCase());
      const matchesPrice = !priceValue || product.price <= priceValue;
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCompany && matchesProduct && matchesPrice && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [products, company, furnitureProduct, priceValue, searchTerm]);

  /**
   * 🖼️ Renders UI
   */
  return (
    <div className="flex flex-wrap justify-center pt-4 px-2 md:px-6 pb-10 bg-[#FFE8D6] min-h-[85vh] text-[#3F4238]">
      {loading ? (
        <p className="my-10 text-2xl md:text-3xl font-semibold text-[#6B705C] animate-pulse">
          Loading products...
        </p>
      ) : error ? (
        <p className="my-10 text-2xl md:text-3xl font-semibold text-red-500">
          {error}
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="my-10 text-2xl md:text-3xl font-semibold text-[#6B705C]">
          No Products Found
        </p>
      ) : (
        filteredProducts.map(
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
              name={name}
              company={company}
              price={price}
              description={description}
              inStock={inStock}
              stock={stock}
              images={images}
              imageURL={images?.[0]}
              quantities={quantities}
              handleAddToCart={() =>
                handleAddToCart(userId, _id, quantities[_id] || 1)
              }
              handleIncrement={() => handleIncrement(_id)}
              handleDecrement={() => handleDecrement(_id)}
            />
          )
        )
      )}
    </div>
  );
}

export default Furniture;
