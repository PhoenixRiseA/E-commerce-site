import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
// import classes from "./AuthForm.module.css";

const AuthForm = () => {
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
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" ref={emailInputRef} required />
        <br />
        <label htmlFor="password">Your password</label>
        <input type="password" id="password" ref={passwordInputRef} required />
        <br />
        <div>
          <button>{loading ? "loading" : "login"}</button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
