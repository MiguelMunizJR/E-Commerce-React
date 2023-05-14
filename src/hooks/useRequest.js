import { useState, useEffect } from "react";
import axios from "axios";

const useRequest = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const URL = "https://ecommerce-api-express-2dx2.onrender.com/api/v1/products";

	const getAllProducts = async () => {
		await axios.get(URL)
			.then((res) => {
				setData(res?.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		getAllProducts();
	}, []);
  

	return { data, loading, error, getAllProducts };
};

export default useRequest;
