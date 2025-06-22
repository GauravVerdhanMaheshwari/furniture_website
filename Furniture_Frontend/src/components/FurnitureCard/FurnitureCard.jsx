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
          <p className="text-sm text-[#6B705C]">Height: {height} inch</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm text-[#6B705C]">Width: {width} inch</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm text-[#6B705C]">Depth: {depth} inch</p>
        </div>
      </div>

      <p className="text-sm text-[#A5A58D] mt-1">
        {company ? `Company: ${company}` : "Made in factory"}
      </p>

      <p className="text-md text-[#B98B73] font-bold mt-2">₹ {price}</p>
    </div>
  );
}

export default FurnitureCard;
