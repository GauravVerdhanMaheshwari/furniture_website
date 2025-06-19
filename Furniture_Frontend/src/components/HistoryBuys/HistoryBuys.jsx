import React, { useState } from "react";

/**
 * HistoryBuys Component
 * @description Displays the user's purchase history with image slider and reorder functionality.
 * @param {string} userID - Logged-in user's ID
 * @param {Array} userHistory - Array of past purchase objects
 */
function HistoryBuys({ userID, userHistory }) {
  /**
   * Reorder handler - adds a previously purchased item back to cart.
   */
  const handleReorder = async (userID, productID, quantity) => {
    try {
      const response = await fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/cart/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userID,
            items: [{ productId: productID, quantity }],
          }),
        }
      );

      if (!response.ok) throw new Error("Reorder failed");

      alert("✅ Product added to cart!");
      window.location.href = "/cart";
    } catch (error) {
      console.error("Reorder failed:", error);
      alert("❌ Failed to reorder product.");
    }
  };

  /**
   * Slider Component
   * @description Small image carousel for product previews.
   */
  const Slider = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const length = images?.length || 0;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

    if (!images || length === 0) {
      return (
        <img
          src="https://picsum.photos/200"
          alt="default"
          className="w-40 h-40 object-cover mb-2 rounded"
        />
      );
    }

    return (
      <div className="relative w-40 h-40 mb-2">
        <img
          src={images[current]}
          alt={`Product image ${current + 1}`}
          className="w-full h-full object-cover rounded shadow-md"
        />

        {/* Controls visible only if more than 1 image */}
        {length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#3F4238] bg-opacity-60 text-white px-2 py-1 rounded-l hover:bg-opacity-80"
              aria-label="Previous Image"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#3F4238] bg-opacity-60 text-white px-2 py-1 rounded-r hover:bg-opacity-80"
              aria-label="Next Image"
            >
              ›
            </button>
          </>
        )}
      </div>
    );
  };

  // Return if no purchase history is available
  if (!userHistory || userHistory.length === 0) {
    return (
      <div className="p-6 text-xl text-[#B98B73] font-semibold text-center">
        No previous purchases found.
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 rounded-md bg-[#FFE8D6]">
      <h1 className="text-2xl font-bold mb-6 text-[#3F4238] text-center md:text-left">
        Purchase History
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userHistory.map((item) => (
          <div
            key={item._id}
            className="bg-[#DDBEA9] border border-[#D4C7B0] rounded-md p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
          >
            <Slider images={item.productID.images} />

            {/* Product Name */}
            <h2 className="text-lg font-semibold text-[#3F4238] mt-1 text-center">
              {item.productID.name}
            </h2>

            {/* Purchase Details */}
            <p className="text-sm text-[#6B705C] mt-1">
              Quantity: <span className="font-medium">{item.quantity}</span>
            </p>

            <p className="text-sm text-[#6B705C]">
              Total: <span className="font-medium">₹{item.totalPrice}</span>
            </p>

            {/* Reorder Button */}
            <button
              onClick={() =>
                handleReorder(userID, item.productID._id, item.quantity)
              }
              className="mt-3 px-5 py-2 bg-[#CB997E] text-white font-medium rounded-lg hover:bg-[#B98B73] active:scale-95 transition-all duration-300"
            >
              Add to Cart Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryBuys;
