import axios from "axios";
import { toast } from "sonner";
import { ROUTES_PATH, URL_API } from "../consts";
import getConfig from "../utils/getConfig";

//TODO Cart
//* Eliminar producto del carrito
export const removeProductCart = (product, getAllProductsCart) => {
	const URL = `${URL_API}${ROUTES_PATH.CART}/${product?.id}`;

	axios
		.delete(URL, getConfig())
		.then(() => {
			getAllProductsCart();
		})
		.catch(() => {
			toast.error("Error removing product from cart");
		});
	return;
};

//* Agregar producto al carrito
export const addProductToCart = (productInfo, quantity) => {
	const URL = `${URL_API}${ROUTES_PATH.CART}`;

	const cartData = {
		productId: productInfo?.id,
		quantity: quantity ?? 1,
	};

	axios
		.post(URL, cartData, getConfig())
		.then(() => {
			toast.success("Product added to cart");
		})
		.catch(() => toast.error("Error adding product to cart"));
	return;
};

//TODO Orders
//* Crear nueva orden
export const orderCheckout = (cart, getAllProductsCart) => {
	const URL = `${URL_API}${ROUTES_PATH.ORDERS}`;

	const orderData = {
		cartId: cart?.id,
	};

	axios
		.post(URL, orderData, getConfig())
		.then(() => {
			getAllProductsCart();
			toast.success("Order placed successfully");
		})
		.catch(() => {
			toast.error("An error occurred with the order");
		});
};