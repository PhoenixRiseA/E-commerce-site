import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [loginState, setLoginState] = useState(true);
  const switchModeHandler = (e) => {
    e.preventDefault();
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
    setLoginState((state) => !state);
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setLoading(true);

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDovX5U11h_IZTG9O-7IcYVeXe9tpSTIGU";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed";
            console.log(errorMessage);
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const loginEmail = enteredEmail.replace(/[^a-zA-Z ]/g, "");
        authCtx.login(data.idToken, loginEmail);
        console.log(data);

        history.replace("/products");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section>
      <form onSubmit={submitHandler} className={classes.form}>
        {loginState ? <h1>Login</h1> : <h1>Sign up</h1>}
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" ref={emailInputRef} required />
        <br />
        <label htmlFor="password">Your password</label>
        <input type="password" id="password" ref={passwordInputRef} required />
        <br />
        <div>
          {loginState && (
            <button type="submit" className={classes.button}>
              {loading ? "loading" : "login"}
            </button>
          )}
          {!loginState && (
            <button type="submit" className={classes.button}>
              {loading ? "loading" : "sign up"}
            </button>
          )}
        </div>
      </form>
      <div className={classes.isLoggedIn}>
        {loginState ? (
          <button className={classes.toggle} onClick={switchModeHandler}>
            Create new acc
          </button>
        ) : (
          <button className={classes.toggle} onClick={switchModeHandler}>
            Login with existing account
          </button>
        )}
        <audio className="audio-element">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
      </div>
    </section>
  );
};
export default AuthForm;
