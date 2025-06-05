import React from "react";

function UserForm({
  userData,
  setUserData,
  setChanged,
  handleSaveChanges,
  handleDeleteUser,
  changed = false,
}) {
  return userData ? (
    <div className="flex flex-col border p-6 text-xl font-semibold py-6">
      <label htmlFor="name" className="mb-2 font-semibold">
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
        className="mb-4 p-2 border border-gray-300 rounded"
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

      <label htmlFor="email" className="mb-2 font-semibold">
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
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Enter your email"
        required
      />

      <label htmlFor="address" className="mb-2 font-semibold">
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
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Enter your address"
        required
      />

      <label htmlFor="phone" className="mb-2 font-semibold">
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
        className="mb-4 p-2 border border-gray-300 rounded"
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

      <div className="flex flex-col justify-center">
        {changed && (
          <p className="text-green-500 mb-4">
            Changes have been made. Please save.
          </p>
        )}
        <div>
          {changed && (
            <button
              className="bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-600 cursor-pointer"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-600 cursor-pointer"
            onClick={handleDeleteUser}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col border p-6 text-xl font-semibold py-6">
      <p className="text-red-500">User data not available.</p>
    </div>
  );
}

export default UserForm;
