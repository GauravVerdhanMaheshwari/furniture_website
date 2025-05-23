import React from "react";

function AdminAddProduct() {
  const [showPackageName, setShowPackageName] = React.useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFiles = Array.from(formData.getAll("images"));

    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      images: imageFiles,
      company: formData.get("company")
        ? formData.get("company")
        : "Made in Factory",
      inStock: true,
      newProduct: formData.get("newProduct") === "on",
      hot: formData.get("hot") === "on",
      packageProduct: formData.get("packageProduct") === "on",
      addedDate: new Date().toISOString(),
      packageName:
        formData.get("packageProduct") === "on"
          ? formData.get("packageName")
          : null,
    };

    console.log("Product data to be sent:", data);
    try {
      const response = await fetch(
        "http://localhost:3000/api/owner/furniture",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data,
          }),
        }
      );

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Failed to send product data to server:", error);
    }
  };

  return (
    <div className="flex flex-col mt-25 items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form
        className="flex flex-col w-1/3 bg-white p-4 shadow-md rounded-xl sm:p-8"
        onSubmit={handleAddProduct}
      >
        <label htmlFor="product-name" className="text-xl font-semibold my-2">
          Product Name
        </label>
        <input
          type="text"
          id="product-name"
          name="name"
          placeholder="Product Name"
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <label
          htmlFor="product-description"
          className="text-xl font-semibold my-2"
        >
          Product Description
        </label>
        <textarea
          id="product-description"
          name="description"
          placeholder="Product Description"
          className="border border-gray-300 rounded p-2 mb-4"
        ></textarea>

        <label htmlFor="product-price" className="text-xl font-semibold my-2">
          Product Price
        </label>
        <input
          type="number"
          id="product-price"
          name="price"
          placeholder="Product Price"
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <label htmlFor="product-stock" className="text-xl font-semibold my-2">
          Product Stock
        </label>
        <input
          type="number"
          id="product-stock"
          name="stock"
          placeholder="Product Stock"
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <label htmlFor="product-image" className="text-xl font-semibold my-2">
          Product Images (max 4)
        </label>
        <input
          type="file"
          accept="image/*"
          name="images"
          multiple
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <label htmlFor="product-company" className="text-xl font-semibold my-2">
          Product Company
        </label>
        <input
          type="text"
          id="product-company"
          name="company"
          placeholder="Product Company"
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <div className="flex flex-col  items-start justify-center my-2">
          <div className="flex flex-row">
            <label
              className="text-xl font-semibold my-2 mx-2"
              htmlFor="product-hot"
            >
              Product Hot
            </label>
            <input
              type="checkbox"
              id="product-hot"
              name="hot"
              className="mx-2"
            />
          </div>

          <div>
            <label
              className="text-xl font-semibold my-2 mx-2"
              htmlFor="product-new"
            >
              Product New
            </label>
            <input
              type="checkbox"
              id="product-new"
              name="newProduct"
              className="mx-2"
            />
          </div>

          <div>
            <label
              className="text-xl font-semibold my-2 mx-2"
              htmlFor="product-package"
            >
              Product Package
            </label>
            <input
              type="checkbox"
              id="product-package"
              name="packageProduct"
              className="mx-2"
              onChange={() => setShowPackageName(!showPackageName)}
            />
          </div>
        </div>

        {showPackageName && (
          <div className="flex flex-col">
            <label
              htmlFor="product-package-name"
              className="text-xl font-semibold my-2 mx-2"
            >
              Product Package Name
            </label>
            <input
              type="text"
              id="product-package-name"
              name="packageName"
              placeholder="Product Package Name"
              className="border border-gray-300 rounded p-2 mb-4"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
