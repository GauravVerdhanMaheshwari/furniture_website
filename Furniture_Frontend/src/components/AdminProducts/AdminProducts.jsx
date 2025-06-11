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
      fetch(
        `https://furniture-website-backend-yubt.onrender.com/api/owner/product/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete product");
          return res.json();
        })
        .then(() => {
          alert("Product deleted successfully");
          setProducts((prev) => prev.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Failed to delete product.");
        });
    }
  };

  React.useEffect(() => {
    fetch(
      "https://furniture-website-backend-yubt.onrender.com/api/owner/product"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFE8D6] py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-white shadow-md rounded-xl p-4">
          <div className="flex items-center w-full sm:w-auto">
            <img
              src="/search.webp"
              alt="search"
              className="w-5 h-5 sm:w-6 sm:h-6 ml-2 cursor-pointer"
              onClick={() => document.getElementById("search").focus()}
            />
            <input
              type="text"
              id="search"
              value={searchTerm}
              placeholder="Search for product"
              className="ml-3 py-1 px-3 border border-[#DDBEA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CB997E] text-sm sm:text-base"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            to="/admin/add-product"
            className="mt-4 sm:mt-0 bg-[#CB997E] hover:bg-[#B98B73] text-white px-4 py-2 rounded transition duration-200"
          >
            Add Product
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {loading ? (
            <p className="text-[#6B705C] text-2xl">Loading...</p>
          ) : (
            products
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
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
                  <h2 className="text-lg font-semibold text-[#3F4238]">
                    {product.name}
                  </h2>
                  <p className="text-[#6B705C] font-medium">₹{product.price}</p>
                  <p
                    className={
                      product.inStock ? "text-green-600" : "text-red-600"
                    }
                  >
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
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
