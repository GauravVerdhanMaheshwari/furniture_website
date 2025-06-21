import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminEditProduct() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Convert single file to base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Redirect if not admin
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch existing product details
  useEffect(() => {
    fetch(`${URL}/api/owner/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          isNew: data.isNew || data.new || false,
          image: data.image || "", // fallback
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id, URL]);

  // Submit form
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const updated = { ...product };

    // Convert file to base64 if needed
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <p className="text-xl text-[#6B705C]">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6]">
        <p className="text-xl text-[#6B705C]">Product not found.</p>
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
          onChange={(e) => setProduct((p) => ({ ...p, name: e.target.value }))}
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
            setProduct((p) => ({ ...p, description: e.target.value }))
          }
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
          required
        />
        {/* Size */}
        <label className="block text-[#3F4238] font-medium mb-1">
          Size (H x W x D in inches)
        </label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            min={0}
            value={product.size?.height || ""}
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                size: { ...p.size, height: Number(e.target.value) },
              }))
            }
            placeholder="Height"
            className="border border-[#B7B7A4] rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            min={0}
            value={product.size?.width || ""}
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                size: { ...p.size, width: Number(e.target.value) },
              }))
            }
            placeholder="Width"
            className="border border-[#B7B7A4] rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            min={0}
            value={product.size?.depth || ""}
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                size: { ...p.size, depth: Number(e.target.value) },
              }))
            }
            placeholder="Depth"
            className="border border-[#B7B7A4] rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Price */}
        <label className="block text-[#3F4238] font-medium mb-1">Price</label>
        <input
          type="number"
          min={0}
          value={product.price}
          onChange={(e) =>
            setProduct((p) => ({ ...p, price: Number(e.target.value) }))
          }
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
          required
        />

        {/* In Stock */}
        <label className="block text-[#3F4238] font-medium mb-1">Stock</label>
        <input
          type="number"
          min={0}
          value={product.stock}
          onChange={(e) =>
            setProduct((p) => ({ ...p, stock: Number(e.target.value) }))
          }
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
          required
        />

        {/* Status Dropdown */}
        <label className="block text-[#3F4238] font-medium mb-1">
          Availability
        </label>
        <select
          value={product.inStock ? "Yes" : "No"}
          onChange={(e) =>
            setProduct((p) => ({ ...p, inStock: e.target.value === "Yes" }))
          }
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
        >
          <option value="Yes">In Stock</option>
          <option value="No">Out of Stock</option>
        </select>

        {/* Upload New Image */}
        <label className="block text-[#3F4238] font-medium mb-1">
          Upload New Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setProduct((p) => ({ ...p, image: e.target.files[0] }))
          }
          className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
        />

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-[#3F4238]">
          {["hot", "isNew", "package"].map((field) => (
            <label key={field} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={product[field] || false}
                onChange={(e) =>
                  setProduct((p) => ({ ...p, [field]: e.target.checked }))
                }
              />
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          ))}
        </div>

        {/* Package Name */}
        {product.package && (
          <>
            <label className="block text-[#3F4238] font-medium mb-1">
              Package Name
            </label>
            <input
              type="text"
              value={product.packageName || ""}
              onChange={(e) =>
                setProduct((p) => ({ ...p, packageName: e.target.value }))
              }
              className="w-full mb-4 border border-[#B7B7A4] rounded-lg px-3 py-2"
              required
            />
          </>
        )}

        {/* Submit */}
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
