import React, { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <nav>
          <div>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </div>
        </nav>

        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;
