import React from "react";

/**
 * FurnitureCard Component
 * @description Displays a single furniture item card with image previews, details, and inquiry interaction.
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
  handleInquiry,
  userMessage,
  setUserMessage,
  productInquired,
  setProductInquired,
}) {
  const fallbackImage = "/fallback-image.jpg";

  return (
    <div className="bg-[#DDBEA9] shadow-lg rounded-xl p-4 m-3 w-full sm:w-64 md:w-72 transform transition-transform hover:scale-105">
      {/* Image Carousel */}
      <div className="overflow-x-auto flex space-x-3 mb-3">
        {(images.length > 0 ? images : [imageURL || fallbackImage]).map(
          (img, index) => (
            <img
              key={index}
              src={img}
              alt={`${name || "Furniture"} - View ${index + 1}`}
              className="h-36 md:h-44 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
          )
        )}
      </div>

      {/* Product Info */}
      <h2 className="text-lg md:text-xl font-semibold text-[#3F4238] truncate">
        {name || "Unnamed Product"}
      </h2>
      <p className="text-sm text-[#6B705C] line-clamp-2 my-1">
        {description || "No description available."}
      </p>
      <p className="text-sm text-[#6B705C]">
        Type: <span className="font-medium">{type || "N/A"}</span>
      </p>

      {/* Size Info */}
      <div className="flex items-center justify-between mt-2 text-sm text-[#6B705C]">
        <p className="flex-1 text-center">H: {height || "?"} in</p>
        <p className="flex-1 text-center">W: {width || "?"} in</p>
        <p className="flex-1 text-center">D: {depth || "?"} in</p>
      </div>

      {/* Company + Price */}
      <p className="text-sm text-[#A5A58D] mt-1">
        {company ? `Company: ${company}` : "Made in factory"}
      </p>
      <p className="text-md text-[#B98B73] font-bold mt-2">₹ {price ?? "?"}</p>

      {/* Inquiry Button */}
      <button
        className={`w-full py-2 rounded-lg mt-3 transition-colors text-white ${
          productInquired
            ? "bg-red-500 hover:bg-red-600"
            : "bg-[#3F4238] hover:bg-[#2C2D29]"
        }`}
        onClick={(e) => {
          setProductInquired();
          e.stopPropagation();
        }}
      >
        <span className="text-sm">
          {productInquired ? "Cancel Inquiry" : "Start Inquiry"}
        </span>
      </button>

      {/* Inquiry Text Area */}
      {productInquired && (
        <div className="mt-3">
          <textarea
            className="w-full p-2 border border-[#D4C7B0] rounded-lg text-sm"
            rows="3"
            placeholder="Type your message here..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            aria-label="Inquiry Message"
          />
          <button
            className="w-full bg-[#3F4238] text-white py-2 rounded-lg mt-2 hover:bg-[#2C2D29] transition-colors disabled:opacity-50"
            onClick={() => handleInquiry(id)}
            disabled={!userMessage.trim()}
          >
            Send Inquiry
          </button>
        </div>
      )}
    </div>
  );
}

export default FurnitureCard;
