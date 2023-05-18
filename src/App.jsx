// Dependencies
import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
// Styles
import "./styles/UI.css";
import "./styles/products.css";
// Utils
import { ROUTES_PATH } from "./consts";
// Components with lazy loading
const Header = lazy(() => import("./components/UI/Header"));
const Home = lazy(() => import("./components/UI/Home"));
const Footer = lazy(() => import("./components/UI/Footer"));
const ProtectedRoutes = lazy(() => import("./components/ProtectedRoutes"));
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Loading = lazy(() => import("./components/Loading"));
const Orders = lazy(() => import("./components/Orders"));
const ProductDetails = lazy(() =>
	import("./components/products/ProductDetails")
);

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
			<Suspense fallback={<Loading />}>
				<Header isLogin={isLogin} />
				<Routes>
					<Route path={ROUTES_PATH.HOME} element={<Home isLogin={isLogin} />} />
					<Route
						path={ROUTES_PATH.LOGIN}
						element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
					/>
					<Route
						path={ROUTES_PATH.REGISTER}
						element={<Register isLogin={isLogin} setIsLogin={setIsLogin} />}
					/>
					<Route
						path={ROUTES_PATH.PRODUCT_ID}
						element={<ProductDetails isLogin={isLogin} />}
					/>
					<Route element={<ProtectedRoutes isLogin={isLogin} />}>
						<Route path={ROUTES_PATH.ORDERS} element={<Orders />} />
					</Route>
				</Routes>
				<Footer />
			</Suspense>
		</div>
	);
}

export default App;
