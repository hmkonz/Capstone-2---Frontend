import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import JustRealFoodApi from "../../api/api";
import "./ProductDetail.css";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../../auth/UserContext";
import { v4 as uuid } from "uuid";
// import { UnauthorizedError } from "../../../../backend/expressError";

/** Show page with details of a specific product */

function ProductDetail() {
  // retrieve the parameter (name) from the URL
  const { name } = useParams();
  console.log("THis is product name in useParmas ofProductDetail", name);

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);
  console.log("This is currentUser in ProductDetail.js", currentUser);

  // initialize piece of state 'product'
  const [product, setProduct] = useState({
    id: " ",
    name: "",
    ingredients: "",
    calorieCount: " ",
    category: " ",
    price: " ",
  });

  const [cartData, setCartData] = useState({
    cartId: "",
    productName: "",
    productQuantity: "",
    productPrice: "",
    userId: "",
    productId: "",
  });

  // useEffect will make an API call everytime product name and currentUser id changes in the params. Reloads the details of the product (with 'name'=product.name)

  const getProduct = useCallback(async () => {
    let result = await JustRealFoodApi.getProductByName(name);
    let productResult = result[0];

    setProduct((product) => ({
      ...product,
      productResult,
    }));

    let newCartData = {
      cartId: uuid(),
      productName: product.name,
      productQuantity: "2",
      productPrice: product.price,
      userId: currentUser.id,
      productId: product.id,
    };

    setCartData((cartData) => ({
      ...cartData,
      newCartData,
    }));
  }, [name, currentUser.id, product.id, product.price, product.name]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  console.log("This is currentUser in ProductDetail.js", currentUser);
  console.log("THis is product in ProductDetail/getProductDetail", product);
  console.log("THis is piece of state cartData in ProductDetail", cartData);
  // while specific company details are being retrieved from the API, show the laoding spinner
  if (!product) return <LoadingSpinner />;

  // function is called when click on "Add to Cart" button
  const addItemToCart = async () => {
    try {
      let result = await JustRealFoodApi.createCart({
        cartId: cartData.cartId,
        productName: cartData.productName,
        productQuantity: cartData.productQuantity,
        productPrice: cartData.productPrice,
        userId: currentUser.id,
        productId: cartData.productId,
      });

      console.log("THis is result in ProductDetail/addItemToCart", result);

      return { success: true };
    } catch (errors) {
      console.error("Add item to cart failed", errors);
      return { success: false, errors };
    }
  };

  return (
    <div className="productDetail-container">
      <h1 className="productDetail-name">{product.name} Details</h1>
      <h5 className="productDetail-price">${product.price}</h5>
      <button className="productDetail-button" onClick={addItemToCart}>
        Add to Cart
      </button>
      <div className="product-images">
        <img
          className="productDetail-image2"
          src={product.imageUrl2}
          alt=""
        ></img>
        <img
          className="productDetail-image3"
          src={product.imageUrl3}
          alt=""
        ></img>
      </div>
    </div>
  );
}
export default ProductDetail;
