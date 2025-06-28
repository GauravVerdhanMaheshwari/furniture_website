import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Package } from "../../components/indexComponents";

function AdminPackages() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔐 Admin check + fetch packages
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/admin/login");
      return;
    }

    const fetchPackages = async () => {
      try {
        const res = await fetch(`${URL}/api/owner/packages`);
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("❌ Failed to fetch packages:", err);
        alert("Error fetching packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [URL, navigate]);

  // 🗑️ Delete a package
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${URL}/api/owner/package/delete/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert("✅ Package deleted successfully!");
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Failed to delete package.");
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg?.packageName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FFE8D6] px-4 py-8 sm:px-6 sm:py-10 md:px-10 mt-20 sm:mt-16 text-[#3F4238]">
      {/* 🔍 Header */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-6 rounded-xl shadow-md">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Link
          to="/admin/add-package"
          className="bg-[#CB997E] hover:bg-[#B98B73] text-white font-semibold text-sm px-5 py-2 rounded-md shadow transition"
        >
          + Add Package
        </Link>
      </section>

      {/* 📦 Packages Grid */}
      {loading ? (
        <p className="text-xl text-[#6B705C] text-center animate-pulse">
          Loading packages...
        </p>
      ) : filteredPackages.length === 0 ? (
        <p className="text-center text-lg text-[#6B705C]">No packages found.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Package key={pkg._id} packages={pkg} onDelete={handleDelete} />
          ))}
        </section>
      )}
    </main>
  );
}

export default AdminPackages;
