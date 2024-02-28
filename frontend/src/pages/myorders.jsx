import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/loading";
import OrderItem from "../components/orderItem";
import { Link } from "react-router-dom";
import { api } from "../utils/end";

const Myorders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${api}/fetchUserOrders/${currentUser._id}`, {credentials: 'include'});
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return console.log(data.error);
      }
      setorders(data);
      setloading(false);
    };
    fetchOrders();
  }, [orders]);
  if (loading)
    return (
      <div className=" mt-10">
        <Loading color={"gray"} height={30} width={30} />
      </div>
    );
  return (
    <div className=" mt-16 max-w-max mx-auto px-2 ">
          <h1 className=" text-center font-semibold text-2xl my-10">
            My orders
          </h1>
      {orders.length > 0 ? (
        <div className=" overflow-x-scroll scrollbar">
          <table className=" divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className=" px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
                <th className=" px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Shipping
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            {orders.map((order, index) => {
              return <OrderItem key={index} order={order} />;
            })}
          </table>
        </div>
      ) : (
        <div className="text-center mt-8">
          <p className=" text-lg">No orders found at the moment.</p>
          <Link to="/" className=" underline">
            Start shopping to see your orders!
          </Link>
        </div>
      )}
    </div>
  );
};

export default Myorders;
