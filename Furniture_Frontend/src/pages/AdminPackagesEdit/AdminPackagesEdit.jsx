import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminEditPackage() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }

    const fetchData = async () => {
      try {
        const [productRes, packageRes] = await Promise.all([
          fetch(`${URL}/api/products`),
          fetch(`${URL}/api/owner/package/${id}`),
        ]);

        const productData = await productRes.json();
        const packageData = await packageRes.json();

        setProducts(productData);
        setPackageName(packageData.packageName);
        setPrice(packageData.price);
        setSelectedItems(packageData.items);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        alert("Failed to load package or products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [URL, id, navigate]);

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

    try {
      const res = await fetch(`${URL}/api/owner/package/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName,
          price,
          items: selectedItems,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);
      alert("✅ Package updated successfully!");
      navigate("/admin/packages");
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("Failed to update package.");
    }
  };

  if (loading) {
    return (
      <div className="mt-18 min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <p className="text-lg text-[#6B705C]">Loading package data...</p>
      </div>
    );
  }

  return (
    <div className="mt-18 min-h-screen bg-[#FFE8D6] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#DDBEA9] rounded-xl shadow-xl p-6 space-y-6 text-[#3F4238]"
      >
        <h1 className="text-3xl font-bold text-center text-[#B98B73]">
          Edit Package
        </h1>

        <div>
          <label className="block font-semibold mb-1">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
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
          />
        </div>

        {/* Selected Items */}
        <div>
          <label className="block font-semibold mb-2">Selected Products:</label>
          <div className="space-y-3">
            {selectedItems.map((item) => {
              const product = products.find((p) => p._id === item.productId);
              return (
                <div
                  key={item.productId}
                  className="bg-white p-3 rounded shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{product?.name || "Product"}</p>
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

        <button
          type="submit"
          className="w-full py-2 text-white font-semibold rounded bg-[#CB997E] hover:bg-[#6B705C] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditPackage;
