import React from "react";
import { Link } from "react-router-dom";

function Product({ product, deleteProduct }) {
  return (
    <div
      key={product._id}
      className="bg-[#DDBEA9] rounded-xl shadow-md w-full sm:w-64 p-4 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Product Image Carousel */}
      <div className="flex gap-2 overflow-x-auto rounded-md scrollbar-thin scrollbar-thumb-[#B7B7A4] mb-3">
        {product.images?.length > 0 ? (
          product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product ${idx}`}
              className="w-40 h-32 object-cover rounded border"
            />
          ))
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="No preview"
            className="w-40 h-32 object-cover rounded border"
          />
        )}
      </div>

      {/* Divider */}
      <hr className="my-2 border-[#B7B7A4]" />

      {/* Product Info */}
      <h2 className="text-lg font-bold text-[#3F4238] truncate">
        {product.name}
      </h2>
      <p className="text-[#6B705C] font-medium">₹{product.price}</p>
      <p
        className={`font-semibold ${
          product.inStock ? "text-green-600" : "text-red-600"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <p className="text-sm text-[#A5A58D]">Available: {product.stock}</p>

      {/* Admin Actions */}
      <div className="mt-4 space-y-2">
        <Link
          to={`/admin/edit-product/${product._id}`}
          className="block bg-[#6B705C] text-white text-center py-2 rounded-md hover:bg-[#3F4238] transition"
        >
          Edit Product
        </Link>
        <button
          onClick={() => deleteProduct(product._id)}
          className="block bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition w-full"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}

export default Product;
