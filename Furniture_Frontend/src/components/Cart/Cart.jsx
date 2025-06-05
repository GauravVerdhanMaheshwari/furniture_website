import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);

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
      const res = await fetch(`http://localhost:3000/api/cart/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = (productId, delta) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      );
      return { ...prevCart, items: updatedItems };
    });
    setChange(true);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/cart/update`, {
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

      const updatedCart = await res.json();
      setCart(updatedCart);
      setChange(false);
      alert("Cart updated successfully");
    } catch (err) {
      console.error("Failed to save changes:", err);
      alert("Failed to save cart changes");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">
          You must be logged in to view your Cart
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-3xl font-bold">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 mt-25 p-4">
      <h1 className="text-4xl font-bold py-5">🛒 Cart</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mt-10 w-full max-w-2xl">
        {error && <p className="text-red-500">{error}</p>}

        {!cart || !Array.isArray(cart.items) ? (
          <p className="text-xl font-semibold">Loading cart...</p>
        ) : cart.items.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.items.map((item) => (
                <li
                  key={item.productId._id}
                  className="flex flex-col items-center mb-4 w-full border-b border-gray-300 pb-4"
                >
                  <img
                    src={
                      item.productId.image || "https://picsum.photos/200/300"
                    }
                    alt={item.productId.name}
                    onError={(e) => {
                      e.target.src = "https://picsum.photos/200/300";
                    }}
                    className="w-40 h-40 object-cover rounded-lg mb-2"
                  />
                  <p className="text-xl font-semibold">{item.productId.name}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => updateItemQuantity(item.productId._id, -1)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => updateItemQuantity(item.productId._id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg mt-2">
                    Price: ₹{item.productId.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center my-4 space-y-4">
              <p className="text-2xl font-bold">
                Total: ₹
                {cart.items.reduce(
                  (acc, item) => acc + item.productId.price * item.quantity,
                  0
                )}
              </p>

              {change && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              )}

              <button
                disabled={change}
                className={`px-4 py-2 rounded ${
                  change
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={() => {
                  if (change) {
                    alert("Please save changes before proceeding to checkout.");
                    return;
                  }
                  window.location.href = "/checkout";
                }}
                title={
                  change
                    ? "Please save changes before proceeding to checkout."
                    : "Proceed to Checkout"
                }
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
