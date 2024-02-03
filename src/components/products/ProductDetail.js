import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import JustRealFoodApi from "../../api/api";
import Carts from "../carts/Carts";
import "./ProductDetail.css";
import UserContext from "../../auth/UserContext";

/** Show page with details of a specific product and items can be added to users cart */

function ProductDetail() {
  // retrieve the parameter (name) from the URL
  const { name } = useParams();
  console.log("THis is product name in useParmas ofProductDetail", name);

  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);
  console.log("This is currentUser in ProductDetail.js", currentUser);

  // initialize piece of state "cart" to an empty array
  const [carts, setCarts] = useState([]);

  // initialize piece of state "addToCartConfirmed" to false
  const [addToCartConfirmed, setAddToCartConfirmed] = useState(false);

  // initialize piece of state 'showButton' to true
  const [showButton, setShowButton] = useState(true);

  // initialize piece of state 'product'
  const [product, setProduct] = useState({
    id: "",
    name: "",
    ingredients: "",
    calorie_count: " ",
    category: " ",
    price: " ",
  });

  const [cartData, setCartData] = useState({
    product_name: "",
    product_price: "",
    user_id: "",
    product_id: "",
  });

  // useEffect will make an API call everytime product name or currentUser.id changes in the params. Reloads the details of the product (with 'name'=product.name)

  useEffect(() => {
    async function getProduct() {
      let result = await JustRealFoodApi.getProductByName(name);
      return result[0];
    }

    getProduct()
      .then((productResult) => {
        setProduct(productResult);

        let newCartData = {
          product_name: productResult.name,
          product_price: productResult.price.toString(),
          user_id: currentUser.id,
          product_id: productResult.id.toString(),
        };

        setCartData(newCartData);
        console.log(
          "THis is newCartData in ProductDetail/getProductDetail",
          newCartData
        );
      })
      .catch((err) => {
        console.error(`Error in ProductDetail/getProduct: ${err}`);
      });
  }, [name, currentUser.id]);

  console.log("This is currentUser", currentUser);
  console.log("THis is product in ProductDetail/getProductDetail", product);

  console.log("THis is piece of state cartData in ProductDetail", cartData);

  // define counter and set it equal to zero
  let counter = 0;

  // function is called when click on "Add to Cart" button and addToCartConfirmed is toggled to 'true'
  const addItemToCart = async () => {
    try {
      let result = await JustRealFoodApi.addItemToCart({
        product_name: cartData.product_name,
        product_price: cartData.product_price,
        user_id: currentUser.id,
        product_id: cartData.product_id,
      });
      setCarts(result);
      setAddToCartConfirmed(true);
      setShowButton(false);
      counter = counter++;

      console.log("THis is result in ProductDetail/addItemToCart", result);
      console.log("THis is counter in ProductDetail/addItemToCart", counter);
    } catch (errors) {
      console.error("Add item to cart failed", errors);
    }
  };

  console.log("THis is piece of state carts in ProductDetail", carts);

  return (
    <div className="productDetail-container">
      {addToCartConfirmed ? (
        <div className="productDetail-msg">
          <p className="addToCart-msg">Item added to cart!</p>
          <button onClick={() => setAddToCartConfirmed(true)}>
            Show Cart Details
          </button>
          {addToCartConfirmed && <Carts carts={carts} />}
          {/* <Link className="shopping-link" exact to="/api/products">
            Continue Shopping
          </Link> */}
        </div>
      ) : (
        <div>
          <div className="productDetail-div">
            <h1 className="productDetail-name">{product.name} Details</h1>
            <h5 className="productDetail-price">${product.price}</h5>
            <button
              className="productDetail-add-button"
              onClick={addItemToCart}
            >
              Add to Cart
            </button>
            <Link
              className="ProductDetail-return-link"
              exact
              to="/api/products"
            >
              Return to Products Page
            </Link>
          </div>
          <div className="product-images">
            <img
              className="productDetail-image2"
              src={product.image_url2}
              alt=""
            ></img>
            <img
              className="productDetail-image3"
              src={product.image_url3}
              alt=""
            ></img>
          </div>
          <br></br>
          <br></br>
        </div>
      )}
    </div>
  );
}
export default ProductDetail;
