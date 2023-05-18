import axios from "axios";
import { toast } from "sonner";
import { ROUTES_PATH, URL_API } from "../consts";
import getConfig from "../utils/getConfig";

export const removeProductCart = (product, getAllProductsCart) => {
	const URL = `${URL_API}${ROUTES_PATH.CART}/${product.id}`;

	axios
		.delete(URL, getConfig())
		.then(() => {
			toast.success(`${product.title} removed from cart`);
			getAllProductsCart();
		})
		.catch(() => toast.error("Error removing product from cart"));
	return;
};

export const addProductToCart = (productInfo, quantity) => {
	const URL = `${URL_API}${ROUTES_PATH.CART}`;

	const cartData = {
		productId: productInfo.id,
		quantity: quantity,
	};

	axios
		.post(URL, cartData, getConfig())
		.then(() => {
			toast.success("Product added to cart");
		})
		.catch(() => toast.error("Error adding product to cart"));
	return;
};
