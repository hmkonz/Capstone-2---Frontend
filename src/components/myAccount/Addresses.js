import React, { useContext } from "react";
import "./Addresses.css";
import UserContext from "../../auth/UserContext";
import { Link } from "react-router-dom";

function Addresses() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="myAccount-addresses">
      <div className="myAccount-addresses-container">
        <img
          className="myAccount-addresses-image"
          src="/images/myAccountImage.jpg"
          alt=""
        ></img>
        <p className="myAccount-addresses-welcome-msg">
          The following addresses will be used on the checkout page by default.
        </p>
        <h1 className="myAccount-addresses-billing-title">Billing Address</h1>
        <Link
          className="myAccount-addresses-link-billing"
          exact
          to="/api/account/edit-address/billing"
        >
          Edit
        </Link>
        <p className="myAccount-addresses-name">
          {currentUser.firstName || currentUser.email}
        </p>
        <h1 className="myAccount-addresses-shipping-title">Shipping Address</h1>
        <Link
          className="myAccount-addresses-link-shipping"
          exact
          to="/api/account/edit-address/shipping"
        >
          Add
        </Link>
        <p className="myAccount-addresses-shipping-msg">
          You have not set up this type of address yet.
        </p>
        <br></br>
        <br></br>

        <ul className="myAccount-addresses-dashboard-links">
          <li>
            <Link
              className="myAccount-addresses-link-acct"
              exact
              to="/api/account"
            >
              Dashboard
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-addresses-link-orders"
              exact
              to="/api/account/orders"
            >
              Orders
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-addresses-link-addresses"
              exact
              to="/api/account/edit-address"
            >
              Addresses
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-addresses-link-payments"
              exact
              to="/account/payments"
            >
              Payment Methods
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-addresses-link-details"
              exact
              to="/account/details"
            >
              Account Details
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-addresses-link-logout"
              exact
              to="/logout"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Addresses;
