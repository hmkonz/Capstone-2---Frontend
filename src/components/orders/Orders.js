import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import "./OrderCard.css";
import UserContext from "../../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";
import JustRealFoodApi from "../../api/just_real_food_api";

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

  useEffect(() => {
    async function listUserOrders() {
      let result = await JustRealFoodApi.getUserOrders(currentUser.id);
      console.log("This is result in Orders/listUserOrders", result);
      return result;
    }

    listUserOrders()
      .then((orderResult) => {
        setOrders(orderResult);
      })
      .catch((err) => {
        console.error(`Error in Orders/listUserOrders: ${err}`);
      });
  }, [currentUser.id]);

  // async function listUserOrders() {
  //   // retrieve products with category=products.DogFood or category=products.CatFoodfrom API
  //   let result = await JustRealFoodApi.getUserOrders(currentUser.id);
  //   // update piece of state 'products' with the results of the API call
  //   setOrders(result);
  // }

  // // useEffect will make an API call once when component is rendered and whenever currentUser.id, and it retrieves all orders for that specific user from the database
  // useEffect(() => {
  //   listUserOrders();
  // }, [currentUser.id]);

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
