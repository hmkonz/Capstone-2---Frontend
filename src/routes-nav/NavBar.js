import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import UserContext from "../auth/UserContext";

// logout() function, defined in App component, is passed in as a prop which handles site-wide logout by resetting pieces of state 'currentUser' and 'token' to null
function NavBar({ logout }) {
  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser, currentAdmin } = useContext(UserContext);

  console.log("THis is currentUser in NavBar", currentUser);
  console.log("THis is currentAdmin in NavBar", currentAdmin);

  function LoggedInUser() {
    return (
      <ul className="navbar-nav">
        <li className="active">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="active">
          <NavLink className="nav-link" to="/api/products/category/DogFood">
            Shop Dog Food
          </NavLink>
        </li>
        <li className="active">
          <NavLink className="nav-link" to="/api/products/category/CatFood">
            Shop Cat Food
          </NavLink>
        </li>
        <li className="active">
          <NavLink className="nav-link" exact to="/api/account">
            My Account
          </NavLink>
        </li>
        <li className="active">
          <NavLink className="nav-link" to="/" onClick={logout}>
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
          <NavLink className="nav-link" to="/">
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
    <Nav className="navBar navbar-expand-md">
      {currentUser ? <LoggedInUser /> : <LoggedOutUser />}
    </Nav>
  );
}
export default NavBar;
