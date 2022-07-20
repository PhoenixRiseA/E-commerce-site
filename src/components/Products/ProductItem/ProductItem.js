import React from "react";
import ProductItemForm from "./ProductItemForm";
import "./ProductItem.module.css";
const ProductItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <div className="productItem">
      <h1>{props.title}</h1>
      <div>
        <img src={props.imageUrl} alt={props.title}></img>
        <div className="product-details">{price}</div>
      </div>
      <ProductItemForm id={props.id} item={props} />
    </div>
  );
};

export default ProductItem;
