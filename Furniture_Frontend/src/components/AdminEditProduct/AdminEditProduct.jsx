import React from "react";
import { useParams } from "react-router";

function AdminEditProduct() {
  const id = useParams().id;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-25">
      <h1>Edit Product {id}</h1>
    </div>
  );
}

export default AdminEditProduct;
