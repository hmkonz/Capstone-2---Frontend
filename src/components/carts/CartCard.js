import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import "./CartCard.css";

function CartCard(carts) {
  // deconstruct id, product_name, product_price, user_id and product_id from piece of state 'carts' in Carts.js file
  const { id, product_name, product_price, user_id, product_id } = carts;
  console.log("This is carts in CartCard", carts);

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);
  console.log("THis is currentUser in Orders.js", currentUser);

  let subtotal = carts.reduce(function (prev, current) {
    return prev + +current.price;
  }, 0);

  // // deconstruct 'currentUser' from context value of UserContext declared in App component
  // const { currentUser } = useContext(UserContext);

  // // initialize piece of state 'cartItems' to an empty array
  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   async function getCarts() {
  //     let results = await JustRealFoodApi.getUserCart(user_id);
  //     return results;
  //   }

  //   getCarts()
  //     .then((cartsResult) => {
  //       setCartItems(cartsResult);
  //     })
  //     .catch((err) => {
  //       console.error(`Error in CartCard/getCarts: ${err}`);
  //     });
  // }, [user_id]);

  // // while cartItems are being retrieved from the API, show the laoding spinner
  // if (!cartItems) {
  //   return <LoadingSpinner />;
  // }

  // console.log("THis is piece of state cartItems in CartCard.js", cartItems);

  const Rows = (props) => {
    const { product_name, product_price } = props;
    return (
      <tr className="CartCard-Rows">
        <td>{product_name}</td>
        <td>1</td>
        <td>{product_price}</td>
      </tr>
    );
  };

  const Table = (props) => {
    const { data } = props;
    return (
      <table id="CartCard-table">
        <tbody>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {data.map((row) => (
            <Rows
              key={row.id}
              productname={row.product_name}
              quantity={1}
              price={row.product_price}
            />
          ))}

          <tr></tr>
          <tr></tr>
          <tr>
            <td>Subtotal:</td>
            <td></td>
            <td>${subtotal}</td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr>
            <td>Shipping To::</td>
            <td></td>
            <td>
              Free Shipping! Shipping to:
              {currentUser.shipping_address
                ? currentUser.shipping_address
                : null}
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr>
            <td>Tax:</td>
            <td></td>
            <td>${(subtotal * 0.08).toFixed(2)}</td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr>
            <td>Total:</td>
            <td></td>
            <td>${(subtotal * 1.08).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  return (
    <div className="CartCard">
      <div className="CartCard-container">
        <img
          className="CartCard-image"
          src="/images/recipefordogspic.jpg"
          alt=""
        ></img>

        <div className="card">
          <h1 className="CartCard-title">Shopping Cart </h1>
          <h5 className="CartCard-userId">Customer Id: {user_id}</h5>
          <Table data={carts} />
          <br></br>
          <br></br>
          <br></br>
        </div>
        {/*<table id="CartCard-table">
          <tbody>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr className="CartCard-product">
              <td>{product_name}</td>
              <td>{product_quantity}</td>
              <td>${product_price}</td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <th>Cart totals</th>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>Subtotal:</td>
              <td></td>
              <td>${subtotal}</td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>
                Free Shipping! Shipping to:
                {currentUser.shipping_address
                  ? currentUser.shipping_address
                  : null}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>
                {" "}
                Tax: ${(subtotal * 0.08).toFixed(2)}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td>
                {" "}
                Total: ${(subtotal * 1.08).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table> */}
        <br></br>
        <br></br>
        <br></br>
        <Link className="CartCard-checkout-link" to="/api/checkout">
          Proceed to Checkout
        </Link>
        <Link className="CartCard-shopping-link" to="/api/products">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CartCard;
