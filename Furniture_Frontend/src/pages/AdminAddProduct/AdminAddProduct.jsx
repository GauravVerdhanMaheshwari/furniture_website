import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminAddProduct() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    const imageFiles = Array.from(formData.getAll("images"));

    if (imageFiles.length > 4) {
      alert("You can upload a maximum of 4 images.");
      setIsSubmitting(false);
      return;
    }

    try {
      const images = await Promise.all(
        imageFiles.map((file) => convertToBase64(file))
      );

      const newProduct = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        company: formData.get("company") || "Made in Factory",
        images,
        Length: Number(formData.get("Length")) || 0,
        Width: Number(formData.get("Width")) || 0,
        Depth: Number(formData.get("Depth")) || 0,
        Hot: formData.get("hot") === "on",
        New: formData.get("newProduct") === "on",
        AddedDate: new Date().toISOString(),
      };

      const response = await fetch(`${URL}/api/owner/product/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to add product");

      alert("✅ Product added successfully!");
      form.reset();
      setTimeout(() => navigate("/admin/products"), 800);
    } catch (err) {
      console.error("❌ Product submission failed:", err);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] flex items-center justify-center px-4 py-16">
      <form
        onSubmit={handleAddProduct}
        className="w-full max-w-2xl bg-[#DDBEA9] rounded-2xl shadow-xl p-8 space-y-6 text-[#3F4238]"
      >
        <h1 className="text-3xl font-bold text-center text-[#B98B73]">
          🪑 Add New Product
        </h1>

        {/* Input Fields */}
        {[
          { label: "Product Name", name: "name", type: "text", required: true },
          {
            label: "Product Description",
            name: "description",
            type: "textarea",
            required: true,
          },
          {
            label: "Product Price (₹)",
            name: "price",
            type: "number",
            required: true,
          },
          {
            label: "Length (in inches)",
            name: "Length",
            type: "number",
            required: true,
          },
          {
            label: "Width (in inches)",
            name: "Width",
            type: "number",
            required: true,
          },
          {
            label: "Depth (in inches)",
            name: "Depth",
            type: "number",
            required: true,
          },
          {
            label: "Brand / Company",
            name: "company",
            type: "text",
            required: false,
          },
        ].map((field, i) => (
          <div key={i}>
            <label htmlFor={field.name} className="block font-medium mb-1">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.label}
                className="w-full border border-[#A5A58D] p-2 rounded-lg focus:ring-2 focus:ring-[#B5838D]"
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.label}
                className="w-full border border-[#A5A58D] p-2 rounded-lg focus:ring-2 focus:ring-[#B5838D]"
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div>
          <label htmlFor="images" className="block font-medium mb-1">
            Upload Images (Max 4)
          </label>
          <input
            id="images"
            type="file"
            name="images"
            accept="image/*"
            multiple
            required
            className="w-full border border-[#A5A58D] p-2 rounded-lg bg-white"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-4">
          {[
            { name: "hot", label: "🔥 Mark as Hot" },
            { name: "newProduct", label: "🆕 Mark as New" },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-2 text-base">
              <input type="checkbox" name={name} className="accent-[#B5838D]" />
              <span>{label}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 font-semibold rounded-lg transition duration-300 ${
            isSubmitting
              ? "bg-[#CB997E] opacity-70 cursor-not-allowed text-white"
              : "bg-[#CB997E] hover:bg-[#6B705C] text-white"
          }`}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
