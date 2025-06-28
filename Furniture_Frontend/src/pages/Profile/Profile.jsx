import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserForm } from "../../components/indexComponents.js";

function Profile() {
  const userID = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !userID) {
      window.location.href = "/login";
    }
  }, [isLoggedIn, userID]);

  useEffect(() => {
    if (!userID) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await fetch(`${URL}/api/users/${userID}`);
        const user = await userRes.json();
        setUserData(user);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID, URL]);

  const handleSaveChanges = async () => {
    if (!userData.name || !userData.email || !userData.phone) {
      return alert("All fields must be filled out.");
    }

    if (!window.confirm("Are you sure you want to save changes?")) return;

    if (userData.address.length < 10 || userData.address.length > 100)
      return alert("Address must be between 10 and 100 characters.");

    userData.name = userData.name.trim();
    userData.address = userData.address.trim();
    userData.email = userData.email.toLowerCase().trim();

    try {
      const response = await fetch(`${URL}/api/users/${userID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const updatedUser = await response.json();
      setUserData(updatedUser);
      setChanged(false);
      alert("Profile updated successfully.");
      window.location.reload();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      await fetch(`${URL}/api/users/${userID}`, {
        method: "DELETE",
      });

      alert("Account deleted.");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="mt-20 min-h-screen px-4 py-12 bg-[#FFE8D6] text-[#3F4238] sm:mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#6B705C]">
          Your Profile
        </h1>

        {loading ? (
          <p className="text-[#3F4238] text-lg text-center animate-pulse">
            Loading...
          </p>
        ) : userData && userData._id ? (
          <UserForm
            userData={userData}
            setUserData={setUserData}
            handleSaveChanges={handleSaveChanges}
            handleDeleteUser={handleDeleteUser}
            changed={changed}
            setChanged={setChanged}
          />
        ) : (
          <p className="text-[#B98B73] text-lg text-center">User not found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
