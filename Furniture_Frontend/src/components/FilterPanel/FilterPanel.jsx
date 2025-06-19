// components/FilterPanel.jsx

import React from "react";

/**
 * FilterPanel Component
 * @description A reusable component for filtering products by price using a slider and input field.
 *
 * @param {number} minPrice - Minimum price value allowed
 * @param {number} maxPrice - Maximum price value allowed
 * @param {number} priceValue - Current price value selected
 * @param {Function} setPriceValue - Setter function for updating price value
 * @param {Function} handleClearFilter - Function to reset the filter
 */
function FilterPanel({
  minPrice,
  maxPrice,
  priceValue,
  setPriceValue,
  handleClearFilter,
}) {
  /**
   * Handle manual input of price value
   * Ensures only numeric input and keeps the value within allowed bounds
   */
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Strip non-numeric chars
    const numericValue = Number(rawValue);

    if (!rawValue || numericValue <= minPrice) {
      setPriceValue(minPrice);
    } else if (numericValue >= maxPrice) {
      setPriceValue(maxPrice);
    } else {
      setPriceValue(numericValue);
    }
  };

  return (
    <div className="w-full border border-[#D4C7B0] rounded-xl p-5 bg-[#FFF9F3] mb-6 shadow-sm transition-all duration-300 animate-fade-in">
      <div className="flex flex-col gap-5">
        {/* === Header Section === */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-2">
          <h2 className="text-lg font-semibold text-[#3F4238] mb-2 sm:mb-0">
            Sort by Price
          </h2>

          {/* === Price Slider & Input Field === */}
          <div className="flex items-center gap-4 w-full sm:w-2/3">
            {/* Range Slider */}
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

            {/* Text Input */}
            <input
              type="text"
              value={`₹${priceValue}`}
              onChange={handleInputChange}
              onBlur={handleInputChange}
              placeholder={`₹${minPrice}`}
              className="border border-[#A5A58D] bg-[#DDBEA9] text-[#3F4238] px-3 py-1.5 rounded-md w-28 text-center font-medium focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
              aria-label="Price input"
            />
          </div>
        </div>

        <hr className="border-[#D4C7B0]" />

        {/* === Clear Filter Button === */}
        <div className="flex justify-end px-2">
          <button
            onClick={handleClearFilter}
            className="bg-[#CB997E] text-white px-4 py-2 rounded-md hover:bg-[#B98B73] active:scale-95 transition-all duration-300"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
