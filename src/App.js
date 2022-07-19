import "./App.css";
import Button from "./components/UI/Button";
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
  const addToCartHandler = () => {
    console.log("Added to cart");
  };
  return (
    <div className="App">
      <header>
        <h1>Products for sale</h1>
        <p>cart</p>
      </header>
      <div className="App-items">
        {productsArr.map((product) => (
          <div className="App-item">
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
  );
}

export default App;
