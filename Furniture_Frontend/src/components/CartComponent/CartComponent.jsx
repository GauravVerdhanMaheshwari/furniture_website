import React from "react";

function CartComponent({ item, updateItemQuantity, handleRemoveItem }) {
  const { productId, quantity } = item;
  const { _id, name, price, image } = productId;

  return (
    <li
      key={_id}
      className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b pb-4 border-[#B7B7A4]"
    >
      {/* Product Image */}
      <img
        src={image || "https://picsum.photos/200/300"}
        alt={name}
        onError={(e) => {
          e.target.src = "https://picsum.photos/200/300";
        }}
        className="w-32 h-32 object-cover rounded-lg shadow-sm border border-[#DDBEA9]"
      />

      {/* Product Details and Controls */}
      <div className="flex-1 w-full md:w-auto">
        {/* Product Name */}
        <p className="text-xl font-semibold text-[#3F4238]">{name}</p>

        {/* Quantity Controls */}
        <div className="flex items-center flex-wrap space-x-3 mt-3">
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#A5A58D] text-white text-xl rounded hover:bg-[#6B705C] active:scale-95 transition-all duration-200"
            onClick={() => updateItemQuantity(_id, -1)}
            aria-label="Decrease Quantity"
          >
            −
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#A5A58D] text-white text-xl rounded hover:bg-[#6B705C] active:scale-95 transition-all duration-200"
            onClick={() => updateItemQuantity(_id, 1)}
            aria-label="Increase Quantity"
          >
            +
          </button>

          {/* Remove Button */}
          <button
            className="ml-4 px-4 py-1.5 bg-[#B98B73] text-white text-sm rounded hover:bg-[#CB997E] active:scale-95 transition-all duration-200"
            onClick={() => handleRemoveItem(_id)}
          >
            Remove
          </button>
        </div>

        {/* Price Info */}
        <p className="mt-2 text-[#6B705C] font-medium">
          Price:{" "}
          <span className="text-[#3F4238] font-semibold">
            ₹{price * quantity}
          </span>
        </p>
      </div>
    </li>
  );
}

export default CartComponent;
