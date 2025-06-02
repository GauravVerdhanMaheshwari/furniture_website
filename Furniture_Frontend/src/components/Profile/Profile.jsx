import React, { useEffect, useState } from "react";

function Profile() {
  const userID = "683adac421be8a674188b8e0";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [savingChange, setSavingChange] = useState(false);

  const handleSaveChanges = async () => {
    console.log("Save changes clicked");
    console.log("Updated userData:", userData);
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("User updated successfully:", data);
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
    }
  };

  const handleDeleteUser = () => {
    console.log("Delete user clicked");
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile data:", data);
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="mt-25 min-h-screen p-4 bg-white justify-center items-center text-center">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {loading ? (
        <p className="text-black text-xl">Loading...</p>
      ) : userData ? (
        <div className="flex flex-col border p-6 text-xl font-semibold py-6">
          <label htmlFor="name" className="mb-2 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={userData.name}
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
            className="mb-4 p-2 border border-gray-300 rounded"
          />

          <label htmlFor="email" className="mb-2 font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }))
            }
            className="mb-4 p-2 border border-gray-300 rounded"
          />

          <label htmlFor="address" className="mb-2 font-semibold">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={userData.address}
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                address: e.target.value,
              }))
            }
            className="mb-4 p-2 border border-gray-300 rounded"
          />

          <label htmlFor="phone" className="mb-2 font-semibold">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={userData.phone}
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                phone: e.target.value,
              }))
            }
            className="mb-4 p-2 border border-gray-300 rounded"
          />

          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-600 cursor-pointer"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mx-2 rounded hover:bg-red-600 cursor-pointer"
              onClick={handleDeleteUser}
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
}

export default Profile;
