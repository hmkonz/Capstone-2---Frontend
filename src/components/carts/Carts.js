import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import JustRealFoodApi from "../../api/api";
import CartCard from "./CartCard";
import "./CartCard.css";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../../auth/UserContext";

/** Creates a cart
 *
 * On mount, creates a cart
 *
 * This is routed to at /api/carts
 *
 * Carts renders -> { CartCard }
 */

function Cart() {
  // initialize piece of state 'carts' to an empty array
  const [cart, setCart] = useState([]);

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);
  console.log("THis is currentUser in Carts.js", currentUser);

  // useEffect will make an API call only once when component is rendered and creates a cart
  useEffect(function createCartOnRender() {
    createCart();
  }, []);

  /** the createCart function is executed once when component is rendered **/
  async function createCart() {
    // retrieve carts from API
    let cart = await JustRealFoodApi.createCart();
    console.log(cart);

    // update piece of state 'carts' with the results of the API call
    setCart(cart);
  }
  // while carts are being retrieved from the API, show the laoding spinner
  if (!cart) {
    return <LoadingSpinner />;
  }

  return (
    <div className="CartList col-md-8 offset-md-2">
      {cart.length ? (
        <div className="CartList-list">
          {/* map over piece of state 'carts' and for every cart, render the CartCard component with cartId, productName, ProductQuantity, ProductPrice and customerId passed in as props  */}
          {/* {carts.map((cart) => ( */}
          <CartCard
            cartId={cart.CartId}
            productId={cart.productId}
            productQuantity={cart.productQuantity}
            productPrice={cart.productPrice}
            userId={cart.userid}
          />
          {/* ))} */}
        </div>
      ) : (
        <div className="cart-message">
          <Link className="carts-return-link" to="/api/products">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
export default Cart;
