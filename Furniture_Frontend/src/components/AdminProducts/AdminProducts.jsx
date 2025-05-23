import React from "react";
import { NavLink, Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  fetch("http://localhost:3000/api/owner/furniture")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return (
    <div className="flex flex-col mt-25 items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-row items-center justify-between w-fit p-4 bg-white shadow-md rounded-xl">
          <div className="flex flex-row items-center">
            <img src="search.webp" alt="search" className="w-6 h-6" />
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-row items-center ml-4">
            <Link
              to="/admin/add-product"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-4 flex-wrap justify-center m-2 gap-16">
        {loading ? (
          <p className="text-gray-500 text-3xl">Loading...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border p-4 mb-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold">₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <p className="text-gray-500">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 object-cover mt-2"
              />
              <p className="text-gray-500">Company: {product.company}</p>
              <div className="flex flex-col mt-2">
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                  Edit
                </button>
                <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
