import React from "react";

function Purchase({ userPurchases, PurchaseProductDetail }) {
  const handleCancelPurchase = async (purchaseId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/purchases/${purchaseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to cancel purchase");

      alert("Purchase canceled successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error canceling purchase:", error);
      alert("Failed to cancel purchase");
    }
  };

  if (!userPurchases || userPurchases.length === 0) {
    return (
      <div className="mt-6 text-xl text-red-500">
        <p>NO PURCHASE FOUND</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
      {userPurchases.map((purchase) => (
        <div
          key={purchase._id}
          className="border rounded-md p-4 shadow mb-4 text-left"
        >
          <p className="text-gray-700">
            <strong>Order ID:</strong> {purchase._id}
          </p>

          {purchase.items.map((item, index) => {
            const product = PurchaseProductDetail.find(
              (p) => p._id === item.productId
            );
            return (
              <div key={index} className="ml-4 mt-2">
                <p>
                  <strong>Product:</strong> {product?.name || "Unknown"}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
            );
          })}

          <p className="text-gray-700 mt-2">
            <strong>Status:</strong> {purchase.status}
          </p>
          <p className="text-gray-700">
            <strong>Total Price:</strong> ₹{purchase.totalPrice}
          </p>
          <p className="text-gray-700">
            <strong>Date:</strong>{" "}
            {new Date(purchase.createdAt).toLocaleString()}
          </p>
          {purchase.status === "Pending" ? (
            <button
              onClick={() =>
                confirm("Are you sure you want to cancel the item[s]?") &&
                handleCancelPurchase(purchase._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-md my-2 hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() =>
                confirm("Are you sure you got the item[s]?") &&
                handleCancelPurchase(purchase._id)
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
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
