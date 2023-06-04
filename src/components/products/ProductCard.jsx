import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH } from "../../consts";
import { addProductToCart } from "../../services/apiServices";
import closeCartSlider from "../../utils/closeCartSlider";
import CartSvg from "../CartSvg";

const ProductCard = ({ product, isLogin }) => {
	const navigate = useNavigate();

	// Ver la descripción del producto
	const handleClick = () => {
		navigate(`${ROUTES_PATH.PRODUCTS}/${product?.id}`);
		scrollToTop();
	};

	// Agregar producto al carrito de compras
	const handleAddCart = (evt) => {
		evt.stopPropagation();

		if (isLogin) {
			addProductToCart(product);
			closeCartSlider();
		} else {
			toast("You must login to continue", {
				action: {
					label: "Login",
					onClick: () => navigate(ROUTES_PATH.LOGIN),
				},
			});
			navigate(ROUTES_PATH.LOGIN);
		}
	};

	return (
		<>
			<article className="product__card" onClick={handleClick}>
				<header className="product__header">
					<img src={product?.image} alt={product?.title} className="product__img" loading="lazy" />
				</header>
				<h2 className="product__title">{product?.title}</h2>
				<footer className="product__footer">
					<div className="product__price">
						<p className="product__price-title">Price</p>
						<span className="product__price-value">${product?.price.toLocaleString("es-MX", {
							currency: "MXN",
						})}</span>
					</div>
					<button className="product__btn" onClick={handleAddCart}>
						<CartSvg className="product__btn-cart" />
					</button>
				</footer>
			</article>
		</>
	);
};

export default ProductCard;
