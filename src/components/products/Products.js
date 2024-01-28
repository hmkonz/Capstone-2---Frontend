import React from "react";
import { Link } from "react-router-dom";

import "./Products.css";

/** ** Show page with either dogfood or catfood products
 *
 * On mount, loads products from API.
 *
 * This is routed to at /api/products/category/:category
 *
 */

function Products({ name, imageUrl1 }) {
  return (
    <div className="products">
      <Link className="products-link" to={`/api/products/name/${name}`}>
        <h3 className="product-name">{name}</h3>
        <h5 className="product-image">
          {imageUrl1 && (
            <img
              className="product-image"
              src={imageUrl1}
              alt={name}
              style={{ width: "250px", height: "300px" }}
            />
          )}
        </h5>
      </Link>
    </div>
  );
}
export default Products;
