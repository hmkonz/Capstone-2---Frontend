import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { NewCartContext } from "../../NewCartContext";
import UserContext from "../../auth/UserContext";
import JustRealFoodApi from "../../api/just_real_food_api";
import "./NewProductDetail.css";

/** Show page with details of a specific product and items can be added to users cart when user is logged in  */

function NewProductDetail() {
  // retrieve the parameter (name) from the URL
  const { name } = useParams();

  // deconstruct 'currentUser' from context value of UserContext declared in NewApp component
  const { currentUser } = useContext(UserContext);

  // useContext gives access to all the properties in NewCartContext (i.e. cart.items, cart.getProductQuantity(product.id), etc)
  const cart = useContext(NewCartContext);

  // initialize piece of state 'product' to an object with properties intialized to empty strings
  const [product, setProduct] = useState({
    id: "",
    name: "",
    ingredients: "",
    calorie_count: " ",
    category: " ",
    price: " ",
  });

  // useEffect will make an API call once when component is rendered and whenever product 'name' changes in the url, and it retrieves the product with that 'name'' from the database
  useEffect(() => {
    async function getProduct() {
      let result = await JustRealFoodApi.getProductByName(name);
      return result[0];
    }
    getProduct().then((productResult) => {
      setProduct(productResult);
    });
  }, [name]);

  // look to see it there's a product with 'id' in the cart and return the product.quantity
  const productQuantity = cart.getProductQuantity(product.id);

  return (
    <Card align="right" style={{ width: "800px", height: "650px" }}>
      <Card.Body>
        {/* if there are products in the cart and user is logged in: */}
        {productQuantity > 0 && currentUser ? (
          <>
            <Form as={Row}>
              {/* For cart quantities > 1, make 'items' In Cart plural */}
              {productQuantity > 1 ? (
                <Form.Label column="true" sm="6">
                  In Cart: {productQuantity} items
                </Form.Label>
              ) : (
                // for cart quantities=1, make 'items' In Cart singular
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
                <Card.Text className="productDetails-price2" align="center">
                  ${product.price}
                </Card.Text>
                {/* add + and - and remove buttons for adjusting the quantity of the product in the cart */}
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

            {/* if there is are 2 images to show (dog foods):*/}
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
              // if there is only 1 image to show (cat foods):
              <Row className="g-4">
                <Col>
                  <Card.Img src={product.image_url2} />
                </Col>
              </Row>
            )}
          </>
        ) : // if a specific product has not been added to the cart AND the user is logged in, add the Add to Cart button
        productQuantity === 0 && currentUser ? (
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
            <Card.Text className="productDetails-price" align="center">
              ${product.price}
            </Card.Text>

            {/* if there is are 2 images to show (dog foods):*/}
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
              // if there is only 1 image to show (cat foods):
              <Row className="g-4">
                <Col>
                  <Card.Img src={product.image_url2} />
                </Col>
              </Row>
            )}
          </>
        ) : (
          // else if user is not logged in, do not show the 'Add to Cart' button. User must be logged in to add items to the cart
          <>
            <Card.Title className="productDetails-cardTitle2" align="center">
              {product.name} {product.category} Details
            </Card.Title>
            <Card.Text className="productDetails-price" align="center">
              ${product.price}
            </Card.Text>

            {/* if there is are 2 images to show (dog foods):*/}
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
              // if there is only 1 image to show (cat foods):
              <Row className="g-4">
                <Col>
                  <Card.Img src={product.image_url2} />
                </Col>
              </Row>
            )}
          </>
        )}
        <Link className="ProductDetail-return-link" to="/api/products">
          Return to All Products Page
        </Link>
      </Card.Body>
    </Card>
  );
}

export default NewProductDetail;
