import React, { useState, useEffect } from "react";

function Products() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [price, setPrice] = useState(100);

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const [filterByItems, setFilterByItems] = useState([]);

  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  let filterCss = showFilter ? "flex flex-row justify-center w-full" : "hidden";

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setFilterByItems(data.items);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <div className="flex flex-row justify-center w-full">
        <h1 className="text-2xl font-bold mr-20 my-2">Products</h1>
        <ul className="flex flex-row items-center justify-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for product"
            className="border-2 border-gray-300 rounded-lg my-1 py-1 px-2 w-full focus:outline-none"
            value={search}
            onChange={handleSearch}
          />
        </ul>
        <h1
          className="text-xl font-bold my-2 ml-12 text-center items-center justify-center cursor-pointer hover:text-blue-500 ease-in-out transition-all duration-300"
          onClick={handleFilter}
        >
          Filter
        </h1>
      </div>
      <div className={filterCss}>
        <div className="flex flex-row mx-10">
          <h1 className="text-xl font-bold my-2 mr-5 text-center items-center justify-center">
            Items
          </h1>
          <ul className="flex flex-row items-center justify-center">
            {filterByItems.map((item) => (
              <li
                key={item}
                className="px-4 py-2 border-2 border-gray-300 rounded-md m-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row ">
          <h1 className="text-xl font-bold my-2 mr-5 text-center items-center justify-center">
            Price
          </h1>
          <input
            type="range"
            name="price"
            id="price"
            value={price}
            onChange={handlePrice}
            className="w-100"
            min={100}
            max={10000}
            step={100}
          />
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handlePrice}
            className="w-100"
            readOnly
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto my-2"
        />
      </div>
    </div>
  );
}

export default Products;
