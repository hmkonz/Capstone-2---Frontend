import React, { useState, useEffect } from "react";
import JustRealFoodApi from "../../api/api";
import Products from "./Products";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of products
 *
 * On mount, loads products from API.
 *
 * This is routed to at /api/products
 *
 * ProductList renders -> { ProductCard }
 */

function ProductList() {
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

  return (
    <div className="productList col-md-8 offset-md-2">
      <h1 className="productList-title"> All Dog and Cat Recipes</h1>
      {products.length ? (
        <div className="productList-list">
          {/* map over piece of state 'products' and for every product, render the ProductCard component with key, name, ingredients, calorieCount, category, price, imageUrl passed in as props  */}
          {products.map((product) => (
            <Products
              key={product.id}
              name={product.name}
              imageUrl1={product.image_url1}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}
export default ProductList;
