import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import JustRealFoodApi from "../../api/api";
import CartCard from "./CartCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../../auth/UserContext";

/** Retrieves the carts of a user with cart.user_id
 *
 * On mount, retrieves a user's carts
 *
 * This is routed to at /api/cart/:user_id
 *
 * Carts renders -> { CartCard }
 */

function Cart() {
  // initialize piece of state 'carts' to an empty array
  const [carts, setCarts] = useState([]);

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);
  console.log("THis is currentUser in Carts.js", currentUser);

  // useEffect will make an API call only once when component is rendered and gets a user's carts
  // useEffect(
  //   function getCartOnRender() {
  //     getUserCart();
  //   },
  //   [getUserCart, currentUser.id]
  // );

  // useEffect will make an API call everytime currentUser.id changes in the params. Reloads the details of the carts
  useEffect(() => {
    async function getUserCart() {
      let results = await JustRealFoodApi.getUserCarts(currentUser.id);
      return results;
    }

    getUserCart()
      .then((cartResult) => {
        setCarts(cartResult);
      })
      .catch((err) => {
        console.error(`Error in Carts/getUserCart: ${err}`);
      });
  }, [currentUser.id]);

  /** the getUserCart function is executed once when component is rendered **/
  // async function getUserCart() {
  //   // retrieve carts of user
  //   let userCarts = await JustRealFoodApi.getUserCart(currentUser.id);
  //   // update piece of state 'carts' with the results of the API call
  //   setCarts(userCarts);
  // }

  // while carts are being retrieved from the API, show the laoding spinner
  if (!carts) {
    return <LoadingSpinner />;
  }
  console.log("THis is piece of state carts in Carts.js", carts);

  return (
    <div className="CartList col-md-8 offset-md-2">
      {carts.length ? (
        <CartCard carts={carts} />
      ) : (
        <div className="CartList-message">
          <p className="CartList-message2">Your cart is empty</p>
          <Link className="CartList-browse-link" to="/api/products">
            Browse Products
          </Link>
        </div>
      )}
    </div>
    // <div className="CartList-list">
    //   {/* map over piece of state 'carts' and for every cart, render the CartCard component with id, product_name, Product_quantity, Product_price and user_id passed in as props  */}
    //   {carts.map((cart) => (
    //     <CartCard
    //       id={cart.id}
    //       product_name={cart.product_name}
    //       product_quantity={cart.product_quantity}
    //       productPrice={cart.product_price}
    //       userId={cart.user_id}
    //       product_id={cart.product_id}
    //     />
    //   ))}
    // </div>
    // <div className="cart-message">
    //   <Link className="carts-return-link" to="/api/products">
    //     Continue Shopping
    //   </Link>
    // </div>
    //   )}
    // </div>
  );
}
export default Cart;
