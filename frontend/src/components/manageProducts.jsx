import { useEffect, useState } from "react";
import Loading from "./loading";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [loading, setloading] = useState(true);
  const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/fetchProducts");
      const data = await res.json();
      if (data.error) {
        return console.log(data.error);
      }
      setloading(false);
      setproducts(data);
    };
    fetchProducts();
  }, [products]);
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Delete this product?")
    if(!confirm) return
    try {
      const res = await fetch(`/api/deleteProduct/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        return console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return(
      <div className=" mt-10">
         <Loading color={"gray"} height={30} width={30} />;
      </div>
    )
  }
  if(products.length === 0){
    return(
      <div className=" mt-10">
        <p className=" text-lg font-semibold text-center">No products!</p>
      </div>
    )
  }
  return (
    <div className=" flex justify-center mt-16 p-2">
      <div className="">
        {products.map((product, index) => {
          return (
            <div
              className=" flex gap-6 items-center justify-between shadow-md p-3 rounded-lg"
              key={index}
            >
              <img
                src={product.images[0]}
                alt=""
                className=" h-16 w-16 object-contain"
              />
              <p className=" line-clamp-1 w-48 font-semibold capitalize">{product.title}</p>
              <p className=" hidden sm:block">{product.price} DH</p>
              {product.freeShipping && <p className=" hidden sm:block">Free shipping</p>}
              {!product.freeShipping && <p className=" hidden sm:block">Shipping ({product.shippingPrice} DH)</p>}
              {product.quantity > 0 ? (
                <p className=" text-green-700">{`In stock (${product.quantity})`}</p>
              )
              : <p className=" text-red-700">Out of stock</p>}

              <div className=" flex gap-6">
                <Link to={`/admin/edit/${product._id}`}>
                  <button>
                    <i className=" text-blue-600 text-xl fa-solid fa-pen-to-square" />
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                >
                  <i className=" text-red-700 text-xl fa-solid fa-trash" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageProducts;
