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

  const userId = useSelector((state) => state.user.userID);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // Load user info from session
  useEffect(() => {
    setUserName(sessionStorage.getItem("userName") || "");
    setUserEmail(sessionStorage.getItem("userEmail") || "");
    setUserPhoneNumber(sessionStorage.getItem("userPhoneNumber") || "");
  }, []);

  // Fetch products on mount or API change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();

        const productList = Array.isArray(data) ? data : data.products || [];
        setProducts(productList);

        if (productList.length === 0) {
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

  const handleInquiry = async (id) => {
    const userMessage = userMessages[id] || "";
    const product = products.find((item) => item._id === id);

    if (!userName || !userEmail)
      return alert("Please log in to send an inquiry.");
    if (sessionStorage.getItem("isVerified") !== "true")
      return alert("Please verify your email.");
    if (!userMessage.trim()) return alert("Please enter your message.");
    if (userMessage.length < 10 || userMessage.length > 500)
      return alert("Message must be 10–500 characters long.");
    if (!product) return alert("Product not found.");

    const message = `
      <p><strong>Inquiry about:</strong> ${product.name}</p>
      <p><strong>From:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Phone:</strong> ${userPhoneNumber}</p>
      <p><strong>Description:</strong> ${product.description}</p>
      <p><strong>Type:</strong> ${product.type}</p>
      <p><strong>Company:</strong> ${product.company}</p>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <p><strong>Dimensions:</strong> ${product.size?.height} x ${product.size?.width} x ${product.size?.depth} in</p>
      <p><strong>Message:</strong> ${userMessage}</p>`;

    try {
      await fetch(`${URL}/api/users/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, userEmail, message }),
      });

      alert("Inquiry sent successfully.");
      setUserMessages((prev) => ({ ...prev, [id]: "" }));
      setProductInquiredId(null);
    } catch (err) {
      console.error("Inquiry error:", err);
      alert("Error sending inquiry.");
    }
  };

  // === UI Blocks ===

  if (loading) {
    return (
      <div className="text-center py-10 bg-[#FFE8D6] text-[#3F4238]">
        <p className="text-lg animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-[#FFE8D6] text-[#6B705C]">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-lg italic">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-[#FFE8D6] px-4 sm:px-6 py-6 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#CB997E] text-center">
        {title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-[1400px]">
        {products.map((product) => (
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
              setProductInquiredId((prev) =>
                prev === product._id ? null : product._id
              )
            }
            handleInquiry={handleInquiry}
            userMessage={userMessages[product._id] || ""}
            setUserMessage={(msg) => handleUserMessageChange(product._id, msg)}
          />
        ))}
      </div>
    </section>
  );
}

export default Suggestions;
