import React, { useEffect, useState } from "react";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/owner/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Orders data:", data);
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleOrderAction = async (orderId, action, update) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/owner/order/${orderId}/${action}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      console.log(`${action} success:`, data);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, ...update } : order
        )
      );
    } catch (err) {
      console.error(`${action} failed:`, err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-25 shadow-lg">
      <h1 className="text-3xl font-bold">Admin Orders</h1>
      <div className="mt-4 w-full justify-center flex p-4 rounded-lg">
        <input
          type="search"
          placeholder="Search orders by name"
          className="border p-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="mt-4 flex flex-col w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-500 text-3xl">Loading...</p>
        ) : (
          orders
            .filter((order) =>
              order.customerName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((order) => (
              <div key={order.id} className="border p-4 mb-4 rounded-xl">
                <h2 className="text-xl font-semibold">{order.customerName}</h2>
                <p className="text-gray-600">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
                <ul className="list-disc pl-5">
                  {order.items?.map((item) => (
                    <li key={item.productId}>
                      {item.productName} (x{item.quantity})
                    </li>
                  ))}
                </ul>
                <p className="font-bold">Total: ₹{order.totalAmount}</p>
                <p className="font-bold">
                  Contact Number: {order.contentNumber}
                </p>

                {/* Status */}
                <div className="mt-2">
                  {order.rejected ? (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  ) : order.delivered ? (
                    <span className="text-green-600 font-semibold">
                      Delivered
                    </span>
                  ) : order.accepted ? (
                    <span className="text-blue-500 font-semibold">
                      Accepted
                    </span>
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </div>

                {/* Actions */}
                {!order.accepted && !order.rejected ? (
                  <div className="flex justify-between mt-3">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                      onClick={() =>
                        confirm(
                          `Accepting order ${order.id} for ${order.customerName}`
                        )
                          ? handleOrderAction(order.id, "accept", {
                              accepted: true,
                            })
                          : null
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                      onClick={() =>
                        confirm(
                          `Rejecting order ${order.id} for ${order.customerName}. This action cannot be undone.`
                        )
                          ? handleOrderAction(order.id, "reject", {
                              rejected: true,
                            })
                          : null
                      }
                    >
                      Reject
                    </button>
                  </div>
                ) : order.accepted && !order.delivered ? (
                  <div className="flex flex-col my-3">
                    <p className="text-gray-600 mb-2">
                      Order accepted but not delivered.
                    </p>
                    <div className="flex justify-between">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() =>
                          confirm(
                            `Delivered order ${order.id} for ${order.customerName}? This action cannot be undone.`
                          )
                            ? handleOrderAction(order.id, "deliver", {
                                accepted: true,
                                delivered: true,
                              })
                            : null
                        }
                      >
                        Deliver
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
                        onClick={() =>
                          handleOrderAction(order.id, "cancel", {
                            accepted: false,
                          })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default AdminOrder;
