import { Button, Navbar, Modal } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
import { NewCartContext } from "../NewCartContext";
import NewCartProduct from "../components/NewCartProduct";
import StripeApi from "../api/stripe_api";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

function NavbarComponent({ logout }) {
  // gives access to all the properties in NewCartContext (i.e. cart.items, cart.getProductQuantity(product.id), etc)
  const cart = useContext(NewCartContext);
  console.log("THis is cart.items in NewNavBar", cart.items);

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);
  console.log("currentUser", currentUser);
  const [totalCost, setTotalCost] = useState(0);

  // when using useEffect for async functions (getTotalCost in CartContext is an async function), use .then after the function to set the piece of state. Also need to add cart.items as a dependency so that whenever cart.items is updated/changes, cart.getTotalCost is executed again to get updated total cost
  useEffect(() => {
    cart.getTotalCost().then((totalCost) => {
      setTotalCost(totalCost);
    });
  }, [cart.items]);

  // piece of state 'show' is used for the Modal is is initialized to false so Modal doesn't show right away
  const [show, setShow] = useState(false);
  // 'handleClose' is a callback function that sets piece of state 'show' to false and is executed when when either the page is clicked on or when the X is clicked in the Modal so the Modal is hidden
  const handleClose = () => setShow(false);

  // 'handleShow' is a callback function that sets piece of state 'show' to true (so Modal shows) and is executed when click on cart button)
  const handleShow = () => setShow(true);

  const checkout = async () => {
    // pass cart.items and currentUser in as the body of the request
    let sessionUrl = await StripeApi.checkout(cart.items, currentUser);

    // redirect the user to the Stripe payment page
    window.location.assign(sessionUrl);
  };

  // .reduce(sum, product) gives access to all the product quantities in cart.items and adds them one at a time to 'sum' (initialized to 0), returning the total sum. (i.e. cart.items=[{id:1, quantity:2}, {id:4, quantity:1}, ...])
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  function LoggedInUser() {
    console.log("This is productsCount in LoggedInUser", productsCount);
    return (
      <Navbar className="fixed-top" expand="sm">
        <>
          <ul className="navbar-nav">
            <li className="active">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="active">
              <NavLink className="nav-link" exact to="/api/products">
                All Products
              </NavLink>
            </li>
            <li className="active">
              <NavLink
                className="nav-link"
                exact
                to="/api/products/category/DogFood"
              >
                Dog Food
              </NavLink>
            </li>
            <li className="active">
              <NavLink
                className="nav-link"
                exact
                to="/api/products/category/CatFood"
              >
                Cat Food
              </NavLink>
            </li>
            <li className="active">
              <NavLink className="nav-link" exact to="/api/account">
                My Account
              </NavLink>
            </li>
            <li className="active">
              <Button className="cart-in-navbar" onClick={handleShow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                {productsCount}
              </Button>
            </li>
            <li className="active">
              <NavLink className="nav-link" exact to="/" onClick={logout}>
                Log out
              </NavLink>
            </li>
          </ul>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              {/* adds a title to the Modal */}
              <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {productsCount > 0 ? (
                <>
                  <p>Items in your cart:</p>
                  {/* map over all the cartItem objects in cart.items array (i.e. [{id:1, quantity:2}, {id:4, quantity:1}, ...]) and for every cartItem, render the NewCartProduct component with key, id and quantity passed in as props. NewCartProduct shows all the items in the cart*/}
                  {cart.items.map((cartItem, idx) => (
                    <NewCartProduct
                      key={idx}
                      id={cartItem.id}
                      quantity={cartItem.quantity}
                    ></NewCartProduct>
                  ))}
                  {/* call the 'getTotalCost' function in NewCartContext which returns the total cost of all the items in the cart and it's rounded to 2 decimal places */}
                  {/* <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1> */}
                  <h1>Total: ${totalCost.toFixed(2)}</h1>
                  {/* when click on 'Purchase Items' button, the checkout function will execute and make a POST request to the backend route '/checkout' and pass cart.items to the backend in the request body. On the backend, the cart.items will be formatted how Stripe likes them, and Stripe creates a session with the formatted lineItems array. Once the session is created, the session url is sent back to the frontend, to be used by the checkout function to forward the user to the Stripe payment page */}
                  {/* <Button variant="warning" onClick={login}>
              Login before Checkout
            </Button> */}

                  <button className="cart-checkout" onClick={checkout}>
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <h1 className="navbar-msg">There are no items in your cart!</h1>
              )}
            </Modal.Body>
          </Modal>
        </>
      </Navbar>
    );
  }

  function LoggedOutUser({ login }) {
    console.log("This is productsCount in LoggedOutUser", productsCount);
    return (
      <Navbar className="fixed-top" expand="sm">
        <>
          <ul className="navbar-nav">
            <li className="active">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="active">
              <NavLink className="nav-link" exact to="/api/products">
                All Products
              </NavLink>
            </li>
            <li className="active">
              <NavLink
                className="nav-link"
                exact
                to="/api/products/category/DogFood"
              >
                Dog Food
              </NavLink>
            </li>
            <li className="active">
              <NavLink
                className="nav-link"
                exact
                to="/api/products/category/CatFood"
              >
                Cat Food
              </NavLink>
            </li>
            <li className="active">
              <NavLink className="nav-link" exact to="/signup">
                Sign In
              </NavLink>
            </li>
          </ul>
        </>
      </Navbar>
    );
  }

  return (
    <Nav className="navbar navbar-expand-md">
      {currentUser ? <LoggedInUser /> : <LoggedOutUser />}
    </Nav>
  );
}

export default NavbarComponent;
