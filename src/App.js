import "./App.css";

import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";
import Products from "./components/Products/Products";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
      <div className="App">
        <Header onShowCart={showCartHandler} />
        <div className="title">
          <h1>Clraze</h1>
        </div>
      </div>
      <main>
        <Products />
      </main>
    </CartProvider>
  );
}

export default App;
