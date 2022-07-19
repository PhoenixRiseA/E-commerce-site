import "./App.css";
import Button from "./components/UI/Button";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { Fragment, useState } from "react";
const productsArr = [
  {
    title: "Colors",

    price: 100,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },

  {
    title: "Black and white Colors",

    price: 50,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },

  {
    title: "Yellow and Black Colors",

    price: 70,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },

  {
    title: "Blue Color",

    price: 100,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const addToCartHandler = () => {
    console.log("Added to cart");
  };

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
      <div className="App">
        <Header onShowCart={showCartHandler} />
        <div className="title">
          <h1>Clraze</h1>
        </div>

        <div className="App-items">
          {productsArr.map((product) => (
            <div className="App-item" key={Math.random()}>
              <img src={product.imageUrl} alt={product.title}></img>
              <div className="item-details">
                {product.title}: ${product.price}
                <Button type="submit" onClick={addToCartHandler}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
