import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { Link, useNavigate } from "react-router-dom";
import SelectedProduct from "../components/selectedProduct";
import Thanks from "../components/thanks";
import { logedOut } from "../redux/productSlice";
import Footer from "../components/footer";

const Order = () => {
  let subtotal = 0;
  let shipping = 0;
  let productsNumber = 0;
  const { products } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);
  const [orderSuccess, setorderSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [loadingF, setloadingF] = useState(true);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const [costumerData, setcostumerData] = useState({
    products: products.map((product) => {
      return { product: product._id, quantity: product.selectedQuantity };
    }),
    user: currentUser && currentUser._id,
  });
  const handleChange = (e) => {
    setcostumerData({ ...costumerData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(costumerData),
      });
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return seterror(data.error.message);
      }
      setloading(false);
      seterror("");
      setorderSuccess(true);
      dispatch(logedOut());
    } catch (error) {
      setloading(false);
      seterror(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      setloadingF(false);
      navigate("/");
    } else {
      setloadingF(false);
    }
  }, [currentUser]);
  if (loadingF) {
    return (
      <div className=" mt-10">
        <Loading color={"gray"} height={30} width={30} />
      </div>
    );
  }

  if (orderSuccess) {
    return <Thanks />;
  }

  return (
    <div className="px-6 md:px-5 lg:px-10 xl:px-12 ">
      <div className=" mt-10">
        <ul className=" flex gap-4 items-center justify-center">
          <Link to="/cart">
            <li className=" transition-all duration-300 hover:text-red-600 flex gap-2 items-center">
              <i className="fa-solid fa-cart-shopping" />
              <span>Cart</span>
            </li>
          </Link>
          <li className=" border w-20 h-[2px]" />
          <li className=" flex gap-2 items-center text-red-600">
            <i className="fa-solid fa-money-check-dollar" />
            <span>Checkout</span>
          </li>
          <li className=" border w-20 h-[2px]" />
          <li className=" opacity-50 cursor-default flex gap-2 items-center">
            <i className="fa-regular fa-circle-check" />
            <span>THANKS</span>
          </li>
        </ul>
      </div>
      <div className=" flex-col md:flex-row-reverse flex gap-8 mt-10">
        <div className=" flex-1 lg:flex-[0.6]">
          <h1 className=" font-semibold text-lg">Your order</h1>
          <div className=" flex flex-col justify-between">
            {products.map((product, index) => {
              subtotal += product.price * product.selectedQuantity;
              shipping += product.shippingPrice;
              if (product.shippingPrice > 0) {
                productsNumber += 1;
              }
              return (
                <div key={index} className="">
                  <SelectedProduct product={product} />
                </div>
              );
            })}
            <div className=" flex flex-col gap-6">
              <div className=" flex justify-between items-center">
                <p>Subtotal</p>
                <p className=" font-semibold">
                  {subtotal.toLocaleString("en-US")} DH
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Shipping</p>
                <p className="font-semibold">
                  {(productsNumber === 0
                    ? shipping
                    : shipping / productsNumber
                  ).toLocaleString("en-US")}{" "}
                  DH
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-red-600">Total</p>
                <p className=" text-xl font-semibold text-red-600">
                  {(
                    (productsNumber === 0
                      ? shipping
                      : shipping / productsNumber) + subtotal
                  ).toLocaleString("en-US")}{" "}
                  DH
                </p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className=" flex-1 flex flex-col gap-4">
          <div className=" flex flex-col gap-2">
            <label className=" font-semibold text-lg">
              Customer information
            </label>
            <input
              className=" bg-slate-100 p-3 rounded-lg border"
              type="text"
              name="email"
              placeholder="Email address"
              required
              value={currentUser.email}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" font-semibold text-lg">
              Billing Information
            </label>
            <input
              className=" bg-slate-100 p-3 rounded-lg border"
              type="text"
              name="username"
              placeholder="username"
              required
              value={currentUser.username}
            />
            <div className=" flex flex-col sm:flex-row gap-3 ">
              <input
                className=" p-3 flex-1 rounded-lg border"
                type="text"
                name="address"
                placeholder="Address"
                required
                onChange={handleChange}
              />
              <input
                className=" p-3 flex-1 rounded-lg border"
                type="text"
                name="city"
                placeholder="City"
                required
                onChange={handleChange}
              />
            </div>
            <input
              className=" p-3 rounded-lg border"
              type="number"
              name="phone"
              placeholder="Phone number"
              required
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" font-semibold text-lg">Payment</label>
            <div className=" flex gap-3">
              <input
                type="radio"
                name="cashondelivery"
                id="cashondelivery"
                checked
              />
              <label htmlFor="cashondelivery">Cash on delivery</label>
            </div>
            <p className=" italic">Pay in cash on delivery.</p>
          </div>
          <p className=" opacity-50">
            Your personal data will be used to process your order, accompany you
            during your visit to the website
          </p>
          <button
            disabled={loading|| ((productsNumber === 0 ? shipping  : shipping / productsNumber) + subtotal) === 0}
            className=" disabled:opacity-90 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-300  text-white uppercase p-3 rounded-lg bg-slate-700"
          >
            {loading ? (
              <Loading color={"white"} height={24} width={24} />
            ) : (
              <p className=" flex items-center gap-2 justify-center">
                <i className="fa-solid fa-lock" />
                <span>
                  place order{" "}
                  {(
                    (productsNumber === 0
                      ? shipping
                      : shipping / productsNumber) + subtotal
                  ).toLocaleString("en-US")}{" "}
                  DH
                </span>
              </p>
            )}
          </button>
          {error && <p className=" text-red-700">{error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
