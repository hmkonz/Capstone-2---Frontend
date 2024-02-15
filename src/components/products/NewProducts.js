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

function NewProducts(props) {
  const product = props.product;

  return (
    <div className="products">
      <Link className="products-link" to={`/api/products/name/${product.name}`}>
        <h3 className="product-name">{product.name}</h3>
        <h5 className="product-image">
          {product.image_url1 && (
            <img
              className="product-image"
              src={product.image_url1}
              alt={product.name}
              style={{ width: "250px", height: "300px" }}
            />
          )}
        </h5>
      </Link>
    </div>
  );
}
export default NewProducts;
