import React from "react";

/**
 * Search input with icon, designed for filtering product listings.
 *
 * @param {string} searchTerm - The current search query.
 * @param {function} setSearchTerm - Function to update the search query.
 */
function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center w-full sm:w-auto bg-[#FFF3E6] px-3 py-2 rounded-lg shadow-sm border border-[#E3D5CA]">
      {/* Search Icon (click to focus input) */}
      <button
        onClick={() => document.getElementById("search")?.focus()}
        aria-label="Focus search input"
        className="focus:outline-none"
      >
        <img
          src="/search.webp"
          alt="Search icon"
          className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 hover:opacity-100 transition-opacity duration-200"
        />
      </button>

      {/* Search Input */}
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for product..."
        className="ml-3 w-full sm:w-64 py-1.5 px-3 text-[#3F4238] placeholder-[#A5A58D] bg-transparent border-none outline-none text-sm sm:text-base"
        aria-label="Search input"
      />
    </div>
  );
}

export default Search;
