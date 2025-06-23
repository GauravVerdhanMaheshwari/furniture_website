import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Search } from "../../components/indexComponents.js";

/**
 * AdminProducts Component
 * Displays all products for the admin dashboard.
 * Allows search, deletion, and redirection to add new product.
 */
function AdminPackage() {
  const URL = import.meta.env.VITE_BACK_END_API;

  // ✅ Redirect to login if admin is not authenticated
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
    }
  }, []);

  // ✅ State Hooks
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetch all products when component mounts
   */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${URL}/api/owner/packages`);
        if (!res.ok) throw new Error("Failed to fetch packages");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("Packages fetch error:", err);
        alert("Unable to load Packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [URL]);

  /**
   * Delete a packages by ID after confirmation
   * @param {string} id - Packages ID
   */
  const deletePackage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${URL}/api/owner/packages/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete packages");

      await res.json();
      alert("Packages deleted successfully!");

      // Update UI without refetch
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Deletion error:", err);
      alert("Failed to delete packages. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE8D6] py-12 mt-17">
      <div className="max-w-6xl mx-auto px-4">
        {/* 🔍 Header: Search bar + Add Product button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 bg-white shadow-md rounded-xl p-6 gap-4">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link
            to="/admin/add-package"
            className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm transition-all"
          >
            + Add Product
          </Link>
        </div>

        {/* 🛒 Package Display Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            <p className="text-2xl text-[#6B705C] text-center animate-pulse">
              Loading packages...
            </p>
          ) : packages.length === 0 ? (
            <p className="text-2xl text-[#6B705C] text-center">
              No packages available.
            </p>
          ) : (
            packages
              .filter((packages) =>
                packages.name.includes(searchTerm.toLowerCase())
              )
              .map((packages) => (
                <Package
                  key={packages._id}
                  packages={packages}
                  onDelete={() => deletePackage(packages._id)}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPackage;
