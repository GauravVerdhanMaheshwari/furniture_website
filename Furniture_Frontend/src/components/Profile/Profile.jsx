import React, { useEffect, useState } from "react";
import UserForm from "./UserForm/UserForm";
import HistoryBuys from "./UserForm/HistoryBuys";

function Profile() {
  const userID = "683ebe05df51425cf136e968";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);

  const saving = async () => {
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
      location.reload();
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
    }
  };

  const handleSaveChanges = async () => {
    console.log("Save changes clicked");
    console.log("Updated userData:", userData);

    for (const key in userData) {
      if (userData[key] === "") {
        alert(`Please fill in the ${key} field.`);
        location.reload();
        setChanged(false);
        return;
      }
    }

    confirm("Are you sure you want to save changes?")
      ? saving()
      : console.log("Changes not saved");
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
        <div>
          <UserForm
            userData={userData}
            setUserData={setUserData}
            handleSaveChanges={handleSaveChanges}
            handleDeleteUser={handleDeleteUser}
            changed={changed}
            setChanged={setChanged}
          />
          <HistoryBuys />
        </div>
      ) : (
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
}

export default Profile;
