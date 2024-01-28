import React from "react";
import { Link } from "react-router-dom";
import "./OrderCard.css";

function OrderCard({ orders }) {
  const { id, date, productName, quantity, price, paymentMethod, userId } =
    orders;

  console.log(
    "This is deconstructed orders in OrderCard",
    id,
    date,
    productName,
    quantity,
    price,
    paymentMethod,
    userId
  );

  let subtotal = orders.reduce(function (prev, current) {
    return prev + +current.price;
  }, 0);

  const Rows = (props) => {
    const { productname, quantity, price } = props;
    return (
      <tr className="myAccount-orders-product">
        <td>{productname}</td>
        <td>{quantity}</td>
        <td>{price}</td>
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
              quantity={row.quantity}
              price={row.price}
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
          </tr>
          <tr>
            <td>Tax:</td>
            <td></td>
            <td>${(subtotal * 0.08).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Payment Method:</td>
            <td></td>
            <td>{paymentMethod}</td>
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
    <div className="MyAccount-orders">
      <div className="myAccount-orders-container">
        <div className="myAccount-orders-title">My Account - Orders</div>
        <img
          className="myAccount-orders-image"
          src="/images/myAccountImage.jpg"
          alt=""
        ></img>

        <div className="card">
          <h1 className="myAccount-order-details-title">Order Details</h1>
          <h5 className="myAccount-orders-id">Order Number: {id}</h5>
          <h5 className="myAccount-orders-customerId">Customer Id: {userId}</h5>
          <h5 className="myAccount-orders-date">Order date: {date}</h5>
          <Table data={orders} />
          <br></br>
          <br></br>
          <br></br>
        </div>

        <ul className="myAccount-orders-dashboard-links">
          <li>
            <Link
              className="myAccount-orders-link-acct"
              exact
              to="/api/account"
            >
              Dashboard
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-orders-link-orders"
              exact
              to="/api/account/orders"
            >
              Orders
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-orders-link-addresses"
              exact
              to="/api/account/edit-address"
            >
              Addresses
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-orders-link-payments"
              exact
              to="/api/account/payments"
            >
              Payment Methods
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-orders-link-details"
              exact
              to="/api/account/details"
            >
              Account Details
            </Link>
          </li>
          <br></br>
          <li>
            <Link className="myAccount-orders-link-logout" exact to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrderCard;
