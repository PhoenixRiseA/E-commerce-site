import React, { useContext } from "react";
import classes from "./ProductItemForm.module.css";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import CartContext from "../../../store/cart-context";
const ProductItemForm = (props) => {
  const cartContext = useContext(CartContext);
  const addItemHandler = (e) => {
    e.preventDefault();
    const quantity = document.getElementById("quantity__" + props.id).value;

    cartContext.addItem({ ...props.item, quantity: quantity });
  };
  return (
    <form className={classes.form}>
      <Input
        label="Quantity"
        input={{
          id: "quantity__" + props.id,

          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button onClick={addItemHandler}>Add to Cart</Button>
    </form>
  );
};
export default ProductItemForm;
