import axios from "axios";
import { useState } from "react";
import { ROUTES_PATH, URL_API } from "../Constants";

export const useProducts = () => {
	const [products, setProducts] = useState([]);

	const getAllProducts = () => {
		axios.get(`${URL_API}${ROUTES_PATH.PRODUCTS}`)
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.error(err.message);
			});
	};

  
	return { products, getAllProducts };
};