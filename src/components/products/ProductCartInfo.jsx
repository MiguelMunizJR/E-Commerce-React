import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH, URL_API } from "../../consts";
import closeCartSlider from "../../utils/closeCartSlider";

const ProductCartInfo = ({ product, getAllProductsCart }) => {
	const navigate = useNavigate();

	// Eliminar producto del carrito
	const handleDeleteProduct = () => {
		const URL = `${URL_API}${ROUTES_PATH.PRODUCTS}/${product?.id}`;
		axios
			.delete(URL, getConfig())
			.then(() => {
				alert(`Product ${product.title} removed from cart`);
				getAllProductsCart();
			})
			.catch();
	};

	const handleNavigate = () => {
		navigate(`${ROUTES_PATH.PRODUCTS}/${product.id}`);
		closeCartSlider();
	};

	return (
		<article className="cart__product-card">
			<div className="cart__product-header">
				<div className="cart__product-icon">
					<i
						className="fa-solid fa-trash-can"
						onClick={handleDeleteProduct}
					></i>
				</div>
				<div className="cart__product-container">
					<div className="cart__product-img">
						<img src={product.image} alt={product.title} onClick={handleNavigate} />
					</div>
					<div className="cart__product-title-div">
						<h4 className="cart__product-title">{product.title}</h4>
						<span className="cart__product-quantity">
							{product.quantity.quantity}
						</span>
					</div>
				</div>
			</div>
			<div className="cart__product-footer">
				<p className="cart__product-total">Total:</p>
				<span className="cart__product-value">
          ${product.quantity.quantity * product.price}
				</span>
			</div>
		</article>
	);
};

export default ProductCartInfo;
