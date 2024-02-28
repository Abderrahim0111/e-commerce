/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const Thanks = () => {
  return (
    <div className="px-6 md:px-5 lg:px-10 xl:px-12">
      <div className=" my-10">
        <ul className=" flex gap-4 items-center justify-center">
          <li className=" cursor-default  flex gap-2 items-center">
            <i className="fa-solid fa-cart-shopping" />
            <span>Cart</span>
          </li>

          <li className=" border w-20 h-[2px]" />

          <li className=" cursor-default flex gap-2 items-center ">
            <i className="fa-solid fa-money-check-dollar" />
            <span>Checkout</span>
          </li>

          <li className=" border w-20 h-[2px]" />
          <li className=" cursor-default text-red-600 flex gap-2 items-center">
            <i className="fa-regular fa-circle-check" />
            <span>THANKS</span>
          </li>
        </ul>
      </div>
      <div className=" flex justify-center flex-col items-center gap-2">
        <h1 className=" text-2xl font-semibold">Thank you</h1>
        <p className=" text-center text-green-600 text-lg">
          Your order was completed successfully!
        </p>
        <p className=" text-center">
          Congratulations! 🎉 Your order has been successfully placed. Thank you
          for choosing <span className=" font-semibold">Boutiquti</span>! Our
          team is now hard at work to ensure that your items are carefully
          packed and swiftly shipped to you. You'll receive an email shortly
          confirming your order details. If you have any questions or need
          further assistance, feel free to reach out to our customer support
          team at{" "}
          <span className=" italic font-semibold">
            abderrahim.defaoui@gmail.com
          </span>
          . Thank you for being a part of{" "}
          <span className=" font-semibold">Boutiquti</span> family!
        </p>
        <Link to="/">
          <button className=" text-white uppercase bg-slate-700 p-3 rounded-lg mt-3 hover:opacity-90 duration-300 transition-all">
            Continue shopping
          </button>
        </Link>
        <Link to="/myorders">
          <button className=" text-red-700 mt-3 hover:scale-110 duration-300 transition-all">
            View orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Thanks;
