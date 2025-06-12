import React from "react";

function FilterPanel({
  minPrice,
  maxPrice,
  priceValue,
  setPriceValue,
  handleClearFilter,
}) {
  return (
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
            <input
              type="text"
              id="price"
              value={`₹${priceValue}`}
              onChange={(e) => {
                if (e.target.value === "") {
                  setPriceValue(minPrice);
                } else if (e.target.value <= minPrice) {
                  setPriceValue(minPrice);
                } else if (e.target.value >= maxPrice) {
                  setPriceValue(maxPrice);
                } else {
                  setPriceValue(Number(e.target.value.replace(/[^0-9]/g, "")));
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setPriceValue(minPrice);
                } else if (
                  Number(e.target.value.replace(/[^0-9]/g, "")) < minPrice
                ) {
                  setPriceValue(minPrice);
                } else if (
                  Number(e.target.value.replace(/[^0-9]/g, "")) > maxPrice
                ) {
                  setPriceValue(maxPrice);
                }
              }}
              placeholder={`₹${minPrice}`}
              className="border border-[#A5A58D] bg-[#DDBEA9] text-[#3F4238] px-2 py-1 rounded w-full sm:w-auto"
            />
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
  );
}

export default FilterPanel;
