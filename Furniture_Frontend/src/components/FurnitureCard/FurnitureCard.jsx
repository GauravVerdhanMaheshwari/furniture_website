import React from "react";

/**
 * FurnitureCard Component
 * @description Displays a furniture item with image preview, details, quantity control, and add-to-cart functionality.
 */
function FurnitureCard({
  id,
  imageURL,
  name,
  description,
  type,
  company,
  price,
  height,
  width,
  depth,
  quantities,
  handleAddToCart,
  handleIncrement,
  handleDecrement,
  images = [],
}) {
  return (
    <div className="bg-[#DDBEA9] shadow-lg rounded-xl p-4 m-3 w-full sm:w-64 md:w-72 transform transition-transform hover:scale-105">
      {/* === Image Carousel (or fallback) === */}
      <div className="overflow-x-auto flex space-x-3 mb-3">
        {(images.length > 0 ? images : [imageURL || "/fallback-image.jpg"]).map(
          (img, index) => (
            <img
              key={index}
              src={img}
              alt={`${name} - View ${index + 1}`}
              className="h-36 md:h-44 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "/fallback-image.jpg"; // Fallback image
              }}
            />
          )
        )}
      </div>

      {/* === Product Details === */}
      <h2 className="text-lg md:text-xl font-semibold text-[#3F4238]">
        {name}
      </h2>

      {/* Truncated description to maintain card height */}
      <p className="text-sm text-[#6B705C] line-clamp-2 my-1">{description}</p>

      <p className="text-sm text-[#6B705C]">
        Type: <span className="font-medium">{type}</span>
      </p>

      {/* === Dimensions === */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex-1 text-center">
          <img src="height.webp" className="w-[100%]" />
          <p className="text-sm text-[#6B705C]">Height: {height} inch</p>
        </div>
        <div className="flex-1 text-center">
          <img src="width.webp" className="w-[100%]" />
          <p className="text-sm text-[#6B705C]">Width: {width} inch</p>
        </div>
        <div className="flex-1 text-center">
          <img src="depth.webp" className="w-[100%]" />
          <p className="text-sm text-[#6B705C]">Depth: {depth} inch</p>
        </div>
      </div>

      <p className="text-sm text-[#A5A58D] mt-1">
        {company ? `Company: ${company}` : "Made in factory"}
      </p>

      <p className="text-md text-[#B98B73] font-bold mt-2">₹ {price}</p>

      {/* === Quantity Controls === */}
      <div className="flex items-center justify-between my-3">
        <button
          onClick={() => handleDecrement(id)}
          className="w-1/5 py-1 border border-[#A5A58D] rounded hover:bg-[#FFE8D6] disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <p className="w-1/5 text-center border border-[#A5A58D] py-1 rounded bg-white">
          {quantities[id] || 1}
        </p>

        <button
          onClick={() => handleIncrement(id)}
          className="w-1/5 py-1 border border-[#A5A58D] rounded hover:bg-[#FFE8D6] disabled:opacity-50"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* === Add to Cart Button === */}
      <button
        onClick={() => handleAddToCart(id, quantities[id] || 1)}
        className={`w-full py-2 rounded font-medium transition-all bg-[#CB997E] hover:bg-[#B98B73] text-white active:scale-95`}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default FurnitureCard;
