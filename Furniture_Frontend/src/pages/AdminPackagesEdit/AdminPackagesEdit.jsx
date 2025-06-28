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
      return;
    }

    const fetchData = async () => {
      try {
        const [productRes, packageRes] = await Promise.all([
          fetch(`${URL}/api/owner/products`),
          fetch(`${URL}/api/owner/package/${id}`),
        ]);

        const productData = await productRes.json();
        const packageData = await packageRes.json();

        const enrichedItems = packageData.items.map((item) => {
          const match = productData.find((p) => p._id === item.productId);
          return {
            ...item,
            name: match?.name || "Unknown",
            price: match?.price || 0,
            image: match?.images?.[0] || "/no-img.png",
          };
        });

        setProducts(productData);
        setPackageName(packageData.packageName);
        setPrice(packageData.price);
        setSelectedItems(enrichedItems);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        alert("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [URL, id, navigate]);

  const handleQuantityChange = (productId, qty) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: Number(qty) } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const handleAddItem = (product) => {
    if (!selectedItems.some((i) => i.productId === product._id)) {
      setSelectedItems([
        ...selectedItems,
        {
          productId: product._id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "/no-img.png",
        },
      ]);
    }
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
          items: selectedItems.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
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

  const availableProducts = products.filter(
    (p) => !selectedItems.some((item) => item.productId === p._id)
  );

  if (loading) {
    return (
      <div className="mt-20 min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <p className="text-lg text-[#6B705C]">Loading package data...</p>
      </div>
    );
  }

  return (
    <main className="mt-20 min-h-screen bg-[#FFE8D6] px-4 py-10 sm:px-6 md:px-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-[#DDBEA9] rounded-xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6 text-[#3F4238]"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#B98B73]">
          Edit Package
        </h1>

        {/* Package Name */}
        <div>
          <label className="block font-semibold mb-1">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
            className="w-full border border-[#A5A58D] p-2 rounded focus:ring-2 focus:ring-[#B5838D] outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Total Price (₹)</label>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-[#A5A58D] p-2 rounded focus:ring-2 focus:ring-[#B5838D] outline-none"
          />
        </div>

        {/* Selected Items */}
        <div>
          <label className="block font-semibold mb-2">Selected Products</label>
          <div className="space-y-4">
            {selectedItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 bg-white border border-[#D4C7B0] p-3 rounded-xl shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × Quantity
                  </p>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, e.target.value)
                    }
                    className="w-24 mt-1 border border-[#A5A58D] p-1 rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.productId)}
                  className="text-red-600 hover:text-red-800 font-bold text-xl"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add More Products */}
        <div>
          <label className="block font-semibold mb-2">Add More Products</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
            {availableProducts.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 bg-white border border-[#D4C7B0] p-3 rounded-xl shadow-sm"
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded bg-[#CB997E] hover:bg-[#6B705C] transition"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}

export default AdminEditPackage;
