import React from "react";

function UserForm({
  userData,
  setUserData,
  setChanged,
  handleSaveChanges,
  handleDeleteUser,
  changed = false,
}) {
  // Reusable input base classes
  const inputBaseClasses =
    "mb-4 p-2 rounded bg-[#DDBEA9] border border-[#D4C7B0] text-[#3F4238] placeholder-[#A5A58D] focus:outline-none focus:ring-2 focus:ring-[#CB997E]";

  // If no user data available
  if (!userData) {
    return (
      <div className="flex flex-col bg-[#FFE8D6] border border-[#D4C7B0] p-6 rounded-md text-xl font-semibold text-[#6B705C]">
        <p className="text-[#B98B73]">⚠️ User data not available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FFE8D6] border border-[#D4C7B0] p-6 rounded-md shadow-md text-xl font-semibold text-[#6B705C] w-full max-w-xl mx-auto">
      {/* Name Input */}
      <label htmlFor="name" className="mb-1">
        Name:
      </label>
      <input
        type="text"
        id="name"
        value={userData.name}
        onChange={(e) => {
          setChanged(true);
          setUserData((prev) => ({ ...prev, name: e.target.value }));
        }}
        placeholder="Enter your name"
        className={inputBaseClasses}
        maxLength={50}
        minLength={8}
        onBlur={(e) => {
          const len = e.target.value.length;
          if (len < 8 || len > 50) {
            alert("Name must be between 8 and 50 characters long.");
            setUserData((prev) => ({ ...prev, name: "" }));
          }
        }}
        required
      />

      {/* Email Input */}
      <label htmlFor="email" className="mb-1">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={userData.email}
        onChange={(e) => {
          setChanged(true);
          setUserData((prev) => ({ ...prev, email: e.target.value }));
        }}
        placeholder="Enter your email"
        className={inputBaseClasses}
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        onBlur={(e) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(e.target.value)) {
            alert("Please enter a valid email address.");
            setUserData((prev) => ({ ...prev, email: "" }));
          }
        }}
        required
      />

      {/* Address Input */}
      <label htmlFor="address" className="mb-1">
        Address:
      </label>
      <input
        type="text"
        id="address"
        value={userData.address}
        onChange={(e) => {
          setChanged(true);
          setUserData((prev) => ({ ...prev, address: e.target.value }));
        }}
        placeholder="Enter your address"
        className={inputBaseClasses}
        required
      />

      {/* Phone Input */}
      <label htmlFor="phone" className="mb-1">
        Phone:
      </label>
      <input
        type="tel"
        id="phone"
        value={userData.phone}
        onChange={(e) => {
          setChanged(true);
          setUserData((prev) => ({ ...prev, phone: e.target.value }));
        }}
        placeholder="Enter your phone number"
        className={inputBaseClasses}
        minLength={10}
        maxLength={10}
        pattern="\d{10}"
        onBlur={(e) => {
          if (e.target.value.length !== 10) {
            alert("Phone number must be 10 digits long.");
            setUserData((prev) => ({ ...prev, phone: "" }));
          }
        }}
        required
      />

      {/* Action Buttons */}
      <div className="flex flex-col mt-6">
        {changed && (
          <p className="text-[#6B705C] mb-3">
            ✅ You have unsaved changes. Don’t forget to save.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          {/* Save Changes */}
          {changed && (
            <button
              className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-4 py-2 rounded transition"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )}
          {/* Delete Account */}
          <button
            className="bg-[#3F4238] hover:bg-[#6B705C] text-white px-4 py-2 rounded transition"
            onClick={handleDeleteUser}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
