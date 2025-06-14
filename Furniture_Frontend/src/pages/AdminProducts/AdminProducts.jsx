// src/pages/admin/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product, Search } from "../../components/indexComponents.js"; // Adjust the import path as needed

function AdminProducts() {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  const URL = import.meta.env.VITE_BACK_END_API;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${URL}/api/owner/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`${URL}/api/owner/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete product");
          return res.json();
        })
        .then(() => {
          alert("Product deleted successfully");
          setProducts((prev) => prev.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Failed to delete product.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-white shadow-md rounded-xl p-4">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="mt-4 sm:mt-0">
            <Link
              to="/admin/add-product"
              className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-4 py-2 rounded transition duration-200"
            >
              Add Product
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            <p className="text-[#6B705C] text-2xl">Loading...</p>
          ) : (
            products
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  onDelete={() => deleteProduct(product._id)}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
