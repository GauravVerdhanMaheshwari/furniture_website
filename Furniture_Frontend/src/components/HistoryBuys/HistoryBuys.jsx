import React, { useState } from "react";

function HistoryBuys({ userID, userHistory }) {
  const handleReorder = async (userID, productID, quantity) => {
    try {
      const response = await fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userID,
            items: [{ productId: productID, quantity }],
          }),
        }
      );

      if (!response.ok) throw new Error("Reorder failed");
      alert("Product added to cart!");
      window.location.href = "/cart";
    } catch (error) {
      console.error("Reorder failed:", error);
      alert("Failed to reorder product.");
    }
  };

  const Slider = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const length = images?.length || 0;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

    if (!images || images.length === 0) {
      return (
        <img
          src="https://picsum.photos/200/300"
          alt="default"
          className="w-40 h-40 object-cover mb-2 rounded"
        />
      );
    }

    return (
      <div className="relative w-40 h-40 mb-2">
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="w-full h-full object-cover rounded"
        />
        {length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#3F4238] bg-opacity-40 text-white px-2 rounded-l"
              onClick={prevSlide}
            >
              ‹
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#3F4238] bg-opacity-40 text-white px-2 rounded-r"
              onClick={nextSlide}
            >
              ›
            </button>
          </>
        )}
      </div>
    );
  };

  if (!userHistory || userHistory.length === 0) {
    return (
      <div className="p-6 text-xl text-[#B98B73] font-semibold">
        No previous purchases found.
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 rounded-md bg-[#FFE8D6]">
      <h1 className="text-2xl font-bold mb-6 text-[#3F4238]">
        Purchase History
      </h1>
      {userHistory.map((item) => (
        <div
          key={item._id}
          className="bg-[#DDBEA9] border border-[#D4C7B0] rounded-md p-4 mb-6 flex flex-col items-center shadow-sm"
        >
          <Slider images={item.productID.images} />
          <h2 className="text-lg font-semibold text-[#3F4238]">
            {item.productID.name}
          </h2>
          <p className="text-[#6B705C]">Quantity: {item.quantity}</p>
          <p className="text-[#6B705C]">Total Price: ₹{item.totalPrice}</p>
          <button
            className="mt-3 px-5 py-2 bg-[#CB997E] text-white font-medium rounded hover:bg-[#B98B73] transition-colors"
            onClick={() =>
              handleReorder(userID, item.productID._id, item.quantity)
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default HistoryBuys;
