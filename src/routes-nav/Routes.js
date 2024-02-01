import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Routes.css";

// import components
import Home from "../components/home/Home";
import AdminSigninForm from "../auth/AdminSigninForm";
import SignupAndLoginForms from "../auth/SignupAndLoginForms";
import ProductList from "../components/products/ProductList";
import ProductDogOrCatFood from "../components/products/ProductDogOrCatFood";
import ProductDetail from "../components/products/ProductDetail";
import Carts from "../components/carts/Carts";
// import CartCard from "../components/carts/CartCard";
import MyAccount from "../components/myAccount/MyAccount";
import Orders from "../components/orders/Orders";
// import Addresses from "../components/myAccount/Addresses";
import AccountDetailsForm from "../components/myAccount/AccountDetailsForm";
import AccountDetailsCard from "../components/myAccount/AccountDetailsCard";
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
          <ProductList />
        </Route>

        {/* Route renders ProductDetail component when path exactly matches "/api/products/:name". User does not have to be logged in */}
        <Route exact path="/api/products/name/:name">
          <ProductDetail />
        </Route>

        {/* Route renders ProductDogOrCatFood component when path exactly matches "/api/products/category/:category". User does not have to be logged in */}
        <Route exact path="/api/products/category/:category">
          <ProductDogOrCatFood />
        </Route>

        {/* Route renders PrivateRoute and Carts components when path exactly matches "/api/cart/:user_id" and user is logged in */}
        <PrivateRoute path="/api/cart/:user_id">
          <Carts />
        </PrivateRoute>

        {/* Route renders PrivateRoute and Cart components when path exactly matches "/api/cart/:userId" and user is logged in */}
        {/* <PrivateRoute exact path="/api/cart">
          <Carts />
        </PrivateRoute> */}

        {/* Route renders PrivateRoute and MyAccount components when path exactly matches "/api/account" and user is logged in */}
        <PrivateRoute exact path="/api/account">
          <MyAccount />
        </PrivateRoute>

        {/* Route renders PrivateRoute and Orders components when path exactly matches "/api/account/orders" and user is logged in */}
        <PrivateRoute exact path="/api/orders/:userId">
          <Orders />
        </PrivateRoute>

        {/* Route renders PrivateRoute and Addresses components when path exactly matches "/api/account/edit-address" and user is logged in */}
        {/* <PrivateRoute exact path="/api/account/edit-address">
          <Addresses />
        </PrivateRoute> */}

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
