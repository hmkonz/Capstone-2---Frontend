import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./CartCard.css";
import { CartContext } from "../context/CartContext";

function CartCard() {
  const [carts, setCarts] = useContext(CartContext);

  let subtotal = carts.reduce(function (prev, current) {
    return prev + +current.product_price;
  }, 0);

  console.log("THis is carts in cartCard", carts);

  return (
    <div className="CartCard">
      <div className="CartCard-container">
        <Link className="CartCard-checkout-link" to="/api/checkout">
          Proceed to Checkout
        </Link>
        <Link className="CartCard-shopping-link" to="/api/products">
          Continue Shopping
        </Link>
        <img
          className="CartCard-image"
          src="/images/recipefordogspic.jpg"
          alt=""
        ></img>
      </div>
      <div id="card">
        <h3 className="CartCard-title"> Cart Items</h3>

        <table id="CartCard-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart, i) => (
              <tr key={i} className="CartCard-table-tr">
                <td>{cart.product_name}</td>
                <td>{cart.quantity}</td>
                <td>${cart.product_price}</td>
              </tr>
            ))}

            <tr></tr>
            <tr></tr>
            <tr>
              <td>Subtotal:</td>
              <td></td>
              <td>${subtotal}</td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>Shipping: </td>
              <td></td>
              <td>Free </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>Tax:</td>
              <td></td>
              <td>${(subtotal * 0.08).toFixed(2)}</td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>Total:</td>
              <td></td>
              <td>${(subtotal * 1.08).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default CartCard;
