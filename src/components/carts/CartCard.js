import React from "react";
import { Link } from "react-router-dom";

import "./CartCard.css";

function CartCard({
  cartId,
  productId,
  productName,
  productQuantity,
  productPrice,
  userId,
}) {
  return (
    <div className="CartCard">
      <div className="CartCard-container">
        <div className="CartCard-card">
          <div className="CartCard-title">Shopping Cart</div>
          <h3 className="CartCard-cartId">Cart Id: {cartId}</h3>
          <table id="CartCard-table">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr className="CartCard-product">
              <td>{productName}</td>
              <td>{productQuantity}</td>
              <td>${productPrice}</td>
            </tr>
            <br></br>
            <br></br>
            <tr>
              <td>Subtotal:</td>
              <td></td>
              <td>${productPrice * productQuantity}</td>
            </tr>
          </table>
          <br></br>
          <br></br>
          <br></br>
          <Link className="CartCard-checkout-link" to="/api/checkout">
            Proceed to Checkout
          </Link>
          <Link className="CartCard-shopping-link" to="/api/products">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
