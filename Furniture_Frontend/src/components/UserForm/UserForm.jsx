import React from "react";

/**
 * UserForm Component - Handles user profile updates and deletion.
 *
 * @param {object} userData - Current user data.
 * @param {function} setUserData - Setter for user data state.
 * @param {function} setChanged - Setter to track form changes.
 * @param {function} handleSaveChanges - Save handler.
 * @param {function} handleDeleteUser - Delete handler.
 * @param {boolean} changed - Flag indicating unsaved changes.
 */
function UserForm({
  userData,
  setUserData,
  setChanged,
  handleSaveChanges,
  handleDeleteUser,
  changed = false,
}) {
  const inputBase =
    "mb-4 p-2 rounded bg-[#DDBEA9] border border-[#D4C7B0] text-[#3F4238] placeholder-[#A5A58D] focus:outline-none focus:ring-2 focus:ring-[#CB997E]";

  if (!userData) {
    return (
      <div className="bg-[#FFE8D6] border border-[#D4C7B0] p-6 rounded-md text-center text-[#B98B73] font-semibold text-xl">
        ⚠️ User data not available.
      </div>
    );
  }

  // Central change handler
  const handleChange = (field, value) => {
    setChanged(true);
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#FFE8D6] border border-[#D4C7B0] p-6 rounded-md shadow-md text-[#6B705C] font-semibold w-full max-w-xl mx-auto">
      {/* Name */}
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={userData.name}
        placeholder="Enter your name"
        className={inputBase}
        minLength={8}
        maxLength={50}
        required
        onChange={(e) => handleChange("name", e.target.value)}
        onBlur={(e) => {
          const len = e.target.value.trim().length;
          if (len < 8 || len > 50) {
            alert("Name must be between 8 and 50 characters.");
            handleChange("name", "");
          }
        }}
      />

      {/* Email */}
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={userData.email}
        placeholder="Enter your email"
        className={inputBase}
        required
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={(e) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(e.target.value)) {
            alert("Please enter a valid email address.");
            handleChange("email", "");
          }
        }}
      />

      {/* Address */}
      <label htmlFor="address">Address:</label>
      <input
        id="address"
        type="text"
        value={userData.address}
        placeholder="Enter your address"
        className={inputBase}
        required
        onChange={(e) => handleChange("address", e.target.value)}
      />

      {/* Phone */}
      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        type="tel"
        value={userData.phone}
        placeholder="Enter your phone number"
        className={inputBase}
        pattern="\d{10}"
        maxLength={10}
        required
        onChange={(e) => handleChange("phone", e.target.value)}
        onBlur={(e) => {
          if (e.target.value.length !== 10) {
            alert("Phone number must be exactly 10 digits.");
            handleChange("phone", "");
          }
        }}
      />

      {/* Action Buttons */}
      <div className="mt-6">
        {changed && (
          <p className="mb-3 text-[#6B705C]">✅ Unsaved changes detected.</p>
        )}

        <div className="flex flex-wrap gap-3">
          {changed && (
            <button
              onClick={handleSaveChanges}
              className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-4 py-2 rounded transition"
            >
              Save Changes
            </button>
          )}
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete your account? This action is irreversible."
                )
              ) {
                handleDeleteUser();
              }
            }}
            className="bg-[#3F4238] hover:bg-[#6B705C] text-white px-4 py-2 rounded transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
