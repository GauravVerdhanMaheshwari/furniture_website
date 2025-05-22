import React from "react";

function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  fetch("http://localhost:3000/api/owner/furniture")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return (
    <div className="flex flex-col mt-20 items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Admin Products</h1>
      <div className="mt-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 mb-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
