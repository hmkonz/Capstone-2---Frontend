import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import JustRealFoodApi from "../../api/just_real_food_api";
import NewProducts from "./NewProducts";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with either dogfood or catfood products
 *
 * On mount, loads products from API.
 *
 * This is routed to at /api/products/category/:category
 *
 * ProductDogOrCatFood renders -> <Products />
 */

function ProductDogOrCatFood() {
  // initialize piece of state 'products' to an empty array
  const [products, setProducts] = useState([]);
  // destructure 'category' from the params value
  const { category } = useParams();

  /** the listDogOrCatFoods function is executed once when component is rendered and when 'category' is changed  **/
  async function listDogOrCatFoods() {
    // retrieve products with category=products.DogFood or category=products.CatFoodfrom API
    let products = await JustRealFoodApi.getProductByCategory(category);
    // update piece of state 'products' with the results of the API call
    setProducts(products);
  }

  // useEffect will make an API call once when component is rendered and whenever product 'category' changes in the url, and it retrieves all products in that category from the database
  useEffect(() => {
    listDogOrCatFoods();
  }, [category]);

  // while products are being retrieved from the API, show the laoding spinner
  if (!products) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 align="center" className="category-title">
        {category} Recipes
      </h1>
      {products.length ? (
        <Row xs={1} md={3} className="category-row">
          {/* map over piece of state 'products' and for every product, render the Products component with {product} passed in as a prop  */}
          {products.map((product, idx) => (
            <Col align="center" key={idx}>
              <NewProducts product={product} />
            </Col>
          ))}
          {category === "DogFood" ? (
            <Link className="category-dog-return-link" exact to="/api/products">
              Return to All Products Page
            </Link>
          ) : (
            <Link className="category-cat-return-link" exact to="/api/products">
              Return to All Products Page
            </Link>
          )}
        </Row>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </>
  );
}
export default ProductDogOrCatFood;
