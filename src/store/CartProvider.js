import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, updateItems] = useState([]);
  const [totalAmount, updateTotalAmount] = useState(0);

  const addItemToCartHandler = (addItem) => {
    const index = items.findIndex((item) => item.id === addItem.id);
    console.log("index of item to add", index);
    const existingCartItem = items[index];
    console.log("after index", existingCartItem);

    let updatedItems;
    if (index > -1) {
      console.log("item exists");
      const updatedItem = {
        ...existingCartItem,
        quantity: (existingCartItem.quantity = +existingCartItem.quantity + 1),
      };
      updatedItems = [...items];
      updatedItems[index] = updatedItem;
      console.log(updatedItem);
    } else {
      updateItems([...items, addItem]);
      console.log("first item added", addItem);
    }
    updateTotalAmount(totalAmount + addItem.price * addItem.quantity);
  };
  const removeItemFromCartHandler = (remItem) => {
    const index = items.findIndex((item) => item.id === remItem.id);
    console.log("item to remove", index);
    const existingCartItem = items[index];
    let updatedItems;

    if (index > -1 && Number(remItem.quantity) > 1) {
      const updatedItem = {
        ...existingCartItem,
        quantity: +remItem.quantity - 1,
      };
      updatedItems = [...items];
      updatedItems[index] = updatedItem;
      updateItems(updatedItems);
    } else {
      let changeItems = [...items];
      updatedItems = [
        ...changeItems.slice(0, index),
        ...changeItems.slice(index + 1, items.length),
      ];

      updateItems(updatedItems);
    }
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
