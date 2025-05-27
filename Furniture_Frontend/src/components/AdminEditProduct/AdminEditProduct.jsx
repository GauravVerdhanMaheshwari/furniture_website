import React, { useEffect } from "react";
import { useParams } from "react-router";

function AdminEditProduct() {
  const id = useParams().id;
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleSaveChanges = (e) => {
    // const date = new Date();
    // const updatedProduct = {
    //   ...product,
    //   updatedAt: date.toISOString(),
    //   image: product.image ? product.image.name : null,
    // };
    // setProduct(updatedProduct);
    fetch(`http://localhost:3000/api/owner/furniture/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Product updated successfully:", data);
        alert("Product updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Error updating product");
      });

    console.log(product);
    e.preventDefault();
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/owner/furniture/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Product data:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-gray-500 text-3xl">Loading...</p>
    </div>
  ) : product ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-25">
      <div key={product._id} className="mb-6 text-gray-600"></div>
      <form action="">
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="Enter product name"
              className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <div className="mb-4 w-full">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                placeholder="Enter price"
                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                In Stock
              </label>
              <select
                value={product.inStock ? "Yes" : "No"}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    inStock: e.target.value === "Yes",
                  })
                }
                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
                placeholder="Enter stock"
                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.files[0] })
                }
                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="hot">Hot</label>
              <input
                type="checkbox"
                id="hot"
                className="ml-4"
                checked={product.hot}
                onChange={(e) =>
                  setProduct({ ...product, hot: e.target.checked })
                }
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="new">New</label>
              <input
                type="checkbox"
                id="new"
                className="ml-4"
                checked={product.new}
                onChange={(e) =>
                  setProduct({ ...product, new: e.target.checked })
                }
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="includeInPackage">Include in Package</label>
              <input
                type="checkbox"
                id="includeInPackage"
                className="ml-4"
                checked={product.package}
                onChange={(e) =>
                  setProduct({ ...product, package: e.target.checked })
                }
              />
            </div>
            {product.package ? (
              <div className="mb-4 w-full">
                <label htmlFor="package">Package</label>
                <input
                  type="text"
                  value={product.packageName}
                  onChange={(e) =>
                    setProduct({ ...product, packageName: e.target.value })
                  }
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                    if (e.target.value === "") {
                      setProduct({
                        ...product,
                        packageName: null,
                        package: false,
                      });
                    }
                  }}
                  placeholder="Enter package name"
                  className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer w-full"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-gray-500 text-3xl">Product not found</p>
    </div>
  );
}

export default AdminEditProduct;
