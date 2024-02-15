import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import JustRealFoodApi from "../../api/just_real_food_api";
import NewProducts from "./NewProducts";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of products
 *
 * On mount, loads products from API.
 *
 * This is routed to at /api/products
 *
 * ProductList renders -> { ProductCard }
 */

function NewProductList() {
  // initialize piece of state 'products' to an empty array
  const [products, setProducts] = useState([]);

  // useEffect will make an API call only once when component is rendered and retrieves all products from the database
  useEffect(function getAllProductsOnRender() {
    listAll();
  }, []);

  /** the listAll function is executed once when component is rendered **/
  async function listAll() {
    // retrieve products with name=product.name from API
    let products = await JustRealFoodApi.getAllProducts();
    // update piece of state 'products' with the results of the API call
    setProducts(products);
  }
  // while products are being retrieved from the API, show the laoding spinner
  if (!products) {
    return <LoadingSpinner />;
  }
  console.log(products);
  return (
    <>
      <h1 align="center" className="ProductList-title">
        All Dog and Cat Recipes
      </h1>
      {products.length ? (
        <Row xs={1} md={3} className="g-4">
          {/* map over piece of state 'products' and for every product, render the ProductCard component with key, name, ingredients, calorieCount, category, price, imageUrl passed in as props  */}
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
