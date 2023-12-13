import { useState } from "react";
import Loading from "./loading";

const OrderItemAdmin = ({ order }) => {
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("");
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
    const res = await fetch(`/api/updateOrder/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.error) {
      return console.log(data.error);
    }
  };
  const handleDelete = async (orderId) => {
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
      <tr className={`bg-white ${order.status === 'delivred'? 'bg-green-100': ''}`}>
        <td className="  px-6 py-4 whitespace-no-wrap capitalize">
          {order.user.username}
        </td>
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
          {order.address + ", " + order.city}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap">
          <select className=" bg-transparent" name="status" onChange={handleChange}>
            <option value="" selected hidden>
              {order.status}
            </option>
            <option value="inprogress">In progress</option>
            <option value="delivring">Delivring</option>
            <option value="delivred">Delivred</option>
          </select>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap flex flex-col">
          <button
            onClick={() => {
              handleDelete(order._id);
            }}
            className=" hover:scale-105 transition-all duration-500 uppercase text-red-700"
          >
            {loading ? (
              <Loading color={"red"} height={24} width={24} />
            ) : (
              "delete"
            )}
          </button>
          <button className=" hover:scale-105 transition-all duration-500 uppercase text-blue-600" onClick={handleUpdate}>
            update
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default OrderItemAdmin;
