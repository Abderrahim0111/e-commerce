import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { logedOut } from "../redux/productSlice";
import Loading from "../components/loading";
import { api } from "../utils/end";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [loadingF, setloadingF] = useState(true);
  const [userData, setuserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${api}/deleteUser/${currentUser._id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        return console.log(data.error);
      }
      dispatch(loginSuccess(null));
      dispatch(logedOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const res = await fetch(`${api}/updateUser/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return seterror(data.error);
      }
      dispatch(loginSuccess(data));
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(error);
    }
  };
  useEffect(() => {
    if (!currentUser) {
      setloadingF(false);
      navigate("/");
    } else {
      setloadingF(false);
    }
  }, [currentUser]);
  if (loadingF)
    return (
      <div className=" mt-10">
        <Loading color={"gray"} height={30} width={30} />
      </div>
    );
  return (
    <form onSubmit={handleSubmit} className=" max-w-lg mx-auto mt-8 p-4">
      <h1 className=" text-center text-2xl font-semibold mb-16">Profile</h1>

      <div className=" flex flex-col gap-4 mb-5">
        <input
          className=" p-3 rounded-lg border"
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <input
          className=" p-3 rounded-lg border"
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />
        <input
          className=" p-3 rounded-lg border"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button className=" transition-all duration-300 bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
          {loading ? "loading..." : "update"}
        </button>
        <button
          type="button"
          onClick={handleDeleteUser}
          className=" transition-all duration-300 bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-90"
        >
          Delete account
        </button>
      </div>
      {error ? <p>{error}</p> : null}
    </form>
  );
};

export default Profile;
