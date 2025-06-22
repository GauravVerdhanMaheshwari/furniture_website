// components/Product.jsx

import React from "react";
import { Link } from "react-router-dom";

/**
 * Admin-side Product Card Component
 * @param {Object} props
 * @param {Object} props.product - Product details
 * @param {Function} props.deleteProduct - Function to handle product deletion
 */
function Product({ product, deleteProduct }) {
  const { _id, name, price, images = [] } = product;

  return (
    <div className="bg-[#DDBEA9] rounded-xl shadow-md w-full sm:w-64 p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Product Image Gallery */}
      <div className="flex gap-2 overflow-x-auto rounded-md scrollbar-thin scrollbar-thumb-[#B7B7A4] mb-3">
        {images.length > 0 ? (
          images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product Image ${idx + 1}`}
              className="w-40 h-32 object-cover rounded border"
            />
          ))
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="No preview available"
            className="w-40 h-32 object-cover rounded border"
          />
        )}
      </div>

      <hr className="my-2 border-[#B7B7A4]" />

      {/* Product Details */}
      <h2 className="text-lg font-bold text-[#3F4238] truncate">{name}</h2>
      <p className="text-[#6B705C] font-medium">₹{price}</p>

      {/* Admin Action Buttons */}
      <div className="mt-4 space-y-2">
        <Link
          to={`/admin/edit-product/${_id}`}
          className="block bg-[#6B705C] text-white text-center py-2 rounded-md hover:bg-[#3F4238] transition"
        >
          Edit Product
        </Link>

        <button
          onClick={() => deleteProduct(_id)}
          className="block bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition w-full"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}

export default Product;
