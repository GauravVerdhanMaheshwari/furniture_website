import React from "react";

function CartComponent({ item, updateItemQuantity, handleRemoveItem }) {
  return (
    <li
      key={item.productId._id}
      className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b pb-4 border-[#B7B7A4]"
    >
      <img
        src={item.productId.image || "https://picsum.photos/200/300"}
        alt={item.productId.name}
        onError={(e) => {
          e.target.src = "https://picsum.photos/200/300";
        }}
        className="w-32 h-32 object-cover rounded-lg"
      />
      <div className="flex-1">
        <p className="text-xl font-semibold">{item.productId.name}</p>
        <div className="flex items-center space-x-3 mt-2">
          <button
            className="px-2 py-1 bg-[#A5A58D] text-white rounded hover:bg-[#6B705C]"
            onClick={() => updateItemQuantity(item.productId._id, -1)}
          >
            −
          </button>
          <span className="text-lg">{item.quantity}</span>
          <button
            className="px-2 py-1 bg-[#A5A58D] text-white rounded hover:bg-[#6B705C]"
            onClick={() => updateItemQuantity(item.productId._id, 1)}
          >
            +
          </button>
          <button
            className="ml-4 px-3 py-1 bg-[#B98B73] text-white rounded hover:bg-[#CB997E]"
            onClick={() => handleRemoveItem(item.productId._id)}
          >
            Remove
          </button>
        </div>
        <p className="mt-2">Price: ₹{item.productId.price * item.quantity}</p>
      </div>
    </li>
  );
}

export default CartComponent;
