import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product, Search } from "../../components/indexComponents.js";

/**
 * AdminProducts Component
 * Displays all products for the admin dashboard.
 * Allows search, deletion, and redirection to add new product.
 */
function AdminProducts() {
  const URL = import.meta.env.VITE_BACK_END_API;

  // ✅ Redirect to login if admin is not authenticated
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
    }
  }, []);

  // ✅ State Hooks
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetch all products when component mounts
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${URL}/api/owner/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Product fetch error:", err);
        alert("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [URL]);

  /**
   * Delete a product by ID after confirmation
   * @param {string} id - Product ID
   */
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${URL}/api/owner/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete product");

      await res.json();
      alert("Product deleted successfully!");

      // Update UI without refetch
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Deletion error:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] py-12 mt-17">
      <div className="max-w-6xl mx-auto px-4">
        {/* 🔍 Header: Search bar + Add Product button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 bg-white shadow-md rounded-xl p-6 gap-4">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link
            to="/admin/add-product"
            className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm transition-all"
          >
            + Add Product
          </Link>
        </div>

        {/* 🛒 Product Display Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            <p className="text-2xl text-[#6B705C] text-center animate-pulse">
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
