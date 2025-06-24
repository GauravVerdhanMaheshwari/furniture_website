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

  const handleConfirmDelete = () => {
    onDelete(_id);
    setShowConfirm(false);
  };

  return (
    <div className="relative bg-[#DDBEA9] rounded-xl shadow-md w-full sm:w-64 p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Package Preview */}
      <div className="flex flex-col gap-1 mb-3">
        <h2 className="text-lg font-bold text-[#3F4238] truncate">
          {packageName}
          {console.log("Package", packages)}
        </h2>
        <p className="text-[#6B705C] font-medium">₹{price}</p>
        <p className="text-sm text-[#6B705C] italic">
          {items.length} item{items.length !== 1 ? "s" : ""} included
        </p>
      </div>

      <hr className="my-2 border-[#B7B7A4]" />

      {/* Items list */}
      <ul className="text-sm text-[#3F4238] list-none space-y-2 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-[#B7B7A4]">
        {items.map((item, idx) => {
          const product = item.productId;
          return (
            <li key={idx} className="flex gap-2 items-center">
              <img
                src={product?.images?.[0] || "/no-img.png"}
                alt={product?.name || "Item"}
                className="w-10 h-10 rounded object-cover border"
              />
              <div className="flex flex-col">
                <span className="font-medium truncate">
                  {product?.name || "Unknown"}
                </span>
                <span className="text-xs text-[#6B705C]">
                  ₹{product?.price || "0"} × {item.quantity}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Admin Action Buttons */}
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

      {/* Custom Confirm Modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-md p-5 w-60 text-center">
            <p className="text-sm font-medium mb-4">Delete this package?</p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Packages;
