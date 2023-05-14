import axios from "axios";

const getAllProducts = () => {
	const URL = "https://ecommerce-api-express-2dx2.onrender.com/api/v1/products";

	axios.get(URL)
		.then((res) => {
			return res?.data;
		})
		.catch((err) => console.log(err.message));
};

export default getAllProducts;
