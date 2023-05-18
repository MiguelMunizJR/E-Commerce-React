import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH } from "../../consts";
import { addProductToCart } from "../../services/apiServices";

const ProductCard = ({ product, isLogin }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`${ROUTES_PATH.PRODUCTS}/${product?.id}`);
		scrollToTop();
	};

	const handleAddCart = (event) => {
		event.stopPropagation();

		if (isLogin) {
			addProductToCart(product);
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
					<img src={product?.image} alt="" className="product__img" />
				</header>
				<h2 className="product__title">{product?.title}</h2>
				<footer className="product__footer">
					<div className="product__price">
						<p className="product__price-title">Price</p>
						<span className="product__price-value">$ {product?.price}</span>
					</div>
					<button className="product__btn" onClick={handleAddCart}>
						<i className="fa-solid fa-cart-shopping"></i>
					</button>
				</footer>
			</article>
		</>
	);
};

export default ProductCard;
