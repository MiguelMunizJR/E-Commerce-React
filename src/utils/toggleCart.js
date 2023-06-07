import { checkTokenValidity } from "./auth/authServices";

const toggleCart = (isLogin, getAllProductsCart, storedToken) => {
	const cartSlider = document.querySelector(".cart");
	cartSlider.classList.toggle("cart__active");
	const isOpen = Boolean(cartSlider.classList.contains("cart__active"));

	if (isLogin) {
		checkTokenValidity(storedToken);
	}

	const getProductsCart = isOpen && isLogin;
	getProductsCart && getAllProductsCart();
};

export default toggleCart;
