import React from "react";

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center w-full sm:w-auto">
      <img
        src="/search.webp"
        alt="search"
        className="w-5 h-5 sm:w-6 sm:h-6 ml-2 cursor-pointer"
        onClick={() => document.getElementById("search").focus()}
      />
      <input
        type="text"
        id="search"
        value={searchTerm}
        placeholder="Search for product"
        className="ml-3 py-1 px-3 border border-[#DDBEA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CB997E] text-sm sm:text-base"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Search;
