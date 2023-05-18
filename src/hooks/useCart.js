import { useState, useEffect } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../consts";
import getConfig from "../utils/getConfig";

const useCart = () => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	//* Obtener productos del carrito
	const getAllProductsCart = () => {
		const URL = `${URL_API}${ROUTES_PATH.CART}`;

		axios
			.get(URL, getConfig())
			.then((res) => {
				setCart(res?.data.cart);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		getAllProductsCart();
	}, []);

	return { cart, loading, error, getAllProductsCart };
};

export default useCart;
