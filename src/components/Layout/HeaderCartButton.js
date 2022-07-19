import React from "react";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span>Your Cart</span>
      <span className={classes.badge}>0</span>
    </button>
  );
};
export default HeaderCartButton;
