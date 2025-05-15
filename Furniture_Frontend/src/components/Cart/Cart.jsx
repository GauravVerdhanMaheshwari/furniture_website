import React from "react";
import CartContext from "../../context/CartContext";

function Cart() {
  const { cart } = React.useContext(CartContext);
  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log("Cart items:", cart);
    }, 10000);
    return () => clearInterval(interval); // Cleanup
  }, [cart]);

  return (
    <div className="mt-25">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart
          .filter((item) => item.quantity > 0)
          .map((item) => (
            <div key={item.id} className="flex flex-row justify-between items-center my-auto">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>Price: ₹ {item.price}</p>
              <div>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() => {
                    // Handle increment logic here
                  }}
                  className="increment-button"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    // Handle decrement logic here
                  }}
                  className="decrement-button"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    // Handle remove from cart logic here
                  }}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default Cart;
