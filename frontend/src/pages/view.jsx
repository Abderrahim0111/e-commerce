import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/loading";
import { api } from "../utils/end";

const View = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  let subtotal = 0;
  let shipping = 0;
  let productsNumber = 0;

  if (order.products && order.products.length > 0) {
    order.products.forEach((product) => {
      subtotal += product.product.price * product.quantity;
      shipping += product.product.shippingPrice;
      if (product.product.shippingPrice > 0) {
        productsNumber += 1;
      }
    });
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${api}/fetchOrder/${orderId}`, {credentials: 'include'});
        const data = await res.json();
        if (data.error) {
          setLoading(false);
          return console.log(data.error);
        }
        setLoading(false);
        setOrder(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="mt-10">
        <Loading color={"gray"} width={30} height={30} />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="font-bold text-3xl text-blue-600 mb-6">Order Details</h1>
      <p className="mb-2">
        <span className="font-semibold text-gray-800">Username:</span>{" "}
        {order.user.username}
      </p>
      <p className="mb-2">
        <span className="font-semibold text-gray-800">Email:</span>{" "}
        {order.user.email}
      </p>
      <p className="mb-2">
        <span className="font-semibold text-gray-800">Address:</span>{" "}
        {order.address}, {order.city}
      </p>
      <p className="mb-4">
        <span className="font-semibold text-gray-800">Phone:</span>{" "}
        {order.phone}
      </p>
      <ul className="mb-4">
        <li className="font-semibold text-gray-800">Products:</li>
        {order.products.map((product, index) => (
          <li className="flex items-center mb-2" key={index}>
            <p className="font-semibold text-gray-800">
              {product.product.title} (x{product.quantity})
            </p>
            <p className="ml-4 text-gray-700">Price: {(product.product.price * product.quantity).toLocaleString("en-US")} DH</p>
            <p className="ml-4 text-gray-700">
              Shipping: {(product.product.shippingPrice).toLocaleString("en-US")} DH
            </p>
          </li>
        ))}
      </ul>
      <p className="font-semibold text-xl text-blue-700">
        Total:{" "}
        {(subtotal + (productsNumber === 0 ? shipping : shipping / productsNumber)).toLocaleString("en-US")} DH
      </p>
    </div>
  );
};

export default View;
