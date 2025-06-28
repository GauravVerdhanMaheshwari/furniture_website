import React from "react";

/**
 * UserForm Component - Handles user profile updates and deletion.
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
    "mb-5 p-3 rounded-lg bg-[#F8F1EB] border border-[#D4C7B0] text-[#3F4238] placeholder-[#A5A58D] focus:outline-none focus:ring-2 focus:ring-[#CB997E] transition-all w-full";

  if (!userData) {
    return (
      <div className="bg-[#FFE8D6] border border-[#D4C7B0] p-6 rounded-lg text-center text-[#B98B73] font-semibold text-xl shadow">
        ⚠️ User data not available.
      </div>
    );
  }

  const handleChange = (field, value) => {
    setChanged(true);
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      className="bg-white border border-[#D4C7B0] p-8 rounded-2xl shadow-lg text-[#6B705C] w-full max-w-2xl mx-auto space-y-5"
      autoComplete="on"
    >
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name:
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={userData.name}
          placeholder="Enter your name"
          className={inputBase}
          minLength={8}
          maxLength={50}
          required
          title="Name must be between 8 and 50 characters."
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email:
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={userData.email}
          placeholder="Enter your email"
          className={inputBase}
          required
          title="Must be a valid email format (e.g., name@example.com)"
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">
          Phone:
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={userData.phone}
          placeholder="Enter your 10-digit phone number"
          className={inputBase}
          maxLength={10}
          pattern="\d{10}"
          required
          title="Phone number must be exactly 10 digits"
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      {/* Change Status */}
      {changed && (
        <p className="text-[#6B705C] text-sm italic">
          ✅ Unsaved changes detected.
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        {changed && (
          <button
            type="button"
            onClick={handleSaveChanges}
            className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-5 py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete your account? This action is irreversible."
              )
            ) {
              handleDeleteUser();
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Delete Account
        </button>
      </div>
    </form>
  );
}

export default UserForm;
