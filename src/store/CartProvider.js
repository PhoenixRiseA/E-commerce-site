import React, { useState, useContext, useEffect } from "react";
import CartContext from "./cart-context";
import AuthContext from "./auth-context";

const CartProvider = (props) => {
  const [items, updateItems] = useState([]);

  const [totalAmount, updateTotalAmount] = useState(0);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    fetch(
      `https://shoppingapp-4aebd-default-rtdb.firebaseio.com/${authCtx.email}/cartItems.json`
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);

            const loadedData = [];
            if (data) {
              for (const key in data) {
                loadedData.push({
                  key: key,
                  id: data[key].id,
                  price: data[key].price,
                  amount: data[key].quantity,
                  quantity: data[key].quantity,
                  imageUrl: data[key].imageUrl,
                });
              }
            }
            updateItems(loadedData);
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [authCtx.email, updateItems]);
  const addItemToCartHandler = (addItem) => {
    let newTotalAmount;
    console.log(items);
    console.log(addItem);
    console.log(items[0]);
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
      // delete updatedItem._id;
      updatedItems = [...items];

      console.log(updatedItem.id);
      // console.log(updatedItem._id);
      console.log(updatedItem);

      fetch(
        `https://shoppingapp-4aebd-default-rtdb.firebaseio.com/${authCtx.email}/cartItems/${existingCartItem.key}.json`,
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
        `https://shoppingapp-4aebd-default-rtdb.firebaseio.com/${authCtx.email}/cartItems.json`,
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
          console.log("new Items added to firebase", data);

          newTotalAmount = totalAmount + +addItem.price * +addItem.quantity;
          updateTotalAmount(newTotalAmount);

          const loadedData = { ...addItem, key: data.name };
          updateItems([...items, loadedData]);
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

      console.log(updatedItem);

      fetch(
        `https://shoppingapp-4aebd-default-rtdb.firebaseio.com/${authCtx.email}/cartItems/${updatedItem.key}.json`,
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
        `https://shoppingapp-4aebd-default-rtdb.firebaseio.com/${authCtx.email}/cartItems/${existingCartItem.key}.json`,
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
  const removeAllItemsFromCartHandler = (remItem) => {
    const index = items.findIndex((item) => item.id === remItem.id);
    console.log("item to remove", index);
    const existingCartItem = items[index];
    let updatedItems;

    let changeItems = [...items];

    fetch(
      `https://shoppingapp-4aebd-default-rtdb.firebaseio.com/${authCtx.email}/cartItems/${existingCartItem.key}.json`,
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
          updateTotalAmount(
            totalAmount - +remItem.price * +existingCartItem.quantity
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    removeAll: removeAllItemsFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
