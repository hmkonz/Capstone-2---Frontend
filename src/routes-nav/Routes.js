import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Routes.css";

// import components
import Home from "../components/home/Home";
import AdminSigninForm from "../auth/AdminSigninForm";
import SignupAndLoginForms from "../auth/SignupAndLoginForms";
import NewProductList from "../components/products/NewProductList";
import ProductDogOrCatFood from "../components/products/ProductDogOrCatFood";
import NewProductDetail from "../components/products/NewProductDetail";
import Carts from "../components/carts/Carts";
// import CartCard from "../components/carts/CartCard";
import MyAccount from "../components/myAccount/MyAccount";
import Orders from "../components/orders/Orders";
// import Addresses from "../components/myAccount/Addresses";
import AccountDetailsForm from "../components/myAccount/AccountDetailsForm";
import AccountDetailsCard from "../components/myAccount/AccountDetailsCard";
import Cancel from "../components/Cancel";
import Success from "../components/Success";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Some of the site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * signup(), login() methods are passed in as props so can be used in the signup and login routes
 *
 * Visiting a non-existant route results in a friendly message asking user to click one of the links in the navBar
 */

function Routes({ signup, login, adminSignin }) {
  return (
    <div className="Routes">
      <Switch>
        {/* Route renders Home component when path exactly matches "/" */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* Route renders SigninForm component when path exactly matches "/signup" */}
        <Route exact path="/signup">
          <SignupAndLoginForms signup={signup} login={login} />
        </Route>

        {/* Route renders AdminSigninForm component when path exactly matches "/admin" (with 'adminSignin()' defined in App component passed in as a prop) */}
        <Route exact path="/api/auth/admin">
          <AdminSigninForm adminSignin={adminSignin} />
        </Route>

        {/* Route renders ProductList component when path exactly matches "/api/products". User does not have to be logged in */}
        <Route exact path="/api/products">
          <NewProductList />
        </Route>

        {/* Route renders ProductDetail component when path exactly matches "/api/products/:name". User does not have to be logged in */}
        <Route exact path="/api/products/name/:name">
          <NewProductDetail />
        </Route>

        {/* Route renders ProductDogOrCatFood component when path exactly matches "/api/products/category/:category". User does not have to be logged in */}
        <Route exact path="/api/products/category/:category">
          <ProductDogOrCatFood />
        </Route>

        {/* Route renders the Success component when the path exactly matches '/success (used by Stripe to show payment was a success) */}
        <PrivateRoute exact path="/success">
          <Success />
        </PrivateRoute>

        {/* Route renders the Cancel component when the path exactly matches '/cancel (used by Stripe to show payment was cancelled)  */}
        <PrivateRoute exact path="/cancel">
          <Cancel />
        </PrivateRoute>

        {/* Route renders PrivateRoute and MyAccount components when path exactly matches "/api/account" and user is logged in */}
        <PrivateRoute exact path="/api/account">
          <MyAccount />
        </PrivateRoute>

        {/* Route renders PrivateRoute and Orders components when path exactly matches "/api/account/orders" and user is logged in */}
        <PrivateRoute exact path="/api/orders/:userId">
          <Orders />
        </PrivateRoute>

        {/* Route renders PrivateRoute and AccountDetails Form components when path exactly matches "/api/account/details" and user is logged in */}
        <PrivateRoute exact path="/api/account/details/form">
          <AccountDetailsForm />
        </PrivateRoute>

        {/* Route renders PrivateRoute and AccountDetailsCard components when path exactly matches "/api/account/details" and user is logged in */}
        <PrivateRoute exact path="/api/account/details">
          <AccountDetailsCard />
        </PrivateRoute>

        {/* if a user tries to go to a link that doesn’t work, this friendly message will show up */}
        <Route>
          <div>
            <p className="errorHandler1">
              Hmmm. I can't seem to find what you want.
            </p>
            <p className="errorHandler2">
              Please click on one of the links above.
            </p>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
export default Routes;
