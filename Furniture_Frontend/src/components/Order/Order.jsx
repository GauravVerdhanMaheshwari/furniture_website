import React from "react";

export default function Order({ order, handleOrderAction }) {
  return (
    <div key={order._id} className="bg-[#DDBEA9] p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-[#3F4238]">
          {order.userId?.name || "Unknown Customer"}
        </h2>
        <span className="text-sm text-[#6B705C]">
          {new Date(order.orderDate || order.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-[#3F4238]">Products:</h3>
        <div className="flex overflow-x-auto gap-4 py-2">
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFE8D6] p-3 rounded-lg min-w-[200px] shadow-sm"
            >
              <img
                src={item.productDetails?.image}
                alt={item.productDetails?.name}
                className="w-full h-32 object-contain mb-2 rounded"
              />
              <p className="text-sm font-medium text-[#3F4238]">
                {item.productDetails?.name || "Loading..."}
              </p>
              <p className="text-sm text-[#6B705C]">Qty: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-[#3F4238]">
        <p className="font-bold">Total: ₹{order.totalPrice}</p>
        <p className="font-bold">Contact: {order.userId?.phone || "N/A"}</p>
        <p className="mt-1 font-medium">
          Status:{" "}
          <span className="text-[#6B705C]">{order.status || "Pending"}</span>
        </p>
      </div>

      {order.status === "Pending" && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={() =>
              confirm(`Accept order ${order._id}?`) &&
              handleOrderAction(order._id, "accept", {
                status: "Accepted",
              })
            }
            className="bg-[#6B705C] text-white px-4 py-2 rounded hover:bg-[#3F4238] transition"
          >
            Accept
          </button>
          <button
            onClick={() =>
              confirm(`Reject order ${order._id}?`) &&
              handleOrderAction(order._id, "reject", {
                status: "Rejected",
              })
            }
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Reject
          </button>
        </div>
      )}

      {order.status === "Accepted" && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={() =>
              confirm(`Deliver order ${order._id}?`) &&
              handleOrderAction(order._id, "deliver", {
                status: "Delivered",
              })
            }
            className="bg-[#CB997E] text-white px-4 py-2 rounded hover:bg-[#B98B73] transition"
          >
            Deliver
          </button>
          <button
            onClick={() =>
              confirm(`Cancel order ${order._id}?`) &&
              handleOrderAction(order._id, "cancel", {
                status: "Cancelled",
              })
            }
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
