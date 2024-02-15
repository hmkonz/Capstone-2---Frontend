import Button from "react-bootstrap/Button";
import { NewCartContext } from "../NewCartContext";
import React, { useContext, useState, useEffect } from "react";

function NewCartProduct(props) {
  const cart = useContext(NewCartContext);
  const id = props.id;
  const quantity = props.quantity;
  // const productData = cart.getProductData(id);
  const [productData, setProductData] = useState([]);

  // when using useEffect with async functions (getProductData in NewCartContext is an async function), use '.then' after the function to set the piece of state
  useEffect(() => {
    cart.getProductData(id).then((productData) => {
      setProductData(productData);
    });
  }, []);

  console.log("THis is productData in NewCartProduct", productData);
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
