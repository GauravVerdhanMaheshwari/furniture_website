import React, { useEffect, useState } from "react";
import { Order } from "../../components/indexComponents.js";

/**
 * AdminOrder Component
 * Displays and manages all customer orders for admin users.
 */
function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [empty, setEmpty] = useState(false);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // Redirect to login if not authenticated
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  // Fetch orders on mount
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
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [URL]);

  // Fetch detailed product info for each item in orders
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

  // Handle order actions like approve/cancel/ship
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
      window.location.reload(); // Refresh to reflect updates
    } catch (err) {
      console.error(`${action} failed:`, err);
    }
  };

  return (
    <div className="mt-20 min-h-screen bg-[#FFE8D6] px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#3F4238] mb-8 text-center">
        Admin Orders
      </h1>

      {/* Search Input */}
      <div className="w-full max-w-4xl mb-6">
        <input
          type="search"
          placeholder="Search by customer name..."
          className="w-full border border-[#A5A58D] bg-[#F2E9DC] text-[#3F4238] px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CB997E] transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Orders Section */}
      <div className="w-full max-w-4xl space-y-6">
        {loading ? (
          <div className="text-xl text-[#6B705C] text-center animate-pulse">
            Loading orders...
          </div>
        ) : empty ? (
          <div className="text-xl text-[#6B705C] text-center">
            No orders found.
          </div>
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
  );
}

export default AdminOrder;
