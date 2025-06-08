import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [thankYou, setThankYou] = useState(false);
  const [cart, setCart] = useState(null);

  const userId = useSelector((state) => state.user.userID);

  // Clear user's cart
  const clearCartForUser = async (userId) => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to clear cart");
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/cart/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  // Calculate total price
  useEffect(() => {
    if (!cart || !cart.items) return;
    const total = cart.items.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  // Redirect on successful order
  useEffect(() => {
    if (thankYou) {
      const timer = setTimeout(() => {
        window.location.href = "/profile";
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [thankYou]);

  // Confirm order handler
  const handleConfirmOrder = async () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    if (!cart || !cart.items.length) return alert("Cart is empty.");

    setLoading(true);

    const purchaseData = {
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalPrice,
      status: "Pending",
    };

    try {
      const res = await fetch("http://localhost:3000/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });

      if (res.ok) {
        setThankYou(true);
        await clearCartForUser(userId);
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show thank-you message
  if (thankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Thank you!</h2>
          <p>Your order has been placed successfully.</p>
        </div>
      </div>
    );
  }

  // Handle empty cart
  if (!loading && cart?.items?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty.</h2>
          <a href="/" className="text-blue-600 hover:underline">
            Go shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Checkout</h2>

        <div className="mb-4">
          <p className="font-semibold mb-2">Select Payment Method:</p>
          <div className="space-y-2">
            {["Credit Card", "UPI", "Cash on Delivery"].map((method) => (
              <label key={method} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2 cursor-pointer"
                />
                {method}
              </label>
            ))}
            <button
              onClick={() => setPaymentMethod("")}
              className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold">Total Price:</p>
          <p className="text-lg font-bold text-green-600">
            ₹{Math.round(totalPrice)}
          </p>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={loading || !cart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
