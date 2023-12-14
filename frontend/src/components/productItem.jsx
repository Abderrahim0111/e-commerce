import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreseQuantity,
  increseQuantity,
} from "../redux/productSlice";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { products, productsId } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const selectedQuantity = () => {
    const filtredProducts = products.find((productR) => {
      return productR._id == product._id;
    });
    return filtredProducts.selectedQuantity;
  };
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0]}
          alt="product cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {product.title}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          {product.quantity > 0 ? (
            <p className=" text-green-700 text-sm">In stock</p>
          ) : (
            <p className=" text-red-700 text-sm">Out of stock</p>
          )}
        </div>
      </Link>
      <div className=" flex items-center justify-between">
        {productsId.includes(product._id) ? (
          <div className=" m-2 flex gap-2 items-center justify-center">
            <i
              onClick={() => {
                dispatch(decreseQuantity(product));
              }}
              className=" hover:cursor-pointer hover:opacity-90 fa-solid fa-minus"
            />
            <span className=" p-2 bg-slate-700 text-white rounded-full h-7 w-7 flex items-center justify-center">
              {selectedQuantity()}
            </span>
            <i
              onClick={() => {
                if(selectedQuantity() < product.quantity){
                  console.log(selectedQuantity())
                  console.log(product.quantity)
                  dispatch(increseQuantity(product));
                }
              }}
              className={` hover:cursor-pointer hover:opacity-90 fa-solid fa-plus ${selectedQuantity() >= product.quantity ? 'hidden' : ''}`}
            />
          </div>
        ) : (
          <button
            onClick={() => {
              dispatch(addToCart(product));
            }}
            disabled={product.quantity <= 0}
            type="button"
            className=" transition-all duration-300 m-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-90 hover:opacity-90 flex items-center gap-2 p-2 bg-slate-700 text-white justify-center"
          >
            <span>Add to cart </span>
            <i className="fa-solid fa-cart-shopping" />
          </button>
        )}
        <span className=" text-red-600 font-semibold m-2">
          {product.price.toLocaleString("en-US")} MAD
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
