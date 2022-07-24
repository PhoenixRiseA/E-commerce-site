import React, { useContext } from "react";

import classes from "./Products.module.css";
import ProductItem from "./ProductItem/ProductItem";
import ProductContext from "../../store/product-context";
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
  const productArrWithId = productsArr.map((product) => {
    return { ...product, id: Math.random().toFixed(2).toString() };
  });
  console.log(productArrWithId);
  const proCtx = useContext(ProductContext);
  console.log(proCtx.items);
  proCtx.items = [...productArrWithId];
  console.log(proCtx.items);

  const productList = productArrWithId.map((product) => {
    return (
      <ProductItem
        id={product.id}
        key={Math.random().toString()}
        title={product.title}
        price={product.price}
        imageUrl={product.imageUrl}
      />
    );
  });
  // const dummyProp = <ProductDetail items={productList} />;

  return (
    <section className={classes.products}>
      <div>
        <div>{productList}</div>
      </div>
    </section>
  );
};
export default Products;
