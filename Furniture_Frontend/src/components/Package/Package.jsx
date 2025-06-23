import React, { useState } from "react";
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

  return (
    <div className="mt-18 relative bg-[#DDBEA9] rounded-xl shadow-md w-full sm:w-64 p-4 hover:shadow-xl transition-shadow duration-300">
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

      {/* Items list */}
      <ul className="text-sm text-[#3F4238] list-disc ml-5 space-y-1 max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-[#B7B7A4]">
        {items.map((item, idx) => (
          <li key={idx}>
            <span className="font-semibold">
              {item.productId?.name || "Unnamed"}
            </span>
            {item.productId?.price && (
              <span className="text-[#6B705C] text-xs ml-1">
                ₹{item.productId.price}
              </span>
            )}
            {" × "}
            {item.quantity}
          </li>
        ))}
      </ul>

      {/* Buttons */}
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

      {/* 🔐 Confirm Delete Modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <div className="bg-white p-4 rounded-md shadow-md w-64">
            <p className="text-sm mb-4">
              Are you sure you want to delete <strong>{packageName}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  onDelete(_id);
                  setShowConfirm(false);
                }}
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
