import React from "react";

function Purchase({ userPurchases, PurchaseProductDetail }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
      {userPurchases && userPurchases.length > 0 ? (
        userPurchases.map((purchase) => (
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
          </div>
        ))
      ) : (
        <p className="text-gray-500">No purchases found.</p>
      )}
    </div>
  );
}

export default Purchase;
