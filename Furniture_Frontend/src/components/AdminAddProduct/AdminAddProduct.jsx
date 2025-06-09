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
        images: images, // ✅ Send full array now
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
      console.log("Server response:", result);
      setInterval(() => {
        window.location.reload();
        window.location.href = "/admin/products";
      }, 1000);

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }
      alert("Product added successfully!");
      form.reset();
      setShowPackageName(false);
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
    <div className="flex flex-col mt-25 items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form
        className="flex flex-col w-1/3 bg-white p-6 shadow-md rounded-xl"
        onSubmit={handleAddProduct}
      >
        <label className="text-xl font-semibold mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border border-gray-300 rounded p-2 mb-4"
          required
        />

        <label className="text-xl font-semibold mb-1">
          Product Description
        </label>
        <textarea
          name="description"
          placeholder="Product Description"
          className="border border-gray-300 rounded p-2 mb-4"
          required
        ></textarea>

        <label className="text-xl font-semibold mb-1">Product Price</label>
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          className="border border-gray-300 rounded p-2 mb-4"
          required
        />

        <label className="text-xl font-semibold mb-1">Product Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Product Stock"
          className="border border-gray-300 rounded p-2 mb-4"
          required
        />

        <label className="text-xl font-semibold mb-1">
          Product Images (max 4)
        </label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="border border-gray-300 rounded p-2 mb-4"
          required
        />

        <label className="text-xl font-semibold mb-1">Product Company</label>
        <input
          type="text"
          name="company"
          placeholder="Product Company"
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <div className="flex flex-col gap-2 mb-4">
          <label className="flex items-center">
            <input type="checkbox" name="hot" className="mr-2" />
            <span className="text-xl">Product Hot</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="newProduct" className="mr-2" />
            <span className="text-xl">Product New</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="packageProduct"
              className="mr-2"
              onChange={(e) => setShowPackageName(e.target.checked)}
            />
            <span className="text-xl">Product Package</span>
          </label>
        </div>

        {showPackageName && (
          <div className="mb-4">
            <label className="text-xl font-semibold mb-1">
              Product Package Name
            </label>
            <input
              type="text"
              name="packageName"
              placeholder="Product Package Name"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
