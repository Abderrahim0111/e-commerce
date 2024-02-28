import { useEffect, useState } from "react";
import ProductItem from "../components/productItem";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import CategoryItem from "../components/categoryItem";
import Footer from "../components/footer";
import { api } from "../utils/end";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${api}/fetchProducts`, {credentials: 'include'});
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
          return;
        }
        setLoading(false);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [products]);

  const handleCategory = (category) => {
    navigate(`/search?category=${category}`);
  };
  if (loading) {
    return (
      <div className="mt-10">
        <Loading color={"gray"} height={30} width={30} />
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className=" flex  gap-8 flex-col">
        <h1 className=" text-center font-semibold text-2xl">
          Explore our product range
        </h1>
        <div className=" flex flex-wrap gap-10 justify-center">
          <CategoryItem
            category="phones"
            handleCategory={handleCategory}
            imageURL="https://www.pngmart.com/files/15/Apple-iPhone-11-PNG-Image.png"
            categoryName="phones"
          />
          <CategoryItem
            category="laptops"
            handleCategory={handleCategory}
            imageURL="https://pngimg.com/d/laptop_PNG101774.png"
            categoryName="laptops"
          />
          <CategoryItem
            category="tvs"
            handleCategory={handleCategory}
            imageURL="https://www.pngmart.com/files/1/Haier-TV-PNG.png"
            categoryName="tvs"
          />
          <CategoryItem
            category="monitors"
            handleCategory={handleCategory}
            imageURL="https://www.pngmart.com/files/6/Monitor-Background-PNG.png"
            categoryName="monitors"
          />
          <CategoryItem
            category="tablets"
            handleCategory={handleCategory}
            imageURL="https://pngimg.com/uploads/tablet/small/tablet_PNG8600.png"
            categoryName="tablets"
          />
        </div>
      </div>
      <h1 className="font-semibold text-2xl mb-10 mt-20 text-center">
        Recent products
      </h1>
      <div className="flex gap-5 flex-wrap justify-center">
        {products.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
