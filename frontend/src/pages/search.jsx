import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/productItem";
import Loading from "../components/loading";
import Footer from "../components/footer";

const Search = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [sidebardata, setsidebardata] = useState({
    searchTerm: "",
    category: "all",
    brand: "all",
    freeShipping: false,
    sort: "created_at",
    order: "desc",
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const categoryFromUrl = urlParams.get("category");
    const brandFromUrl = urlParams.get("brand");
    const freeShippingFromUrl = urlParams.get("freeShipping");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      categoryFromUrl ||
      brandFromUrl ||
      freeShippingFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setsidebardata({
        searchTerm: searchTermFromUrl || "",
        category: categoryFromUrl || "all",
        brand: brandFromUrl || "all",
        freeShipping: freeShippingFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchProducts = async () => {
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/searchProducts/?${searchQuery}`);
        const data = await res.json();
        if (data.error) {
          setloading(false)
          return console.log(data.error);
        }
        setloading(false)
        setproducts(data);
      } catch (error) {
        setloading(false)
        console.log(error);
      }
    };
    fetchProducts();
  }, [location.search]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("category", sidebardata.category);
    urlParams.set("brand", sidebardata.brand);
    urlParams.set("freeShipping", sidebardata.freeShipping);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const handleChange = (e) => {
    if (e.target.name === "sort_order") {
      const sort = e.target.value.split("_")[0] || "creater_at";
      const order = e.target.value.split("_")[1] || "desc";
      setsidebardata({ ...sidebardata, sort, order });
    } else if (e.target.name === "freeShipping") {
      setsidebardata({ ...sidebardata, [e.target.name]: e.target.checked });
    } else {
      setsidebardata({ ...sidebardata, [e.target.name]: e.target.value });
    }
  };
  console.log(products)
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="p-7  md:border-r-2 md:min-h-screen">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Free shipping:</label>
              <input
                type="checkbox"
                name="freeShipping"
                checked={sidebardata.freeShipping}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Category:</label>
              <select
                className=" p-2 border rounded-lg"
                name="category"
                required
                onChange={handleChange}
              >
                <option value="all" selected>
                  All
                </option>
                <option value="phones">Phones</option>
                <option value="laptops">Laptops</option>
                <option value="tablets">Tablets</option>
                <option value="monitors">Monitors</option>
                <option value="tvs">TVs</option>
              </select>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Brand:</label>
              <select
                className=" p-2 border rounded-lg"
                required
                name="brand"
                onChange={handleChange}
              >
                <option value="all" selected>
                  All
                </option>
                <option value="apple">apple</option>
                <option value="sumsung">sumsung</option>
                <option value="huawei">huawei</option>
                <option value="hp">hp</option>
                <option value="msi">msi</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                onChange={handleChange}
                defaultValue={"created_at_desc"}
                name="sort_order"
                className="border rounded-lg p-3"
              >
                <option value="createdAt_desc" >Latest</option>
                <option value="createdAt_asc">Oldest</option>
                <option value="price_asc">Price low to hight</option>
                <option value="price_desc">Price high to low</option>
              </select>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
            </button>
          </form>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
            Product results:
          </h1>
          { loading ? <div className=" mt-10">
            <Loading color={"gray"} height={30} width={30} />
          </div> : <div className="p-7 flex flex-wrap gap-4">
      
              { products.length === 0? <p className=" text-md">No products yet, it will be available soon!</p> : products.map((product, index) => {
                  return <ProductItem product={product} key={index} />
              })}
          </div>}
        </div>
      
      </div>
      <Footer />
    </div>
  );
};

export default Search;
