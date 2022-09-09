import { Route, Routes } from "react-router-dom";
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
import Loading from "./components/routes/Loading";

function App() {
  const [cartProducts, setCartProducts] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const [total, setTotal] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProductsCart = () => {
    const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/cart";
    axios
      .get(URL, getConfig())
      .then((res) => {
        const products = res.data.data.cart.products;
        setCartProducts(products);
        const total = products?.reduce((acc, cv) => {
          return Number(cv.price) * cv.productsInCart.quantity + acc;
        }, 0);
        setTotal(total);
        setIsEmpty(false);
      })
      .catch();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getAllProductsCart();
      setIsLogin(true);
    }

    // Crear usuario
    // const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/users';
    // const Obj = {
    //   firstName: "Alpha",
    //   lastName: "User",
    //   email: "alpha_user100@gmail.com",
    //   password: "123456",
    //   phone: "3322991188",
    //   role: "admin",
    // };

    // axios.post(URL, Obj)
    // .then((res) => console.log(res.data))
    // .catch((err) => console.log(err));
  }, [isLogin]);

  return (
    <div className="App">
      <Loading isLoading={isLoading} />
      <Header
        getAllProductsCart={getAllProductsCart}
        cartProducts={cartProducts}
        total={total}
        setTotal={setTotal}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
        setIsLoading={setIsLoading}
        isLogin={isLogin}
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
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoading={setIsLoading}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setIsEmpty={setIsEmpty}
              setTotal={setTotal}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductDetails
              getAllProductsCart={getAllProductsCart}
              cartProducts={cartProducts}
              isLogin={isLogin}
              isEmpty={isEmpty}
              setIsEmpty={setIsEmpty}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/purchases"
            element={<Purchases setIsLoading={setIsLoading} />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
