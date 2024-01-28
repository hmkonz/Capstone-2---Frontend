import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import "./AccountDetailsCard.css";

function AccountDetailsCard() {
  // initialize piece of 'state currentUser' to the value of context (defined in App component).context.value={ currentUser, setCurrentUser }
  const { currentUser } = useContext(UserContext);

  return (
    <div className="MyAccount-orders">
      <div className="myAccount-orders-container">
        <div className="myAccount-orders-title">My Account</div>
        <img
          className="myAccount-orders-image"
          src="/images/myAccountImage.jpg"
          alt=""
        ></img>

        <div className="card">
          <h1 className="account-details-title">Billing Details</h1>
          <h5 className="account-details-name">
            Name: {currentUser.firstNameBilling} + {currentUser.lastNameBilling}
          </h5>
          <h5 className="account-details-address-billing">
            Address: {currentUser.addressBilling}
          </h5>
          <h5 className="account-details-phone">Phone: {currentUser.phone}</h5>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <Link
          className="account-details-to-form-link"
          to={`/api/account/details/form}`}
        >
          Edit Details
        </Link>

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

export default AccountDetailsCard;
