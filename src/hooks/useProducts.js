import { useState, useEffect } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../Constants";

const useProducts = () => {
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const URL = `${URL_API}${ROUTES_PATH.PRODUCTS}`;

	const getAllProducts = async () => {
		await axios.get(URL)
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
