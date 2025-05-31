import React, { useEffect, useState } from "react";
import FurnitureCard from "../../FurnitureCard/FurnitureCard";

function Furniture({ company, furnitureProduct, priceValue, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);
  const api = "http://localhost:3000/api/products";

  const handleAddToCart = async (
    userID = "683adac421be8a674188b8e9",
    productId,
    quantity
  ) => {
    try {
      console.log(
        "Adding to cart:",
        productId,
        "with quantity:",
        quantity,
        "for user:",
        userID
      );
      const response = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          items: [
            {
              productId: productId,
              quantity: quantity,
            },
          ],
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to add to cart");
      }
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
              handleAddToCart={() =>
                handleAddToCart(
                  "683adac421be8a674188b8e9",
                  _id,
                  quantities[_id] || 1
                )
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
