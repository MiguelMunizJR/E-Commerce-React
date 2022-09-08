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
  const [cartProducts, setCartProducts] = useState();
  const [isEmpty, setIsEmpty] = useState(true);

  const getAllProductsCart = () => {
    const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/cart";
    axios
      .get(URL, getConfig())
      .then((res) => setCartProducts(res?.data.data.cart.products))
      .catch((err) => setCartProducts());
  };

  useEffect(() => {
    getAllProductsCart();
  }, []);

  return (
    <div className="App">
      <Header
        getAllProductsCart={getAllProductsCart}
        cartProducts={cartProducts}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              getAllProductsCart={getAllProductsCart}
              cartProducts={cartProducts}
              isEmpty={isEmpty}
              setIsEmpty={setIsEmpty}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/:id"
          element={
            <ProductDetails
              getAllProductsCart={getAllProductsCart}
              cartProducts={cartProducts}
              isEmpty={isEmpty}
              setIsEmpty={setIsEmpty}
            />
          }
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
