import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import JustRealFoodApi from "../../api/just_real_food_api";
import NewProducts from "./NewProducts";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of all products
 *
 * On mount, loads all products from API.
 *
 * This is routed to at /api/products
 *
 * NewProductList renders -> { NewProducts }
 */

function NewProductList() {
  // initialize piece of state 'products' to an empty array
  const [products, setProducts] = useState([]);

  // useEffect will make an API call only once when component is rendered and retrieves all products from the database
  useEffect(function getAllProductsOnRender() {
    // call the listAll function below when component is rendered
    listAll();
  }, []);

  /** the listAll function is executed once when component is rendered **/
  async function listAll() {
    // retrieve all products from the API
    let products = await JustRealFoodApi.getAllProducts();
    // update piece of state 'products' with the results of the API call
    setProducts(products);
  }
  // while products are being retrieved from the API, show the laoding spinner
  if (!products) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 align="center" className="ProductList-title">
        All Dog and Cat Recipes
      </h1>
      {/* if products are retrieved from the database, create a row and in each row create a column with a product name and image (when NewProducts is rendered) for product in products*/}
      {products.length ? (
        <Row xs={1} md={3} className="g-4">
          {/* map over piece of state 'products' and for every product, create a column and render the NewProducts component with piece of state {product} passed in as a prop  */}
          {products.map((product, idx) => (
            <Col align="center" key={idx}>
              <NewProducts product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </>
  );
}
export default NewProductList;
