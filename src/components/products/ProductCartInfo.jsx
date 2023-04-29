import { useEffect } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const ProductCartInfo = ({ product, getAllProductsCart }) => {
	const handleDeleteProduct = () => {
		const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${product.id}`;
		axios
			.delete(URL, getConfig())
			.then(() => {
				getAllProductsCart();
			})
			.catch();
	};

	return (
		<article className="cart__product-card">
			<div className="cart__product-header">
				<div className="cart__product-brand">
					<p className="cart__product-brand-title">{product.brand}</p>
					<i
						className="fa-solid fa-trash-can"
						onClick={handleDeleteProduct}
					></i>
				</div>
				<h4 className="cart__product-title">{product.title}</h4>
				<span className="cart__product-quantity">
					{product.productsInCart.quantity}
				</span>
			</div>
			<div className="cart__product-footer">
				<p className="cart__product-total">Total:</p>
				<span className="cart__product-value">
          $ {product.productsInCart.quantity * product.price}
				</span>
			</div>
		</article>
	);
};

export default ProductCartInfo;
