import { useState, useEffect } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../consts";
import getConfig from "../utils/getConfig";

const useCart = () => {
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const URL = `${URL_API}${ROUTES_PATH.CART}`;

	const getAllProductsCart = async () => {
		await axios.get(URL, getConfig())
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
