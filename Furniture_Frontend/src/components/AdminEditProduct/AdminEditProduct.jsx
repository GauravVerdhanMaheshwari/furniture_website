import React, { useEffect } from "react";
import { useParams } from "react-router";

function AdminEditProduct() {
  const id = useParams().id;
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log(product);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/owner/furniture/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Product data:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-gray-500 text-3xl">Loading...</p>
    </div>
  ) : product ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-25">
      <form action="">
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-gray-500 text-3xl">Product not found</p>
    </div>
  );
}

export default AdminEditProduct;
