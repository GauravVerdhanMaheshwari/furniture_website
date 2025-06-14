import React from "react";

function AdminAddProduct() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // Redirect unauthorized users
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  const [showPackageName, setShowPackageName] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Convert file to base64 string
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }

  // Handle product form submission
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
      // Convert images to base64
      const images = await Promise.all(
        imageFiles.map(async (file) => await convertToBase64(file))
      );

      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        images,
        company: formData.get("company") || "Made in Factory",
        inStock: true,
        New: formData.get("newProduct") === "on",
        Hot: formData.get("hot") === "on",
        Package: formData.get("packageProduct") === "on",
        AddedDate: new Date().toISOString(),
        PackageName:
          formData.get("packageProduct") === "on"
            ? formData.get("packageName")
            : "",
      };

      // Send product data to server
      const response = await fetch(`${URL}/api/owner/product/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to add product");

      alert("Product added successfully!");
      form.reset();
      setShowPackageName(false);

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/admin/products";
      }, 1000);
    } catch (error) {
      console.error("Product submission error:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleAddProduct}
        className="w-full max-w-2xl bg-[#DDBEA9] rounded-2xl shadow-2xl p-8 space-y-6 text-[#3F4238]"
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-[#B98B73]">
          Add New Product
        </h1>

        {/* Text Inputs */}
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
            label: "Stock Quantity",
            name: "stock",
            type: "number",
            required: true,
          },
          {
            label: "Company / Brand",
            name: "company",
            type: "text",
            required: false,
          },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block font-medium mb-1">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                required={field.required}
                placeholder={field.label}
                className="w-full border border-[#A5A58D] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.label}
                className="w-full border border-[#A5A58D] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">
            Upload Images (Max 4)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            required
            className="w-full border border-[#A5A58D] p-2 rounded bg-white"
          />
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "hot", label: "🔥 Mark as Hot" },
            { name: "newProduct", label: "🆕 Mark as New" },
            {
              name: "packageProduct",
              label: "📦 Is a Package?",
              onChange: (e) => setShowPackageName(e.target.checked),
            },
          ].map((item, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2 text-base font-medium"
            >
              <input
                type="checkbox"
                name={item.name}
                onChange={item.onChange}
                className="accent-[#B5838D]"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        {/* Conditional Field: Package Name */}
        {showPackageName && (
          <div>
            <label className="block font-medium mb-1">Package Name</label>
            <input
              type="text"
              name="packageName"
              placeholder="Enter Package Name"
              className="w-full border border-[#A5A58D] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-white font-semibold rounded transition duration-300 ${
            isSubmitting
              ? "bg-[#CB997E] opacity-70 cursor-not-allowed"
              : "bg-[#CB997E] hover:bg-[#6B705C]"
          }`}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
