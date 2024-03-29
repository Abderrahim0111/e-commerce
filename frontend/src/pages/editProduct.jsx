import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading";
import { api } from "../utils/end";

const EditProduct = () => {
  const { productId } = useParams();
  const [loadingU, setloadingU] = useState(false);
  const [loadingC, setloadingC] = useState(false);
  const [loading, setloading] = useState(true);
  const [filesUploaded, setfilesUploaded] = useState(false);
  const [productData, setproductData] = useState({});
  const [error, seterror] = useState("");
  const navigate = useNavigate()

  const handleUpload = async () => {
    setloadingU(true);
    const formData = new FormData();
    for (let i = 0; i < productData.images.length; i++) {
      formData.append("images", productData.images[i]);
    }
    try {
      const res = await fetch(`${api}/uploadProductImages`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        setloadingU(false);
        return seterror(data.error);
      }
      setproductData({ ...productData, images: data });
      setloadingU(false);
      setfilesUploaded(true);
      seterror("");
    } catch (error) {
      setloadingU(false);
      seterror(error);
    }
  };
  const handleDelete = (index) => {
    const updatedImages = productData.images.filter((image, i) => {
      return index !== i;
    });
    setproductData({ ...productData, images: updatedImages });
  };
  const handleChange = (e) => {
    if (
      [e.target.name] == "title" ||
      [e.target.name] == "description" ||
      [e.target.name] == "category" ||
      [e.target.name] == "brand" ||
      [e.target.type] == "number" ||
      [e.target.name] == "detail"
    ) {
      setproductData({ ...productData, [e.target.name]: e.target.value });
    }
    if ([e.target.name] == "freeShipping") {
      setproductData({ ...productData, [e.target.name]: e.target.checked });
    }
    if (e.target.name === "images") {
      const fileList = e.target.files;
      const fileArray = Array.from(fileList);

      // Concatenate new images with the existing ones
      const updatedImages = [...productData.images, ...fileArray];
      setproductData({ ...productData, images: updatedImages });
    }
  };
  const handleSubmit = async (e) => {
    setloadingC(true);
    e.preventDefault();
    if ( productData.images.length > 0 ) {
      try {
        const res = await fetch(`${api}/updateProduct/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
          credentials: 'include'
        });
        const data = await res.json();
        if (data.error) {
          setloadingC(false);
          return seterror(data.error);
        }
        seterror("");
        setloadingC(false);
        navigate(`/product/${productId}`);
      } catch (error) {
        setloadingC(false);
        seterror(error);
      }
    } else {
      setloadingC(false);
      seterror("Please upload photos first");
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const res = await fetch(`${api}/fetchProduct/${productId}`, {credentials: 'include'})
            const data = await res.json()
            if(data.error){
                return
            }
            setloading(false)
            setproductData(data)
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }
    fetchProduct()
  }, [])
  if(loading) return(
    <div className=" mt-10">
       <Loading color={"gray"} height={30} width={30}/>
    </div>
  )
  return (
    <form
      onSubmit={handleSubmit}
      className=" p-3 flex flex-col gap-4 max-w-4xl mx-auto"
    >
      <h1 className=" text-3xl font-semibold text-center my-7">
        Update product
      </h1>
      <div className="flex-col sm:flex-row flex gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className=" p-2 border rounded-lg"
            type="text"
            name="title"
            placeholder="Product title"
            required
            onChange={handleChange}
            defaultValue={productData.title}
          />
          <textarea
            className=" p-2 border rounded-lg"
            name="description"
            placeholder="Product description"
            required
            onChange={handleChange}
            defaultValue={productData.description}
          />
          <textarea
            className=" p-2 border rounded-lg"
            name="detail"
            placeholder="Product detail"
            required
            onChange={handleChange}
            defaultValue={productData.detail}
          />
          <select
            className=" p-2 border rounded-lg"
            name="category"
            required
            onChange={handleChange}
          >
            <option disabled>
              Select a Category
            </option>
            <option selected hidden value={productData.category}>{productData.category}</option>
            <option value="phones">Phones</option>
            <option value="laptops">Laptops</option>
            <option value="tablets">Tablets</option>
            <option value="monitors">Monitors</option>
            <option value="tvs">TVs</option>
          </select>
          <select
            className=" p-2 border rounded-lg"
            required
            name="brand"
            onChange={handleChange}
          >
            <option disabled>
              Select a Brand
            </option>
            <option selected hidden value={productData.brand}>{productData.brand}</option>
            <option value="apple">apple</option>
            <option value="sumsung">sumsung</option>
            <option value="huawei">huawei</option>
            <option value="hp">hp</option>
          </select>
          <div className=" flex items-center gap-2">
            <input
              className=" p-2 border rounded-lg"
              type="number"
              name="price"
              min={0}
              required
              onChange={handleChange}
              defaultValue={productData.price}
            />
            <p>dhs</p>
          </div>
          <div className=" flex items-center gap-2">
            <input
              className=" p-2 border rounded-lg"
              type="number"
              name="quantity"
              min={1}
              required
              onChange={handleChange}
              defaultValue={productData.quantity}
            />
            <p>Quantity</p>
          </div>
          <div className=" flex gap-4">
            <p>Delivery: </p>
            <div className=" flex gap-1">
              <label htmlFor="free">Free</label>
              <input
                type="checkbox"
                name="freeShipping"
                id="free"
                onChange={handleChange}
                checked={productData.freeShipping}
              />
            </div>
          </div>

            <div className=" flex items-center gap-2">
              <input
                className=" p-2 border rounded-lg"
                type="number"
                name="shippingPrice"
                min={0}
                required
                onChange={handleChange}
                defaultValue={productData.shippingPrice}
              />
              <p>DH</p>
            </div>

        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className=" font-semibold">
            Images:
            <span className=" font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              disabled={filesUploaded || loadingU}
              className=" disabled:cursor-not-allowed p-3 border border-gray-300 rounded w-full"
              type="file"
              name="images"
              accept="image/*"
              multiple
              required={productData.images.length === 0}
              onChange={handleChange}
            />
            <button
              onClick={() => {
                handleUpload();
              }}
              disabled={filesUploaded || loadingU}
              type="button"
              className=" transition-all duration-300 disabled:opacity-90 disabled:hover:shadow-none disabled:cursor-not-allowed p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg"
            >
              {loadingU ? (
                <Loading
                  color={"rgb(21 128 61 / var(--tw-border-opacity))"}
                  height={20}
                  width={20}
                />
              ) : (
                "Upload"
              )}
            </button>
          </div>
          {error && <p className=" text-red-700">{error}</p>}
          {filesUploaded ? (
            <p className=" text-green-700">Images uploaded successfully!</p>
          ) : (
            productData.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className=" flex items-center justify-between p-2 border rounded-lg"
                >
                  <img
                    className="h-20 w-20 rounded-lg object-contain"
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`pic-${index}`}
                  />
                  <button
                    disabled={loadingU}
                    type="button"
                    className=" disabled:cursor-not-allowed text-red-500 uppercase hover:opacity-75"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <button
        disabled={loadingC || loadingU}
        className=" duration-300 transition-all disabled:cursor-not-allowed flex justify-center p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90"
      >
        {loadingC ? (
          <Loading color={"white"} height={20} width={20} />
        ) : (
          "Update Product"
        )}
      </button>
    </form>
  );
};

export default EditProduct;
