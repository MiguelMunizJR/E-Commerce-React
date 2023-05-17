import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH, URL_API } from "../../consts";
import closeCartSlider from "../../utils/closeCartSlider";
import { toast } from "sonner";

const ProductCard = ({ product, isLogin }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`${ROUTES_PATH.PRODUCTS}/${product?.id}`);
		scrollToTop();
	};

	// Agregar al carrito de compras
	const handleAddCart = (event) => {
		event.stopPropagation();

		if (isLogin) {
			const URL = `${URL_API}${ROUTES_PATH.CART}`;
			const cartData = {
				productId: product.id,
			};

			axios
				.post(URL, cartData, getConfig())
				.then(() => {
					closeCartSlider();
					toast.success("Product added to cart");
				})
				.catch(() => toast.error("Error adding product to cart"));
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
