import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

/**
 * AdminEditProduct allows admins to view and update a product’s details.
 * Redirects unauthenticated users and handles form submission and image conversion.
 */
function AdminEditProduct() {
  // Redirect if not admin
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Convert image to base64 for backend compatibility
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Fetch product details on mount
  useEffect(() => {
    fetch(`${URL}/api/owner/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        // Normalize data
        data.isNew = data.isNew || data.new || false;
        delete data.new;
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id, URL]);

  // Handle product update submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    let updatedProduct = { ...product };

    if (product.image instanceof File) {
      const base64Image = await convertToBase64(product.image);
      updatedProduct.image = base64Image;
    }

    fetch(`${URL}/api/owner/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Product updated successfully");
        window.location.href = "/admin/products";
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update product");
      });
  };

  // UI: Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFE8D6]">
        <p className="text-[#6B705C] text-2xl">Loading...</p>
      </div>
    );
  }

  // UI: Product Not Found
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFE8D6]">
        <p className="text-[#6B705C] text-2xl">Product not found</p>
      </div>
    );
  }

  // UI: Product Edit Form
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFE8D6] px-4 py-8">
      <form
        onSubmit={handleSaveChanges}
        className="bg-[#FFF] shadow-xl rounded-xl p-8 w-full max-w-xl border border-[#D4C7B0]"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#3F4238]">
          Edit Product
        </h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block font-medium text-[#3F4238] mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full border border-[#B7B7A4] rounded-lg py-2 px-3"
            required
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block font-medium text-[#3F4238] mb-1">
            Description
          </label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full border border-[#B7B7A4] rounded-lg py-2 px-3"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block font-medium text-[#3F4238] mb-1">Price</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            className="w-full border border-[#B7B7A4] rounded-lg py-2 px-3"
            required
          />
        </div>

        {/* In Stock */}
        <div className="mb-4">
          <label className="block font-medium text-[#3F4238] mb-1">
            Availability
          </label>
          <select
            value={product.inStock ? "Yes" : "No"}
            onChange={(e) =>
              setProduct({ ...product, inStock: e.target.value === "Yes" })
            }
            className="w-full border border-[#B7B7A4] rounded-lg py-2 px-3"
          >
            <option value="Yes">In Stock</option>
            <option value="No">Out of Stock</option>
          </select>
        </div>

        {/* Stock Quantity */}
        <div className="mb-4">
          <label className="block font-medium text-[#3F4238] mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: Number(e.target.value) })
            }
            className="w-full border border-[#B7B7A4] rounded-lg py-2 px-3"
            required
          />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label className="block font-medium text-[#3F4238] mb-1">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
            className="w-full border border-[#B7B7A4] rounded-lg py-2 px-3"
          />
        </div>

        {/* Feature Toggles */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: "Hot", field: "hot" },
            { label: "New", field: "isNew" },
            { label: "Package", field: "package" },
          ].map((item, idx) => (
            <label key={idx} className="flex items-center gap-2 text-[#3F4238]">
              <input
                type="checkbox"
                checked={product[item.field] || false}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    [item.field]: e.target.checked,
                  })
                }
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* Package Name Field */}
        {product.package && (
          <div className="mb-4">
            <label className="block font-medium text-[#3F4238] mb-1">
              Package Name
            </label>
            <input
              type="text"
              value={product.packageName || ""}
              onChange={(e) =>
                setProduct({ ...product, packageName: e.target.value })
              }
              className="w-full border border-[#B7B7A4] rounded-lg py-2 px-3"
              required
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#6B705C] hover:bg-[#3F4238] text-white font-semibold py-2 px-4 rounded transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
