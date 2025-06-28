import { useState, useEffect } from "react";
import { PackageCard, SearchFilter } from "../../components/indexComponents.js";

function PackageUser() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceValue, setPriceValue] = useState(10000);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [packageInquiredId, setPackageInquiredId] = useState(null);
  const [userMessages, setUserMessages] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const URL = import.meta.env.VITE_BACK_END_API;
  const minPrice = 100;
  const maxPrice = 10000;

  useEffect(() => {
    setUserName(sessionStorage.getItem("userName") || "");
    setUserEmail(sessionStorage.getItem("userEmail") || "");
    setUserPhoneNumber(sessionStorage.getItem("userPhoneNumber") || "");
  }, []);

  useEffect(() => {
    fetch(`${URL}/api/packages`)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setFilteredPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch packages:", err);
        setLoading(false);
      });
  }, [URL]);

  useEffect(() => {
    const filtered = packages.filter((pkg) => {
      const matchesSearch = pkg.packageName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice = pkg.price <= priceValue;
      return matchesSearch && matchesPrice;
    });

    setFilteredPackages(filtered);
  }, [packages, searchTerm, priceValue]);

  const handleClearFilter = () => {
    setSearchTerm("");
    setPriceValue(maxPrice);
    setShowFilter(false);
  };

  const handleUserMessageChange = (id, message) => {
    setUserMessages((prev) => ({ ...prev, [id]: message }));
  };

  const handleInquiry = (id) => {
    const userMessage = userMessages[id] || "";

    if (!userName || !userEmail) {
      alert("Please log in to send an inquiry.");
      return;
    }
    if (sessionStorage.getItem("isVerified") !== "true") {
      alert("Please verify your email before sending an inquiry.");
      return;
    }
    if (!userMessage.trim()) {
      alert("Please enter a message for your inquiry.");
      return;
    }
    if (userMessage.length > 500 || userMessage.length < 10) {
      alert("Message must be between 10 and 500 characters.");
      return;
    }

    const pkg = packages.find((p) => p._id === id);
    if (pkg) {
      const message = `
<p>Inquiry about <strong>${pkg.packageName}</strong>:</p>
<p>From: <strong>${userName}</strong></p>
<p>Email: <strong>${userEmail}</strong></p>
<p>Phone: <strong>${userPhoneNumber}</strong></p>
<p>Package ID: <strong>${id}</strong></p>
<p>Included Products: ${pkg.items
        .map(
          (i) =>
            `<br>- ${i.productId?.name || "Unknown"} (Qty: ${i.quantity || 1})`
        )
        .join("")}</p>
<p>Price: <strong>₹${pkg.price}</strong></p>
<p>Message: <strong>${userMessage}</strong></p>`;

      fetch(`${URL}/api/users/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id, // you may also call this packageId
          userEmail,
          message,
        }),
      })
        .then(() => {
          setPackageInquiredId(null);
          setUserMessages((prev) => ({ ...prev, [id]: "" }));
          alert("Inquiry sent successfully.");
        })
        .catch((error) => {
          console.error("Inquiry sending error:", error);
          alert("An error occurred while sending the inquiry.");
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F1EB] sm:mt-15">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#DDBEA9] border-b-[#A68A64] border-l-transparent border-r-transparent animate-spin"></div>
            <div className="absolute inset-4 rounded-full bg-[#F8F1EB]"></div>
          </div>
          <p className="text-[#7A5C3E] font-semibold text-lg">
            Loading packages...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFE8D6] min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-[#3F4238]">Our Packages</h1>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

        {showFilter && (
          <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg mb-6">
            <label className="block font-semibold mb-2">Max Price (₹)</label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              className="w-full"
            />
            <p className="text-sm mt-1 text-[#6B705C]">₹{priceValue}</p>
            <button
              onClick={handleClearFilter}
              className="mt-4 px-4 py-2 text-sm bg-[#B5838D] text-white rounded hover:bg-[#6B705C]"
            >
              Clear Filter
            </button>
          </div>
        )}

        <hr className="w-full border-[#D4C7B0] my-6" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              data={pkg}
              productInquired={packageInquiredId === pkg._id}
              setProductInquired={() =>
                setPackageInquiredId((prevId) =>
                  prevId === pkg._id ? null : pkg._id
                )
              }
              handleInquiry={handleInquiry}
              userMessage={userMessages[pkg._id] || ""}
              setUserMessage={(msg) => handleUserMessageChange(pkg._id, msg)}
            />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <p className="mt-8 text-lg text-[#6B705C] font-medium">
            No packages match your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default PackageUser;
