import React from "react";

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
          items: [
            {
              productId: productID,
              quantity: quantity,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // const data = await response.json();
      // console.log("Product reordered successfully:", data);
      alert("Product reordered successfully!");
    } catch (error) {
      console.error("Error reordering product:", error);
      alert("Failed to reorder product. Please try again later.");
    }
  };

  return userHistory ? (
    <div className="mt-4 flex flex-col border p-6 py-6">
      <h1 className="text-2xl font-bold mb-2">History</h1>
      {userHistory.map((item) => (
        <div
          key={item._id}
          className="flex flex-col mb-4 p-4 border rounded items-center justify-center"
        >
          <img
            src={item.productID.image || "https://picsum.photos/200/300"}
            alt=""
            onError={(e) => {
              e.target.onerror = null; // prevents infinite loop
              e.target.src = "https://picsum.photos/200/300"; // fallback image
            }}
            className="w-40 h-40 object-cover mb-2"
          />
          <h2 className="text-lg font-semibold">
            Product: {item.productID.name}
          </h2>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-600">Total Price: {item.totalPrice}</p>
          <button
            onClick={() => handleReorder(userID, item.productID, item.quantity)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Reorder
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col border p-6 text-xl font-semibold py-6">
      <p className="text-red-500">User history not available.</p>
    </div>
  );
}

export default HistoryBuys;
