import React from "react";

function FurnitureCard({
  id,
  imageURL,
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
  images = [],
}) {
  // Conditional styling for availability
  const baseCardStyle = inStock
    ? "bg-[#DDBEA9] shadow-lg rounded-xl p-4 m-3 w-full sm:w-64 md:w-72 transform transition-transform hover:scale-105"
    : "bg-[#DDBEA9] shadow-lg rounded-xl p-4 m-3 w-full sm:w-64 md:w-72 opacity-60 cursor-not-allowed";

  const stockTextColor = inStock ? "text-green-700" : "text-red-600";

  return (
    <div className={baseCardStyle}>
      {/* Image Carousel or Fallback */}
      <div className="overflow-x-auto flex space-x-3 mb-3">
        {(images.length > 0 ? images : [imageURL || "/fallback-image.jpg"]).map(
          (img, index) => (
            <img
              key={index}
              src={img}
              alt={`${name}-${index + 1}`}
              className="h-36 md:h-44 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "/fallback-image.jpg"; // Fallback for broken images
              }}
            />
          )
        )}
      </div>

      {/* Product Details */}
      <h2 className="text-lg md:text-xl font-semibold text-[#3F4238]">
        {name}
      </h2>

      {/* Truncated description for consistent height */}
      <p className="text-sm text-[#6B705C] line-clamp-2 my-1">{description}</p>

      <p className="text-sm text-[#A5A58D] mt-1">
        {company ? `Company: ${company}` : "Made in factory"}
      </p>

      <p className={`text-sm font-medium mt-1 ${stockTextColor}`}>
        {inStock ? `In Stock: ${stock}` : "Out of Stock"}
      </p>

      <p className="text-md text-[#B98B73] font-bold mt-2">₹ {price}</p>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between my-3">
        <button
          onClick={() => handleDecrement(id)}
          className="w-1/5 py-1 border border-[#A5A58D] rounded hover:bg-[#FFE8D6] disabled:opacity-50"
          disabled={!inStock}
        >
          −
        </button>

        <p className="w-1/5 text-center border border-[#A5A58D] py-1 rounded bg-white">
          {quantities[id] || 1}
        </p>

        <button
          onClick={() => handleIncrement(id, stock)}
          className="w-1/5 py-1 border border-[#A5A58D] rounded hover:bg-[#FFE8D6] disabled:opacity-50"
          disabled={!inStock}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(id, quantities[id] || 1)}
        className={`w-full py-2 rounded font-medium transition-all ${
          inStock
            ? "bg-[#CB997E] hover:bg-[#B98B73] text-white active:scale-95"
            : "bg-[#B7B7A4] text-white cursor-not-allowed"
        }`}
        disabled={!inStock}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default FurnitureCard;
