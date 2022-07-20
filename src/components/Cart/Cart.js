import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const decreaseCountHandler = (item) => {
    cartCtx.removeItem(item);
  };
  const increaseCountHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            id={item.id}
            key={item.key}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            amount={item.quantity}
            onRemove={decreaseCountHandler.bind(null, item)}
            onAdd={increaseCountHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount}</span>
      </div>
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
