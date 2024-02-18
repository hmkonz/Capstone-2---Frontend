import React from "react";
import "./Success.css";

function Success() {
  return (
    <>
      <h1 className="success-h1">Success!!</h1>
      <img
        src="/images/checkmark-icon.png"
        alt=""
        className="success-img"
      ></img>
      <h2 className="success-h2">Thank you for your purchase!</h2>
    </>
  );
}

export default Success;
