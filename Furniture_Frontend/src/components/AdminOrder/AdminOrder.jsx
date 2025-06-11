import React, { useEffect, useState } from "react";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [empty, setEmpty] = useState(false);

  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    fetch(
      "https://furniture-website-backend-yubt.onrender.com/api/owner/purchases"
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
          fetchProductDetails(data);
        }
        setLoading(false);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const fetchProductDetails = async (ordersData) => {
    const updatedOrders = await Promise.all(
      ordersData.map(async (order) => {
        const updatedItems = await Promise.all(
          order.items.map(async (item) => {
            try {
              const res = await fetch(
                `https://furniture-website-backend-yubt.onrender.com/api/products/${item.productId}`
              );
              const productData = await res.json();
              return { ...item, productDetails: productData };
            } catch (err) {
              console.error("Product fetch failed:", err);
              return item;
            }
          })
        );
        return { ...order, items: updatedItems };
      })
    );
    setOrders(updatedOrders);
  };

  const handleOrderAction = async (orderId, action, update) => {
    try {
      const res = await fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/owner/purchases/${action}/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(update),
        }
      );
      if (!res.ok) throw new Error("Network error");
      await res.json();
      window.location.reload();
    } catch (err) {
      console.error(`${action} failed:`, err);
    }
  };

  return !empty ? (
    <div className="min-h-screen bg-[#FFE8D6] flex flex-col items-center justify-start px-4 py-10">
      <h1 className="text-4xl font-bold text-[#3F4238] mb-6">Admin Orders</h1>

      <div className="w-full max-w-4xl mb-6">
        <input
          type="search"
          placeholder="Search orders by customer name"
          className="w-full border border-[#A5A58D] bg-[#DDBEA9] text-[#3F4238] px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        {loading ? (
          <p className="text-2xl text-[#6B705C] text-center">Loading...</p>
        ) : (
          orders
            .filter((order) =>
              order.userId?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((order) => (
              <div
                key={order._id}
                className="bg-[#DDBEA9] p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-[#3F4238]">
                    {order.userId?.name || "Unknown Customer"}
                  </h2>
                  <span className="text-sm text-[#6B705C]">
                    {new Date(
                      order.orderDate || order.createdAt
                    ).toLocaleString()}
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
                        <p className="text-sm text-[#6B705C]">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-[#3F4238]">
                  <p className="font-bold">Total: ₹{order.totalPrice}</p>
                  <p className="font-bold">
                    Contact: {order.userId?.phone || "N/A"}
                  </p>
                  <p className="mt-1 font-medium">
                    Status:{" "}
                    <span className="text-[#6B705C]">
                      {order.status || "Pending"}
                    </span>
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
            ))
        )}
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-[#FFE8D6] flex items-center justify-center">
      <p className="text-2xl text-[#6B705C]">No orders found</p>
    </div>
  );
}

export default AdminOrder;
