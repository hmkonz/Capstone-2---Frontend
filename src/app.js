import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage.js";
import NavBar from "./routes-nav/NavBar.js";
import Routes from "./routes-nav/Routes.js";
import LoadingSpinner from "./components/common/LoadingSpinner.js";
import JustRealFoodApi from "./api/api.js";
import UserContext from "./auth/UserContext.js";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage to be remembered when re-login
export const TOKEN_STORAGE_ID = "capstone2-token";

/** Just Real Food application.
 *
 * - infoLoaded: has product or user/admin data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This is the way to tell if someone
 *   is logged in. This is passed around via 'context' throughout app.
 *
 * - currentAdmin: admin obj from API. This is the way to tell if an admin
 *   is logged in. This is passed around via 'context' throughout app.
 *
 * - token: for logged in users and admins, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {
  // set pieces of state to initial values
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /** Load user info from API. Until a user is logged in and they have a token,
   * this should not run. It only needs to re-run when a user logs out so
   * the value of the token is a dependency for this effect.
   * */

  // useEffect will make an API call everytime the token value changes
  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        // if user has a token:
        if (token) {
          try {
            // deconstruct 'email' from piece of state 'token' (jwt.token() returns an object with the user's information, captured when logging in - the payload)
            let { email } = jwt.decode(token);
            // store the token on the JustRealFoodApi class so can use it to call the API.
            JustRealFoodApi.token = token;
            // assign 'currentUser' to the result of the API call to get the current user with 'email' assigned to the token passed in as a prop
            let currentUser = await JustRealFoodApi.getCurrentUser(email);
            console.log(
              "THis is currentUser in app.js/getCurrentUser",
              currentUser
            );
            // update piece of state 'currentUser' with the results of the API call
            setCurrentUser(currentUser);
            // if user does not have a token, show the error message and set piece of state 'currentUser' to null
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        // Once user data is fetched or if user does not have a token, change piece of state 'infoLoaded' to true to stop the spinner (LoadingSpinner component will not execute when infoLoaded=true)
        setInfoLoaded(true);
      }

      // set piece of state 'infoLoaded' to false while async function 'getCurrentUser' runs (LoadingSpinner component will execute when infoLoaded=false)
      // once the data is fetched (or even if an error happens), 'infoLoaded' will be set back to false to control the spinner
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Load admin info from API. Until a admin is logged in and they have a token,
   * this should not run. It only needs to re-run when an admin logs out so
   * the value of the token is a dependency for this effect.
   * */

  // useEffect will make an API call everytime the token value changes
  useEffect(
    function loadAdminInfo() {
      async function getCurrentAdmin() {
        // if admin has a token:
        if (token) {
          try {
            // deconstruct 'email' from piece of state 'token' (jwt.token() returns an object with the admin's information, captured when logging in - the payload)
            let { email } = jwt.decode(token);
            // store the token on the JustRealFoodApi class so can use it to call the API.
            JustRealFoodApi.token = token;
            // assign 'currentAdmin' to the result of the API call to get the current admin with 'email' assigned to the token passed in as a prop
            let currentAdmin = await JustRealFoodApi.getCurrentAdmin(email);

            console.log(
              "THis is currentAdmin in app.js/getCurrentAdmin",
              currentAdmin
            );
            // update piece of state 'currentAdmin' with the results of the API call
            setCurrentAdmin(currentAdmin);
            // if admin does not have a token, show the error message and set piece of state 'currentAdmin' to null
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentAdmin(null);
          }
        }
        // Once admin data is fetched or if admin does not have a token, change piece of state 'infoLoaded' to true to stop the spinner (LoadingSpinner component will not execute when infoLoaded=true)
        setInfoLoaded(true);
      }

      // set piece of state 'infoLoaded' to false while async function 'getCurrentAdmin' runs (LoadingSpinner component will execute when infoLoaded=false)
      // once the data is fetched (or even if an error happens), 'infoLoaded' will be set back to false to control the spinner
      setInfoLoaded(false);
      getCurrentAdmin();
    },
    [token]
  );

  /** Handles site-wide logout. */
  function logout() {
    // when logout, pieces of state 'currentUser' and 'token' are reset to null
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically signs users in (sets token) upon signup.
   *
   */
  async function signup(signupData) {
    try {
      // make API call to signup method in api.js file and assign response to piece of state 'token'
      let token = await JustRealFoodApi.signup(signupData);
      console.log("This is token in app.js/signup", token);
      // update piece of state 'token' with the API response
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login  */
  async function login(loginData) {
    try {
      // make API call to login method and assign response to piece of state 'token'
      let token = await JustRealFoodApi.login(loginData);
      console.log("This is token in app.js/login", token);
      // update piece of state 'token' with the API response
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide adminLogin  */
  async function adminSignin(signinData) {
    try {
      // make API call to adminSignin method and assign response to piece of state 'token'
      let token = await JustRealFoodApi.adminSignin(signinData);
      // update piece of state 'token' with the API response
      setToken(token);
      console.log("This is token from api.js/adminSignin", token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  console.log("This is currentUser in App", currentUser);

  // if piece of state 'infoLoaded' is false, render the LoadingSpinner component to show Loading ...
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      {/* wrap UserContext.Provider around all routes (which includes their children) that need access to context value (value={{ currentUser, setCurrentUser, currentAdmin, setCurrentAdmin}}) */}
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, currentAdmin, setCurrentAdmin }}
      >
        <div className="App">
          {/* pass logout() method as a prop so can be used in NavBar component */}
          <NavBar logout={logout} />
          {/* pass login(), signup()and adminSignin methods as props so can be used in login and signup routes */}
          <Routes login={login} signup={signup} adminSignin={adminSignin} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
