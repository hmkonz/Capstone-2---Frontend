import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JustRealFoodApi from "../../api/api";
import "./ProductDetail.css";
import CartCard from "../carts/CartCard";
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

  // initialize piece of state "addToCartConfirmed" to false
  const [addToCartConfirmed, setAddToCartConfirmed] = useState(false);

  // initialize piece of state 'showButton' to true
  const [showButton, setShowButton] = useState(true);

  // initialize piece of state 'product'
  const [product, setProduct] = useState({
    id: "",
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

  // useEffect will make an API call everytime product name changes in the params. Reloads the details of the product (with 'name'=product.name)

  useEffect(() => {
    async function getProduct() {
      let result = await JustRealFoodApi.getProductByName(name);
      return result[0];
    }

    getProduct()
      .then((productResult) => {
        setProduct(productResult);

        let newCartData = {
          cartId: uuid(),
          productName: productResult.name,
          productQuantity: "2",
          productPrice: productResult.price.toString(),
          userId: currentUser.id,
          productId: productResult.id.toString(),
        };

        setCartData(newCartData);
      })
      .catch((err) => {
        console.error(`Error in ProductDetail/getProduct: ${err}`);
      });
  }, [name, currentUser.id]);

  console.log("This is currentUser", currentUser);
  console.log("THis is product in ProductDetail/getProductDetail", product);
  console.log("THis is piece of state cartData in ProductDetail", cartData);

  // while specific company details are being retrieved from the API, show the laoding spinner
  if (!product) return <LoadingSpinner />;

  // function is called when click on "Add to Cart" button and addToCartConfirmed is toggled to 'true'
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

      setAddToCartConfirmed(true);
      setShowButton(false);
      console.log("THis is result in ProductDetail/addItemToCart", result);
    } catch (errors) {
      console.error("Add item to cart failed", errors);
    }
  };
  return (
    <div className="productDetail-container">
      {addToCartConfirmed ? (
        <CartCard />
      ) : (
        <div>
          <button className="productDetail-button" onClick={addItemToCart}>
            Add to Cart
          </button>
          <h1 className="productDetail-name">{product.name} Details</h1>
          <h5 className="productDetail-price">${product.price}</h5>

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
      )}
    </div>
  );
}
export default ProductDetail;
