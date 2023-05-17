import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { toast } from "sonner";
import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH, URL_API } from "../../consts";
import useProducts from "../../hooks/useProducts";
import closeCartSlider from "../../utils/closeCartSlider";

const ProductDetails = ({ isLogin }) => {
	const { id } = useParams();
	const [quantity, setQuantity] = useState(1);
	const navigate = useNavigate();
	const [productInfo, setProductInfo] = useState();
	const [category, setCategory] = useState();
	const { products } = useProducts();

	useEffect(() => {
		const URL = `${URL_API}${ROUTES_PATH.PRODUCTS}/${id}`;
		axios
			.get(URL)
			.then((res) => {
				setProductInfo(res?.data);
				setCategory(res?.data.category);
			})
			.catch(() => {
				toast.error("There was an error in obtaining product");
			});

		closeCartSlider();
		scrollToTop();
	}, [id]);

	const productCategory = products
		?.filter((product) => {
			if (product.category === category && product.id != id) {
				return product;
			}
		})
		.slice(0, 4);

	// Agregar al carrito de compras
	const handleAddCart = () => {
		if (isLogin) {
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
		} else {
			toast("You must login to continue", {
				action: {
					label: "Login",
					onClick: () => navigate(ROUTES_PATH.LOGIN),
				},
			});
			navigate(ROUTES_PATH.LOGIN);
		}
		setQuantity(1);
	};

	const quantityMinus = () => {
		if (quantity - 1 >= 1) {
			setQuantity(quantity - 1);
		}
	};

	const quantityPlus = () => {
		setQuantity(quantity + 1);
	};

	return (
		<section className="productinfo">
			<div className="productinfo__return">
				<p className="productinfo__return-home" onClick={() => navigate(ROUTES_PATH.HOME)}>
          Home
				</p>
				<div className="productinfo__return-circle"></div>
				<p className="productinfo__return-product">{productInfo?.title}</p>
			</div>
			<main className="productinfo__container">
				<article className="productinfo__body">
					<div className="productinfo__img-container">
						<img
							src={productInfo?.image}
							alt={productInfo?.title}
							className="productinfo__img"
						/>
					</div>
					<div className="productinfo__product">
						<h2 className="productinfo__title">{productInfo?.title}</h2>
						<p className="productinfo__description">
							{productInfo?.description}
						</p>
						<footer className="productinfo__options">
							<div className="productinfo__price">
								<p className="productinfo__price-title">Price</p>
								<label
									htmlFor="price"
									className="productinfo__price-value"
								>{`$ ${productInfo?.price}`}</label>
							</div>
							<div className="productinfo__quantity">
								<p className="productinfo__quantity-title">Quantity</p>
								<div className="productinfo__quantity-btns">
									<button
										className="productinfo__quantity-btn productinfo__btn-minus"
										onClick={quantityMinus}
									>
                    -
									</button>
									<label
										htmlFor="quantity"
										className="productinfo__quantity-label"
									>
										{quantity}
									</label>
									<button
										className="productinfo__quantity-btn productinfo__btn-plus"
										onClick={quantityPlus}
									>
                    +
									</button>
								</div>
							</div>
							<button
								className="productinfo__footer-btn"
								onClick={handleAddCart}
							>
                Add to car <i className="fa-solid fa-cart-shopping"></i>
							</button>
						</footer>
					</div>
				</article>
				<footer className="productinfo__footer">
					<h3 className="productinfo__footer-title">Discover similar items</h3>
					<section className="productinfo__footer-container">
						{productCategory?.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</section>
				</footer>
			</main>
		</section>
	);
};

export default ProductDetails;
