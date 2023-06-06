import { useState } from "react";
import axios from "axios";
import { ROUTES_PATH, URL_API } from "../consts";
import getConfig from "../utils/getConfig";

const useOrders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const getAllOrders = () => {
		const URL = `${URL_API}${ROUTES_PATH.ORDERS}`;

		axios
			.get(URL, getConfig())
			.then((res) => {
				setOrders(res?.data?.orders.reverse());
				setLoading(false);
			})
			.catch(() => {}
			);
	};

	return { orders, loading, getAllOrders };
};

export default useOrders;
