import React, { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
// import Button from "../UI/Button";
const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn);
  // const onLogoutHandler = () => {
  //   authCtx.logout();
  // };
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
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>

            <li>
              <HeaderCartButton onShowCart={props.onShowCart} />
            </li>
            {/* {!isLoggedIn && (
              <li>
                <NavLink to="/auth"></NavLink>
              </li>
            )} */}
            {/* {isLoggedIn && (
              <li>
                <Button onClick={onLogoutHandler}>Logout</Button>
              </li>
            )} */}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
