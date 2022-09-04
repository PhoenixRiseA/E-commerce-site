import React, { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
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
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/contactUs"
              >
                Contact Us
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/auth"
                >
                  Login
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <HeaderCartButton onShowCart={props.onShowCart} />
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Button onClick={authCtx.logout}>Logout</Button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
