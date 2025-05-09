import React, { useEffect, useState } from "react";

function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [api]);

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center p-2 md:p-4">
      <div className="w-full text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">{title}</h1>
      </div>
      <div className="bg-gray-100 flex flex-wrap justify-center pt-0 px-2 md:px-4 pb-2 md:pb-4">
        {products.map(({ id, name, price, description, imageUrl }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg p-3 md:p-4 m-2 md:m-4 w-full sm:w-64 md:w-72 transition-transform hover:scale-105"
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-36 md:h-48 object-cover rounded-t-lg"
            />
            <hr />
            <h2 className="text-lg md:text-xl font-bold mt-2 mx-2">{name}</h2>
            <p className="text-gray-700 text-sm md:text-base text-pretty line-clamp-2 md:line-clamp-3 mx-2">
              {description}
            </p>
            <p className="text-red-500 font-bold mt-2 text-base md:text-lg mx-2">
              ₹ {price}
            </p>
            <button className="w-full bg-red-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md mt-2 text-sm md:text-base hover:bg-red-600 transition-all duration-300 active:scale-95 active:bg-red-700 cursor-pointer">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
