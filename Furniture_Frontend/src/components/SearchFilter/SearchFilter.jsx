import React from "react";

function SearchFilter({
  searchTerm,
  setSearchTerm,
  showFilter,
  setShowFilter,
}) {
  return (
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
  );
}

export default SearchFilter;
