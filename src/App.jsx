import { Route, Routes } from "react-router-dom";
import axios from "axios";
import getConfig from "./utils/getConfig";
import Header from "./components/shared/Header";
import Home from "./components/home/Home";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/routes/Login";
import Orders from "./components/routes/Orders";
import Footer from "./components/shared/Footer";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import { useEffect, useState } from "react";
import Loading from "./components/routes/Loading";

function App() {
	const [cartProducts, setCartProducts] = useState([]);
	const [isLogin, setIsLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getAllProductsCart = () => {
		const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/cart";
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
					path="/"
					element={
						<Home
							getAllProductsCart={getAllProductsCart}
							cartProducts={cartProducts}
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
						/>
					}
				/>
				<Route
					path="/products/:id"
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
						path="/orders"
						element={<Orders setIsLoading={setIsLoading} />}
					/>
				</Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
