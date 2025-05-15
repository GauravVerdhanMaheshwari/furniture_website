import React, { useEffect, useState } from "react";
import { FurnitureCard } from "./../../index.js";
import cartContext from "../../../context/CartContext.js";

function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = React.useContext(cartContext);

  const handleAddToCart = (id, name, image, price) => {
    const quantity = quantities[id] || 1;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { id, name, image, price, quantity }];
      }
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Cart items:", cart);
    }, 1000);
    return () => clearInterval(interval); // Cleanup
  });

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
            ({ id, name, company, price, description, imageUrl }) => (
              <FurnitureCard
                key={id}
                id={id}
                name={name}
                company={company}
                price={price}
                description={description}
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
