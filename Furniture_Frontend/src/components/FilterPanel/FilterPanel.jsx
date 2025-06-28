import React from "react";

/**
 * FilterPanel Component
 * @description A reusable component for filtering products by type and price.
 */
function FilterPanel({
  minPrice,
  maxPrice,
  priceValue,
  setPriceValue,
  selectedType,
  setSelectedType,
  handleClearFilter,
  products,
}) {
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = Number(rawValue);

    if (!rawValue || numericValue <= minPrice) {
      setPriceValue(minPrice);
    } else if (numericValue >= maxPrice) {
      setPriceValue(maxPrice);
    } else {
      setPriceValue(numericValue);
    }
  };

  const types = [...new Set(products.map((p) => p.type))];

  return (
    <div className="w-full border border-[#D4C7B0] rounded-xl p-5 bg-[#FFF9F3] mb-6 shadow-sm transition-all duration-300 animate-fade-in">
      <div className="flex flex-col gap-6">
        {/* === Filter by Type === */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-2">
          <label
            htmlFor="typeFilter"
            className="text-lg font-semibold text-[#3F4238]"
          >
            Filter by Type
          </label>
          <select
            id="typeFilter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-52 border border-[#A5A58D] bg-[#DDBEA9] text-[#3F4238] px-3 py-2 rounded-md text-center font-medium focus:outline-none focus:ring-2 focus:ring-[#B98B73] transition"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* === Sort by Price === */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
          <h2 className="text-lg font-semibold text-[#3F4238]">
            Sort by Price
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-2/3">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step="100"
              value={priceValue}
              onChange={(e) => setPriceValue(Number(e.target.value))}
              className="w-full accent-[#B98B73] cursor-pointer"
              aria-label="Price range slider"
            />
            <input
              type="text"
              value={`₹${priceValue}`}
              onChange={handleInputChange}
              onBlur={handleInputChange}
              placeholder={`₹${minPrice}`}
              className="border border-[#A5A58D] bg-[#DDBEA9] text-[#3F4238] px-3 py-2 rounded-md w-32 text-center font-medium focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
              aria-label="Price input"
            />
          </div>
        </div>

        <hr className="border-[#D4C7B0] my-2" />

        {/* === Clear Filter Button === */}
        <div className="flex justify-end px-2">
          <button
            onClick={handleClearFilter}
            className="bg-[#CB997E] text-white px-5 py-2 rounded-md hover:bg-[#B98B73] active:scale-95 transition-all duration-300"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
