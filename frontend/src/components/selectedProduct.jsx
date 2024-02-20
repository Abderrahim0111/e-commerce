import { useDispatch } from "react-redux";
import {
  decreseQuantity,
  deleteProduct,
  increseQuantity,
} from "../redux/productSlice";

const SelectedProduct = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className=" flex items-center justify-between p-3 rounded-lg shadow-md mb-3">
      <i
        onClick={() => {
          dispatch(deleteProduct(product));
        }}
        className=" text-red-700 text-lg hover:cursor-pointer hover:opacity-90 fa-solid fa-trash"
      />
      <img src={product.images[0]} alt="product" className=" h-14 w-14" />
      <div className=" m-2 flex gap-2 items-center justify-center">
        <i
          onClick={() => {
            dispatch(decreseQuantity(product));
          }}
          className=" hover:cursor-pointer hover:opacity-90 fa-solid fa-minus"
        />
        <span className=" p-2 bg-slate-700 text-white rounded-full h-7 w-7 flex items-center justify-center">
          {product.selectedQuantity}
        </span>
        <i
          onClick={() => {
            if(product.selectedQuantity < product.quantity){
            dispatch(increseQuantity(product));
            }
          }}
          className={` hover:cursor-pointer hover:opacity-90 fa-solid fa-plus ${product.selectedQuantity >= product.quantity ? 'hidden' : ''}`}
        />
      </div>
      <p className=" text-red-700">{(product.selectedQuantity*product.price).toLocaleString('en-US')} DH</p>
    </div>
  );
};

export default SelectedProduct;
