import React, { use } from "react";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  fetch("http://localhost:3000/api/owner/furniture")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch(
      (error) => {
        console.error("Error fetching data:", error);
      },
      [searchTerm]
    );

  return (
    <div className="flex flex-col mt-25 items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-row items-center justify-between w-fit p-4 bg-white shadow-md rounded-xl">
          <div className="flex items-center w-full sm:w-auto">
            <img
              src="search.webp"
              alt="search"
              className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer ml-2"
              onClick={() => document.getElementById("search").focus()}
            />
            <input
              type="text"
              id="search"
              value={searchTerm}
              placeholder="Search for product"
              className="border-2 border-gray-300 rounded-lg py-1 px-2 w-full sm:w-[200px] ml-2 focus:outline-none text-sm sm:text-base"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center ml-4">
            <Link
              to="/admin/add-product"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-4 flex-wrap justify-center m-2 gap-16">
        {loading ? (
          <p className="text-gray-500 text-3xl">Loading...</p>
        ) : (
          products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 m-2 w-64"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-gray-500">{product.description}</p>
                <Link
                  to={`/admin/edit-product/${product.id}`}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block text-center"
                >
                  Edit Product
                </Link>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
