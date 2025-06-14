import React, { useState } from "react";

function Purchase({ userPurchases, PurchaseProductDetail }) {
  // Cancels a purchase (or confirms delivery)
  const handleCancelPurchase = async (purchaseId) => {
    try {
      const response = await fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/purchases/${purchaseId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Cancel failed");
      alert("Purchase status updated.");
      window.location.reload();
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to update purchase status.");
    }
  };

  // Slider component for cycling product images
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
          className="w-32 h-32 object-cover mb-2 rounded shadow-sm"
        />
      );
    }

    return (
      <div className="relative w-32 h-32 mb-2">
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="w-full h-full object-cover rounded shadow-md"
        />
        {length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 rounded-l hover:bg-opacity-50"
              onClick={prevSlide}
            >
              ‹
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 rounded-r hover:bg-opacity-50"
              onClick={nextSlide}
            >
              ›
            </button>
          </>
        )}
      </div>
    );
  };

  // Empty state message
  if (!userPurchases || userPurchases.length === 0) {
    return (
      <p className="text-[#B98B73] mt-6 text-xl font-semibold">
        No purchases found.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#3F4238]">
        Purchase History
      </h2>

      {/* Loop through each purchase */}
      {userPurchases.map((purchase) => (
        <div
          key={purchase._id}
          className="bg-[#FFE8D6] border border-[#D4C7B0] rounded-lg p-5 shadow-lg mb-6"
        >
          {/* Basic Purchase Info */}
          <p className="text-[#6B705C] mb-1">
            <strong className="text-[#3F4238]">Order ID:</strong> {purchase._id}
          </p>

          {/* Products inside the purchase */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
            {purchase.items.map((item, index) => {
              const product = PurchaseProductDetail.find(
                (p) => p._id === item.productId
              );

              return (
                <div
                  key={index}
                  className="bg-[#DDBEA9] p-3 rounded-md flex flex-col items-center border border-[#B7B7A4] shadow-sm"
                >
                  <Slider images={product?.images} />
                  <p className="text-[#3F4238] font-medium truncate">
                    <strong>Product:</strong> {product?.name || "Unknown"}
                  </p>
                  <p className="text-[#6B705C]">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Status & Metadata */}
          <div className="mt-4 space-y-1 text-[#6B705C]">
            <p>
              <strong className="text-[#3F4238]">Status:</strong>{" "}
              {purchase.status}
            </p>
            <p>
              <strong className="text-[#3F4238]">Total Price:</strong> ₹
              {purchase.totalPrice}
            </p>
            <p>
              <strong className="text-[#3F4238]">Date:</strong>{" "}
              {new Date(purchase.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Action Button: Cancel or Confirm Delivery */}
          {(purchase.status === "Pending" ||
            purchase.status === "Accepted") && (
            <button
              onClick={() =>
                window.confirm("Are you sure you want to cancel this?") &&
                handleCancelPurchase(purchase._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition"
            >
              Cancel
            </button>
          )}

          {purchase.status === "Delivered" && (
            <button
              onClick={() =>
                window.confirm("Did you receive the item(s)?") &&
                handleCancelPurchase(purchase._id)
              }
              className="bg-[#6B705C] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#3F4238] transition"
            >
              Confirm Received
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Purchase;
