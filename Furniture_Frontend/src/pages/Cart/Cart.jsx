import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartComponent } from "../../components/indexComponents.js";

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const userId = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isLoggedIn || !userId) {
      window.location.href = "/login";
    } else {
      fetchCart();
    }
  }, [isLoggedIn, userId]);

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
        alert("Some items exceeded stock and were adjusted.");
      }

      setCart({ ...data, items: updatedItems });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = (productId, delta) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        if (item.productId._id === productId) {
          let newQty = item.quantity + delta;
          if (newQty < 1) {
            alert("Quantity cannot be less than 1");
            newQty = 1;
          }
          if (newQty > item.productId.stock) {
            alert("Cannot exceed stock limit");
            newQty = item.productId.stock;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });
      return { ...prevCart, items: updatedItems };
    });
    setChange(true);
  };

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

      alert("Cart updated successfully");
      fetchCart();
      setChange(false);
    } catch (err) {
      console.error("Failed to save changes:", err);
      alert("Failed to save cart changes");
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;

    try {
      const res = await fetch(`${URL}/api/cart/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      alert("Cart cleared successfully");
      setCart({ ...cart, items: [] });
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart");
    }
  };

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
      alert("Failed to remove item from cart");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFE8D6]">
        <p className="text-[#B98B73] text-xl font-semibold">
          You must be logged in to view your Cart
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFE8D6]">
        <p className="text-3xl font-bold text-[#6B705C]">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="mt-20 flex flex-col items-center min-h-screen bg-[#FFE8D6] p-4 text-[#3F4238]">
      <h1 className="text-4xl font-bold py-5 text-[#6B705C]">🛒 Your Cart</h1>

      <div className="bg-[#DDBEA9] shadow-lg rounded-2xl p-6 mt-6 w-full max-w-3xl">
        {error && <p className="text-red-600">{error}</p>}

        {!cart || !Array.isArray(cart.items) ? (
          <p className="text-xl font-semibold">Loading cart...</p>
        ) : cart.items.length === 0 ? (
          <p className="text-lg text-center text-[#6B705C]">
            Your cart is empty.
          </p>
        ) : (
          <>
            <ul>
              {cart.items.map((item) => (
                <CartComponent
                  key={item.productId._id}
                  item={item}
                  onUpdateQuantity={updateItemQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </ul>

            <div className="flex flex-col items-center mt-6 space-y-4">
              <p className="text-2xl font-bold text-[#3F4238]">
                Total: ₹
                {cart.items.reduce(
                  (acc, item) => acc + item.productId.price * item.quantity,
                  0
                )}
              </p>

              {change && (
                <button
                  className="px-4 py-2 bg-[#6B705C] text-white rounded hover:bg-[#3F4238]"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              )}

              <button
                disabled={change}
                className={`px-4 py-2 rounded font-medium transition ${
                  change
                    ? "bg-[#B7B7A4] text-white cursor-not-allowed"
                    : "bg-[#CB997E] text-white hover:bg-[#B98B73]"
                }`}
                onClick={() => {
                  if (change) {
                    alert("Please save changes before checkout.");
                    return;
                  }
                  window.location.href = "/checkout";
                }}
              >
                Checkout
              </button>

              <button
                className="px-4 py-2 bg-[#B98B73] text-white rounded hover:bg-[#3F4238]"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
