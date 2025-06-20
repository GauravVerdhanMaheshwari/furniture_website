import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartComponent } from "../../components/indexComponents.js";

/**
 * Cart Component
 * Displays and manages a user's cart, including quantity updates,
 * saving, removing items, and checkout functionality.
 */
function Cart() {
  const [cart, setCart] = useState(null); // Stores fetched cart data
  const [error, setError] = useState(null); // Tracks any error messages
  const [loading, setLoading] = useState(true); // Shows loader until data is fetched
  const [change, setChange] = useState(false); // Tracks unsaved changes in cart

  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // Redux state
  const userId = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  /**
   * Effect: Redirect unauthenticated users or fetch cart
   */
  useEffect(() => {
    if (!isLoggedIn || !userId) {
      window.location.href = "/login";
    } else {
      fetchCart();
    }
  }, [isLoggedIn, userId]);

  /**
   * Fetch user's cart from server and adjust items if quantity exceeds stock
   */
  const fetchCart = async () => {
    try {
      const res = await fetch(`${URL}/api/cart/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();

      let adjusted = false;
      const updatedItems = data.items.map((item) => {
        if (item.quantity > item.productId.stock) {
          adjusted = true;
          return { ...item, quantity: item.productId.stock };
        }
        return item;
      });

      if (adjusted) {
        setChange(true);
        alert("Some item quantities were adjusted to available stock.");
      }

      setCart({ ...data, items: updatedItems });
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update quantity for an item in local state
   */
  const updateItemQuantity = (productId, delta) => {
    setCart((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.productId._id === productId) {
          let newQty = item.quantity + delta;

          if (newQty < 1) {
            alert("Minimum quantity is 1");
            newQty = 1;
          } else if (newQty > item.productId.stock) {
            alert("Quantity exceeds stock");
            newQty = item.productId.stock;
          }

          return { ...item, quantity: newQty };
        }
        return item;
      });

      return { ...prev, items: updatedItems };
    });
    setChange(true);
  };

  /**
   * Persist updated cart to backend
   */
  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`${URL}/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart._id,
          items: cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to update cart");

      alert("Cart updated successfully.");
      fetchCart();
      setChange(false);
    } catch (err) {
      console.error("Error updating cart:", err);
      alert("Failed to save changes.");
    }
  };

  /**
   * Remove an item from the cart
   */
  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(`${URL}/api/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      if (!res.ok) throw new Error("Failed to remove item");

      const updatedCart = await res.json();
      setCart(updatedCart);
      setChange(true);
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item.");
    }
  };

  /**
   * Clear all items from the cart
   */
  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;

    try {
      const res = await fetch(`${URL}/api/cart/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      alert("Cart cleared.");
      setCart({ ...cart, items: [] });
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart.");
    }
  };

  // 🧾 Fallback for unauthenticated users
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFE8D6]">
        <p className="text-[#B98B73] text-xl font-semibold">
          You must be logged in to view your cart.
        </p>
      </div>
    );
  }

  // ⏳ Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFE8D6]">
        <p className="text-3xl font-bold text-[#6B705C]">Loading cart...</p>
      </div>
    );
  }

  // ✅ Render Cart UI
  return (
    <div className="pt-20 flex flex-col items-center min-h-screen bg-[#FFE8D6] px-4 text-[#3F4238]">
      <h1 className="text-4xl font-bold mb-6 text-[#6B705C]">🛒 Your Cart</h1>

      <div className="bg-[#DDBEA9] shadow-2xl rounded-2xl p-6 w-full max-w-3xl">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {!cart || !Array.isArray(cart.items) ? (
          <p className="text-xl text-center">Loading cart...</p>
        ) : cart.items.length === 0 ? (
          <p className="text-lg text-center text-[#6B705C]">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* 🧾 Cart Items */}
            <ul className="divide-y divide-[#B7B7A4]">
              {cart.items.map((item) => (
                <CartComponent
                  key={item.productId._id}
                  item={item}
                  onUpdateQuantity={updateItemQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </ul>

            {/* ⚙️ Cart Controls */}
            <div className="flex flex-col items-center mt-8 gap-4">
              <p className="text-2xl font-semibold text-[#3F4238]">
                Total: ₹
                {cart.items.reduce(
                  (acc, item) => acc + item.productId.price * item.quantity,
                  0
                )}
              </p>

              {/* Save Changes */}
              {change && (
                <button
                  onClick={handleSaveChanges}
                  className="px-5 py-2 bg-[#6B705C] text-white rounded-lg hover:bg-[#3F4238] transition"
                >
                  💾 Save Changes
                </button>
              )}

              {/* Proceed to Checkout */}
              <button
                disabled={change}
                onClick={() => {
                  if (change) {
                    alert("Please save changes before checkout.");
                    return;
                  }
                  window.location.href = "/checkout";
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  change
                    ? "bg-[#B7B7A4] text-white cursor-not-allowed"
                    : "bg-[#CB997E] text-white hover:bg-[#B98B73]"
                }`}
              >
                ✅ Proceed to Checkout
              </button>

              {/* Clear Cart */}
              <button
                onClick={handleClearCart}
                className="px-5 py-2 bg-[#B98B73] text-white rounded-lg hover:bg-[#3F4238] transition"
              >
                🗑️ Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
