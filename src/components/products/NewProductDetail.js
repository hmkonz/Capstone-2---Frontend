import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { NewCartContext } from "../../NewCartContext";
import JustRealFoodApi from "../../api/just_real_food_api";
import "./NewProductDetail.css";
// import Carts from "../carts/Carts";
// import "./ProductDetail.css";
// import UserContext from "../../auth/UserContext";
// import { CartContext } from "../context/CartContext";

/** Show page with details of a specific product and items can be added to users cart */

function NewProductDetail() {
  // retrieve the parameter (name) from the URL
  const { name } = useParams();
  // gives access to all the properties in NewCartContext (i.e. cart.items, cart.getProductQuantity(product.id), etc)
  const cart = useContext(NewCartContext);
  // initialize piece of state 'product'
  const [product, setProduct] = useState({
    id: "",
    name: "",
    ingredients: "",
    calorie_count: " ",
    category: " ",
    price: " ",
  });

  // looks to see it there's a product with 'id' in our cart
  const productQuantity = cart.getProductQuantity(product.id);

  // useEffect will make an API call once when component is rendered and whenever product 'name' changes in the url, and it retrieves all products in that category from the database
  useEffect(() => {
    async function getProduct() {
      let result = await JustRealFoodApi.getProductByName(name);
      return result[0];
    }

    getProduct().then((productResult) => {
      setProduct(productResult);
    });
  }, [name]);

  return (
    <Card align="right" style={{ width: "800px", height: "650px" }}>
      <Card.Body>
        {/* if there are products in the cart: */}
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              {/* For cart quantities > 1, make 'items' In Cart plural */}
              {productQuantity > 1 ? (
                <Form.Label column="true" sm="6">
                  In Cart: {productQuantity} items
                </Form.Label>
              ) : (
                // for cart quanties=1, make 'items' In Cart singular
                <Form.Label column="true" sm="6">
                  In Cart: {productQuantity} item
                </Form.Label>
              )}

              <Col sm="6">
                <Card.Title
                  className="productDetails-cardTitle1"
                  align="center"
                >
                  {product.name} {product.category} Details
                </Card.Title>
                <Card.Text className="productDetails-price" align="center">
                  ${product.price}
                </Card.Text>
                <div className="productDetail-buttons">
                  <Button
                    onClick={() => cart.removeOneItemFromCart(product.id)}
                    className="minus-btn"
                  >
                    -
                  </Button>
                  <div className="productDetails-productQuantity">
                    {productQuantity}
                  </div>
                  <Button
                    onClick={() => cart.addOneItemToCart(product.id)}
                    className="plus-btn"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => cart.deleteFromCart(product.id)}
                    className="remove-from-cart-btn"
                  >
                    Remove from cart
                  </Button>
                </div>
              </Col>
            </Form>

            {/* if there is are 2 images to show:*/}
            {product.image_url3 ? (
              <Row className="g-4">
                <Col>
                  <Card.Img className="col-img2" src={product.image_url2} />
                </Col>
                <Col>
                  <Card.Img className="col-img3" src={product.image_url3} />
                </Col>
              </Row>
            ) : (
              // if there is only 1 image:
              <Row className="g-4">
                <Col>
                  <Card.Img src={product.image_url2} />
                </Col>
              </Row>
            )}
          </>
        ) : (
          // If there are no products in the cart:
          <>
            <Button
              className="addToCart-btn"
              onClick={() => cart.addOneItemToCart(product.id)}
            >
              Add to Cart
            </Button>
            <Card.Title className="productDetails-cardTitle2" align="center">
              {product.name} {product.category} Details
            </Card.Title>

            {/* if there is are 2 images to show:*/}
            {product.image_url3 ? (
              <Row className="g-4">
                <Col>
                  <Card.Img src={product.image_url2} />
                </Col>
                <Col>
                  <Card.Img src={product.image_url3} />
                </Col>
              </Row>
            ) : (
              // if there is only 1 image:
              <Row className="g-4">
                <Col>
                  <Card.Img src={product.image_url2} />
                </Col>
              </Row>
            )}
          </>
        )}
        <Link className="ProductDetail-return-link" exact to="/api/products">
          Return to All Products Page
        </Link>
      </Card.Body>
    </Card>
  );
}
export default NewProductDetail;
