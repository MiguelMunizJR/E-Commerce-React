// Dependencies
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
// Styles
import "./styles/UI.css";
import "./styles/products.css";
// Utils
import { ROUTES_PATH } from "./consts";
// Components
import Header from "./components/UI/Header";
import Home from "./components/UI/Home";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/auth/Login";
import Orders from "./components/Orders";
import Footer from "./components/UI/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./components/auth/Register";
import Loading from "./components/Loading";

function App() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLogin(true);
		}
	}, [isLogin]);

	return (
		<div className="App">
			<Toaster richColors position={"top-center"} />
			<Loading />
			<Header isLogin={isLogin} />
			<Routes>
				<Route
					path={ROUTES_PATH.HOME}
					element={
						<Home isLogin={isLogin} />
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
						<ProductDetails isLogin={isLogin} />
					}
				/>
				<Route element={<ProtectedRoutes isLogin={isLogin} />}>
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
