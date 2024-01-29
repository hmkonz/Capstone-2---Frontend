import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import JustRealFoodApi from "../../api/api";
import OrderCard from "./OrderCard";
import "./OrderCard.css";
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

  /** the listUserOrders function is executed once when component is rendered **/
  const listUserOrders = useCallback(async () => {
    // retrieve orders of user
    let orders = await JustRealFoodApi.getUserOrders();
    console.log(
      "This is piece of state orders in Orders/listUserOrders",
      orders
    );

    // update piece of state 'orders' with the results of the API call
    setOrders(orders);
  }, []);

  useEffect(() => {
    listUserOrders();
  }, [listUserOrders]);

  // while orders are being retrieved from the API, show the laoding spinner
  if (!orders) {
    return <LoadingSpinner />;
  }

  console.log("THis is piece of state orders in Orders.js", orders);

  return (
    <div className="OrderList col-md-8 offset-md-2">
      {orders.length ? (
        <OrderCard />
      ) : (
        <div className="myAccount-orders-message">
          <p className="myAccount-orders-message2">
            No orders have been made yet.
          </p>
          <Link className="myAccount-orders-browse-link" to="/api/products">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
export default Orders;
