import "./App.css";
import { Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";
import Products from "./components/Products/Products";
import Home from "./components/OtherPages/Home";
import About from "./components/OtherPages/About";
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
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/products">
          <Products></Products>
        </Route>
      </main>
    </CartProvider>
  );
}

export default App;
