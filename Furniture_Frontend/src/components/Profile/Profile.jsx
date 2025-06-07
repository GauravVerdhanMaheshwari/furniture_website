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
  const [historyEmpty, setHistoryEmpty] = useState(false);
  const [purchaseEmpty, setPurchaseEmpty] = useState(false);

  useEffect(() => {
    if (!userID) return;

    const fetchData = async () => {
      try {
        const [userRes, historyRes, purchaseRes] = await Promise.all([
          fetch(`http://localhost:3000/api/users/${userID}`),
          fetch(`http://localhost:3000/api/history/user/${userID}`),
          fetch(`http://localhost:3000/api/purchases/${userID}`),
        ]);

        if (!userRes.ok) throw new Error("User fetch failed");

        const user = await userRes.json();
        setUserData(user);

        const history = await historyRes.json();
        if (Array.isArray(history) && history.length > 0) {
          setUserHistory(history);
        } else {
          setHistoryEmpty(true);
        }

        const purchases = await purchaseRes.json();
        const purchasesArray = Array.isArray(purchases)
          ? purchases
          : [purchases];

        if (purchasesArray.length > 0) {
          setPurchaseData(purchasesArray);

          const productDetails = [];
          for (const purchase of purchasesArray) {
            for (const item of purchase.items) {
              try {
                const productRes = await fetch(
                  `http://localhost:3000/api/products/${item.productId}`
                );
                if (!productRes.ok) continue;

                const product = await productRes.json();
                productDetails.push({
                  ...product,
                  quantity: item.quantity,
                  purchaseDate: item.purchaseDate,
                });
              } catch (err) {
                console.error("Product fetch error", err);
              }
            }
          }
          setDetailedPurchaseProducts(productDetails);
        } else {
          setPurchaseEmpty(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const handleSaveChanges = async () => {
    if (!userData) return;

    for (const key in userData) {
      if (userData[key] === "") {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    if (!confirm("Are you sure you want to save changes?")) return;

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

      if (!response.ok) throw new Error("Update failed");

      const updatedUser = await response.json();
      setUserData(updatedUser);
      alert("Profile updated successfully.");
      setChanged(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to update profile.");
    }
  };

  const handleDeleteUser = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    )
      return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Delete failed");

      alert("Account deleted successfully.");
      // Optional: redirect or reset redux state here
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete account.");
    }
  };

  if (!isLoggedIn || !userID) {
    return <p className="text-red-500">Please log in to view your profile.</p>;
  }

  return (
    <div className="mt-25 min-h-screen p-4 bg-white justify-center items-center text-center">
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

          {purchaseEmpty ? (
            <div className="my-5 p-4 border rounded-md">
              <h1 className="text-black text-2xl font-bold">Purchase</h1>
              <p className="text-gray-500 text-xl my-4">No purchases found</p>
            </div>
          ) : (
            <Purchase
              userPurchases={purchaseData}
              PurchaseProductDetail={detailedPurchaseProducts}
            />
          )}

          {historyEmpty ? (
            <div className="my-5 p-4 border rounded-md">
              <h1 className="text-black text-2xl font-bold">History</h1>
              <p className="text-gray-500 text-xl my-4">
                No previous bought products found
              </p>
            </div>
          ) : (
            <HistoryBuys userID={userID} userHistory={userHistory} />
          )}
        </>
      ) : (
        <p className="text-red-500">User not found.</p>
      )}
    </div>
  );
}

export default Profile;
