import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JustRealFoodApi from "../../api/api";
import UserContext from "../../auth/UserContext";
import AccountDetailsCard from "./AccountDetailsCard";
import { Link } from "react-router-dom";
import "./AccountDetailsForm.css";

/** Account Details editing form.
 *
 * Displays Account Details form and handles changes to piece of state 'formInputData'
 *
 * Confirmation of a successful save is a simple <Alert>
 *
 * Routed as /account/details
 * Routes -> AccountDetailsForm -> Alert
 */

function AccountDetailsForm() {
  // initialize piece of 'state currentUser' to the value of context (defined in App component).context.value={ currentUser, setCurrentUser }
  const { currentUser, setCurrentUser } = useContext(UserContext);
  //initialize piece of state object ‘formInputData’ with key:value pairs. email, firstName, lastName, address and phone are the keys and the values are those associated with a specific user (currentUser)
  const [formInputData, setFormInputData] = useState({
    email: currentUser.email,
    firstNameBilling: currentUser.firstNameBilling,
    lastNameBilling: currentUser.lastNameBilling,
    billingAddress: currentUser.billingAddress,
    firstNameShipping: currentUser.firstNameShipping,
    lastNameShipping: currentUser.lastNameShipping,
    shippingAddress: currentUser.shippingAddress,
    phone: currentUser.phone,
    password: currentUser.password,
    stripeCustomerId: currentUser.stripeCustomerId,
  });

  // Initialize piece of state 'formErrors' (error message if 'signin' function is not successful) to an empty array
  const [formErrors, setFormErrors] = useState([]);

  // initialize piece of state "saveConfirmed" to false
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  // when a user makes a change to any of the form inputs, update piece of state 'formInputData' and clear piece of state 'formErrors'
  const handleChange = (event) => {
    // deconstruct name and value from event.target (inputs in form)
    const { name, value } = event.target;
    // update piece of state 'formInputData' with a new object including everything already in 'formInputData' as well as the name:value pair entered in the form input
    setFormInputData((formInputData) => ({ ...formInputData, [name]: value }));
    // clear piece of state 'formErrors' to an empty array after piece of state 'formInputData' has been updated to include what was changed in the form inputs
    setFormErrors([]);
  };

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(event) {
    event.preventDefault();
    // create 'accountDetailsData' object from what's in piece of state 'formInputData'
    let accountDetailsData = {
      firstNameBilling: formInputData.firstNameBilling,
      lastNameBilling: formInputData.lastNameBilling,
      billingAddress: formInputData.billingAddress,
      firstNameShipping: formInputData.firstNameShipping,
      lastNameShipping: formInputData.lastNameShipping,
      shippingAddress: formInputData.shippingAddress,
      phone: formInputData.phone,
      password: formInputData.password,
      stripeustomerId: formInputData.stripeCustomerId,
    };

    // set 'email' equal to the email in piece of state 'formInputData'. It is not included in 'accountDetailsData' above because 'email' needs to be passed in to saveAccountDetails method on JustRealFoodApi class as a prop (below).
    let email = formInputData.email;

    // declare variable 'updatedUser'
    let updatedUser;

    try {
      // call 'saveAccountDetails' method on JustRealFoodApi class with 'email' (formInputData.email) and 'accountDetailsData' (defined above) passed in as props and the result of the API call is assigned to 'updatedUser'
      updatedUser = await JustRealFoodApi.saveUserAccountDetails(
        email,
        accountDetailsData
      );
      // if there are any errors, update piece of state 'formErrors' with 'errors'
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
    // update piece of state 'formInputData' with what's already in 'formInputData' as well as the cleared 'password' property
    setFormInputData((formInputData) => ({ ...formInputData, password: "" }));
    // reset piece of state 'formErrors' to an empty array
    setFormErrors([]);
    // set piece of state 'saveConfirmed' to true
    setSaveConfirmed(true);

    // update piece of state 'currentUser' with the resulting object of the API call, 'updatedUser'. Since 'currentUser' is included in the 'values' of UserContext.Provider in the App component, 'currentUser' will be updated throughout the site
    setCurrentUser(updatedUser);
  }

  return (
    <div className="Account-Details">
      <div className="account-details-form-container">
        <div className="account-details-title">Account Details</div>
        <img
          className="account-details-form-image"
          src="/images/myAccountImage.jpg"
          alt=""
        ></img>
        <div className="Account-Details-Form">
          <h1 className="account-details-form-subtitle">Edit Account</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="account-details-form-label"
                htmlFor="firstNameBilling"
              >
                Bill to: First Name
              </label>
              <input
                id="account-details-form-firstName-billing"
                type="text"
                name="firstNameBilling"
                value={formInputData.firstNameBilling}
                placeholder="First Name for Billing"
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label
                className="account-details-form-label"
                htmlFor="lastNameBilling"
              >
                Bill to: Last Name
              </label>
              <input
                id="account-details-form-lastName-billing"
                type="text"
                name="lastNameBilling"
                value={formInputData.lastNameBilling}
                placeholder="Last Name for Billing"
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label
                className="account-details-form-label"
                htmlFor="billingAddress"
              >
                Billing Address
              </label>
              <input
                id="account-details-form-address-billing"
                type="text"
                name="billingAddress"
                placeholder="Street, Unit no., City/Town, State, Zipcode"
                value={formInputData.billingAddress}
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label
                className="account-details-form-label"
                htmlFor="firstNameShipping"
              >
                Ship to: First Name
              </label>
              <input
                id="account-details-form-firstName-shipping"
                type="text"
                name="firstNameShipping"
                value={formInputData.firstNameShipping}
                placeholder="First Name for Shipping"
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label
                className="account-details-form-label"
                htmlFor="lastNameShipping"
              >
                Ship to: Last Name
              </label>
              <input
                id="account-details-form-lastName-shipping"
                type="text"
                name="lastNameShipping"
                value={formInputData.lastNameShipping}
                placeholder="Last Name for Shipping"
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label
                className="account-details-form-label"
                htmlFor="shippingAddress"
              >
                Shipping Address
              </label>
              <input
                id="account-details-form-address-shipping"
                type="text"
                name="shippingAddress"
                placeholder="Street, Unit no., City/Town, State, Zipcode"
                value={formInputData.shippingAddress}
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label className="account-details-form-label" htmlFor="phone">
                Phone
              </label>
              <input
                id="account-details-form-phone"
                type="phone"
                name="phone"
                value={formInputData.phone}
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label className="account-details-form-label" htmlFor="email">
                Email
              </label>
              <input
                id="account-details-form-email"
                type="email"
                name="email"
                value={formInputData.email}
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label className="account-details-form-label" htmlFor="password">
                Password
              </label>
              <input
                id="account-details-form-password"
                type="password"
                name="password"
                value={formInputData.password}
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            <div>
              <label
                className="account-details-form-label"
                htmlFor="customerId"
              >
                CustomerId
              </label>
              <input
                id="account-details-form-customerId"
                type="text"
                name="customerId"
                value={formInputData.customerId || " "}
                onChange={handleChange}
                style={{ width: "500px", height: "30px" }}
              />
            </div>

            {/* if piece of state 'formErrors' is not an empty array (means there are errors in the 'formErrors' array), render the Alert component with the messages in 'formErrors' passed in as a prop */}
            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            {/* if piece of state 'saveConfirmed' is true, render the Alert component with messages "Updated successfully" passed in  */}
            {saveConfirmed ? (
              <Alert type="success" messages={["Updated successfully!"]} />
            ) : null}

            <button className="account-details-btn">Save Changes</button>
            <br></br>
            <br></br>
          </form>

          <AccountDetailsCard />

          <ul className="account-details-form-dashboard-links">
            <li className="account-details-li-acct">
              <Link
                className="account-details-form-link-acct"
                exact
                to="/api/account"
              >
                Dashboard
              </Link>
            </li>
            <br></br>
            <li>
              <Link
                className="account-details-form-link-orders"
                to={`/api/account/orders/${currentUser.customerId}`}
              >
                Orders
              </Link>
            </li>
            <br></br>
            <li>
              <Link
                className="account-details-form-link-addresses"
                exact
                to="/api/account/edit-address"
              >
                Addresses
              </Link>
            </li>
            <br></br>
            <li>
              <Link
                className="account-details-form-link-payments"
                exact
                to="/account/payments"
              >
                Payment Methods
              </Link>
            </li>
            <br></br>
            <li>
              <Link
                className="account-details-form-link-details"
                exact
                to="/api/account/details"
              >
                Account Details
              </Link>
            </li>
            <br></br>
            <li>
              <Link
                className="account-details-form-link-logout"
                exact
                to="/logout"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default AccountDetailsForm;
