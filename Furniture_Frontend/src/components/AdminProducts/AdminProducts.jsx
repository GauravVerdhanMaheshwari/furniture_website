import React from "react";
import Products from "./Products";

function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  fetch("http://localhost:3000/api/owner/furniture")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return (
    <div className="flex flex-col mt-25 items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-row items-center justify-between w-full p-4 bg-white shadow-md rounded-xl">
          <div className="flex items-center m-4">
            <h1>Filter by product</h1>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-300 rounded p-2"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-100 mt-4">
        {loading ? (
          <p className="text-gray-500 text-3xl">Loading...</p>
        ) : (
          <Products products={products} />
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
