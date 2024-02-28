/* eslint-disable react/prop-types */
import { useState } from "react";
import Loading from "./loading";
import { api } from "../utils/end";

const OrderItem = ({ order }) => {
    const [loading, setloading] = useState(false);
  let productsName = [];
  let subtotal = 0;
  let shipping = 0;
  let productsNumber = 0;
  order.products.forEach((product) => {
    productsName.push({
      productname: product.product.title,
      quantity: product.quantity,
    });
    subtotal += product.product.price * product.quantity;
    shipping += product.product.shippingPrice;
    if (product.product.shippingPrice > 0) {
      productsNumber += 1;
    }
  });
  const handleDelete = async (orderId) => {
    setloading(true)
    try {
      const res = await fetch(`${api}/deleteUserOrder/${orderId}`, {
        method: "DELETE",
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        setloading(false)
        return console.log(data.error);
      }
      setloading(false)
      console.log(data);
    } catch (error) {
        setloading(false)
      console.log(error);
    }
  };
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr className={`bg-white ${order.status === 'delivred'? 'bg-green-200': ''}`}>
        <td className="px-6 py-4 whitespace-no-wrap">
          {productsName.map((productName, index) => (
            <p key={index} className=" flex gap-1">
              <span className=" w-40 line-clamp-1">{productName.productname}</span> <span>(x{productName.quantity})</span>
            </p>
          ))}
        </td>
        <td className=" px-6 py-4 whitespace-no-wrap">
          {subtotal.toLocaleString("en-US")} DH
        </td>
        <td className=" px-6 py-4 whitespace-no-wrap">
          {(productsNumber === 0
            ? shipping
            : shipping / productsNumber
          ).toLocaleString("en-US")}{" "}
          DH
        </td>
        <td className="px-6 py-4 whitespace-no-wrap">
          {(
            subtotal +
            (productsNumber === 0 ? shipping : shipping / productsNumber)
          ).toLocaleString("en-US")}{" "}
          DH
        </td>
        <td className="px-6 py-4 whitespace-no-wrap">
            {order.status}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap">
          <button
            onClick={() => {
              handleDelete(order._id);
            }}
            className=" hover:scale-105 duration-300  transition-all uppercase text-red-700"
          >
            { loading? <Loading color={"red"} height={24} width={24}/> : "delete"}
          </button>
        </td>
        
      </tr>
    </tbody>
  );
};

export default OrderItem;
