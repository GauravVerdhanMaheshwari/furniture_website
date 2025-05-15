import React, { useEffect, useState } from "react";
import FurnitureCard from "../../FurnitureCard/FurnitureCard";
import cartContext from "../../../context/CartContext.js";

function Furniture({ company, furnitureProduct, priceValue, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);
  const { cart, setCart } = React.useContext(cartContext);
  const api = "http://localhost:3000/api/furniture";

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
    return () => clearInterval(interval);
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
        console.error("Error fetching data:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCompany = !company || product.company === company;
      const matchesType =
        !furnitureProduct || product.name === furnitureProduct;
      const matchesPrice = !priceValue || product.price <= priceValue;
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCompany && matchesType && matchesPrice && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [products, company, furnitureProduct, priceValue, searchTerm]);

  return (
    <div className="flex flex-wrap justify-center pt-0 px-2 md:px-4 pb-2 md:pb-4">
      {loading ? (
        <p className="my-2 text-3xl font-bold">Loading...</p>
      ) : error ? (
        <p className="my-2 text-3xl font-bold text-red-500">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="my-2 text-3xl font-bold">No Products Found</p>
      ) : (
        filteredProducts.map(
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
  );
}

export default Furniture;
