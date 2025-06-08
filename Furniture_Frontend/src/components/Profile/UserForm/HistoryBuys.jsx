import React, { useState } from "react";

function HistoryBuys({ userID, userHistory }) {
  const handleReorder = async (userID, productID, quantity) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          items: [{ productId: productID, quantity }],
        }),
      });

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
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-1"
              onClick={prevSlide}
            >
              ‹
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-1"
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
      <div className="p-6 text-xl text-red-500 font-semibold">
        No previous purchases found.
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 border rounded-md">
      <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
      {userHistory.map((item) => (
        <div
          key={item._id}
          className="border rounded-md p-4 mb-4 flex flex-col items-center"
        >
          <Slider images={item.productID.images} />
          <h2 className="text-lg font-semibold">{item.productID.name}</h2>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-600">Total Price: ₹{item.totalPrice}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
