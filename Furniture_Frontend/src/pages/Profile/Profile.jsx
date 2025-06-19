import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserForm,
  HistoryBuys,
  Purchase,
} from "../../components/indexComponents.js";

/**
 * Profile Page
 * Displays user's information, purchase history, and activity logs.
 * Allows profile updates and account deletion.
 */
function Profile() {
  // 🔗 Redux State
  const userID = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // 🔒 Redirect unauthenticated users
  if (!isLoggedIn || !userID) {
    window.location.href = "/login";
  }

  // 📦 Local State
  const [userData, setUserData] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [detailedPurchaseProducts, setDetailedPurchaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false); // Tracks form changes

  /**
   * Fetch user profile data, browsing history, and purchases.
   * Also fetches detailed product data for each purchased item.
   */
  useEffect(() => {
    if (!userID) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        // Parallel data fetching
        const [userRes, historyRes, purchaseRes] = await Promise.all([
          fetch(`${URL}/api/users/${userID}`),
          fetch(`${URL}/api/history/user/${userID}`),
          fetch(`${URL}/api/purchases/${userID}`),
        ]);

        // Parse responses
        const user = await userRes.json();
        const history = await historyRes.json();
        const purchases = await purchaseRes.json();
        const purchaseArray = Array.isArray(purchases)
          ? purchases
          : [purchases];

        // Store data in state
        setUserData(user);
        setUserHistory(Array.isArray(history) ? history : []);
        setPurchaseData(purchaseArray);

        // Fetch detailed product data for each purchased item
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

  /**
   * Updates user profile data
   */
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

  /**
   * Deletes the user account
   */
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

  // 🔐 Fallback UI if unauthorized (double check)
  if (!isLoggedIn || !userID) {
    return (
      <div className="bg-[#FFE8D6] min-h-screen flex items-center justify-center p-4">
        <p className="text-[#B98B73] text-lg font-medium bg-white px-6 py-3 rounded-lg shadow">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  // ✅ Profile Page Rendering
  return (
    <div className="min-h-screen px-4 py-10 bg-[#FFE8D6] text-[#3F4238]">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold mb-8 text-[#6B705C] text-center">
          Your Profile
        </h1>

        {/* Conditional rendering: Spinner or Profile Content */}
        {loading ? (
          <p className="text-[#3F4238] text-lg text-center">Loading...</p>
        ) : userData && userData._id ? (
          <>
            {/* 📝 Editable Form */}
            <div className="mb-10">
              <UserForm
                userData={userData}
                setUserData={setUserData}
                handleSaveChanges={handleSaveChanges}
                handleDeleteUser={handleDeleteUser}
                changed={changed}
                setChanged={setChanged}
              />
            </div>

            {/* 📦 Purchase Records */}
            <div className="mb-10">
              <Purchase
                userPurchases={purchaseData}
                PurchaseProductDetail={detailedPurchaseProducts}
              />
            </div>

            {/* 📜 Browsing History */}
            <div className="mb-10">
              <HistoryBuys userID={userID} userHistory={userHistory} />
            </div>
          </>
        ) : (
          <p className="text-[#B98B73] text-lg text-center">User not found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
