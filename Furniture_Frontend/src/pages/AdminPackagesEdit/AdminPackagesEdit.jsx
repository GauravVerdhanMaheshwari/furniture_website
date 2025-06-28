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
          fetch(`${URL}/api/owner/products`),
          fetch(`${URL}/api/owner/package/${id}`),
        ]);

        const productData = await productRes.json();
        const packageData = await packageRes.json();

        // Map items with full product data
        const enrichedItems = packageData.items.map((item) => {
          const matchedProduct = productData.find(
            (p) => p._id === item.productId
          );
          return {
            ...item,
            name: matchedProduct?.name || "Unknown",
            price: matchedProduct?.price || 0,
            image: matchedProduct?.images?.[0] || "/no-img.png",
          };
        });

        setProducts(productData);
        setPackageName(packageData.packageName);
        setPrice(packageData.price);
        setSelectedItems(enrichedItems);
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

  const handleAddItem = (product) => {
    const alreadyAdded = selectedItems.find(
      (item) => item.productId === product._id
    );
    if (!alreadyAdded) {
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

  if (loading) {
    return (
      <div className="mt-18 min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <p className="text-lg text-[#6B705C]">Loading package data...</p>
      </div>
    );
  }

  const availableProducts = products.filter(
    (p) => !selectedItems.some((item) => item.productId === p._id)
  );

  return (
    <div className="mt-18 min-h-screen bg-[#FFE8D6] px-4 py-10 sm:mt-15">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-[#DDBEA9] rounded-xl shadow-xl p-8 space-y-6 text-[#3F4238]"
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
            {selectedItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white p-3 rounded shadow-sm flex items-center gap-3"
              >
                <img
                  src={item.image || "/no-img.png"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × quantity
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
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Available Products */}
        <div>
          <label className="block font-semibold mb-2">Add More Products:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
            {availableProducts.map((p) => (
              <div
                key={p._id}
                className="border rounded p-3 bg-white flex items-center gap-3"
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

        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded bg-[#CB997E] hover:bg-[#6B705C] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditPackage;
