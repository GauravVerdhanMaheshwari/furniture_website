import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserForm from "./UserForm/UserForm";
import HistoryBuys from "./UserForm/HistoryBuys";
import Purchase from "./UserForm/Purchase";

function Profile() {
  const userID = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

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
          fetch(
            `https://furniture-website-backend-yubt.onrender.com/api/users/${userID}`
          ),
          fetch(
            `https://furniture-website-backend-yubt.onrender.com/api/history/user/${userID}`
          ),
          fetch(
            `https://furniture-website-backend-yubt.onrender.com/api/purchases/${userID}`
          ),
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
              const res = await fetch(
                `https://furniture-website-backend-yubt.onrender.com/api/products/${item.productId}`
              );
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
      const response = await fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/users/${userID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

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
      await fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/users/${userID}`,
        {
          method: "DELETE",
        }
      );
      alert("Account deleted.");
      // Optionally: Redirect or logout
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete account.");
    }
  };

  if (!isLoggedIn || !userID) {
    return <p className="text-red-500">Please log in to view your profile.</p>;
  }

  return (
    <div className="mt-25 min-h-screen p-4 bg-white text-center">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {loading ? (
        <p className="text-black text-xl">Loading...</p>
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
        <p className="text-red-500">User not found.</p>
      )}
    </div>
  );
}

export default Profile;
