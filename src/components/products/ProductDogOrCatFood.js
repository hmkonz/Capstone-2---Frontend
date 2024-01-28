import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import JustRealFoodApi from "../../api/api";
import Products from "./Products";
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

  /** the listDogOrCatFoods function is executed once when component is rendered **/
  const listDogOrCatFoods = useCallback(async () => {
    // retrieve products with category=products.DogFood or category=products.CatFoodfrom API
    let products = await JustRealFoodApi.getProductByCategory(category);

    // update piece of state 'products' with the results of the API call
    setProducts(products);
  }, [category]);

  console.log(
    "THis is products in ProductDogOrCatFood/listDogOrCatFoods",
    products
  );

  // useEffect will make an API call only once when component is rendered and retrieves all products from the database
  useEffect(() => {
    listDogOrCatFoods();
  }, [listDogOrCatFoods]);

  // while products are being retrieved from the API, show the laoding spinner
  if (!products) {
    return <LoadingSpinner />;
  }

  return (
    <div className="ProductList col-md-8 offset-md-2">
      {products.length ? (
        <div className="ProductDogOrCatFood-list">
          {/* map over piece of state 'products' and for every product, render the Products component with key, name and imageUrl passed in as props  */}
          {products.map((product) => (
            <Products
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl1={product.imageUrl1}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}
export default ProductDogOrCatFood;
