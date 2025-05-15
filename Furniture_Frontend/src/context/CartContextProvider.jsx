import React from "react";
import CartContext from "./CartContext";

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
