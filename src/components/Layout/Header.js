import React, { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>HOME</h2>
        <h2>STORE</h2>
        <h2>ABOUT</h2>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;
