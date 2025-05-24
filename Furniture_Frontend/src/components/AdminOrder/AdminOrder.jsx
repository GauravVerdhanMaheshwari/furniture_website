import React, { useEffect } from "react";

function AdminOrder() {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/owner/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Orders data:", data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-20">
      <h1 className="text-3xl font-bold">Admin Orders</h1>
      <div className="mt-4 flex flex-col w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded-xl">
            <h2 className="text-xl font-semibold">{order.customerName}</h2>
            <p className="text-gray-600">{order.orderDate}</p>
            <ul className="list-disc pl-5">
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.productName} (x{item.quantity})
                </li>
              ))}
            </ul>
            <p className="font-bold">Total: ₹{order.totalAmount}</p>
            {order.accepted ? (
              <div className="flex justify-between mt-3">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                  onClick={() => {
                    order.accepted = true;
                  }}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2 cursor-pointer hover:bg-red-600"
                  onClick={() => {
                    order.accepted = false;
                  }}
                >
                  Reject
                </button>
              </div>
            ) : (
              <div className="flex justify-between mt-3 items-center">
                <p className="text-gray-600 ">Order is not delivered yet.</p>
                <div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2 cursor-pointer hover:bg-red-600"
                    onClick={() => {
                      order.accepted = false;
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrder;
