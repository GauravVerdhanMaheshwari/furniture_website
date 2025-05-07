import React, { useEffect, useState } from "react";

function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [api]);

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="">
        <h1 className=" text-3xl ">{title}</h1>
      </div>
      <div className="bg-gray-100 flex flex-wrap pt-0 px-4 pb-4">
        {products.map(({ id, name, price, description, imageUrl }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg p-4 m-4 w-72 transition-transform hover:scale-105"
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <hr />
            <h2 className="text-xl font-bold mt-2">{name}</h2>
            <p className="text-gray-700 text-pretty">{description}</p>
            <p className="text-red-500 font-bold mt-2">₹ {price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
