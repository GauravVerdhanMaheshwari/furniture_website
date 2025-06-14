import React, { useEffect, useState } from "react";

function AdminProfile() {
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  const handleUpdateProfile = async (data) => {
    try {
      const response = await fetch(`${URL}/api/owner/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const result = await response.json();
      console.log("Profile updated successfully:", result);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(`${URL}/api/owner/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch admin profile");

        const result = await response.json();
        const admin = Array.isArray(result) ? result[0] : result;

        setAdminData({
          id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
        });
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        setError("Failed to load admin profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl font-medium text-[#6B705C]">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-xl text-red-600 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen pt-20 bg-[#FFE8D6] px-4">
      <div className="max-w-2xl mx-auto bg-[#DDBEA9] rounded-xl shadow-lg">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-[#3F4238] mb-6">
            Admin Profile
          </h1>

          <div className="space-y-5">
            {/* Name Field */}
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
                className="w-full px-4 py-2 border border-[#B7B7A4] rounded-md bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
              />
            </div>

            {/* Email Field */}
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
                className="w-full px-4 py-2 border border-[#B7B7A4] rounded-md bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
              />
            </div>

            {/* Phone Field */}
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
                className="w-full px-4 py-2 border border-[#B7B7A4] rounded-md bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#CB997E]"
              />
            </div>

            {/* Update Button */}
            <button
              onClick={() => handleUpdateProfile(adminData)}
              className="w-full bg-[#CB997E] text-white py-2 rounded-md mt-4 hover:bg-[#B98B73] transition-colors duration-200 cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
