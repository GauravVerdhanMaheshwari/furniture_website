import React, { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [modifiedItems, setModifiedItems] = useState(new Set());

  const userId = "683adac421be8a674188b8e0";

  const handleIncrement = (id) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        if (item.productId._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setModifiedItems((prev) => new Set(prev).add(id));
      return { ...prevCart, items: updatedItems };
    });
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        if (item.productId._id === id) {
          const newQty = Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      setModifiedItems((prev) => new Set(prev).add(id));
      return { ...prevCart, items: updatedItems };
    });
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:3000/api/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setModifiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        console.log("Item removed:", data);
      })
      .catch((err) => {
        console.error("Error removing item:", err);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/cart/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
      })
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (cart && cart.items) {
      const newProducts = {};
      cart.items.forEach((item) => {
        newProducts[item.productId._id] = item.productId;
      });
      setProduct(newProducts);
    }
  }, [cart]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 mt-25 p-4">
      <div className="flex flex-row items-center">
        <h1 className="text-4xl font-bold py-5">🛒 Cart</h1>
      </div>

      {loading && <p className="text-3xl font-bold">Loading cart...</p>}

      <div className="bg-white shadow-md rounded-lg p-6 mt-10 w-full max-w-2xl">
        {error && <p className="text-red-500">{error}</p>}
        {!cart ? (
          <p className="text-3xl font-bold">Loading cart...</p>
        ) : cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.items.map((item) => (
              <div
                className="flex flex-col justify-between items-center"
                key={item.productId._id}
              >
                <li className="flex flex-col items-center mb-4 w-full border-b border-gray-300">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-45 h-45 object-cover text-2xl font-bold mb-2 rounded-lg"
                  />
                  <p className="text-xl font-semibold my-2">
                    {item.productId.name}
                  </p>
                  <p className="text-lg font-semibold my-2">Quantity:</p>
                  <div className="flex items-center justify-between space-x-2 text-lg font-semibold my-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                      onClick={() => handleDecrement(item.productId._id)}
                    >
                      -
                    </button>
                    <p className="text-lg font-semibold ml-2 mr-4">
                      {item.quantity}
                    </p>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                      onClick={() => handleIncrement(item.productId._id)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold my-2">
                    Price: ₹{Math.floor(item.productId.price * item.quantity)}
                  </p>

                  {modifiedItems.has(item.productId._id) && (
                    <button
                      className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => handleRemove(item.productId._id)}
                    >
                      Remove Item
                    </button>
                  )}
                  <br />
                </li>
              </div>
            ))}
            <div className="flex flex-row items-center justify-around my-4">
              <p className="text-2xl font-bold mt-4 text-center">
                Total: ₹
                {Math.round(
                  cart.items.reduce(
                    (acc, item) => acc + item.productId.price * item.quantity,
                    0
                  )
                )}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
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
