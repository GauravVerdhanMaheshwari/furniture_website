import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminAddPackage() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${URL}/api/owner/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error loading products:", err);
        alert("Failed to load products");
      }
    })();
  }, [navigate, URL]);

  const handleAddItem = (product) => {
    if (!selectedItems.some((i) => i.productId === product._id)) {
      setSelectedItems([
        ...selectedItems,
        {
          productId: product._id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
        },
      ]);
    }
  };

  const handleQuantityChange = (productId, qty) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: Number(qty) } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setSelectedItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!packageName || !price || !selectedItems.length) {
      return alert("All fields are required.");
    }
    setLoading(true);
    try {
      const res = await fetch(`${URL}/api/owner/package/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName,
          price: Number(price),
          items: selectedItems.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert("✅ Package created successfully!");
      navigate("/admin/packages");
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Failed to create package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFE8D6] px-4 py-12 sm:px-6 md:px-10 lg:px-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-[#DDBEA9] rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 space-y-6 text-[#3F4238]"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#B98B73] mb-6">
          Add New Package
        </h1>

        {/* Package Name */}
        <div>
          <label className="block font-semibold mb-1">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
            className="w-full border border-[#A5A58D] p-2 rounded-lg focus:ring-2 focus:ring-[#B5838D] outline-none"
          />
        </div>

        {/* Package Price */}
        <div>
          <label className="block font-semibold mb-1">Total Price (₹)</label>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-[#A5A58D] p-2 rounded-lg focus:ring-2 focus:ring-[#B5838D] outline-none"
          />
        </div>

        {/* Product Selector */}
        <div>
          <label className="block font-semibold mb-2">Select Products:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {products.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-3 border border-[#D4C7B0] bg-white p-3 rounded-xl shadow-sm"
              >
                <img
                  src={p.images?.[0] || "/no-img.png"}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-600">₹{p.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddItem(p)}
                  className="bg-[#6B705C] text-white px-3 py-1 rounded hover:bg-[#3F4238] transition"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Products */}
        {selectedItems.length > 0 && (
          <div>
            <label className="block font-semibold mb-2">
              Selected Products:
            </label>
            <div className="space-y-4">
              {selectedItems.map((i) => (
                <div
                  key={i.productId}
                  className="flex items-center gap-3 bg-white border border-[#D4C7B0] p-3 rounded-xl shadow-sm"
                >
                  <img
                    src={i.image || "/no-img.png"}
                    alt={i.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{i.price} × Quantity
                    </p>
                    <input
                      type="number"
                      min={1}
                      value={i.quantity}
                      onChange={(e) =>
                        handleQuantityChange(i.productId, e.target.value)
                      }
                      className="w-24 mt-1 border border-[#A5A58D] p-1 rounded-md focus:ring-2 focus:ring-[#B5838D] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(i.productId)}
                    className="text-red-600 hover:text-red-800 font-bold text-xl"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-bold text-white rounded-lg transition ${
            loading
              ? "bg-[#CB997E] opacity-70 cursor-not-allowed"
              : "bg-[#CB997E] hover:bg-[#6B705C]"
          }`}
        >
          {loading ? "Creating Package..." : "Create Package"}
        </button>
      </form>
    </main>
  );
}

export default AdminAddPackage;
