import React, { useState, useEffect } from "react";

function Products() {
  const [showFilter, setShowFilter] = useState(false);
  const [priceValue, setPriceValue] = useState(100);
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleTypeSelect = (productName) => {
    setSelectedType((prev) => (prev === productName ? "" : productName));
  };

  const getTypeButtonClass = (productName) => {
    return productName === selectedType
      ? "bg-blue-500 border px-3 py-2 rounded shadow-sm text-sm text-white cursor-pointer"
      : "bg-white border px-3 py-2 rounded shadow-sm text-sm cursor-pointer";
  };

  const fillterTextCSS = showFilter ? "text-blue-500" : "text-black";

  return (
    <div className="flex flex-col items-center justify-center mt-25 px-2 sm:px-4 max-w-8xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Products</h1>

      {/* Search & Filter Row */}
      <div className="flex flex-col sm:flex-row items-center w-full mb-4 gap-2 sm:gap-0">
        <div className="flex items-center w-full sm:w-auto">
          <img
            src="search.webp"
            alt="search"
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer ml-2"
            onClick={() => document.getElementById("search").focus()}
          />
          <input
            type="text"
            id="search"
            placeholder="Search for product"
            className="border-2 border-gray-300 rounded-lg py-1 px-2 w-full sm:w-[200px] ml-2 focus:outline-none text-sm sm:text-base"
          />
        </div>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`w-full sm:w-auto sm:ml-auto text-base sm:text-lg font-semibold hover:text-blue-500 transition py-2 sm:py-0 ${fillterTextCSS}`}
        >
          Filter
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="w-full border rounded p-2 sm:p-4 bg-gray-50 mb-4">
          <div className="flex flex-col gap-4">
            {/* Price Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-2 sm:gap-0">
              <h2 className="text-base sm:text-lg font-semibold">
                Sort by Price
              </h2>
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <input
                  type="range"
                  id="price"
                  min="100"
                  max="10000"
                  step="100"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  className="w-full"
                />
                <span className="text-sm font-medium whitespace-nowrap">
                  ₹{priceValue}
                </span>
              </div>
            </div>
            <hr />

            {/* Furniture Type Filter */}
            <div className="flex flex-col sm:flex-row items-start justify-between px-2 sm:px-4 gap-2 sm:gap-0">
              <h2 className="text-base sm:text-lg font-semibold flex-none sm:flex-1 cursor-pointer">
                Furniture Type
              </h2>
              <div className="flex flex-wrap gap-2 w-full sm:w-2/3">
                {products.map((product) => (
                  <span
                    key={product.id || product.name}
                    className={getTypeButtonClass(product.name)}
                    onClick={() => handleTypeSelect(product.name)}
                  >
                    {product.name}
                  </span>
                ))}
              </div>
            </div>
            <hr />
          </div>
        </div>
      )}

      <hr className="w-full mb-4" />

      {/* Render Product Cards or Filtered Items Below */}
      {/* Add product cards display here */}
    </div>
  );
}

export default Products;
