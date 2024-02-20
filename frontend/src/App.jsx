import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Register from "./pages/register";
import Login from "./pages/login";
import { useSelector } from "react-redux";
import Profile from "./pages/profile";
import Admin from "./pages/admin";
import Cart from "./pages/cart";
import Product from "./pages/product";
import NotFound from "./pages/notFound";
import EditProduct from "./pages/editProduct";
import Search from "./pages/search";
import Order from "./pages/order";
import Myorders from "./pages/myorders";
import View from "./pages/view";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header {...{ currentUser }} />
      <Routes>
        <Route path="/" element={<Home {...{ currentUser }} />} />
        <Route path="/register" element={<Register {...{ currentUser }} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit/:productId" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/view/:orderId" element={<View />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login {...{ currentUser }} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
