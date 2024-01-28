import React from "react";

function Address({
  firstName,
  lastName,
  streetAddress,
  aptNumber,
  town,
  state,
  zipCode,
  phone,
  email,
}) {
  return (
    <div className="address">
      <h1> Billing Address</h1>
      <ul>
        <li>
          {firstName} "" {lastName}
        </li>
        <li>{streetAddress}</li>
        <li>{aptNumber}</li>
        <li>
          {town} "," {state} "" {zipCode}
        </li>
        <li>{phone}</li>
        <li>{email}</li>
      </ul>
    </div>
  );
}

export default Address;
