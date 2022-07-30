import React, { useState, useContext } from "react";
import CartContext from "./cart-context";
import AuthContext from "./auth-context";

const CartProvider = (props) => {
  const [items, updateItems] = useState([]);
  const [totalAmount, updateTotalAmount] = useState(0);
  const authCtx = useContext(AuthContext);

  const addItemToCartHandler = (addItem) => {
    let newTotalAmount;
    const index = items.findIndex((item) => item.id === addItem.id);
    console.log("index of item to add", index);
    const existingCartItem = items[index];
    console.log("after index", existingCartItem);

    let updatedItems;
    console.log(authCtx.email);

    if (index > -1 && +existingCartItem.quantity >= 0) {
      console.log("item exists");
      const updatedItem = {
        ...existingCartItem,
        quantity: (existingCartItem.quantity = +existingCartItem.quantity + 1),
      };
      delete updatedItem._id;
      updatedItems = [...items];

      console.log(updatedItem.id);
      console.log(updatedItem._id);
      console.log(updatedItem);

      fetch(
        `https://crudcrud.com/api/0f329a760b2e47b9b57b05ef04f77309/cartItems${authCtx.email}/${existingCartItem._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              console.log(data);
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      updatedItems[index] = existingCartItem;
      updateItems([...updatedItems]);
      newTotalAmount = totalAmount + +existingCartItem.price;
      console.log(newTotalAmount);
      updateTotalAmount(newTotalAmount);
      console.log(updatedItems);
    } else {
      fetch(
        `https://crudcrud.com/api/0f329a760b2e47b9b57b05ef04f77309/cartItems${authCtx.email}`,
        {
          method: "POST",
          body: JSON.stringify(addItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .then((data) => {
          console.log("new Items added to crud", data);
          newTotalAmount = totalAmount + +data.price * +data.quantity;
          updateTotalAmount(newTotalAmount);
          updateItems([...items, data]);
        });
      // updateItems([...items, addItem]);
      // console.log("new item added", addItem);
    }
  };
  const removeItemFromCartHandler = (remItem) => {
    let newTotalAmount;
    const index = items.findIndex((item) => item.id === remItem.id);
    console.log("item to remove", index);
    const existingCartItem = items[index];
    let updatedItems;

    if (index > -1 && Number(existingCartItem.quantity) > 1) {
      const updatedItem = {
        ...existingCartItem,
        quantity: (existingCartItem.quantity = +existingCartItem.quantity - 1),
      };
      updatedItems = [...items];
      // updatedItems[index] = updatedItem;
      // updateItems(updatedItems);
      delete updatedItem._id;
      console.log(updatedItem);

      fetch(
        `https://crudcrud.com/api/0f329a760b2e47b9b57b05ef04f77309/cartItems${authCtx.email}/${existingCartItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              console.log(data);
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      updatedItems[index] = existingCartItem;
      updateItems([...updatedItems]);
      newTotalAmount = totalAmount - +existingCartItem.price;
      updateTotalAmount(newTotalAmount);
    } else {
      let changeItems = [...items];

      fetch(
        `https://crudcrud.com/api/0f329a760b2e47b9b57b05ef04f77309/cartItems${authCtx.email}/${remItem._id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            updatedItems = [
              ...changeItems.slice(0, index),
              ...changeItems.slice(index + 1, items.length),
            ];
            updateItems(updatedItems);
            updateTotalAmount(totalAmount - +remItem.price);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
