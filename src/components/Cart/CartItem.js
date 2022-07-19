import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <div>
          <h2>{props.title}</h2>
          <img src={props.imageUrl} alt={props.title}></img>
        </div>

        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.quantity}>x {props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
        <button onClick={props.onRemoveAll}>remove</button>
      </div>
    </li>
  );
};

export default CartItem;
