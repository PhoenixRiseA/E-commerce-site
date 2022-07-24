import React, { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contactUs">Contact Us</NavLink>
            </li>
            <HeaderCartButton onShowCart={props.onShowCart} />
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
