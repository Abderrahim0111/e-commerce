import { useSelector } from "react-redux";
import SelectedProduct from "../components/selectedProduct";
import { Link } from 'react-router-dom'
import Footer from "../components/footer";

const Cart = () => {
  const {currentUser} = useSelector((state) => state.user)
  const { products } = useSelector((state) => state.product);
  let subtotal = 0;
  return (
    <div>
      <div className=" mt-10 max-w-md mx-auto p-2 min-h-[calc(100vh-536px)]">
        {products.length > 0 ? (
          products.map((product, index) => {
            subtotal += Number(products[index].selectedQuantity)*Number(product.price);
            return <SelectedProduct product={product} key={index} />;
          })
        ) : (
          <p className=" text-center">No products in the cart.</p>
        )}
      
        { products.length > 0 && <div className=" flex flex-col p-3 shadow-md gap-3 max-w-xs mx-auto mt-10 rounded-lg">
          <p className=" text-lg text-center font-semibold">Cart Summary</p>
          <hr />
          <div className=" flex justify-between items-center">
            <span>Subtotal: </span>
            <span className=" font-semibold text-red-700">{subtotal.toLocaleString('en-US')} MAD</span>
          </div>
          { currentUser ? <Link to='/order' className=" text-white transition-all duration-300 text-center uppercase hover:opacity-90 p-2 rounded-lg bg-slate-700">checkout</Link> : <Link to='/login' className=" transition-all duration-300 text-white text-center uppercase hover:opacity-90 p-2 rounded-lg bg-red-700">You should login first</Link>}
        </div>}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
