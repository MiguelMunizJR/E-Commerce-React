import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import getConfig from "./utils/getConfig";
import Header from "./components/shared/Header";
import Home from "./components/home/Home";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/routes/Login";
import Purchases from "./components/routes/Purchases";
import Footer from "./components/shared/Footer";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState();

  useEffect(() => {
    getAllCartProducts();
  }, [])
  
  const getAllCartProducts = () => {
    const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/cart";
    axios
      .get(URL, getConfig())
      .then((res) => setCart(res.data.data.cart))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Header getAllCartProducts={getAllCartProducts} cart={cart} />
      <Routes>
        <Route path="/" element={<Home getAllCartProducts={getAllCartProducts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetails getAllCartProducts={getAllCartProducts} />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
