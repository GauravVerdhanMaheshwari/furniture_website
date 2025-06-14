import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserForm,
  HistoryBuys,
  Purchase,
} from "../../components/indexComponents.js";

function Profile() {
  const userID = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  if (!isLoggedIn || !userID) {
    window.location.href = "/login";
  }

  const [userData, setUserData] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [detailedPurchaseProducts, setDetailedPurchaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (!userID) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, historyRes, purchaseRes] = await Promise.all([
          fetch(`${URL}/api/users/${userID}`),
          fetch(`${URL}/api/history/user/${userID}`),
          fetch(`${URL}/api/purchases/${userID}`),
        ]);

        const user = await userRes.json();
        const history = await historyRes.json();
        const purchases = await purchaseRes.json();
        const purchaseArray = Array.isArray(purchases)
          ? purchases
          : [purchases];

        setUserData(user);
        setUserHistory(Array.isArray(history) ? history : []);
        setPurchaseData(purchaseArray);

        const details = [];

        for (const purchase of purchaseArray) {
          for (const item of purchase.items) {
            try {
              const res = await fetch(`${URL}/api/products/${item.productId}`);
              const product = await res.json();
              details.push({
                ...product,
                quantity: item.quantity,
                purchaseDate: item.purchaseDate,
              });
            } catch (err) {
              console.error("Error fetching product detail:", err);
            }
          }
        }
        setDetailedPurchaseProducts(details);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const handleSaveChanges = async () => {
    if (!userData || Object.values(userData).includes("")) {
      return alert("All fields must be filled out.");
    }

    if (!window.confirm("Are you sure you want to save changes?")) return;

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

  if (!isLoggedIn || !userID) {
    return (
      <p className="text-[#B98B73] bg-[#FFE8D6] p-4 rounded-md shadow">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-[#FFE8D6] text-[#3F4238]">
      <h1 className="text-3xl font-bold mb-6 text-[#6B705C]">Your Profile</h1>

      {loading ? (
        <p className="text-[#3F4238] text-lg">Loading...</p>
      ) : userData && userData._id ? (
        <>
          <UserForm
            userData={userData}
            setUserData={setUserData}
            handleSaveChanges={handleSaveChanges}
            handleDeleteUser={handleDeleteUser}
            changed={changed}
            setChanged={setChanged}
          />
          <Purchase
            userPurchases={purchaseData}
            PurchaseProductDetail={detailedPurchaseProducts}
          />
          <HistoryBuys userID={userID} userHistory={userHistory} />
        </>
      ) : (
        <p className="text-[#B98B73] text-lg">User not found.</p>
      )}
    </div>
  );
}

export default Profile;
