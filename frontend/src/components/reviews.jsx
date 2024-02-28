/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import StartsRating from "./startsRating";
import { api } from "../utils/end";

const Reviews = ({ product }) => {
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setloading] = useState(true);
  const [isreview, setisreview] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [error, seterror] = useState("");
  const [reviewSuccessMsg, setreviewSuccessMsg] = useState("");
  const [costumerData, setcostumerData] = useState({
    user: currentUser ? currentUser._id : "",
    product: product,
  });
  const handleChange = (e) => {
    setcostumerData({ ...costumerData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      seterror("Please provide a rating before submitting.");
      return;
    }
    try {
      const dataWithRating = { ...costumerData, rating };
      const res = await fetch(`${api}/createReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithRating),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        return seterror(data.error);
      }
      seterror("");
      setisreview(true);
      setreviewSuccessMsg(data.message);
    } catch (error) {
      seterror(error);
    }
  };
  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const res = await fetch(`${api}/fetchReviews/${product._id}`, {credentials: 'include'});
        const data = await res.json();
        if (data.error) {
          setloading(false);
          return console.log(data.error);
        }
        setloading(false);
        setreviews(data);
      };
      fetchReviews();
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }, [reviews]);
  return (
    <div className=" flex flex-col sm:flex-row gap-10  mt-10">
      {isreview ? (
        <p className=" flex-1 text-green-700">{reviewSuccessMsg}</p>
      ) : (
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
          <h1 className=" font-semibold text-2xl mb-4">
            {reviews.length > 0
              ? `Leave a review to ${product.title}`
              : `Be the first to review ${product.title}`}
          </h1>
          <p>
            Your email address will not be published. Required fields are
            indicated with *
          </p>
          <label>Your rating *</label>
          <div className=" flex gap-2">
            <StartsRating {...{ rating, setrating, hover, sethover }} />
            <p className=" text-yellow-400 font-semibold">
              {hover || rating}/5
            </p>
          </div>
          <label>Your opinion *</label>
          <textarea
            className=" p-2 rounded-lg border"
            placeholder="Your opinion"
            name="opinion"
            onChange={handleChange}
            required
          ></textarea>
          {error && <p className=" text-red-700">{error}</p>}
          {currentUser ? (
            <button className=" duration-300 transition-all hover:opacity-90 uppercase rounded-lg p-3 bg-slate-700 text-white">
              submit
            </button>
          ) : (
            <button
              className=" transition-all duration-300 bg-red-700 font-semibold text-white p-3 rounded-lg hover:opacity-90"
              type="button"
            >
              <Link to="/login">You should login to review!</Link>
            </button>
          )}
        </form>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" flex-1">
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              return (
                <div
                  className=" shadow-md p-3 relative rounded-lg mb-4"
                  key={index}
                >
                  <div className=" flex items-center justify-between">
                    <div className=" flex items-center gap-x-2">
                      <p className=" text-lg font-semibold uppercase w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center">
                        {review.user.username[0]}
                      </p>
                      <div>
                        <p className=" text-lg font-semibold">
                          {review.user.username}
                        </p>
                        <p className=" mt-[-5px] text-xs">
                          {[...Array(5)].map((star, index) => {
                            return (
                              <label key={index}>
                                <input
                                  className="hidden"
                                  type="radio"
                                  name="rating"
                                  checked={review.rating >= index + 1}
                                />
                                <i
                                  className={`${
                                    review.rating >= index + 1
                                      ? "text-yellow-400"
                                      : "text-slate-200"
                                  } fa-solid fa-star`}
                                />
                              </label>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                    <p className=" absolute right-2 bottom-1 text-sm text-green-700">
                      {moment(review.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className=" mb-2">{review.opinion}</p>
                </div>
              );
            })
          ) : (
            <p>There are no reviews yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
