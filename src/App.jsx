import { useEffect, useState } from "react";
import "./styles/UI.css";
import "./styles/products.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import getConfig from "./utils/getConfig";
import Header from "./components/UI/Header";
import Home from "./components/UI/Home";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/auth/Login";
import Orders from "./components/Orders";
import Footer from "./components/UI/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Loading from "./components/Loading";
import { ROUTES_PATH } from "./Constants";

function App() {
	const [cartProducts, setCartProducts] = useState([]);
	const [isLogin, setIsLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getAllProductsCart = () => {
		const URL = "https://ecommerce-api-express-2dx2.onrender.com/api/v1/cart";
		axios
			.get(URL, getConfig())
			.then((res) => {
				setCartProducts("");
			})
			.catch();
	};

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			getAllProductsCart();
			setIsLogin(true);
		}
	}, [isLogin]);

	return (
		<div className="App">
			<Loading isLoading={isLoading} />
			<Header
				getAllProductsCart={getAllProductsCart}
				cartProducts={cartProducts}
				setIsLoading={setIsLoading}
				isLogin={isLogin}
			/>
			<Routes>
				<Route
					path={ROUTES_PATH.HOME}
					element={
						<Home
							getAllProductsCart={getAllProductsCart}
							cartProducts={cartProducts}
							setIsLoading={setIsLoading}
						/>
					}
				/>
				<Route
					path={ROUTES_PATH.LOGIN}
					element={
						<Login
							setIsLoading={setIsLoading}
							isLogin={isLogin}
							setIsLogin={setIsLogin}
						/>
					}
				/>
				<Route
					path={ROUTES_PATH.PRODUCT}
					element={
						<ProductDetails
							getAllProductsCart={getAllProductsCart}
							cartProducts={cartProducts}
							setIsLoading={setIsLoading}
						/>
					}
				/>
				<Route element={<ProtectedRoutes />}>
					<Route
						path={ROUTES_PATH.ORDERS}
						element={<Orders setIsLoading={setIsLoading} />}
					/>
				</Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
