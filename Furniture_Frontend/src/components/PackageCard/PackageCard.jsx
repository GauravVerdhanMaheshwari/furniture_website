// components/PackageCard.jsx
import React, { useState, useEffect } from "react";

function PackageCard({ data }) {
  const { _id, packageName, price, items = [] } = data;
  const [productDetails, setProductDetails] = useState({});
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  // Fetch product details
  useEffect(() => {
    items.forEach((item) => {
      const pid = item.productId._id || item.productId;
      if (!productDetails[pid]) {
        fetch(`${URL}/api/owner/product/${pid}`)
          .then((res) => res.json())
          .then((product) =>
            setProductDetails((prev) => ({ ...prev, [pid]: product }))
          )
          .catch(console.error);
      }
    });
  }, [items, URL, productDetails]);

  return (
    <div className="bg-[#DDBEA9] rounded-xl shadow-lg p-4 m-3 w-full sm:w-64 md:w-72 transition-transform hover:scale-105">
      {/* === Package Header === */}
      <h2 className="text-xl font-bold text-[#3F4238] truncate">
        {packageName}
      </h2>
      <p className="text-[#6B705C] text-sm mb-2 italic">
        {items.length} item{items.length !== 1 ? "s" : ""} included
      </p>

      <hr className="border-[#B7B7A4] my-2" />

      {/* === Items List === */}
      <ul className="space-y-2 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-[#B7B7A4] pr-1">
        {items.map((item, index) => {
          const pid = item.productId._id || item.productId;
          const prod = productDetails[pid] || item.productId;
          const name = prod?.name || "Loading...";
          const img = prod?.images?.[0];
          const pr = prod?.price || 0;

          return (
            <li key={index} className="flex gap-2 items-center">
              <img
                src={img}
                alt={name}
                className="w-20 h-20 rounded object-cover border"
              />
              <div className="truncate">
                <p className="text-sm font-medium truncate">{name}</p>
                <p className="text-xs text-[#6B705C]">
                  ₹{pr} × {item.quantity}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* === Total Price === */}
      <p className="text-md text-[#B98B73] font-bold mt-4 text-center">
        ₹ {price}
      </p>
    </div>
  );
}

export default PackageCard;
