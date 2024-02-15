import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartCard from "./CartCard";
import "./Carts.css";
// import UserContext from "../../auth/UserContext";

/** Retrieves the carts of a user with cart.user_id
 *
 * On mount, retrieves a user's carts
 *
 * This is routed to at /api/cart/:user_id
 *
 * Carts renders -> { CartCard }
 */

function Cart() {
  const [carts, setCarts] = useContext(CartContext);
  console.log("THis is piece of state carts in Carts.js", carts);

  return (
    <div className="Carts col-md-8 offset-md-2">
      {carts.length ? (
        <CartCard />
      ) : (
        <div className="Carts-message">
          <p className="Carts-message2">Your cart is empty</p>
          <Link className="Carts-browse-link" to="/api/products">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
export default Cart;
