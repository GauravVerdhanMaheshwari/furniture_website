import React, { useEffect } from "react";
import { useParams } from "react-router";

function AdminEditProduct() {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }
  const URL = import.meta.env.VITE_BACK_END_API || "http://localhost:3000";

  const id = useParams().id;
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    let updatedProduct = { ...product };

    if (product.image instanceof File) {
      const base64Image = await convertToBase64(product.image);
      updatedProduct.image = base64Image;
    }

    fetch(`${URL}/api/owner/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Product updated successfully:", data);
        alert("Product updated successfully");
        location.href = "/admin/products";
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Error updating product");
      });
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  useEffect(() => {
    fetch(`${URL}/api/owner/product/${id}`, {
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
        data.isNew = data.isNew || data.new || false;
        delete data.new;
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-[#FFE8D6]">
      <p className="text-[#6B705C] text-3xl">Loading...</p>
    </div>
  ) : product ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE8D6] mt-25">
      <form onSubmit={handleSaveChanges}>
        <div className="flex flex-col items-center justify-center bg-[#FFF] shadow-md rounded-xl p-6 w-full max-w-md border border-[#D4C7B0]">
          <h2 className="text-2xl font-bold mb-4 text-[#3F4238]">
            Edit Product
          </h2>

          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Product Name"
            required
            className="border border-[#B7B7A4] bg-[#FFF] text-[#3F4238] rounded-lg py-2 px-3 w-full mb-4"
          />

          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Product Description"
            required
            className="border border-[#B7B7A4] bg-[#FFF] text-[#3F4238] rounded-lg py-2 px-3 w-full mb-4"
          />

          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            placeholder="Product Price"
            required
            className="border border-[#B7B7A4] bg-[#FFF] text-[#3F4238] rounded-lg py-2 px-3 w-full mb-4"
          />

          <select
            value={product.inStock ? "Yes" : "No"}
            onChange={(e) =>
              setProduct({ ...product, inStock: e.target.value === "Yes" })
            }
            className="border border-[#B7B7A4] bg-[#FFF] text-[#3F4238] rounded-lg py-2 px-3 w-full mb-4"
          >
            <option value="Yes">In Stock</option>
            <option value="No">Out of Stock</option>
          </select>

          <input
            type="number"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: Number(e.target.value) })
            }
            placeholder="Stock Quantity"
            required
            className="border border-[#B7B7A4] bg-[#FFF] text-[#3F4238] rounded-lg py-2 px-3 w-full mb-4"
          />

          <input
            type="file"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
            className="border border-[#B7B7A4] bg-[#FFF] text-[#3F4238] rounded-lg py-2 px-3 w-full mb-4"
          />

          <div className="flex items-center mb-4 w-full">
            <label className="mr-2 text-[#3F4238]">Hot</label>
            <input
              type="checkbox"
              checked={product.hot}
              onChange={(e) =>
                setProduct({ ...product, hot: e.target.checked })
              }
              className="ml-2"
            />
          </div>

          <div className="flex items-center mb-4 w-full">
            <label className="mr-2 text-[#3F4238]">New</label>
            <input
              type="checkbox"
              checked={product.isNew}
              onChange={(e) =>
                setProduct({ ...product, isNew: e.target.checked })
              }
              className="ml-2"
            />
          </div>

          <div className="flex items-center mb-4 w-full">
            <label className="mr-2 text-[#3F4238]">Package</label>
            <input
              type="checkbox"
              checked={product.package}
              onChange={(e) =>
                setProduct({ ...product, package: e.target.checked })
              }
              className="ml-2"
            />
          </div>

          {product.package && (
            <input
              type="text"
              value={product.packageName || ""}
              onChange={(e) =>
                setProduct({ ...product, packageName: e.target.value })
              }
              placeholder="Package Name"
              className="border border-[#B7B7A4] bg-[#FFF] text-[#3F4238] rounded-lg py-2 px-3 w-full mb-4"
              required
            />
          )}

          <button
            type="submit"
            className="bg-[#6B705C] text-white px-4 py-2 rounded hover:bg-[#3F4238] transition w-full"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-[#FFE8D6]">
      <p className="text-[#6B705C] text-3xl">Product not found</p>
    </div>
  );
}

export default AdminEditProduct;
