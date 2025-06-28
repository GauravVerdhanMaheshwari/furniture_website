import React, { useEffect, useState } from "react";

/**
 * AdminProfile Component
 * Displays and updates admin's profile information.
 */
function AdminProfile() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
    }
  }, []);

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${URL}/api/owner/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch admin profile");

        const result = await res.json();
        const admin = Array.isArray(result) ? result[0] : result;

        setAdminData({
          id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone || "",
        });
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
        setError("Failed to load admin profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [URL]);

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${URL}/api/owner/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.json();
      console.log("✅ Profile updated:", result);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex justify-center items-center bg-[#FFE8D6]">
        <p className="text-xl font-medium text-[#6B705C] animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen flex justify-center items-center bg-[#FFE8D6]">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="pt-24 min-h-screen bg-[#FFE8D6] px-4 pb-10 sm:px-6 md:px-10">
      <div className="max-w-2xl mx-auto bg-[#FAF3E0] rounded-2xl shadow-xl border border-[#DDBEA9] p-6 sm:p-8 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#3F4238]">
          Admin Profile
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#6B705C] mb-1">
              Name
            </label>
            <input
              type="text"
              value={adminData.name}
              onChange={(e) =>
                setAdminData({ ...adminData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-md border border-[#B7B7A4] bg-[#FDF6EF] text-[#3F4238] focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#6B705C] mb-1">
              Email
            </label>
            <input
              type="email"
              value={adminData.email}
              onChange={(e) =>
                setAdminData({ ...adminData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-md border border-[#B7B7A4] bg-[#FDF6EF] text-[#3F4238] focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#6B705C] mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={adminData.phone}
              onChange={(e) =>
                setAdminData({ ...adminData, phone: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border border-[#B7B7A4] bg-[#FDF6EF] text-[#3F4238] focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#CB997E] hover:bg-[#B98B73] text-white py-2 rounded-md font-semibold shadow-sm transition-all duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminProfile;
