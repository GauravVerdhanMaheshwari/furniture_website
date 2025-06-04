import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);
  const userId = useSelector((state) => state.user.userID);
  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/cart/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = (id) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId._id === id._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...prevCart, items: updatedItems };
    });
    setChange(true);
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId._id === id._id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
      return { ...prevCart, items: updatedItems };
    });
    setChange(true);
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cart._id,
          items: cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok)
        throw new Error("Failed to update cart", res.statusText, " ", {
          cartId: cart._id,
          items: cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
        });

      if (!res.ok)
        throw new Error("Failed to update cart", res.statusText, " ", {
          cartId: cart._id,
          items: cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
        });

      const updatedCart = await res.json();
      setCart(updatedCart);
      setChange(false);
      alert("Cart updated successfully");
      location.reload();
    } catch (err) {
      console.log("Error saving changes:", {
        cartId: cart._id,
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      });
      console.error("Failed to save changes:", err);
      alert("Failed to save cart changes");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 mt-25 p-4">
      <div className="flex flex-row items-center">
        <h1 className="text-4xl font-bold py-5">🛒 Cart</h1>
      </div>

      {loading && <p className="text-3xl font-bold">Loading cart...</p>}

      <div className="bg-white shadow-md rounded-lg p-6 mt-10 w-full max-w-2xl">
        {error && <p className="text-red-500">{error}</p>}
        {!cart || !Array.isArray(cart.items) ? (
          <p className="text-3xl font-bold">Loading cart...</p>
        ) : cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.items.map((item) => (
              <li
                key={item.productId._id}
                className="flex flex-col items-center mb-4 w-full border-b border-gray-300"
              >
                <img
                  src={item.productId.image || "https://picsum.photos/200/300"}
                  alt={item.productId.name}
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/200/300"; // Fallback image
                  }}
                  className="w-45 h-45 object-cover text-2xl font-bold mb-2 rounded-lg"
                />
                <p className="text-xl font-semibold my-2">
                  {item.productId.name}
                </p>
                <p className="text-lg font-semibold my-2">Quantity:</p>
                <div className="flex items-center justify-between space-x-2 text-lg font-semibold my-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    onClick={() => handleDecrement(item.productId)}
                  >
                    -
                  </button>
                  <p className="text-lg font-semibold ml-2 mr-4">
                    {item.quantity}
                  </p>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    onClick={() => handleIncrement(item.productId)}
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold my-2">
                  Price: ₹
                  {Number.parseInt(item.productId.price * item.quantity)}
                </p>
              </li>
            ))}

            <div className="flex flex-col items-center my-4 space-y-4">
              <p className="text-2xl font-bold text-center">
                Total: ₹
                {Math.round(
                  cart.items.reduce(
                    (acc, item) => acc + item.productId.price * item.quantity,
                    0
                  )
                )}
              </p>

              {change && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
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
                    : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                }`}
              >
                Checkout
              </button>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Cart;
