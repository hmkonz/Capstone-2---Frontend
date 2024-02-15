import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import JustRealFoodApi from "../../api/just_real_food_api";
import OrderCard from "./OrderCard";
import "./OrderCard.css";
import UserContext from "../../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of orders for a specific user
 *
 * On mount, loads orders from API.
 *
 * This is routed to at /api/account/orders
 *
 * Orders renders -> {OrderCard }
 */

function Orders() {
  // initialize piece of state 'orders' to an empty array
  const [orders, setOrders] = useState([]);

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);
  console.log("THis is currentUser in Orders.js", currentUser);

  /** the listUserOrders function is executed once when component is rendered **/
  // const listUserOrders = useCallback(async () => {
  //   // retrieve orders of user
  //   let userOrders = await JustRealFoodApi.getUserOrders(currentUser.id);
  //   console.log("This is userOrders in Orders/listUserOrders", userOrders);

  //   // update piece of state 'orders' with the results of the API call
  //   setOrders(orders);
  // }, [orders, currentUser.id]);

  // useEffect(() => {
  //   listUserOrders();
  // }, [listUserOrders]);

  useEffect(() => {
    JustRealFoodApi.getUserOrders(currentUser.id).then((order) => {
      setOrders(order);
    });
  }, [orders, currentUser.id]);

  // while orders are being retrieved from the API, show the laoding spinner
  if (!orders) {
    return <LoadingSpinner />;
  }

  console.log("THis is piece of state orders in Orders.js", orders);

  return (
    <div className="OrderList col-md-8 offset-md-2">
      {orders.length ? (
        <OrderCard orders={orders} />
      ) : (
        <div className="myAccount-orders-message">
          <p className="myAccount-orders-message2">
            No orders have been made yet
          </p>
          <Link className="myAccount-orders-browse-link" to="/api/account">
            Return to My Account
          </Link>
        </div>
      )}
    </div>
  );
}
export default Orders;
