import { useState, useEffect } from "react";
import Furniture from "./Furniture/Furniture";

function Products() {
  const [showFilter, setShowFilter] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [priceValue, setPriceValue] = useState(100);
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items);
        // Reset selectedType if it's not valid anymore
        const types = data.items.map((item) => item.name);
        if (!types.includes(selectedType)) {
          setSelectedType("");
          setShowCompany(false);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/company")
      .then((res) => res.json())
      .then((data) => setCompany(data.items))
      .catch((err) => console.error("Failed to fetch company:", err));
  });

  const handleTypeSelect = (type) => {
    const newType = selectedType === type ? "" : type;
    setSelectedType(newType);
    setShowCompany(newType === "Chair");
  };

  const handleCompanySelect = (brand) => {
    setSelectedCompany((prev) => (prev === brand ? "" : brand));
  };

  const getTypeButtonClass = (type) =>
    type === selectedType
      ? "bg-blue-500 border px-3 py-2 rounded shadow-sm text-sm text-white cursor-pointer"
      : "bg-white border px-3 py-2 rounded shadow-sm text-sm cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out";

  const getCompanyButtonClass = (brand) =>
    brand === selectedCompany
      ? "bg-blue-500 border px-3 py-2 rounded shadow-sm text-sm text-white cursor-pointer"
      : "bg-white border px-3 py-2 rounded shadow-sm text-sm cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out";

  const handleFilter = () => {
    const typeNames = products.map((p) => p.name);
    if (!typeNames.includes(selectedType)) {
      setSelectedType("");
      setShowCompany(false);
    }

    console.log("Filter applied with price:", priceValue);
    console.log("Selected type:", selectedType);
    console.log("Selected company:", selectedCompany);
  };

  const handleClearFilter = () => {
    setPriceValue(100);
    setSelectedType("");
    setSelectedCompany("");
    setShowFilter(false);
    setShowCompany(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-25 px-2 sm:px-4 max-w-8xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Products</h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center w-full mb-4 gap-2 sm:gap-0 px-3">
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
            onFocus={() => setShowFilter(false)}
            onBlur={() => setShowFilter(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Search for:", e.target.value);
              }
            }}
          />
        </div>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`w-full sm:w-auto sm:ml-auto text-base sm:text-lg font-semibold hover:text-blue-500 transition py-2 sm:py-0 cursor-pointer ${
            showFilter ? "text-blue-500" : "text-black"
          }`}
        >
          Filter
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="w-full border rounded p-2 sm:p-4 bg-gray-50 mb-4">
          <div className="flex flex-col gap-4">
            {/* Price */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-2 sm:gap-0">
              <h2 className="text-base sm:text-lg font-semibold">
                Sort by Price
              </h2>
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-medium whitespace-nowrap">
                  ₹{priceValue}
                </span>
              </div>
            </div>
            <hr />

            {/* Type */}
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

            {/* Company (Only if Chair) */}
            {showCompany && (
              <div className="flex flex-col sm:flex-row items-start justify-between px-2 sm:px-4 gap-2 sm:gap-0">
                <h2 className="text-base sm:text-lg font-semibold flex-none sm:flex-1 cursor-pointer">
                  Company
                </h2>
                <div className="flex flex-wrap gap-2 w-full sm:w-2/3">
                  {company.map((comp) => (
                    <span
                      key={comp.id || comp.name}
                      className={getCompanyButtonClass(comp.name)}
                      onClick={() => handleCompanySelect(comp.name)}
                    >
                      {comp.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <hr />

            {/* Actions */}
            <div className="flex justify-between items-center mt-2 px-4 sm:px-4">
              <span
                className="bg-white border px-3 py-2 rounded shadow-sm text-sm cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out active:bg-blue-400"
                onClick={handleFilter}
              >
                Filter
              </span>
              <span
                className="bg-white border px-3 py-2 rounded shadow-sm text-sm cursor-pointer hover:bg-red-100 transition duration-200 ease-in-out active:bg-red-400"
                onClick={handleClearFilter}
              >
                Clear Filter
              </span>
            </div>
          </div>
        </div>
      )}

      <hr className="w-full mb-4" />

      <Furniture />
    </div>
  );
}

export default Products;
