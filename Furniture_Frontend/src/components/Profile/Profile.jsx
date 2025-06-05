import { useEffect, useState } from "react";
import UserForm from "./UserForm/UserForm";
import HistoryBuys from "./UserForm/HistoryBuys";
import Purchase from "./UserForm/Purchase";
import { useSelector } from "react-redux";

function Profile() {
  const userID = useSelector((state) => state.user.userID);
  const [userData, setUserData] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [detailedPurchaseProducts, setDetailedPurchaseProducts] = useState([]);
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
    if (
      confirm(
        "Are you sure you want to delete your account? This act will not be undo-able."
      )
    ) {
      fetch(`http://localhost:3000/api/users/${userID}`, {
        method: "DELETE",
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
          console.log("User deleted successfully:", data);
          alert("Your account has been deleted successfully.");
          location.reload();
        })
        .catch((error) => {
          console.error(
            "There was a problem with the delete operation:",
            error
          );
        });
    }
  };

  useEffect(() => {
    // Fetching user data
    fetch(`http://localhost:3000/api/users/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("User fetch error:", error));

    // Fetching user history
    if (userID) {
      fetch(`http://localhost:3000/api/history/user/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("History fetch failed");
          return res.json();
        })
        .then((data) => {
          setUserHistory(Array.isArray(data) ? data : [data]);
        })
        .catch((error) => console.error("History fetch error:", error));
    }

    // Fetching purchases and product details
    if (userID) {
      fetch(`http://localhost:3000/api/purchases/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Purchase fetch failed");
          return res.json();
        })
        .then(async (data) => {
          const purchasesArray = Array.isArray(data) ? data : [data];
          setPurchaseData(purchasesArray);

          const allProductDetails = [];

          for (const purchase of purchasesArray) {
            for (const item of purchase.items) {
              try {
                const res = await fetch(
                  `http://localhost:3000/api/products/${item.productId}`
                );
                const product = await res.json();
                allProductDetails.push({
                  ...product,
                  quantity: item.quantity,
                  purchaseDate: item.purchaseDate,
                });
              } catch (error) {
                console.error("Failed to fetch product details:", error);
              }
            }
          }

          setDetailedPurchaseProducts(allProductDetails);
          setLoading(false);
        })
        .catch((error) => console.error("Purchase fetch error:", error));
    }
  }, [userID]);

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
          <Purchase
            userPurchases={purchaseData}
            PurchaseProductDetail={detailedPurchaseProducts}
          />
          <HistoryBuys userID={userID} userHistory={userHistory} />
        </div>
      ) : (
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
}

export default Profile;
