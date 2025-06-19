import React from "react";
// Optional: Uncomment for better UX with icons
// import { FaCheck, FaTimes, FaTruck, FaBan } from "react-icons/fa";

/**
 * Order Component
 * @param {Object} props
 * @param {Object} props.order - Order details
 * @param {Function} props.handleOrderAction - Function to update order status
 */
export default function Order({ order, handleOrderAction }) {
  /**
   * Handle admin action confirmation and update
   * @param {string} action - Action type (accept/reject/deliver/cancel)
   * @param {string} statusLabel - New status label
   */
  const handleClick = (action, statusLabel) => {
    if (
      confirm(`Are you sure you want to mark this order as "${statusLabel}"?`)
    ) {
      handleOrderAction(order._id, action, { status: statusLabel });
    }
  };

  // Color mappings for different statuses
  const statusColors = {
    Pending: "text-yellow-600",
    Accepted: "text-blue-600",
    Delivered: "text-green-600",
    Rejected: "text-red-600",
    Cancelled: "text-gray-500",
  };

  return (
    <div className="bg-[#FDFCFB] border border-[#E3D5CA] p-6 rounded-xl shadow-lg transition hover:shadow-xl">
      {/* Header: Customer name and order time */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-2xl font-bold text-[#3F4238] truncate">
          {order.userId?.name || "Unknown Customer"}
        </h2>
        <span className="text-sm text-[#6B705C] whitespace-nowrap">
          {new Date(order.orderDate || order.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Product items preview carousel */}
      <div>
        <h3 className="font-semibold text-[#3F4238] mb-2">Ordered Items:</h3>
        <div className="flex overflow-x-auto gap-4 py-2 scrollbar-thin scrollbar-thumb-[#DDBEA9]">
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFE8D6] p-4 rounded-lg min-w-[220px] shadow-md"
            >
              <img
                src={
                  item.productDetails?.image ||
                  "https://via.placeholder.com/100"
                }
                alt={item.productDetails?.name || "Product"}
                className="w-full h-32 object-contain mb-3 rounded"
              />
              <p className="text-base font-medium text-[#3F4238] truncate">
                {item.productDetails?.name || "Loading..."}
              </p>
              <p className="text-sm text-[#6B705C]">Qty: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary and status information */}
      <div className="mt-4 text-[#3F4238] space-y-1">
        <p>
          <span className="font-semibold">Total:</span> ₹{order.totalPrice}
        </p>
        <p>
          <span className="font-semibold">Contact:</span>{" "}
          {order.userId?.phone || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span className={`font-semibold ${statusColors[order.status]}`}>
            {order.status || "Pending"}
          </span>
        </p>
      </div>

      {/* Admin control buttons for order actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        {order.status === "Pending" && (
          <>
            <button
              onClick={() => handleClick("accept", "Accepted")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              {/* <FaCheck className="inline mr-2" /> */}
              Accept
            </button>
            <button
              onClick={() => handleClick("reject", "Rejected")}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              {/* <FaTimes className="inline mr-2" /> */}
              Reject
            </button>
          </>
        )}

        {order.status === "Accepted" && (
          <>
            <button
              onClick={() => handleClick("deliver", "Delivered")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {/* <FaTruck className="inline mr-2" /> */}
              Deliver
            </button>
            <button
              onClick={() => handleClick("cancel", "Cancelled")}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              {/* <FaBan className="inline mr-2" /> */}
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
