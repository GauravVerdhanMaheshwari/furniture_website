import React from "react";

function FilterPanel({
  minPrice,
  maxPrice,
  priceValue,
  setPriceValue,
  handleClearFilter,
}) {
  // Handle direct input changes with validation and cleaning
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digits
    const numericValue = Number(rawValue);

    if (!rawValue) {
      setPriceValue(minPrice);
    } else if (numericValue <= minPrice) {
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
        {/* Header: Price Filter Label */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-2">
          <h2 className="text-lg font-semibold text-[#3F4238] mb-2 sm:mb-0">
            Sort by Price
          </h2>

          {/* Slider and Input */}
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

            {/* Text Input for price */}
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

        {/* Clear Filter Button */}
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
