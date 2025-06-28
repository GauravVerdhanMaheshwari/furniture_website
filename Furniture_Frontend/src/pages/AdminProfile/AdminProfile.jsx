import React, { useEffect, useState } from "react";

/**
 * AdminProfile Component
 * Displays and updates admin's profile information.
 */
function AdminProfile() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // --- Redirect to login if admin is not authenticated ---
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
    }
  }, []);

  // --- Profile state management ---
  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true); // UI loading flag
  const [error, setError] = useState(""); // Error message

  /**
   * Fetch admin profile data on component mount
   */
  useEffect(() => {
    const fetchAdminProfile = async () => {
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
        console.error("❌ Error fetching admin profile:", err);
        setError("Failed to load admin profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [URL]);

  /**
   * Submit updated admin profile data to server
   */
  const handleUpdateProfile = async (updatedData) => {
    try {
      const res = await fetch(`${URL}/api/owner/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.json();
      console.log("✅ Profile updated:", result);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  // --- Loading state ---
  if (loading) {
    return (
      <p className="text-center mt-24 text-xl font-medium text-[#6B705C]">
        Loading profile...
      </p>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <p className="text-center mt-24 text-xl text-red-600 font-semibold">
        {error}
      </p>
    );
  }

  // --- Profile form UI ---
  return (
    <div className="min-h-screen bg-[#FFE8D6] pt-24 px-4 md:mt-15">
      <div className="max-w-xl mx-auto bg-[#FAF3E0] rounded-2xl shadow-xl border border-[#DDBEA9]">
        <div className="p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-[#3F4238] mb-8">
            Admin Profile
          </h1>

          {/* Profile Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProfile(adminData);
            }}
            className="space-y-6"
          >
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-[#6B705C] mb-1">
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

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-[#6B705C] mb-1">
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

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-[#6B705C] mb-1">
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
      </div>
    </div>
  );
}

export default AdminProfile;
