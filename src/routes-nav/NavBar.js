import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { CartContext } from "../components/context/CartContext";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

// logout() function, defined in App component, is passed in as a prop which handles site-wide logout by resetting pieces of state 'currentUser' and 'token' to null
function NavBar({ logout }) {
  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser, currentAdmin } = useContext(UserContext);
  // const [carts, setCarts] = useContext(CartContext);
  const [carts, setCarts] = useState(localStorage.getItem("carts"));

  console.log("THis is currentUser in NavBar", currentUser);
  console.log("THis is currentAdmin in NavBar", currentAdmin);

  useEffect(() => {
    localStorage.setItem("carts", carts);
  }, [carts]);

  function LoggedInUser() {
    return (
      <ul className="navbar-nav">
        <li className="active">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
        <li className="active">
          <NavLink
            className="nav-link"
            exact
            to="/api/products/category/DogFood"
          >
            Shop Dog Food
          </NavLink>
        </li>
        <li className="active">
          <NavLink
            className="nav-link"
            exact
            to="/api/products/category/CatFood"
          >
            Shop Cat Food
          </NavLink>
        </li>
        <li className="active">
          <NavLink className="nav-link" exact to="/api/account">
            My Account
          </NavLink>
        </li>
        <li className="active">
          <NavLink className="nav-link" exact to={`api/cart/${currentUser.id}`}>
            <div className="nav-cart">
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
              <span className="cart-title">Cart</span>
              <span className="cart-quantity">
                <span>{carts.length}</span>
              </span>
            </div>
          </NavLink>
        </li>
        <li className="active">
          <NavLink className="nav-link" exact to="/" onClick={logout}>
            Log out
          </NavLink>
        </li>
      </ul>
    );
  }

  function LoggedOutUser() {
    return (
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
    );
  }

  return (
    <Nav className="navbar navbar-expand-md">
      {currentUser ? <LoggedInUser /> : <LoggedOutUser />}
    </Nav>
  );
}
export default NavBar;
