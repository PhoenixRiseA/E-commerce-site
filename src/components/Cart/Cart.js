import React from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
const cartElements = [
  {
    title: "Colors",

    price: 100,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    quantity: 2,
  },

  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    quantity: 3,
  },

  {
    title: "Yellow and Black Colors",

    price: 70,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",

    quantity: 1,
  },
];
const hasItems = cartElements.length > 0;
const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartElements.map((ele) => {
        return (
          <CartItem
            key={Math.random()}
            title={ele.title}
            price={ele.price}
            imageUrl={ele.imageUrl}
            quantity={ele.quantity}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button}>Proceed to Order</button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
