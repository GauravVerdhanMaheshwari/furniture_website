// pages/Products.jsx
import { useState, useEffect } from "react";
import {
  FurnitureCard,
  FilterPanel,
  SearchFilter,
} from "../../components/indexComponents.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [priceValue, setPriceValue] = useState(10000);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [productInquired, setProductInquired] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userName, setUserName] = useState(""); // username from session
  const [userEmail, setUserEmail] = useState(""); // user email from session
  const [userPhoneNumber, setUserPhoneNumber] = useState(""); // user phone number from session
  const [inquiryMessage, setInquiryMessage] = useState("");

  const URL = import.meta.env.VITE_BACK_END_API;
  const minPrice = 100;
  const maxPrice = 10000;
  setUserName(sessionStorage.getItem("userName") || "");
  setUserEmail(sessionStorage.getItem("userEmail") || "");
  setUserPhoneNumber(sessionStorage.getItem("userPhoneNumber") || "");

  useEffect(() => {
    fetch(`${URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        const items = data || [];
        setProducts(items);

        const defaultQuantities = {};
        items.forEach((item) => {
          defaultQuantities[item._id] = 1;
        });

        const types = [...new Set(items.map((item) => item.type))];
        if (!types.includes(selectedType)) setSelectedType("");

        setFilteredProducts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [selectedType, URL]);

  useEffect(() => {
    const filtered = products.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || item.type === selectedType;
      const matchesPrice = item.price <= priceValue;
      return matchesSearch && matchesType && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedType, priceValue]);

  const handleClearFilter = () => {
    setPriceValue(maxPrice);
    setSelectedType("");
    setSearchTerm("");
    setShowFilter(false);
  };

  const handleInquiry = (id) => {
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
    if (userMessage.length > 500) {
      alert("Message cannot exceed 500 characters.");
      return;
    }
    if (userMessage.length < 10) {
      alert("Message must be at least 10 characters long.");
      return;
    }
    const product = products.find((item) => item._id === id);
    if (product) {
      setInquiryMessage(
        `Inquiry about ${product.name}:\n\n` +
          `From: <strong>${userName}\n</strong>` +
          `Email: <strong>${userEmail}\n</strong>` +
          `Phone: <strong>${userPhoneNumber}\n</strong>` +
          `Product ID: <strong>${id}\n</strong>` +
          `Description: <strong>${product.description}\n</strong>` +
          `Type: <strong>${product.type}\n</strong>` +
          `Company: <strong>${product.company}\n</strong>` +
          `Price: <strong>$${product.price}\n</strong>` +
          `Dimensions: <strong>${product.size.height} x ${product.size.width} x ${product.size.depth} inches\n</strong>` +
          `<strong>${userMessage}</strong>`
      );
    }
    try {
      console.log("Sending inquiry for product ID:", id);
      fetch(`${URL}/api/user/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          userName: userName,
          userEmail: userEmail,
          message: inquiryMessage,
        }),
      });
    } catch (error) {
      alert("An error occurred while sending the inquiry. Please try again.");
      console.error("Inquiry sending error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F1EB]">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#DDBEA9] border-b-[#A68A64] border-l-transparent border-r-transparent animate-spin"></div>
            <div className="absolute inset-4 rounded-full bg-[#F8F1EB]"></div>
          </div>
          <p className="text-[#7A5C3E] font-semibold text-lg">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFE8D6] min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-[#3F4238]">Our Products</h1>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

        {showFilter && (
          <FilterPanel
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            handleClearFilter={handleClearFilter}
            products={products}
          />
        )}

        <hr className="w-full border-[#D4C7B0] my-6" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <FurnitureCard
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              type={item.type}
              imageURL={item.imageURL}
              company={item.company}
              price={item.price}
              height={item.size.height}
              width={item.size.width}
              depth={item.size.depth}
              images={item.images}
              productInquired={productInquired}
              setProductInquired={setProductInquired}
              handleInquiry={handleInquiry}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-8 text-lg text-[#6B705C] font-medium">
            No products match your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
