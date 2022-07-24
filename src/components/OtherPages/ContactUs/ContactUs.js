import React, { useRef } from "react";
import classes from "./ContactUs.module.css";
import Button from "../../UI/Button";

const ContactUs = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneNumberRef = useRef("");
  const feedBackRef = useRef("");

  const submitHandler = async (event) => {
    event.preventDefault();

    const contactDetails = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      feedBack: feedBackRef.current.value,
    };
    const response = await fetch(
      "https://create-react-movie-default-rtdb.firebaseio.com/contactDetails.json",
      {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <fieldset>
        <legend>Contact us:</legend>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        <label htmlFor="e-mail">E-mail</label>
        <input type="email" ref={emailRef}></input>
        <label htmlFor="phoneNumber">Phone number</label>
        <input type="text" ref={phoneNumberRef}></input>
        <label htmlFor="feedBack">Feed Back</label>
        <br />
        <textarea
          name="feedback"
          ref={feedBackRef}
          rows="10"
          cols="30"
        ></textarea>
        <br />
        <Button>Send</Button>
      </fieldset>
    </form>
  );
};

export default ContactUs;
