const toggleCart = (isLogin, getAllProductsCart) => {
	const cartSlider = document.querySelector(".cart");
	cartSlider.classList.toggle("cart__active");
	isLogin && getAllProductsCart();
};

export default toggleCart;
