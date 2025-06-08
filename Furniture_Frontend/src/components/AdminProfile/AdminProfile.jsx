import React, { useEffect, useState } from "react";

function AdminProfile() {
  const handleUpdateProfile = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/owner/profile", {
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
    // Redirect if admin is not logged in
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(
          "https://furniture-website-backend-yubt.onrender.com/api/owner/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );

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
    return <p className="text-center mt-20 text-xl font-medium">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-20 text-xl text-red-600 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="mt-25 min-h-screen pt-20 bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Admin Profile
          </h1>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={adminData.name}
                onChange={(e) =>
                  setAdminData({ ...adminData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={adminData.email}
                onChange={(e) =>
                  setAdminData({ ...adminData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={adminData.phone}
                onChange={(e) =>
                  setAdminData({ ...adminData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => {
                handleUpdateProfile(adminData);
                console.log("Profile updated:", adminData);
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition cursor-pointer"
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
