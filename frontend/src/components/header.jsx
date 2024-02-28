/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userSlice";
import { logedOut } from "../redux/productSlice";
import { useEffect, useState } from "react";
import { api } from "../utils/end";

const Header = ({ currentUser }) => {
  const { products } = useSelector((state) => state.product);
  const [searchTerm, setsearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const res = await fetch(`${api}/logout`, {credentials: 'include'});
      const data = await res.json();
      if (data.error) {
        return console.log(data.error);
      }
      dispatch(logedOut())
      dispatch(loginSuccess(null));
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setsearchTerm(searchTermFromUrl)
    }
  }, [location.search])
  return (
    <header className="sticky top-0 z-50 p-2 pr-[18px] sm:p-4 sm:pr-8 md:pr-10 flex justify-between items-center shadow-md bg-white">
      <h1 className=" hover:cursor-pointer md:px-8 text-lg font-bold">
        <Link to="/">Boutiquti</Link>
      </h1>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 shadow-md p-2 rounded-xl">
        <input onChange={(e) => {
          setsearchTerm(e.target.value)
        }} className="w-28 sm:w-60  outline-none" type="text" name="searchTerm" placeholder="Search..." value={searchTerm}/>
        <button><i className="fa-solid fa-magnifying-glass" /></button>
      </form>
      <ul className=" flex gap-4">
        {currentUser && (
          <li className="dropdown hover:cursor-pointer  relative">
            Profile
            <ul className=" z-10 dropdownItems hidden absolute shadow-lg bg-white right-[-30px] p-2 rounded-lg">
            <Link to="/profile"><li className=" p-2 text-center transition-all duration-300 rounded-lg hover:cursor-pointer hover:shadow-lg">
                Profile
              </li></Link>
              <Link to="/myorders"><li className=" p-2 transition-all text-center duration-300 rounded-lg hover:cursor-pointer hover:shadow-lg">
                My orders
              </li></Link>
              {currentUser._id === import.meta.env.VITE_ADMIN && (
                <Link to="/admin"><li className=" p-2 transition-all text-center duration-300 rounded-lg hover:cursor-pointer hover:shadow-lg">
                  Dashboard
                </li></Link>
              )}
              <li
                onClick={handleLogout}
                className=" p-2 transition-all duration-300 text-center rounded-lg hover:cursor-pointer hover:shadow-lg"
              >
                Logout
              </li>
            </ul>
          </li>
        )}
        {!currentUser && (
          <li className=" hover:cursor-pointer">
            <Link to="/login">Login</Link>
          </li>
        )}
        <li className=" relative hover:cursor-pointer">
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping" />
          </Link>
          { products.length > 0 && <span className=" hover:cursor-default text-[11px] p-1 absolute top-0 right-[-13px] bg-slate-700 text-white rounded-full h-3 w-3 flex items-center justify-center">
            {products.length}
          </span>}
        </li>
      </ul>
    </header>
  );
};

export default Header;
