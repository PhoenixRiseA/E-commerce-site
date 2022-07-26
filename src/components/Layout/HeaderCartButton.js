import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
// import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  // const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
  //   return parseInt(curNumber) + parseInt(item.quantity);
  // }, 0);
  useEffect(() => {
    fetch(
      `https://shoppingapp-4aebd-default-rtdb.firebaseio.com/${authCtx.email}/cartItems.json`
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            // const numberOfCartItems = data.reduce((curNumber, item) => {
            //   return parseInt(curNumber) + parseInt(item.quantity);
            // }, 0);
            const loadedData = [];
            for (const key in data) {
              loadedData.push({
                key: key,
                id: data[key].id,
                price: data[key].price,
                amount: data[key].quantity,
                quantity: data[key].quantity,
                imageUrl: data[key].imageUrl,
              });
            }
            const numberOfCartItems = loadedData.length;
            setNumberOfCartItems(numberOfCartItems);
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [authCtx.email, cartCtx]);

  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
