import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../components/common/Alert";
import "./AdminSigninForm.css";
import "../components/common/Alert.css";

// pass in 'adminSignin()' from the App component as a prop
function AdminSigninForm({ adminSignin }) {
  //initialize piece of state object ‘formInputData’ with key:value pairs. email and password are the keys and the values are empty strings
  const [formInputData, setFormInputData] = useState({
    email: "",
    password: "",
  });

  // Initialize piece of state 'formErrors' to an empty array (error message if 'signin' function (in App component) is not successful)
  const [formErrors, setFormErrors] = useState([]);

  // The 'useHistory' hook gives access to the 'history' object, giving access to several functions to navigate the page (go forward, go backward, redirect to another page, etc)
  const history = useHistory();

  /* update piece of state 'formInputData' */
  // execute this function whenever a user makes a change to any of the form inputs.
  const handleChange = (event) => {
    // deconstruct name and value from event.target (inputs in form)
    const { name, value } = event.target;
    // update piece of state 'formInputData' with a new object including everything already in 'formInputData' as well as the name:value pair entered in form input
    setFormInputData((formInputData) => ({
      ...formInputData,
      [name]: value,
    }));
  };

  // when form is submitted, this function executes the 'adminSignin' function (defined in the App component) and if property 'result.success' is true (if signin function was successful) then redirect to the homepage; otherwise update piece of state 'formErrors' to result.errors
  async function handleSubmit(event) {
    event.preventDefault();
    // 'adminSignin' function accepts piece of state 'formInputData and updates piece of state 'token' with what's returned from the backend route POST request `api/admins/signin`
    let result = await adminSignin(formInputData);
    console.log("THis is result in adminsigninform", result);

    // if signin is successful, 'success' property, set to true, is returned from the 'adminSignin' function
    if (result.success) {
      // redirect to homepage
      history.push("/");
    } else {
      // if signin was not successful ('success' property, set to false), set piece of state 'formErrors' to result.errors
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="Form">
      <div className="signin">
        <h1 className="signin-header"> Please Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="div-email">
            <label className="label-email" htmlFor="email">
              Email*
            </label>
            <input
              id="form-input-email"
              type="text"
              name="email"
              value={formInputData.email}
              onChange={handleChange}
              style={{ width: "500px", height: "30px" }}
            />
          </div>
          <div className="div-password">
            <label className="label-password" htmlFor="password">
              Password
            </label>
            <input
              id="form-input-password"
              type="password"
              name="password"
              value={formInputData.password}
              onChange={handleChange}
              style={{ width: "500px", height: "30px" }}
            />
          </div>
          {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null}

          <button className="signin-btn">Sign in</button>
        </form>
      </div>
    </div>
  );
}
export default AdminSigninForm;
