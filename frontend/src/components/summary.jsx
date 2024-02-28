import { useEffect, useState } from "react";
import Loading from "./loading";
import { api } from "../utils/end";

const Summary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await fetch(`${api}/fetchAllOrders`, {credentials: 'include'});
        const ordersData = await ordersRes.json();
        if (ordersData.error) {
          setLoading(false);
          console.error(ordersData.error);
          return;
        }
        setOrders(ordersData);

        const usersRes = await fetch(`${api}/fetchUsers`, {credentials: 'include'});
        const usersData = await usersRes.json();
        if (usersData.error) {
          setLoading(false);
          console.error(usersData.error);
          return;
        }
        setUsers(usersData);

        const productsRes = await fetch(`${api}/fetchProducts`, {credentials: 'include'});
        const productsData = await productsRes.json();
        if (productsData.error) {
          setLoading(false);
          console.error(productsData.error);
          return;
        }
        setProducts(productsData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [orders, users, products]);

  // Calculate totals using reduce
  const { total, unpaid, productsNumber } = orders.reduce(
    (acc, order) => {
      let subtotal = 0;
      let shipping = 0;

      order.products.forEach((product) => {
        subtotal += product.product.price * product.quantity;
        shipping += product.product.shippingPrice;
      });

      acc.subtotal += subtotal;
      acc.shipping += shipping;
      acc.productsNumber += shipping > 0 ? 1 : 0;
      acc.total += subtotal + (shipping > 0 ? shipping : shipping / (acc.productsNumber || 1));

      if (order.status !== "delivred") {
        acc.unpaid += 1;
      }

      return acc;
    },
    {
      total: 0,
      unpaid: 0,
      subtotal: 0,
      shipping: 0,
      productsNumber: 0,
    }
  );

  if (loading) {
    return (
      <div className=" mt-10">
        <Loading color={"gray"} height={30} width={30} />
      </div>
    );
  }
  return (
    <div className=" mt-16">
      <h1 className=" font-semibold text-2xl text-center">Stats</h1>
      <div className="mt-10 max-w-2xl mx-auto">
        <div className=" flex gap-4 mb-4">
          <div className=" p-3 flex-1 text-center border rounded-lg">
            <p className=" font-semibold text-2xl">{users}</p>
            <p>Total users</p>
          </div>
          <div className=" p-3 flex-1 text-center border rounded-lg">
            <p className=" font-semibold text-2xl">{orders.length}</p>
            <p>Total orders</p>
          </div>
        </div>
        <div className=" flex gap-4 mb-4">
          <div className=" p-3 flex-1 text-center border rounded-lg">
            <p className=" font-semibold text-2xl">{unpaid}</p>
            <p>Unpaid orders</p>
          </div>
          <div className=" p-3 flex-1 text-center border rounded-lg">
            <p className=" font-semibold text-2xl">{products.length}</p>
            <p>Total products</p>
          </div>
        </div>
        <div className=" p-3 text-center border rounded-lg">
          <p className=" font-semibold text-2xl">
            {total.toLocaleString("en-US")} DH
          </p>
          <p>Total sale</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
