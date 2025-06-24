import React from "react";
import { Link } from "react-router-dom";

/**
 * Admin-side Package Card Component
 * @param {Object} props
 * @param {Object} props.packages - Package details
 * @param {Function} props.onDelete - Function to handle package deletion
 */
function Packages({ packages, onDelete }) {
  const { _id, packageName, price, items = [] } = packages;

  return (
    <div className="bg-[#DDBEA9] rounded-xl shadow-md w-full sm:w-64 p-4 hover:shadow-xl transition-shadow duration-300">
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

      {/* Product List */}
      <ul className="text-sm text-[#3F4238] list-disc ml-5 space-y-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-[#B7B7A4]">
        {items.map((item, idx) => (
          <li key={idx}>
            {item.productId?.name || "Unknown Product"} × {item.quantity}
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        <Link
          to={`/admin/edit-package/${_id}`}
          className="block bg-[#6B705C] text-white text-center py-2 rounded-md hover:bg-[#3F4238] transition"
        >
          Edit Package
        </Link>
        <button
          onClick={() => onDelete(_id)}
          className="block bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition w-full"
        >
          Delete Package
        </button>
      </div>
    </div>
  );
}

export default Packages;
