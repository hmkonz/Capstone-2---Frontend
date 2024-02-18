import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../components/common/Alert";
import "./SignupAndLoginForms.css";
import "../components/common/Alert.css";

function SignupAndLoginForms({ signup, login }) {
  //initialize piece of state object ‘registerFormInputData’ with key:value pairs. email and password are the keys and the values are empty strings
  const [registerFormInputData, setRegisterFormInputData] = useState({
    email: "",
    password: "",
  });

  //initialize piece of state object ‘loginFormInputData’ with key:value pairs. email and password are the keys and the values are empty strings
  const [loginFormInputData, setLoginFormInputData] = useState({
    email: "",
    password: "",
  });

  // Initialize piece of state 'registerFormErrors' and 'loginFormErrors' to empty arrays (error message if 'signup' function is not successful)
  const [registerFormErrors, setRegisterFormErrors] = useState([]);
  const [loginFormErrors, setLoginFormErrors] = useState([]);

  // The 'useHistory' hook gives access to the 'history' object, giving access to several functions to navigate the page (go forward, go backward, redirect to another page, etc)
  const history = useHistory();

  /* update piece of state 'registerFormInputData' */

  // execute this function whenever a user makes a change to any of the Register Form inputs
  const handleRegisterChange = (event) => {
    // deconstruct name and value from event.target (inputs in form)
    const { name, value } = event.target;
    // update piece of state 'registerFormInputData' with a new object including everything already in 'registerFormInputData' as well as the name:value pair entered in form input
    setRegisterFormInputData((registerFormInputData) => ({
      ...registerFormInputData,
      [name]: value,
    }));
  };

  /* update piece of state 'loginFormInputData' */

  // execute this function whenever a user makes a change to any of the Login Form inputs.
  const handleLoginChange = (event) => {
    // deconstruct name and value from event.target (inputs in form)
    const { name, value } = event.target;
    // update piece of state 'loginFormInputData' with a new object including everything already in 'loginFormInputData' as well as the name:value pair entered in form input
    setLoginFormInputData((loginFormInputData) => ({
      ...loginFormInputData,
      [name]: value,
    }));
  };

  // when Register Form is submitted, this function executes the 'signup' function (defined in the NewApp component) and if property 'result.success' is true (if signup function was successful) then redirect to the homepage; otherwise update piece of state 'registerFormErrors' to result.errors
  async function handleRegisterSubmit(event) {
    event.preventDefault();
    // 'signup' function accepts piece of state 'registerFormInputData' and updates piece of state 'token' with what's returned from the backend route POST request `api/auth/user/register`
    let result = await signup(registerFormInputData);

    // if signup is successful, 'success' property, set to true, is returned from the 'signup' function and app redirects to homepage
    if (result.success) {
      // redirect to homepage
      history.push("/");
    } else {
      // if signup was not successful ('success' property, set to false), set piece of state 'formErrors' to result.errors
      setRegisterFormErrors(result.errors);
    }
  }

  // when Login Form is submitted, this function executes the 'login' function (defined in the NewApp component) and if property 'result.success' is true (if login function was successful) then redirect to the homepage; otherwise update piece of state 'registerFormErrors' to result.errors
  async function handleLoginSubmit(event) {
    event.preventDefault();
    // 'login' function accepts piece of state 'loginFormInputData' and updates piece of state 'token' with what's returned from the backend route POST request `api/auth/user/token`
    let result = await login(loginFormInputData);

    // if login is successful, 'success' property, set to true, is returned from the 'login' function and app redirects to homepage
    if (result.success) {
      // redirect to homepage
      history.push("/");
    } else {
      // if login was not successful ('success' property, set to false), set piece of state 'loginFormErrors' to result.errors
      setLoginFormErrors(result.errors);
    }
  }

  return (
    <div className="Forms">
      <div className="register">
        <h1 className="register-header"> Register</h1>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label className="register-label" htmlFor="email">
              Email
            </label>
            <input
              id="register-email"
              type="text"
              name="email"
              value={registerFormInputData.email}
              onChange={handleRegisterChange}
              style={{ width: "500px", height: "30px" }}
            />
          </div>

          <div>
            <label className="register-label" htmlFor="password">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              name="password"
              autoComplete="on"
              value={registerFormInputData.password}
              onChange={handleRegisterChange}
              style={{ width: "500px", height: "30px" }}
            />
          </div>
          {registerFormErrors.length ? (
            <Alert
              className="loginFormError"
              type="danger"
              messages={registerFormErrors}
            />
          ) : null}

          <button className="register-btn">Register</button>
        </form>
      </div>

      <div className="login">
        <h1 className="login-header"> Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              id="login-email"
              type="text"
              name="email"
              value={loginFormInputData.email}
              onChange={handleLoginChange}
              style={{ width: "500px", height: "30px" }}
            />
          </div>
          <div>
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="on"
              value={loginFormInputData.password}
              onChange={handleLoginChange}
              style={{ width: "500px", height: "30px" }}
            />
          </div>
          {loginFormErrors.length ? (
            <Alert type="danger" messages={loginFormErrors} />
          ) : null}

          <button className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
export default SignupAndLoginForms;
