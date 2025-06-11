import { useState, useEffect } from "react";
import Furniture from "./Furniture/Furniture";

function Products() {
  const [showFilter, setShowFilter] = useState(false);
  const [priceValue, setPriceValue] = useState(10000);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const minPrice = 100;
  const maxPrice = 10000;

  useEffect(() => {
    fetch("https://furniture-website-backend-yubt.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const items = data?.items || [];
        const types = [...new Set(items?.map((item) => item.name))];
        if (!types.includes(selectedType)) setSelectedType("");
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [selectedType]);

  const handleClearFilter = () => {
    setPriceValue(maxPrice);
    setSelectedType("");
    setSelectedCompany("");
    setShowFilter(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4 bg-[#FFE8D6] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#3F4238]">Our Products</h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center w-full mb-4 gap-2 px-2">
        <div className="flex items-center w-full sm:w-auto relative">
          <img
            src="search.webp"
            alt="search"
            className="w-6 h-6 cursor-pointer ml-2 absolute left-2 top-2.5"
            onClick={() => document.getElementById("search").focus()}
          />
          <input
            type="text"
            id="search"
            value={searchTerm}
            placeholder="Search for furniture..."
            className="pl-10 border-2 border-[#DDBEA9] bg-white text-[#3F4238] rounded-lg py-2 px-3 w-full sm:w-[220px] ml-2 focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowFilter(false)}
          />
        </div>

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`font-semibold transition duration-150 ml-2 border px-3 py-1 rounded text-sm shadow-sm ${
            showFilter
              ? "bg-[#B98B73] text-white"
              : "text-[#6B705C] border-[#6B705C] hover:bg-[#B98B73] hover:text-white"
          }`}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="w-full border border-[#D4C7B0] rounded p-4 bg-[#FFF9F3] mb-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {/* Price */}
            <div className="flex flex-col sm:flex-row justify-between px-2 items-center">
              <h2 className="font-semibold text-[#3F4238] mb-2 sm:mb-0">
                Sort by Price
              </h2>
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="100"
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  className="w-full accent-[#B98B73]"
                />
                <span className="text-[#3F4238] whitespace-nowrap">
                  ₹{priceValue}
                </span>
              </div>
            </div>
            <hr className="border-[#D4C7B0]" />

            <div className="flex justify-end px-2">
              <button
                className="bg-[#CB997E] text-white px-4 py-2 rounded hover:bg-[#B98B73] transition"
                onClick={handleClearFilter}
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      )}

      <hr className="w-full border-[#D4C7B0] mb-6" />

      {/* Product List */}
      <Furniture
        company={selectedCompany}
        furnitureProduct={selectedType}
        priceValue={priceValue}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default Products;
