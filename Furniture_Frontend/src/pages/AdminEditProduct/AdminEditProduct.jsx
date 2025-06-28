import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`${URL}/api/products/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => {
        console.error("Category fetch failed", err);
        setCategories([]);
      });
  }, [URL]);

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
          image: "", // will be updated if file uploaded
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id, URL]);

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
        alert("✅ Product updated successfully!");
        navigate("/admin/products");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update product.");
      });
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8D6] px-4">
        <p className="text-xl text-[#6B705C]">
          {loading ? "Loading..." : "Product not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE8D6] flex justify-center items-start px-4 py-16 sm:mt-20">
      <form
        onSubmit={handleSaveChanges}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-[#D4C7B0] space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#3F4238]">
          ✏️ Edit Product
        </h2>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-[#3F4238] mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
            className="w-full border border-[#B7B7A4] rounded-lg px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-[#3F4238] mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
            className="w-full border border-[#B7B7A4] rounded-lg px-3 py-2"
          />
        </div>

        {/* Type */}
        <div>
          <label
            htmlFor="type"
            className="block font-medium text-[#3F4238] mb-1"
          >
            Category / Type
          </label>
          <select
            id="type"
            value={product.type}
            onChange={(e) => setProduct({ ...product, type: e.target.value })}
            required
            className="w-full border border-[#B7B7A4] rounded-lg px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block font-medium text-[#3F4238] mb-1">
            Size (H × W × D)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["height", "width", "depth"].map((dim) => (
              <input
                key={dim}
                type="number"
                min={0}
                value={product.size?.[dim] || ""}
                placeholder={dim}
                required
                onChange={(e) =>
                  setProduct({
                    ...product,
                    size: { ...product.size, [dim]: Number(e.target.value) },
                  })
                }
                className="border border-[#B7B7A4] rounded-lg px-3 py-2 w-full"
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block font-medium text-[#3F4238] mb-1"
          >
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            min={0}
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            required
            className="w-full border border-[#B7B7A4] rounded-lg px-3 py-2"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium text-[#3F4238] mb-1">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
            className="w-full border border-[#B7B7A4] rounded-lg px-3 py-2"
          />
        </div>

        {/* Tags */}
        <div className="grid grid-cols-2 gap-4">
          {["Hot", "New", "Package"].map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-[#3F4238] font-medium"
            >
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
          <div>
            <label className="block font-medium text-[#3F4238] mb-1">
              Package Name
            </label>
            <input
              type="text"
              value={product.PackageName || ""}
              onChange={(e) =>
                setProduct({ ...product, PackageName: e.target.value })
              }
              className="w-full border border-[#B7B7A4] rounded-lg px-3 py-2"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#CB997E] text-white font-semibold py-2 px-4 rounded hover:bg-[#6B705C] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
