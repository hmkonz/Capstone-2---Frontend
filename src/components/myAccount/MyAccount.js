import React, { useContext } from "react";
import "./MyAccount.css";
import UserContext from "../../auth/UserContext";
import { Link } from "react-router-dom";

function MyAccount() {
  const { currentUser } = useContext(UserContext);
  console.log("THis is currentUser in MyAccount.js", currentUser);

  return (
    <div className="MyAccount">
      <div className="myAccount-container">
        <img
          className="myAccount-image"
          src="/images/myAccountImage.jpg"
          alt=""
        ></img>
        <div className="myAccount-title">My Account</div>
        <p className="myAccount-welcome-msg">
          Hello {currentUser.firstName || currentUser.email}!<br></br>
          <br></br>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing <br></br>addresses and edit your password
          and account details.
        </p>
        <br></br>
        <br></br>
        <br></br>

        <ul className="myAccount-dashboard-links">
          <li className="myAccount-li-acct">
            <Link className="myAccount-link-acct" exact to="/api/account">
              Dashboard
            </Link>
          </li>
          <br></br>
          <li>
            <Link className="myAccount-link-orders" to={`/api/account/orders`}>
              Orders
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-link-addresses"
              exact
              to="/api/account/edit-address"
            >
              Addresses
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-link-payments"
              exact
              to="/account/payments"
            >
              Payment Methods
            </Link>
          </li>
          <br></br>
          <li>
            <Link
              className="myAccount-link-details"
              exact
              to="/api/account/details"
            >
              Account Details
            </Link>
          </li>
          <br></br>
          <li>
            <Link className="myAccount-link-logout" exact to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyAccount;
