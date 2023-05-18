import { useState, useEffect } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../consts";
import getConfig from "../utils/getConfig";

const useOrders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getAllOrders = () => {
		const URL = `${URL_API}${ROUTES_PATH.ORDERS}`;

		axios
			.get(URL, getConfig())
			.then((res) => {
				setOrders(res?.data?.orders.reverse());
				setLoading(false);
			})
			.catch((err) =>
				setError(err.message)
			);
	};

	useEffect(() => {
		getAllOrders();
	}, []);

	return { orders, loading, error, getAllOrders };
};

export default useOrders;
