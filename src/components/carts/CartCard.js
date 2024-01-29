import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import "./CartCard.css";

function CartCard({ cartData }) {
  //   cartId,
  //   productId,
  //   productName,
  //   productQuantity,
  //   productPrice,
  //   userId,
  // }) {

  // deconstruct 'cardId', 'productId', 'productName', 'productQuantity' and 'userId' from piece of state 'cartData' in ProductDetail file
  const { cartId, productName, productQuantity, productPrice, userId } =
    cartData;

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);

  let subtotal = cartData.reduce(function (prev, current) {
    return prev + +current.productPrice;
  }, 0);

  const Rows = (props) => {
    const { productname, productquantity, productprice } = props;
    return (
      <tr className="CartCard-Rows">
        <td>{productName}</td>
        <td>{productQuantity}</td>
        <td>{productPrice}</td>
      </tr>
    );
  };

  const Table = (props) => {
    const { data } = props;
    return (
      <table>
        <tbody>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {data.map((row) => (
            <Rows
              key={row.id}
              productname={row.productname}
              quantity={row.productquantity}
              price={row.productprice}
            />
          ))}

          <tr></tr>
          <tr></tr>
          <tr>
            <td>Subtotal:</td>
            <td></td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td></td>
            <td>Free Shipping</td>
            <td>Shipping to: {currentUser.shippingAddress}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td></td>
            <td>${(subtotal * 0.08).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td></td>
            <td>${(subtotal * 1.08).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  return (
    <div className="CartCard">
      <div className="CartCard-container">
        <img
          className="CartCard-image"
          src="/images/recipefordogspic.jpg"
          alt=""
        ></img>

        <div className="card">
          <h1 className="CartCard-title">Shopping Cart </h1>
          <h5 className="CartCard-id">Cart Id: {cartId}</h5>
          <h5 className="myAccount-orders-customerId">Customer Id: {userId}</h5>
          <Table data={cartData} />
          <br></br>
          <br></br>
          <br></br>
        </div>
        {/* <table id="CartCard-table">
            <tbody>
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
              <tr></tr>
              <tr></tr>
              <tr>
                <th>Cart totals</th>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr>
                <td>Subtotal:</td>
                <td></td>
                <td>${productPrice * productQuantity}</td>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr>
                <td>
                  Free Shipping! Shipping to: {currentUser.shippingAddress}
                </td>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr>
                <td> Tax: ${(subtotal * 0.08).toFixed(2)}</td>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr>
                <td> Total: ${(subtotal * 1.08).toFixed(2)}</td>
              </tr>
            </tbody>
          </table> */}
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
  );
}

export default CartCard;
