import React, { useState } from "react";

function Purchase({ userPurchases, PurchaseProductDetail }) {
  const handleCancelPurchase = async (purchaseId) => {
    try {
      const response = await fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/purchases/${purchaseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Cancel failed");
      alert("Purchase status updated.");
      window.location.reload();
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to update purchase status.");
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
          className="w-32 h-32 object-cover mb-2 rounded"
        />
      );
    }

    return (
      <div className="relative w-32 h-32 mb-2">
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="w-full h-full object-cover rounded"
        />
        {length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#3F4238] bg-opacity-40 text-white px-1 rounded-l"
              onClick={prevSlide}
            >
              ‹
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#3F4238] bg-opacity-40 text-white px-1 rounded-r"
              onClick={nextSlide}
            >
              ›
            </button>
          </>
        )}
      </div>
    );
  };

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
      {userPurchases.map((purchase) => (
        <div
          key={purchase._id}
          className="bg-[#FFE8D6] border border-[#D4C7B0] rounded-md p-4 shadow mb-6"
        >
          <p className="text-[#6B705C]">
            <strong className="text-[#3F4238]">Order ID:</strong> {purchase._id}
          </p>

          {purchase.items.map((item, index) => {
            const product = PurchaseProductDetail.find(
              (p) => p._id === item.productId
            );

            return (
              <div
                key={index}
                className="ml-4 mt-3 bg-[#DDBEA9] p-3 rounded-md flex flex-col items-center border border-[#B7B7A4]"
              >
                <Slider images={product?.images} />
                <p className="text-[#3F4238] font-medium">
                  <strong>Product:</strong> {product?.name || "Unknown"}
                </p>
                <p className="text-[#6B705C]">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
            );
          })}

          <p className="mt-3 text-[#6B705C]">
            <strong className="text-[#3F4238]">Status:</strong>{" "}
            {purchase.status}
          </p>
          <p className="text-[#6B705C]">
            <strong className="text-[#3F4238]">Total Price:</strong> ₹
            {purchase.totalPrice}
          </p>
          <p className="text-[#6B705C]">
            <strong className="text-[#3F4238]">Date:</strong>{" "}
            {new Date(purchase.createdAt).toLocaleString()}
          </p>

          {(purchase.status === "Pending" ||
            purchase.status === "Accepted") && (
            <button
              onClick={() =>
                window.confirm("Are you sure you want to cancel this?") &&
                handleCancelPurchase(purchase._id)
              }
              className="bg-[#CB997E] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#B98B73] transition"
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
              OK
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Purchase;
