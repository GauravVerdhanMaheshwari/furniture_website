import React, { useEffect, useState } from "react";

function New() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/new")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-gray-100 flex flex-wrap p-4">
      <h1 className="ml-9 text-3xl ">✨ NEW</h1>
      <div className="bg-gray-100 flex flex-wrap pt-0 px-4 pb-4">
        {products.map(({ id, name, price, description, imageUrl }) => (
          <div key={id} className="bg-white shadow-md rounded-lg p-4 m-4 w-72">
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

export default New;
