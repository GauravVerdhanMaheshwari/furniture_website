import React, { useEffect, useState } from "react";
import { Order } from "../../components/indexComponents.js";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [empty, setEmpty] = useState(false);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    fetch(`${URL}/api/owner/purchases`)
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
              const res = await fetch(`${URL}/api/products/${item.productId}`);
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
        `${URL}/api/owner/purchases/${action}/${orderId}`,
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
    <div className="min-h-screen bg-[#FFE8D6] flex flex-col items-center justify-start px-4 py-10 mt-15">
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
              <Order
                key={order._id}
                order={order}
                handleOrderAction={handleOrderAction}
              />
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
