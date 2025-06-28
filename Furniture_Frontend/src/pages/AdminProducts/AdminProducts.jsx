import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product, Search } from "../../components/indexComponents.js";

function AdminProducts() {
  const URL = import.meta.env.VITE_BACK_END_API;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Redirect unauthenticated admins
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
    }
  }, []);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${URL}/api/owner/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Product fetch error:", err);
        alert("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [URL]);

  // Handle deletion with confirmation
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
      alert("✅ Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Deletion error:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Filtered product list
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FFE8D6] pt-20 pb-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with search and button */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#D4C7B0] shadow-lg rounded-xl p-5">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link
            to="/admin/add-product"
            className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md transition"
          >
            + Add Product
          </Link>
        </section>

        {/* Product display */}
        <section className="w-full">
          {loading ? (
            <p className="text-xl text-center text-[#6B705C] animate-pulse py-10">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-xl text-center text-[#6B705C] py-10">
              No matching products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  onDelete={() => deleteProduct(product._id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminProducts;
