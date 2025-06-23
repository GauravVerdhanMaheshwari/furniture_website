import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "../../components/indexComponents"; // adjust path as needed

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

  const filteredPackages = packages.filter((pkg) =>
    pkg?.packageName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-19 min-h-screen bg-[#FFE8D6] p-6 text-[#3F4238]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">📦 All Packages</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading packages...</p>
      ) : filteredPackages.length === 0 ? (
        <p className="text-center text-lg">No packages found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-lg shadow-md p-4 border border-[#E3D5CA]"
            >
              <h2 className="text-xl font-semibold">{pkg.packageName}</h2>
              <p className="mt-1 text-sm text-gray-600">
                Total Price: ₹{pkg.price}
              </p>
              <p className="mt-2 font-medium">Items: {pkg.items.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPackages;
