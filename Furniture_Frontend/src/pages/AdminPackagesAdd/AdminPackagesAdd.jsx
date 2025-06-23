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
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${URL}/api/owner/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, [navigate, URL]);

  const handleAddItem = (productId) => {
    const alreadyAdded = selectedItems.find(
      (item) => item.productId === productId
    );
    if (!alreadyAdded) {
      setSelectedItems([...selectedItems, { productId, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!packageName || !price || selectedItems.length === 0) {
      return alert("All fields are required.");
    }

    setLoading(true);
    try {
      const res = await fetch(`${URL}/api/owner/package/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageName, items: selectedItems, price }),
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
    <div className="min-h-screen bg-[#FFE8D6] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#DDBEA9] rounded-xl shadow-xl p-6 space-y-6 text-[#3F4238]"
      >
        <h1 className="text-3xl font-bold text-center text-[#B98B73]">
          Add New Package
        </h1>

        <div>
          <label className="block font-semibold mb-1">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
            placeholder="Enter package name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Total Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
            placeholder="Enter package price"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Select Products:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded p-3 bg-white flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">₹{product.price}</p>
                </div>
                <button
                  type="button"
                  className="text-sm bg-[#CB997E] text-white px-3 py-1 rounded hover:bg-[#B98B73]"
                  onClick={() => handleAddItem(product._id)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div>
            <label className="block font-semibold mb-2">
              Selected Products:
            </label>
            <div className="space-y-3">
              {selectedItems.map((item) => {
                const product = products.find((p) => p._id === item.productId);
                return (
                  <div
                    key={item.productId}
                    className="bg-white p-3 rounded shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {product?.name || "Product"}
                      </p>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.productId, e.target.value)
                        }
                        className="w-20 mt-1 border p-1 rounded"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✖
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded ${
            loading
              ? "bg-[#CB997E] opacity-70 cursor-not-allowed"
              : "bg-[#CB997E] hover:bg-[#6B705C]"
          }`}
        >
          {loading ? "Creating Package..." : "Create Package"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddPackage;
