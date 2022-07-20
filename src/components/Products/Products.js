import React from "react";

import classes from "./Products.module.css";
import ProductItem from "./ProductItem/ProductItem";
// import ProductItemForm from "./ProductItem/ProductItemForm";
const productsArr = [
  {
    title: "Colors",

    price: 100,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },

  {
    title: "Black and white Colors",

    price: 50,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },

  {
    title: "Yellow and Black Colors",

    price: 70,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },

  {
    title: "Blue Color",

    price: 100,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Products = () => {
  const productList = productsArr.map((product) => {
    return (
      <ProductItem
        id={Math.random().toFixed(2).toString()}
        key={Math.random().toString()}
        title={product.title}
        price={product.price}
        imageUrl={product.imageUrl}
      />
    );
  });

  //   const productList = productsArr.map((props) => {
  //     return (
  //       <div className="product" key={Math.random()}>
  //         <div>
  //           <img src={props.imageUrl} alt={props.title}></img>
  //           <div className="product-details">
  //             {props.title}: ${props.price}
  //           </div>
  //         </div>
  //         <div>
  //           <ProductItemForm id={props.id} item={props} />
  //         </div>
  //       </div>
  //     );
  //   });
  return (
    <section className={classes.products}>
      <div>
        <div>{productList}</div>
      </div>
    </section>
  );
};
export default Products;
