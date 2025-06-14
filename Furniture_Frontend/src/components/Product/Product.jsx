import React from "react";
import { Link } from "react-router-dom"; 

function Product({ product, deleteProduct }) {
  return (
    <div
      key={product._id}
      className="bg-[#DDBEA9] rounded-lg shadow-lg w-64 p-4 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex gap-2 overflow-x-auto rounded-md">
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`product-${idx}`}
            className="w-40 h-32 object-cover rounded border"
          />
        ))}
      </div>

      <hr className="my-2 border-[#B7B7A4]" />
      <h2 className="text-lg font-semibold text-[#3F4238]">{product.name}</h2>
      <p className="text-[#6B705C] font-medium">₹{product.price}</p>
      <p className={product.inStock ? "text-green-600" : "text-red-600"}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <p className="text-[#A5A58D]">Stock: {product.stock}</p>

      <div className="mt-4 space-y-2">
        <Link
          to={`/admin/edit-product/${product._id}`}
          className="block bg-[#6B705C] text-white text-center py-2 rounded hover:bg-[#3F4238] transition"
        >
          Edit Product
        </Link>
        <button
          onClick={() => deleteProduct(product._id)}
          className="block bg-red-500 text-white text-center py-2 rounded hover:bg-red-600 transition w-full"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}

export default Product;
