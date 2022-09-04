import React from "react";
import { Link } from "react-router-dom";
import ProductItemForm from "./ProductItemForm";
import "./ProductItem.module.css";

const ProductItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <div className="productItem">
      <h1>
        <Link to={`/products/${props.id}`}>{props.title}</Link>
      </h1>
      <div>
        <Link to={`/products/${props.id}`}>
          <img src={props.imageUrl} alt={props.title}></img>
        </Link>

        <div className="product-details">{price}</div>
      </div>
      <ProductItemForm id={props.id} item={props} />
    </div>
  );
};

export default ProductItem;
