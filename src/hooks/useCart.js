import { useState } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../consts";
import getConfig from "../utils/getConfig";

const useCart = () => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);

	//* Obtener productos del carrito
	const getAllProductsCart = () => {
		setLoading(true);
		const URL = `${URL_API}${ROUTES_PATH.CART}`;

		axios
			.get(URL, getConfig())
			.then((res) => {
				setCart(res?.data.cart);
				setLoading(false);
			})
			.catch(() => {});
	};

	return { cart, loading, getAllProductsCart };
};

export default useCart;
