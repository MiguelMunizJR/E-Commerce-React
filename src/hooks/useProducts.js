import { useState, useEffect } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../consts";

const useProducts = () => {
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	//* Obtener todos los productos
	const getAllProducts = async () => {
		const URL = `${URL_API}${ROUTES_PATH.PRODUCTS}`;

		await axios
			.get(URL)
			.then((res) => {
				setProducts(res?.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return { products, loading, error, getAllProducts };
};

export default useProducts;
