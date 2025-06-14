import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [thankYou, setThankYou] = useState(false);
  const [cart, setCart] = useState(null);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const userId = useSelector((state) => state.user.userID);

  const clearCartForUser = async (userId) => {
    try {
      const res = await fetch(`${URL}/api/cart/clear`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to clear cart");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${URL}/api/cart/${userId}`);
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

  useEffect(() => {
    if (!cart || !cart.items) return;
    const total = cart.items.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  useEffect(() => {
    if (thankYou) {
      const timer = setTimeout(() => {
        window.location.href = "/profile";
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [thankYou]);

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
      const res = await fetch(`${URL}/api/purchases`, {
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

  if (thankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-[#6B705C]">Thank you!</h2>
          <p className="text-[#3F4238]">
            Your order has been placed successfully.
          </p>
        </div>
      </div>
    );
  }

  if (!loading && cart?.items?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <div className="text-center bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-[#3F4238]">
            Your cart is empty.
          </h2>
          <a href="/" className="text-[#B98B73] hover:underline">
            Go shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6] px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-[#D4C7B0]">
        <h2 className="text-xl font-bold mb-6 text-center text-[#3F4238]">
          Checkout
        </h2>

        <div className="mb-4">
          <p className="font-semibold mb-2 text-[#3F4238]">
            Select Payment Method:
          </p>
          <div className="space-y-2 text-[#6B705C]">
            {["Credit Card", "UPI", "Cash on Delivery"].map((method) => (
              <label key={method} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2 cursor-pointer accent-[#B98B73]"
                />
                {method}
              </label>
            ))}
            <button
              onClick={() => setPaymentMethod("")}
              className="mt-2 px-3 py-1 bg-[#DDBEA9] text-[#3F4238] rounded hover:bg-[#CB997E] transition"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-[#3F4238]">Total Price:</p>
          <p className="text-lg font-bold text-[#6B705C]">
            ₹{Math.round(totalPrice)}
          </p>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={loading || !cart}
          className="w-full bg-[#B98B73] hover:bg-[#CB997E] text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
