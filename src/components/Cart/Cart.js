import React, { useCallback, useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const authCtx = useContext(AuthContext);
  const [cartItems, setCartItems] = useState();
  const decreaseCountHandler = useCallback(
    (item) => {
      cartCtx.removeItem(item);
    },
    [cartCtx]
  );
  const increaseCountHandler = useCallback(
    (item) => {
      console.log("adding to existing cart", item);
      cartCtx.addItem(item);
    },
    [cartCtx]
  );

  const removeAll = useCallback(
    (item) => {
      cartCtx.removeAll(item);
    },
    [cartCtx]
  );
  useEffect(() => {
    fetch(
      `https://shoppingapp-4aebd-default-rtdb.firebaseio.com//${authCtx.email}/cartItems.json`
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          console.log(data);
          const loadedData = [];
          for (const key in data) {
            loadedData.push({
              id: data[key].id,
              key: key,
              title: data[key].title,
              price: data[key].price,
              imageUrl: data[key].imageUrl,
              amount: data[key].quantity,
            });
          }
          console.log(loadedData);
          const cartList = loadedData.map((item) => {
            return (
              <CartItem
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                amount={item.amount}
                onRemove={decreaseCountHandler.bind(null, item)}
                onAdd={increaseCountHandler.bind(null, item)}
                onRemoveAll={removeAll.bind(null, item)}
              />
            );
          });

          setCartItems(cartList);
        });
      }
    });
  }, [
    authCtx.email,
    cartCtx,
    increaseCountHandler,
    decreaseCountHandler,
    removeAll,
    setCartItems,
  ]);

  console.log(cartItems);

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
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
