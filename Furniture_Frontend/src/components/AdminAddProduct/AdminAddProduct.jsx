import React from "react";

function AdminAddProduct() {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  const [showPackageName, setShowPackageName] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
        imageFiles.map(async (file) => {
          const base64 = await convertToBase64(file);
          return base64;
        })
      );

      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        images: images,
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

      const response = await fetch(
        "https://furniture-website-backend-yubt.onrender.com/api/owner/product/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      alert("Product added successfully!");
      form.reset();
      setShowPackageName(false);

      setTimeout(() => {
        window.location.href = "/admin/products";
      }, 1000);
    } catch (error) {
      console.error("Failed to send product data to server:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }

  return (
    <div className="min-h-screen bg-[#FFE8D6] flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleAddProduct}
        className="w-full max-w-xl bg-[#DDBEA9] p-8 rounded-xl shadow-lg text-[#3F4238]"
      >
        <h1 className="text-3xl font-bold mb-6 text-[#B98B73] text-center">
          Add Product
        </h1>

        {[
          { label: "Product Name", name: "name", type: "text", required: true },
          {
            label: "Product Description",
            name: "description",
            type: "textarea",
            required: true,
          },
          {
            label: "Product Price",
            name: "price",
            type: "number",
            required: true,
          },
          {
            label: "Product Stock",
            name: "stock",
            type: "number",
            required: true,
          },
          {
            label: "Product Company",
            name: "company",
            type: "text",
            required: false,
          },
        ].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block text-lg font-semibold mb-1">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.label}
                required={field.required}
                className="w-full p-2 border border-[#A5A58D] rounded"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                required={field.required}
                className="w-full p-2 border border-[#A5A58D] rounded"
              />
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">
            Product Images (max 4)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full p-2 border border-[#A5A58D] rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {[
            { name: "hot", label: "Product Hot" },
            { name: "newProduct", label: "Product New" },
            {
              name: "packageProduct",
              label: "Product Package",
              onChange: (e) => setShowPackageName(e.target.checked),
            },
          ].map((checkbox, idx) => (
            <label key={idx} className="flex items-center text-lg">
              <input
                type="checkbox"
                name={checkbox.name}
                className="mr-2"
                onChange={checkbox.onChange}
              />
              {checkbox.label}
            </label>
          ))}
        </div>

        {showPackageName && (
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">
              Product Package Name
            </label>
            <input
              type="text"
              name="packageName"
              placeholder="Package Name"
              className="w-full p-2 border border-[#A5A58D] rounded"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 mt-4 rounded text-white font-semibold transition ${
            isSubmitting
              ? "bg-[#CB997E] opacity-70 cursor-not-allowed"
              : "bg-[#CB997E] hover:bg-[#6B705C]"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
