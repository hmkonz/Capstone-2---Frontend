import Button from "react-bootstrap/Button";
import React, { useContext, useState, useEffect } from "react";
import { NewCartContext } from "../../NewCartContext";

/**
 * On mount, loads cart product names, quantities and prices in the Modal
 *
 * This is routed to in NewNavBar, loggedInUser()
 *
 */

// cart.id and cart.quantity are passed in as props from the Modal in the NewNavBar component
function NewCartProduct({ id, quantity }) {
  // useContext gives access to all the properties in NewCartContext (i.e. cart.items, cart.getProductQuantity(product.id), etc)
  const cart = useContext(NewCartContext);

  // intialize piece of state 'productData' to an empty array
  const [productData, setProductData] = useState([]);

  // useEffect will make an API call once when component is rendered and whenever 'cart' and 'id' change value. The getProductData() function (defined in NewCartContext) is executed and the details of the product with 'id' is retrieved.  Piece of state 'productData' is then updated with those retrieved details.

  // when calling async functions within useEffect (getProductData in NewCartContext is an async function), use '.then' after the function to set the piece of state
  useEffect(() => {
    cart.getProductData(id).then((productData) => {
      setProductData(productData);
    });
  }, [cart, id]);

  return (
    <>
      <h3>{productData.name}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <Button
        variant="danger"
        size="sm"
        onClick={() => cart.deleteFromCart(id)}
      >
        Remove
      </Button>
      <hr></hr>
    </>
  );
}

export default NewCartProduct;
