import React, { useEffect, useState } from "react";

function Furniture({ company, furnitureProduct, priceValue, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/furniture")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch furniture:", err));
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
      ) : filteredProducts.length === 0 ? (
        <p className="my-2 text-3xl font-bold">No Products Found</p>
      ) : (
        filteredProducts.map(
          ({ id, name, company, price, description, imageUrl }) => (
            <div
              key={id}
              className="bg-white shadow-md rounded-lg p-3 md:p-4 m-2 md:m-4 w-full sm:w-64 md:w-72 transition-transform hover:scale-105"
            >
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-36 md:h-48 object-cover rounded-t-lg"
              />
              <hr />
              <h2 className="text-lg md:text-xl font-bold mt-2 mx-2">{name}</h2>
              <p className="text-gray-700 text-sm md:text-base line-clamp-2 md:line-clamp-3 mx-2">
                {description}
              </p>
              <p className="text-gray-500 text-sm md:text-base mx-2 my-1">
                {company ? `Company: ${company}` : "Made in factory"}
              </p>
              <p className="text-red-500 font-bold mt-2 text-base md:text-lg mx-2">
                ₹ {price}
              </p>
              <button className="w-full bg-red-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md mt-2 text-sm md:text-base hover:bg-red-600 transition-all duration-300 active:scale-95 active:bg-red-700 cursor-pointer">
                Add to Cart
              </button>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Furniture;
