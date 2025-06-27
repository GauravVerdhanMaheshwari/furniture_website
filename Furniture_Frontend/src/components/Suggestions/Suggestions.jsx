import React, { useEffect, useState } from "react";
import { FurnitureCard } from "../indexComponents.js";
import { useSelector } from "react-redux";

/**
 * Suggestions component fetches and displays furniture products dynamically.
 *
 * @param {string} title - Section heading.
 * @param {string} api - API endpoint to fetch suggested products.
 */
function Suggestions({ title, api }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productInquiredId, setProductInquiredId] = useState(null);
  const [userMessages, setUserMessages] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const userId = useSelector((state) => state.user.userID);

  useEffect(() => {
    setUserName(sessionStorage.getItem("userName") || "");
    setUserEmail(sessionStorage.getItem("userEmail") || "");
    setUserPhoneNumber(sessionStorage.getItem("userPhoneNumber") || "");
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error(`Status ${response.status}`);

        const data = await response.json();
        const productList = Array.isArray(data) ? data : data.products || [];

        setProducts(productList);
        if (productList.length === 0 && data.message) {
          setError(`No products found in "${title}" category`);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [api, title]);

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

    const product = products.find((item) => item._id === id);
    if (product) {
      const message = `
<p>Inquiry about <strong>${product.name}</strong>:</p>
<p>From: <strong>${userName}</strong></p>
<p>Email: <strong>${userEmail}</strong></p>
<p>Phone: <strong>${userPhoneNumber}</strong></p>
<p>Product ID: <strong>${id}</strong></p>
<p>Description: <strong>${product.description}</strong></p>
<p>Type: <strong>${product.type}</strong></p>
<p>Company: <strong>${product.company}</strong></p>
<p>Price: <strong>₹${product.price}</strong></p>
<p>Dimensions: <strong>${product.size?.height} x ${product.size?.width} x ${product.size?.depth} inches</strong></p>
<p>Message: <strong>${userMessage}</strong></p>`;

      fetch(`${URL}/api/users/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          userEmail,
          message,
        }),
      })
        .then(() => {
          setProductInquiredId(null);
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
      <div className="text-center p-6 bg-[#FFE8D6] text-[#3F4238]">
        <p className="text-lg animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-[#FFE8D6] text-[#6B705C]">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-lg italic">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-[#FFE8D6] px-4 py-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CB997E] text-center">
        {title}
      </h1>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {products.length === 0 ? (
          <p className="text-xl font-medium text-[#6B705C]">
            No Products Found
          </p>
        ) : (
          products.map((product) => (
            <FurnitureCard
              key={product._id}
              id={product._id}
              userId={userId}
              name={product.name}
              company={product.company}
              price={product.price}
              description={product.description}
              imageURL={product.images?.[0]}
              images={product.images || []}
              height={product.size?.height}
              width={product.size?.width}
              depth={product.size?.depth}
              type={product.type}
              productInquired={productInquiredId === product._id}
              setProductInquired={() =>
                setProductInquiredId((prevId) =>
                  prevId === product._id ? null : product._id
                )
              }
              handleInquiry={handleInquiry}
              userMessage={userMessages[product._id] || ""}
              setUserMessage={(msg) =>
                handleUserMessageChange(product._id, msg)
              }
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Suggestions;
