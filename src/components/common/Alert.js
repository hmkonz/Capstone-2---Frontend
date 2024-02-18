import React from "react";

/** Presentational component for showing alerts.
 *
 * { signupAndLoginForms } -> Alert
 **/

function Alert({ type = "danger", messages = [] }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map((message) => (
        <p className="alert-msg" key={message}>
          {message}
        </p>
      ))}
    </div>
  );
}

export default Alert;
