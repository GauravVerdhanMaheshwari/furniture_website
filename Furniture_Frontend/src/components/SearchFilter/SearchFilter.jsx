import React from "react";

/**
 * SearchFilter component handles both search input and filter panel toggle.
 *
 * @param {string} searchTerm - Current search text.
 * @param {Function} setSearchTerm - Updates the search text.
 * @param {boolean} showFilter - Flag for showing the filter panel.
 * @param {Function} setShowFilter - Toggles the filter panel visibility.
 */
function SearchFilter({
  searchTerm,
  setSearchTerm,
  showFilter,
  setShowFilter,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-3 px-2 mb-4">
      {/* Search Field with Icon */}
      <div className="relative w-full sm:w-auto flex items-center">
        {/* Search Icon (click to focus input) */}
        <img
          src="/search.webp"
          alt="Search icon"
          className="w-5 h-5 sm:w-6 sm:h-6 absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
          onClick={() => document.getElementById("search")?.focus()}
        />

        {/* Search Input Field */}
        <input
          type="text"
          id="search"
          value={searchTerm}
          placeholder="Search for furniture..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowFilter(false)} // Hide filters when typing
          className="pl-10 py-2 px-3 ml-1 sm:ml-2 w-full sm:w-[220px] text-[#3F4238] bg-white border-2 border-[#DDBEA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CB997E] placeholder-[#A5A58D] transition"
          aria-label="Search input"
        />
      </div>

      {/* Toggle Filter Button */}
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className={`ml-1 sm:ml-2 px-4 py-2 text-sm font-semibold rounded shadow-sm border transition-all duration-150 ${
          showFilter
            ? "bg-[#B98B73] text-white border-transparent"
            : "text-[#6B705C] border-[#6B705C] hover:bg-[#B98B73] hover:text-white hover:border-[#B98B73]"
        }`}
        aria-label="Toggle filters"
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </button>
    </div>
  );
}

export default SearchFilter;
