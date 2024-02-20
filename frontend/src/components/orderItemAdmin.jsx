/* eslint-disable react/prop-types */
import { useState } from "react";
import Loading from "./loading";
import { useNavigate } from "react-router-dom";
const OrderItemAdmin = ({ order }) => {
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("");
  const navigate = useNavigate();
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
  const handleChange = (e) => {
    setstatus(e.target.value);
  };
  const handleUpdate = async () => {
    const confirm = window.confirm("Update this order?");
    if (!confirm) return;
    const res = await fetch(`/api/updateOrder/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.error) {
      return console.log(data.error);
    }
    if (data.status === "delivred") {
      data.products.map(async (product) => {
        const productQuantity = product.product.quantity;
        const modifiedQuanity = productQuantity - product.quantity;
        const res2 = await fetch(`/api/updateQuantity/${product.product._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ modifiedQuanity }),
        });
        const data2 = await res2.json();
        return console.log(data2);
      });
    }
  };
  const handleDelete = async (orderId) => {
    console.log(status);
    const confirm = window.confirm("Delete this order?");
    if (!confirm) return;
    setloading(true);
    try {
      const res = await fetch(`/api/deleteUserOrder/${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return console.log(data.error);
      }
      setloading(false);
      console.log(data);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr
        className={`bg-white ${
          order.status === "delivred" ? "bg-green-200" : ""
        }`}
      >
        <td className="  px-6 py-4 whitespace-no-wrap capitalize">
          {order.user.username}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap">
          {productsName.map((productName, index) => (
            <p key={index} className=" flex gap-1">
              <span className=" w-40 line-clamp-1">
                {productName.productname}
              </span>{" "}
              <span>(x{productName.quantity})</span>
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
          {order.address + ", " + order.city}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap">
          <select
            className=" bg-transparent"
            name="status"
            onChange={handleChange}
          >
            <option value="" selected hidden>
              {order.status}
            </option>
            <option value="inprogress">In progress</option>
            <option value="delivring">Delivring</option>
            <option value="delivred">Delivred</option>
          </select>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap flex gap-4">
          <button
            className=" hover:scale-105 transition-all duration-500 uppercase text-blue-600"
            onClick={() => {
              navigate(`/view/${order._id}`);
            }}
          >
            <i className="fa-solid fa-eye text-lg" />
          </button>
          <button
            disabled={!status}
            className=" disabled:opacity-40 hover:scale-105 transition-all duration-500 uppercase text-green-600"
            onClick={handleUpdate}
          >
            <i className="fa-solid fa-pen-to-square text-lg" />
          </button>
          <button
            onClick={() => {
              handleDelete(order._id);
            }}
            className=" hover:scale-105 transition-all duration-500 uppercase text-red-700"
          >
            {loading ? (
              <Loading color={"red"} height={24} width={24} />
            ) : (
              <i className="fa-solid fa-trash text-lg" />
            )}
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default OrderItemAdmin;
