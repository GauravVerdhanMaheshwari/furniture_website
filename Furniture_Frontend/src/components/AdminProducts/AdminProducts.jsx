import React from "react";
import { Link } from "react-router-dom";

function AdminProducts() {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:3000/api/owner/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete product");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Product deleted:", data);
          alert("Product deleted successfully");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
        });
    }
  };

  React.useEffect(() => {
    fetch("http://localhost:3000/api/owner/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

      <div className="flex flex-row p-4 flex-wrap justify-center gap-16">
        {loading ? (
          <p className="text-gray-500 text-3xl">Loading...</p>
        ) : (
          products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-3 m-4 w-64"
              >
                <div className="overflow-x-auto flex gap-2 rounded-md">
                  {product.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name}-${idx}`}
                      className="w-40 h-32 object-cover rounded shadow-sm border"
                    />
                  ))}
                </div>

                <hr className="my-2" />
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600">₹{product.price}</p>
                  {product.inStock ? (
                    <p className="text-green-500">In Stock</p>
                  ) : (
                    <p className="text-red-500">Out of Stock</p>
                  )}
                  <p className="text-gray-500">Stock: {product.stock}</p>
                  <div className="flex flex-col mt-4">
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block text-center cursor-pointer"
                    >
                      Edit Product
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 block text-center cursor-pointer"
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
