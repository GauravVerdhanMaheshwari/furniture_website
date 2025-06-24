import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Package } from "../../components/indexComponents";

function AdminPackages() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`${URL}/api/owner/package/delete/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert("Package deleted successfully!");
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
    <div className="mt-18 min-h-screen bg-[#FFE8D6] p-6 text-[#3F4238]">
      {/* 🔍 Header: Search bar + Add Product button */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 bg-white shadow-md rounded-xl p-6 gap-4">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Link
          to="/admin/add-package"
          className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm transition-all"
        >
          + Add Package
        </Link>
      </div>

      {loading ? (
        <p className="text-2xl text-[#6B705C] text-center animate-pulse">
          Loading packages...
        </p>
      ) : filteredPackages.length === 0 ? (
        <p className="text-center text-lg">No packages found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPackages.map((pkg) => (
            <Package packages={pkg} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPackages;
