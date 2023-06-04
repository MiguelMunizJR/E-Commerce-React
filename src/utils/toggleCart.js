const toggleCart = (isLogin, getAllProductsCart) => {
	const cartSlider = document.querySelector(".cart");
	cartSlider.classList.toggle("cart__active");

	const isOpen = Boolean(cartSlider.classList.contains("cart__active"));
	
	(isOpen && isLogin) && getAllProductsCart();
};

export default toggleCart;
