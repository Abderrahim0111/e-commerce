import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/loading";
import {
  addToCart,
  decreseQuantity,
  increseQuantity,
} from "../redux/productSlice";
import Reviews from "../components/reviews";
import ProductItem from "../components/productItem";
import Footer from "../components/footer";
import { api } from "../utils/end";

const Product = () => {
  const [similarProducts, setsimilarProducts] = useState([]);
  const { products, productsId } = useSelector((state) => state.product);
  const [isreviews, setisreviews] = useState(false);
  const [isdescription, setisdescription] = useState(true);
  const [product, setproduct] = useState({});
  const [reviews, setreviews] = useState([]);
  const [newImgUrl, setnewImgUrl] = useState("");
  const [loadingF, setloadingF] = useState(true);
  const dispatch = useDispatch();
  let { productId } = useParams();
  const selectedQuantity = () => {
    const aaa = products.find((prod) => {
      return prod._id === product._id;
    });
    return aaa.selectedQuantity;
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${api}/fetchProduct/${productId}`, {credentials: 'include'});
        const data = await res.json();
        if (data.error) {
          setloadingF(false);
          return console.log(data.error);
        }
        setloadingF(false);
        setnewImgUrl(data.images[0]);
        setproduct(data);
      } catch (error) {
        setloadingF(false);
        console.log(error);
      }
    };
    fetchProduct();

    const fetchSimilarProducts = async () => {
      try {
        const res = await fetch(`${api}/fetchSimilarProducts/${productId}`, {credentials: 'include'});
        const data = await res.json();
        if (data.error) {
          return console.log(data.error);
        }
        setsimilarProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSimilarProducts();
  }, [productId]);
  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const res = await fetch(`${api}/fetchReviews/${productId}`, {credentials: 'include'});
        const data = await res.json();
        if (data.error) {
          return console.log(data.error);
        }
        setreviews(data);
      };
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  }, [reviews]);
  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
  });
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  const renderStars = (averageRating) => {
    const totalStars = 5;
    const fullStars = Math.floor(averageRating);
    const halfStars = Math.ceil(averageRating - fullStars);
    const emptyStars = totalStars - fullStars - halfStars;

    const starItems = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starItems.push(
        <i key={i} className="fa-solid fa-star text-yellow-400"></i>
      );
    }

    // Half stars
    for (let i = 0; i < halfStars; i++) {
      starItems.push(
        <i
          key={i + fullStars}
          className="fa-solid fa-star-half text-yellow-400"
        ></i>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starItems.push(
        <i
          key={i + fullStars + halfStars}
          className="fa-regular fa-star text-yellow-400"
        ></i>
      );
    }

    return starItems;
  };
  if (loadingF)
    return (
      <div className=" mt-10">
        <Loading color={"gray"} height={30} width={30} />;
      </div>
    );
  return (
    <div className=" p-3 sm:p-10">
      <div className=" flex flex-col sm:flex-row mb-14 gap-4">
        <div className="rounded-lg w-full sm:flex-1 flex flex-col gap-4">
          <div className={`p-2 rounded-lg w-[360px] h-[360px] md:w-[460px] md:h-[460px] lg:w-[648px] lg:h-[550px] shadow-md`}>
            <img
              src={newImgUrl}
              alt=""
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-2 items-center">
            {product.images.map((image, index) => (
              <div
                className="hover:cursor-pointer p-2 w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-lg object-contain shadow-md"
                key={index}
                onClick={() => {
                  setnewImgUrl(image);
                }}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" w-full sm:flex-[0.8] rounded-lg">
          <p className=" uppercase text-red-700 mb-4">{product.brand}</p>

          <p className=" font-bold capitalize text-2xl">{product.title}</p>
          <p className=" text-sm">{product.category}</p>
          {product.freeShipping && (
            <p className=" font-semibold p-2 bg-[#F5B60B] rounded-xl w-fit mt-5">
              FREE DELIVERY
            </p>
          )}
          <p className=" font-semibold text-red-600 text-xl mt-5">
            {product.price.toLocaleString("en-US")} DH
          </p>

          <p className=" my-4">{product.description}</p>
          <div className="my-4 flex gap-2">
            <div>{renderStars(averageRating)}</div>
            <div className=" flex gap-[2px]">
              <p>({reviews.length}</p>
              <p>{reviews.length > 1 ? "reviews" : "review"})</p>
            </div>
          </div>
          <div className="">
            {productsId.includes(productId) ? (
              <div className="flex gap-2 items-center">
                <i
                  onClick={() => {
                    dispatch(decreseQuantity(product));
                  }}
                  className=" hover:cursor-pointer hover:opacity-90 fa-solid fa-minus"
                />
                <span className=" p-2 bg-slate-700 text-white rounded-full h-7 w-7 flex items-center justify-center">
                  {selectedQuantity()}
                </span>
                <i
                  onClick={() => {
                    if(selectedQuantity() < product.quantity){
                      dispatch(increseQuantity(product));
                      }
                  }}
                  className={` hover:cursor-pointer hover:opacity-90 fa-solid fa-plus ${selectedQuantity() >= product.quantity ? 'hidden' : ''}`}
                />
              </div>
            ) : (
              <div className=" flex gap-2 items-center">
                <button
                  onClick={() => {
                    dispatch(addToCart(product));
                  }}
                  disabled={product.quantity <= 0}
                  type="button"
                  className=" rounded-lg disabled:cursor-not-allowed disabled:opacity-90 hover:opacity-90 flex items-center gap-2 p-2 bg-slate-700 text-white justify-center"
                >
                  <span>Add to cart </span>
                  <i className="fa-solid fa-cart-shopping" />
                </button>
                { product.quantity <= 0 && <p className=" text-red-600 font-semibold">Out of stock</p>}
              </div>

            )}
          </div>
        </div>
      </div>
      <div className="">
        <ul className=" flex gap-4 justify-center">
          <li
            onClick={() => {
              setisdescription(true);
              setisreviews(false);
            }}
            className={` hover:cursor-pointer p-3 shadow-md ${
              isdescription ? "bg-slate-700 text-white" : ""
            } rounded-xl uppercase`}
          >
            description
          </li>
          <li
            onClick={() => {
              setisreviews(true);
              setisdescription(false);
            }}
            className={` hover:cursor-pointer p-3 shadow-md ${
              isreviews ? "bg-slate-700 text-white" : ""
            } rounded-xl uppercase`}
          >
            reviews({reviews.length})
          </li>
        </ul>
        {isdescription && (
          <div className=" shadow-md mt-5 py-10 px-8">
            <h1 className=" font-semibold text-3xl mb-6">Description</h1>
            <h1 className=" font-semibold text-2xl mb-2">{product.title}</h1>
            <p>{product.detail}</p>
          </div>
        )}
        {isreviews && <Reviews product={product} />}
        <div className=" shadow-md mt-14 p-8 rounded-lg">
          <h1 className="font-semibold text-3xl text-center mb-5">
            Similar Products
          </h1>
          {similarProducts.length === 0 ? (
            <p className=" text-center">
              No similar products{" "}
              <span className=" text-blue-600">({product.category})</span>
            </p>
          ) : (
            similarProducts.map((product, index) => {
              return <ProductItem key={index} product={product} />;
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
