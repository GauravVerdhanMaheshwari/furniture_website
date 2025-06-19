import React, { useEffect, useState } from "react";
import { Order } from "../../components/indexComponents.js";

/**
 * AdminOrder Component
 * Allows admin users to view, search, and manage all customer orders.
 */
function AdminOrder() {
  // --- State Management ---
  const [orders, setOrders] = useState([]); // Full list of orders
  const [loading, setLoading] = useState(true); // Loading indicator
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [empty, setEmpty] = useState(false); // Flag for empty state

  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // --- Redirect if admin is not authenticated ---
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      window.location.href = "/admin/login";
    }
  }, []);

  // --- Fetch orders on mount ---
  useEffect(() => {
    fetch(`${URL}/api/owner/purchases`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders.");
        return res.json();
      })
      .then((data) => {
        if (!data.length) {
          setEmpty(true);
        } else {
          setEmpty(false);
          enrichOrdersWithProductDetails(data);
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching orders:", error);
        setEmpty(true);
      })
      .finally(() => setLoading(false));
  }, [URL]);

  /**
   * Add product details to each item in all fetched orders
   * @param {Array} ordersData
   */
  const enrichOrdersWithProductDetails = async (ordersData) => {
    const enrichedOrders = await Promise.all(
      ordersData.map(async (order) => {
        const enrichedItems = await Promise.all(
          order.items.map(async (item) => {
            try {
              const res = await fetch(`${URL}/api/products/${item.productId}`);
              const product = await res.json();
              return { ...item, productDetails: product };
            } catch (err) {
              console.error("❌ Product fetch failed:", err);
              return item;
            }
          })
        );
        return { ...order, items: enrichedItems };
      })
    );

    setOrders(enrichedOrders);
  };

  /**
   * Handles actions like approve, cancel, or ship for a given order
   * @param {string} orderId
   * @param {string} action - 'approve', 'cancel', 'ship'
   * @param {Object} update - update data to send
   */
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

      if (!res.ok) throw new Error("Failed to update order.");
      await res.json();
      window.location.reload(); // Refresh to reflect updated order
    } catch (err) {
      console.error(`❌ ${action.toUpperCase()} action failed:`, err);
      alert(`Failed to ${action} order. Please try again.`);
    }
  };

  // --- Filter orders by customer name ---
  const filteredOrders = orders.filter((order) =>
    order?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-16 min-h-screen bg-[#FFE8D6] px-4 py-10 flex flex-col items-center">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-[#3F4238] mb-8 text-center">
        Admin Orders
      </h1>

      {/* Search Field */}
      <div className="w-full max-w-4xl mb-6">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name..."
          className="w-full border border-[#A5A58D] bg-[#F2E9DC] text-[#3F4238] px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CB997E] transition"
        />
      </div>

      {/* Orders Display */}
      <div className="w-full max-w-4xl space-y-6">
        {loading ? (
          <p className="text-xl text-[#6B705C] text-center animate-pulse">
            Loading orders...
          </p>
        ) : empty ? (
          <p className="text-xl text-[#6B705C] text-center">No orders found.</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-xl text-[#6B705C] text-center">
            No matching results.
          </p>
        ) : (
          filteredOrders.map((order) => (
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
