import React from "react";

function FurnitureCard({
  id,
  imageUrl,
  name,
  description,
  company,
  price,
  quantities,
  inStock,
  stock,
  handleAddToCart,
  handleIncrement,
  handleDecrement,
}) {
  const stockCSS = inStock
    ? "bg-white shadow-md rounded-lg p-3 md:p-4 m-2 md:m-4 w-full sm:w-64 md:w-72 transition-transform hover:scale-105"
    : "bg-white shadow-md rounded-lg p-3 md:p-4 m-2 md:m-4 w-full sm:w-64 md:w-72 opacity-50 cursor-not-allowed";

  const inStockCSS = inStock
    ? "text-green-500  mt-2 text-base md:text-lg mx-2"
    : "text-red-500  mt-2 text-base md:text-lg mx-2";

  return (
    <div className={stockCSS}>
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-36 md:h-48 object-cover rounded-t-lg"
      />
      <hr />
      <h2 className="text-lg md:text-xl font-bold mt-2 mx-2">{name}</h2>
      <p className="text-gray-700 text-sm md:text-base line-clamp-2 md:line-clamp-3 mx-2">
        {description}
      </p>
      <div>
        <p className="text-gray-500 text-sm md:text-base mx-2 my-1">
          {company ? `Company: ${company}` : "Made in factory"}
        </p>
        <p className={inStockCSS}>
          {inStock ? `In Stock: ${stock}` : "Out of Stock"}
        </p>
      </div>
      <p className="text-red-500 font-bold mt-2 text-base md:text-lg mx-2">
        ₹ {price}
      </p>

      <div className="flex items-center justify-between space-x-2 mb-2 px-2">
        <button
          onClick={() => handleDecrement(id)}
          className="w-1/5 py-1 border-2 border-gray-300 rounded hover:cursor-pointer"
          disabled={!inStock}
        >
          -
        </button>
        <p
          className="w-1/5 text-center py-1 border-2 border-gray-300 rounded"
          disabled={!inStock}
        >
          {quantities[id] || 1}
        </p>
        <button
          onClick={() => handleIncrement(id)}
          className="w-1/5 py-1 border-2 border-gray-300 rounded hover:cursor-pointer"
          disabled={!inStock}
        >
          +
        </button>
      </div>

      <button
        onClick={() => handleAddToCart(id, name, quantities[id] || 1)}
        className={
          inStock
            ? "w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 active:scale-95 transition-all hover:cursor-pointer"
            : "w-full bg-gray-500 text-white py-2 rounded transition-all hover:cursor-not-allowed"
        }
        disabled={!inStock}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default FurnitureCard;
