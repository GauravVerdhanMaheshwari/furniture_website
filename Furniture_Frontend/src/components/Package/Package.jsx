import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Admin-side Package Card Component
 * @param {Object} props
 * @param {Object} props.packages - Package details
 * @param {Function} props.onDelete - Function to handle package deletion
 */
function Packages({ packages, onDelete }) {
  const { _id, packageName, price, items = [] } = packages;
  const [showConfirm, setShowConfirm] = useState(false);
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";
  const [productDetails, setProductDetails] = useState({}); // cache by productId

  // Fetch missing product info
  useEffect(() => {
    items.forEach((item) => {
      const pid = item.productId._id || item.productId;
      if (!productDetails[pid] || !productDetails[pid].images) {
        fetch(`${URL}/api/owner/product/${pid}`)
          .then((res) => res.json())
          .then((data) =>
            setProductDetails((prev) => ({
              ...prev,
              [pid]: data,
            }))
          )
          .catch(console.error);
      }
    });
  }, [items, URL, productDetails]);

  const handleConfirmDelete = () => {
    onDelete(_id);
    setShowConfirm(false);
  };

  return (
    <div className="relative bg-[#DDBEA9] rounded-xl shadow-md w-full sm:w-64 p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Package Info */}
      <div className="flex flex-col gap-1 mb-3">
        <h2 className="text-lg font-bold text-[#3F4238] truncate">
          {packageName}
        </h2>
        <p className="text-[#6B705C] font-medium">₹{price}</p>
        <p className="text-sm text-[#6B705C] italic">
          {items.length} item{items.length !== 1 ? "s" : ""} included
        </p>
      </div>

      <hr className="my-2 border-[#B7B7A4]" />

      {/* Items list with details */}
      <ul className="text-sm text-[#3F4238] list-none space-y-2 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-[#B7B7A4]">
        {items.map((item, idx) => {
          const pid = item.productId._id || item.productId;
          const prod = productDetails[pid] || item.productId;
          const img = prod.images?.[0] || "/no-img.png";
          const name = prod.name || "Unknown";
          const pr = prod.price || 0;
          return (
            <li key={idx} className="flex gap-2 items-center">
              <img
                src={img}
                alt={name}
                className="w-10 h-10 rounded object-cover border"
              />
              <div className="flex flex-col truncate">
                <span className="font-medium truncate">{name}</span>
                <span className="text-xs text-[#6B705C] truncate">
                  ₹{pr} × {item.quantity}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Edit/Delete buttons */}
      <div className="mt-4 space-y-2">
        <Link
          to={`/admin/edit-package/${_id}`}
          className="block bg-[#6B705C] text-white text-center py-2 rounded-md hover:bg-[#3F4238] transition"
        >
          Edit Package
        </Link>

        <button
          onClick={() => setShowConfirm(true)}
          className="block bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition w-full"
        >
          Delete Package
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <div className="bg-white p-4 rounded-md shadow-md w-64">
            <p className="text-sm text-center mb-4">
              Delete <strong>{packageName}</strong>?
            </p>
            <div className="flex justify-between gap-3">
              <button
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm w-full"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm w-full"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Packages;
