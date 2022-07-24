import { useParams } from "react-router-dom";
import ProductContext from "../../../store/product-context";
// import CartContext from "../../../store/cart-context";
import ProductItemForm from "./ProductItemForm";
import { useContext } from "react";
import Zoom from "react-img-zoom";

const ProductDetail = () => {
  const params = useParams();
  const proCtx = useContext(ProductContext);
  console.log(proCtx.items);
  console.log(params.productId);

  const product = proCtx.items.find(
    (product) => product.id === params.productId
  );
  console.log(product);

  return (
    <section>
      <h1>Product Detail</h1>

      <div className="productItem">
        <h1>{product.title}</h1>
        <div>
          {/* <img src={product.imageUrl} alt={product.title}></img> */}
          <Zoom
            img={product.imageUrl}
            zoomScale={3}
            width={600}
            height={600}
            transitionTime={0.5}
          />
          <div className="product-details">${product.price}</div>
        </div>
        <ProductItemForm
          id={product.id}
          item={{
            id: product.id,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
          }}
        />
      </div>
    </section>
  );
};
export default ProductDetail;
