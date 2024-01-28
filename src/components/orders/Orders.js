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
 * This is routed to at /api/account/orders/:customerId
 *
 * Orders renders -> {OrderCard }
 */

function Orders() {
  // initialize piece of state 'orders' to an empty array
  const [orders, setOrders] = useState([]);
  // deconstruct 'id' from the url params
  // const { id } = useParams();

  /** the listUserOrders function is executed once when component is rendered **/
  const listUserOrders = useCallback(async () => {
    // retrieve orders of
    let orders = await JustRealFoodApi.getUserOrders();
    console.log("This is orders in Orders/listUserOrders", orders);

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

  // let subtotal = orders.reduce(function (prev, current) {
  //   return prev + +current.price;
  // }, 0);

  // const Rows = (props) => {
  //   const { productname, quantity, price } = props;
  //   return (
  //     <tr className="myAccount-orders-product">
  //       <td>{productname}</td>
  //       <td>{quantity}</td>
  //       <td>{price}</td>
  //     </tr>
  //   );
  // };

  // const Table = (props) => {
  //   const { data } = props;
  //   return (
  //     <table>
  //       <tbody>
  //         <tr>
  //           <th>Product</th>
  //           <th>Quantity</th>
  //           <th>Price</th>
  //         </tr>
  //         {data.map((row) => (
  //           <Rows
  //             key={row.id}
  //             productname={row.productname}
  //             quantity={row.quantity}
  //             price={row.price}
  //           />
  //         ))}

  //         <tr></tr>
  //         <tr></tr>
  //         <tr>
  //           <td>Subtotal:</td>
  //           <td></td>
  //           <td>${subtotal}</td>
  //         </tr>
  //         <tr>
  //           <td>Shipping:</td>
  //           <td></td>
  //           <td>Free Shipping</td>
  //         </tr>
  //         <tr>
  //           <td>Tax:</td>
  //           <td></td>
  //           <td>${(subtotal * 0.08).toFixed(2)}</td>
  //         </tr>
  //         <tr>
  //           <td>Payment Method:</td>
  //           <td></td>
  //           <td>{data.paymentMethod}</td>
  //         </tr>
  //         <tr>
  //           <td>Total:</td>
  //           <td></td>
  //           <td>${(subtotal * 1.08).toFixed(2)}</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   );
  // };

  return (
    <div className="OrderList col-md-8 offset-md-2">
      {orders.length ? (
        <OrderCard orders={orders} />
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
