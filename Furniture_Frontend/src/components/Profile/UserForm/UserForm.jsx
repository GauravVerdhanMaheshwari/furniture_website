import React from "react";

function UserForm({
  userData,
  setUserData,
  setChanged,
  handleSaveChanges,
  handleDeleteUser,
  changed = false,
}) {
  const inputBaseClasses =
    "mb-4 p-2 rounded bg-[#DDBEA9] border border-[#D4C7B0] text-[#3F4238] placeholder-[#A5A58D]";

  return userData ? (
    <div className="flex flex-col bg-[#FFE8D6] border border-[#D4C7B0] p-6 rounded-md shadow-md text-xl font-semibold text-[#6B705C]">
      <label htmlFor="name" className="mb-1">
        Name:
      </label>
      <input
        type="text"
        id="name"
        value={userData.name}
        onChange={(e) => {
          setChanged(true);
          setUserData((prevData) => ({
            ...prevData,
            name: e.target.value,
          }));
        }}
        className={inputBaseClasses}
        placeholder="Enter your name"
        max={50}
        min={8}
        onBlur={(e) => {
          if (e.target.value.length < 8 || e.target.value.length > 50) {
            alert("Name must be between 8 and 50 characters long.");
            setUserData((prevData) => ({
              ...prevData,
              name: "",
            }));
          }
        }}
        required
      />

      <label htmlFor="email" className="mb-1">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={userData.email}
        onChange={(e) => {
          setChanged(true);
          setUserData((prevData) => ({
            ...prevData,
            email: e.target.value,
          }));
        }}
        onBlur={(e) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(e.target.value)) {
            alert("Please enter a valid email address.");
            setUserData((prevData) => ({
              ...prevData,
              email: "",
            }));
          }
        }}
        className={inputBaseClasses}
        placeholder="Enter your email"
        required
      />

      <label htmlFor="address" className="mb-1">
        Address:
      </label>
      <input
        type="text"
        id="address"
        value={userData.address}
        onChange={(e) => {
          setChanged(true);
          setUserData((prevData) => ({
            ...prevData,
            address: e.target.value,
          }));
        }}
        className={inputBaseClasses}
        placeholder="Enter your address"
        required
      />

      <label htmlFor="phone" className="mb-1">
        Phone:
      </label>
      <input
        type="tel"
        id="phone"
        value={userData.phone}
        onChange={(e) => {
          setChanged(true);
          setUserData((prevData) => ({
            ...prevData,
            phone: e.target.value,
          }));
        }}
        className={inputBaseClasses}
        placeholder="Enter your phone number"
        minLength="10"
        maxLength="10"
        onBlur={(e) => {
          if (e.target.value.length !== 10) {
            alert("Phone number must be 10 digits long.");
            setUserData((prevData) => ({
              ...prevData,
              phone: "",
            }));
          }
        }}
        required
      />

      <div className="flex flex-col mt-4">
        {changed && (
          <p className="text-[#6B705C] mb-3">
            ✅ Changes have been made. Please save.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          {changed && (
            <button
              className="bg-[#CB997E] hover:bg-[#B98B73] text-white px-4 py-2 rounded transition"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )}
          <button
            className="bg-[#3F4238] hover:bg-[#6B705C] text-white px-4 py-2 rounded transition"
            onClick={handleDeleteUser}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col bg-[#FFE8D6] border border-[#D4C7B0] p-6 rounded-md text-xl font-semibold text-[#6B705C]">
      <p className="text-[#B98B73]">⚠️ User data not available.</p>
    </div>
  );
}

export default UserForm;
