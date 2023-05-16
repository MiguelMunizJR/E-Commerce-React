import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./styles/UI.css";
import "./styles/products.css";
import Header from "./components/UI/Header";
import Home from "./components/UI/Home";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/auth/Login";
import Orders from "./components/Orders";
import Footer from "./components/UI/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ROUTES_PATH } from "./Constants";
import Register from "./components/auth/Register";

function App() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			// getAllProductsCart()
			setIsLogin(true);
		}
	}, [isLogin]);

	return (
		<div className="App">
			<Header
				// getAllProductsCart={getAllProductsCart}
				// cartProducts={cartProducts}
				isLogin={isLogin}
			/>
			<Routes>
				<Route
					path={ROUTES_PATH.HOME}
					element={
						<Home
							// getAllProductsCart={getAllProductsCart}
							// cartProducts={cartProducts}
						/>
					}
				/>
				<Route
					path={ROUTES_PATH.LOGIN}
					element={
						<Login
							isLogin={isLogin}
							setIsLogin={setIsLogin}
						/>
					}
				/>
				<Route
					path={ROUTES_PATH.REGISTER}
					element={
						<Register
							isLogin={isLogin}
							setIsLogin={setIsLogin}
						/>
					}
				/>
				<Route
					path={ROUTES_PATH.PRODUCT_ID}
					element={
						<ProductDetails
							// getAllProductsCart={getAllProductsCart}
							// cartProducts={cartProducts}
						/>
					}
				/>
				<Route element={<ProtectedRoutes />}>
					<Route
						path={ROUTES_PATH.ORDERS}
						element={<Orders />}
					/>
				</Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
