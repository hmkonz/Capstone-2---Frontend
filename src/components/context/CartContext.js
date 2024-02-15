import React, { useState } from "react";
export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [carts, setCarts] = useState([]);
  return (
    <CartContext.Provider value={[carts, setCarts]}>
      {props.children}
    </CartContext.Provider>
  );
};
