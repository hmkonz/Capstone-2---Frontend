import React, { useState } from "react";
import Address from "./MyAccountAddress";
import MyAccountBillingAddressForm from "./MyAccountBillingAddressForm";

const INITIAL_STATE = [];

function AddressList() {
  const [addresses, setAddresses] = useState(INITIAL_STATE);

  function addAddress(
    firstName,
    lastName,
    streetAddress,
    aptNumber,
    town,
    state,
    zipCode,
    phone,
    email
  ) {
    setAddresses((addresses) => [
      ...addresses,
      {
        firstName,
        lastName,
        streetAddress,
        aptNumber,
        town,
        state,
        zipCode,
        phone,
        email,
      },
    ]);
  }

  return (
    <div>
      <MyAccountBillingAddressForm addAddress={addAddress} />

      <div>
        {addresses.map((address) => (
          // ({
          //   firstName,
          //   lastName,
          //   streetAddress,
          //   aptNumber,
          //   town,
          //   state,
          //   zipCode,
          //   phone,
          //   email,
          // }) => (
          <Address
            firstName={address.firstName}
            lastName={address.lastName}
            streetAddress={address.streetAddress}
            aptNumber={address.aptNumber}
            town={address.town}
            state={address.state}
            zipCode={address.zipCode}
            phone={address.phone}
            email={address.email}
          />
        ))}
      </div>
    </div>
  );
}

export default AddressList;
