import { useState, useEffect } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../consts";

const useProducts = () => {
	const [products, setProducts] = useState([]);
	const [productsCategories, setProductsCategories] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	//* Obtener todos los productos
	const getAllProducts = async () => {
		setLoading(true);
		const URL = `${URL_API}${ROUTES_PATH.PRODUCTS}`;

		await axios
			.get(URL)
			.then((res) => {
				setProducts(res?.data);
				const categories = [...new Set(res?.data?.map(product => product?.category))];
				setProductsCategories(categories);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return { products, productsCategories, loading, error, getAllProducts };
};

export default useProducts;
