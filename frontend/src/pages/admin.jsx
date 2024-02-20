import { useEffect, useState } from "react";
import AddProducts from "../components/addProducts";
import ManageProducts from "../components/manageProducts";
import ManageOrders from "../components/manageOrders";
import Summary from "../components/summary";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

const Admin = () => {
  const [isAddProducts, setisAddProducts] = useState(false);
  const [isManageProducts, setisManageProducts] = useState(false);
  const [isManageOrders, setisManageOrders] = useState(false);
  const [isSummary, setisSummary] = useState(true);
  const [loadingF, setloadingF] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdmin = async () => {
      if (!currentUser || (currentUser && currentUser._id !== import.meta.env.VITE_ADMIN)) {
        setloadingF(false);
        navigate("/");
      } else {
        setloadingF(false);
      }
    };
  
    checkAdmin();
  }, [currentUser, navigate]);
  if (loadingF)
    return (
      <div className=" mt-10">
        <Loading color={"gray"} height={30} width={30} />
      </div>
    );
  return (
    <div>
      <div className="shadow-md">
        <ul className="flex flex-col text-center md:flex-row md:justify-center md:gap-10">
          <li
            onClick={() => {
              setisAddProducts(false);
              setisManageProducts(false);
              setisManageOrders(false);
              setisSummary(true);
            }}
            className={` hover:cursor-pointer transition-all duration-450 p-2 ${
              isSummary && "bg-slate-700 text-white "
            }`}
          >
            <i className="fa-solid fa-list" /> <span>Summary</span>
          </li>
          <li
            onClick={() => {
              setisAddProducts(true);
              setisManageProducts(false);
              setisManageOrders(false);
              setisSummary(false);
            }}
            className={` hover:cursor-pointer transition-all duration-450 p-2 ${
              isAddProducts && "bg-slate-700 text-white "
            }`}
          >
            <i className="fa-solid fa-plus" /> <span>Add Products</span>
          </li>
          <li
            onClick={() => {
              setisAddProducts(false);
              setisManageProducts(true);
              setisManageOrders(false);
              setisSummary(false);
            }}
            className={` hover:cursor-pointer transition-all duration-450 p-2 ${
              isManageProducts && "bg-slate-700 text-white "
            }`}
          >
            <i className="fa-solid fa-clipboard-list" />{" "}
            <span>Manage Products</span>
          </li>
          <li
            onClick={() => {
              setisAddProducts(false);
              setisManageProducts(false);
              setisManageOrders(true);
              setisSummary(false);
            }}
            className={` hover:cursor-pointer transition-all duration-450 p-2 ${
              isManageOrders && "bg-slate-700 text-white "
            }`}
          >
            <i className="fa-solid fa-bars-progress" />{" "}
            <span>Manage Orders</span>
          </li>
        </ul>
      </div>

      {isAddProducts && <AddProducts />}
      {isManageProducts && <ManageProducts />}
      {isManageOrders && <ManageOrders />}
      {isSummary && <Summary />}
    </div>
  );
};

export default Admin;
