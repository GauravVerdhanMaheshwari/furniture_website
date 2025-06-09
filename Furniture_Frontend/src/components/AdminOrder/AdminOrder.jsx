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
      "https://furniture-website-backend-yubt.onrender.com/api/owner/purchases",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
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
      .catch((error) => {
        console.error("Fetch error:", error);
      });
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
              return {
                ...item,
                productDetails: productData,
              };
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
        }
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      console.log(data);
      window.location.reload();
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: update.status } : order
        )
      );
    } catch (err) {
      console.error(`${action} failed:`, err);
    }
  };

  return !empty ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-25 shadow-lg">
      <h1 className="text-3xl font-bold">Admin Orders</h1>
      <div className="mt-4 w-full justify-center flex p-4 rounded-lg">
        <input
          type="search"
          placeholder="Search orders by name"
          className="border p-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-4 flex flex-col w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-500 text-3xl">Loading...</p>
        ) : (
          orders
            .filter((order) =>
              order.userId?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((order) => (
              <div key={order._id} className="border p-4 mb-4 rounded-xl">
                <h2 className="text-xl font-semibold">
                  {order.userId?.name || "Unknown Customer"}
                </h2>
                <p className="text-gray-600">
                  {new Date(
                    order.orderDate || order.createdAt
                  ).toLocaleString()}
                </p>

                {/* Product Image Slider */}
                <div className="mt-2">
                  <h3 className="font-semibold">Products:</h3>
                  <div className="overflow-x-auto flex space-x-4 py-2">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="min-w-[200px] bg-gray-100 p-2 rounded-lg shadow"
                      >
                        <img
                          src={item.productDetails?.image || ""}
                          alt={item.productDetails?.name || "Product"}
                          className="w-full h-32 object-contain rounded mb-2"
                        />
                        <p className="font-medium">
                          {item.productDetails?.name || "Loading..."}
                        </p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="font-bold mt-2">Total: ₹{order.totalPrice}</p>
                <p className="font-bold">
                  Contact Number: {order.userId.phone || "N/A"}
                </p>

                <div className="mt-2">
                  <span className="font-semibold text-blue-500">
                    Status: {order.status || "Pending"}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  {order.status === "Pending" && (
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                        onClick={() =>
                          confirm(`Accept order ${order._id}?`) &&
                          handleOrderAction(order._id, "accept", {
                            status: "Accepted",
                          })
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                        onClick={() =>
                          confirm(`Reject order ${order._id}?`) &&
                          handleOrderAction(order._id, "reject", {
                            status: "Rejected",
                          })
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {order.status === "Accepted" && (
                    <div className="flex justify-between">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() =>
                          confirm(`Deliver order ${order._id}?`) &&
                          handleOrderAction(order._id, "deliver", {
                            status: "Delivered",
                          })
                        }
                      >
                        Deliver
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
                        onClick={() =>
                          confirm(`Cancel order ${order._id}?`) &&
                          handleOrderAction(order._id, "cancel", {
                            status: "Cancelled",
                          })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-3xl">No orders found</p>
    </div>
  );
}

export default AdminOrder;
