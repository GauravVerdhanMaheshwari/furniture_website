import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * AdminEditProduct - Edit product details
 */
function AdminEditProduct() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // 🔐 Auth redirect
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // 🧠 Fetch categories
  useEffect(() => {
    fetch(`${URL}/api/products/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => {
        console.error("Category fetch failed", err);
        setCategories([]);
      });
  }, []);

  // 📦 Fetch product
  useEffect(() => {
    fetch(`${URL}/api/owner/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          New: data.New || false,
          Hot: data.Hot || false,
          Package: data.Package || false,
          PackageName: data.PackageName || "",
          image: "", // placeholder
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const updated = { ...product };

    if (product.image instanceof File) {
      updated.image = await convertToBase64(product.image);
    }

    fetch(`${URL}/api/owner/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Product updated successfully");
        navigate("/admin/products");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update product");
      });
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <p className="text-xl text-[#6B705C]">
          {loading ? "Loading..." : "Product not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6] px-4 py-10">
      <form
        onSubmit={handleSaveChanges}
        className="bg-white border border-[#D4C7B0] rounded-xl shadow-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#3F4238]">
          Edit Product
        </h2>

        {/* Name */}
        <label className="block text-[#3F4238] font-medium mb-1">Name</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
          required
        />

        {/* Description */}
        <label className="block text-[#3F4238] font-medium mb-1">
          Description
        </label>
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
          required
        />

        {/* Type */}
        <label className="block text-[#3F4238] font-medium mb-1">Type</label>
        <select
          value={product.type}
          onChange={(e) => setProduct({ ...product, type: e.target.value })}
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Size */}
        <label className="block text-[#3F4238] font-medium mb-1">
          Size (H x W x D)
        </label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {["height", "width", "depth"].map((dim) => (
            <input
              key={dim}
              type="number"
              min={0}
              value={product.size?.[dim] || ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  size: { ...product.size, [dim]: Number(e.target.value) },
                })
              }
              placeholder={dim}
              className="border border-[#B7B7A4] rounded-lg px-3 py-2"
              required
            />
          ))}
        </div>

        {/* Price */}
        <label className="block text-[#3F4238] font-medium mb-1">Price</label>
        <input
          type="number"
          min={0}
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
          required
        />

        {/* Image Upload */}
        <label className="block text-[#3F4238] font-medium mb-1">
          Upload New Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
        />

        {/* Tags */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-[#3F4238]">
          {["Hot", "New", "Package"].map((key) => (
            <label key={key} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={product[key] || false}
                onChange={(e) =>
                  setProduct({ ...product, [key]: e.target.checked })
                }
              />
              {key}
            </label>
          ))}
        </div>

        {/* Package Name */}
        {product.Package && (
          <>
            <label className="block text-[#3F4238] font-medium mb-1">
              Package Name
            </label>
            <input
              type="text"
              value={product.PackageName || ""}
              onChange={(e) =>
                setProduct({ ...product, PackageName: e.target.value })
              }
              className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[#6B705C] text-white py-2 px-4 rounded hover:bg-[#3F4238] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
