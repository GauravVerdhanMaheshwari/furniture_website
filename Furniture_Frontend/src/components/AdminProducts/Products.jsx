import React from "react";

function Products({ products }) {
  return (
    <div className="flex flex-row p-4 flex-wrap justify-center m-2 gap-16">
      {products.map((product) => (
        <div key={product.id} className="border p-4 mb-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="font-bold">₹{product.price}</p>
          <p>Stock: {product.stock}</p>
          <p className="text-gray-500">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-32 h-32 object-cover mt-2"
          />
          <p className="text-gray-500">Company: {product.company}</p>
          <div className="flex flex-col mt-2">
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
              Edit
            </button>
            <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
