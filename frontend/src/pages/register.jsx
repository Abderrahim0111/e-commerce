import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginSuccess } from "../redux/userSlice";
import { api } from "../utils/end";

// eslint-disable-next-line react/prop-types
const Register = ({currentUser}) => {
  const [userData, setuserData] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const res = await fetch(`${api}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      })
      const data = await res.json()
      if(data.error){
        setloading(false)
        return seterror(data.error)
      }
      setloading(false)
      dispatch(loginSuccess(data))
      navigate('/')
    } catch (error) {
      setloading(false)
      seterror(error)
    }
  };
  useEffect(() => {
    if(currentUser){
      navigate('/')
    }
  }, [])
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Register</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <input
          className=" border p-3 rounded-lg"
          type="text"
          name="username"
          placeholder="username"
          required
          onChange={handleChange}
        />
        <input
          className=" border p-3 rounded-lg"
          type="email"
          name="email"
          placeholder="email"
          required
          onChange={handleChange}
        />
        <input
          className=" border p-3 rounded-lg"
          type="password"
          name="password"
          placeholder="password"
          required
          onChange={handleChange}
        />
        <button className="transition-all duration-300 bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed">
          { loading? "Loading..." : "Register"}
        </button>
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Already have an account?</p>

        <span
          className=" hover:cursor-pointer text-blue-700"
        >
          <Link to="/login">Login</Link>
        </span>
      </div>
      {error && <p className=" text-red-500">{error}</p>}
    </div>
  );
};

export default Register;
