import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product, Search } from "../../components/indexComponents.js";

/**
 * AdminProducts Component
 * Displays all products with search, add, and delete functionality for admin users.
 */
function AdminProducts() {
  const URL = import.meta.env.VITE_BACK_END_API;

  // Redirect if not logged in as admin
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  // State hooks
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch product list from API on component mount
  useEffect(() => {
    fetch(`${URL}/api/owner/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Delete product by ID with confirmation
  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

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
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] py-12 mt-15">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section: Search + Add Product Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 bg-white shadow-md rounded-xl p-6 gap-4">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link
            to="/admin/add-product"
            className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm transition-all"
          >
            + Add Product
          </Link>
        </div>

        {/* Product Cards Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            <p className="text-2xl text-[#6B705C] text-center">
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <p className="text-2xl text-[#6B705C] text-center">
              No products available.
            </p>
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
