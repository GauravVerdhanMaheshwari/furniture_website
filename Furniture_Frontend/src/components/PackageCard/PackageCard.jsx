// components/PackageCard.jsx
import React, { useEffect, useState } from "react";

/**
 * PackageCard Component
 * @description Displays a furniture package with its name, price, and detailed list of products with their image and quantity.
 */
function PackageCard({ data }) {
  const URL = import.meta.env.VITE_BACK_END_API;
  const { packageName, price, items = [] } = data;
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const results = await Promise.all(
          items.map((item) =>
            fetch(`${URL}/api/product/${item.productId}`)
              .then((res) => res.json())
              .then((product) => ({ ...product, quantity: item.quantity }))
              .catch(() => null)
          )
        );
        setProductDetails(results.filter((p) => p !== null));
      } catch (err) {
        console.error("Failed to fetch product details for package:", err);
      }
    };

    fetchDetails();
  }, [URL, items]);

  return (
    <div className="bg-[#DDBEA9] shadow-lg rounded-xl p-4 w-full sm:w-64 md:w-72 m-3 transform transition-transform hover:scale-105">
      <h2 className="text-lg md:text-xl font-semibold text-[#3F4238] mb-2 text-center">
        {packageName}
      </h2>

      <p className="text-md text-[#B98B73] font-bold mb-4 text-center">
        ₹ {price}
      </p>

      <div className="space-y-3">
        {productDetails.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-2 flex items-center gap-2"
          >
            <img
              src={
                product.images?.[0] || product.imageURL || "/fallback-image.jpg"
              }
              alt={product.name}
              className="h-16 w-16 object-cover rounded"
              onError={(e) => {
                e.target.src = "/fallback-image.jpg";
              }}
            />

            <div className="flex-1">
              <h3 className="font-medium text-[#3F4238] text-sm">
                {product.name}
              </h3>
              <p className="text-xs text-[#6B705C]">Qty: {product.quantity}</p>
              <p className="text-xs text-[#6B705C]">
                Size: {product.size?.height}H x {product.size?.width}W x{" "}
                {product.size?.depth}D
              </p>
              <p className="text-xs text-[#A5A58D]">₹ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackageCard;
