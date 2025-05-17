import React, { useEffect, useState } from "react";
import FurnitureCard from "../../FurnitureCard/FurnitureCard";

function Furniture({ company, furnitureProduct, priceValue, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);
  const api = "http://localhost:3000/api/furniture";

  const handleAddToCart = (id, name, image, price) => {
    console.log("added to cart", id, name, image, price);
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
  );
}

export default Furniture;
