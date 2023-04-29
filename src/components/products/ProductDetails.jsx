import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useSelector } from "react-redux/es/exports";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import {scrollToTop} from "../../utils/scrollToTop";

const ProductDetails = ({ getAllProductsCart, isLogin, setIsLoading }) => {
	const { id } = useParams();
	const [quantity, setQuantity] = useState(1);
	const navigate = useNavigate();
	const products = useSelector((state) => state.products);
	const [productInfo, setProductInfo] = useState();
	const [category, setCategory] = useState();

	useEffect(() => {
		setIsLoading(true);
		const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`;
		axios
			.get(URL)
			.then((res) => {
				setProductInfo(res.data.data.product);
				setCategory(res.data.data.product.category);
				setQuantity(1);
			})
			.catch(() => setQuantity(1));

		setQuantity(1);
		scrollToTop();

		if (isLogin) {
			getAllProductsCart();
		}

		setIsLoading(false);
	}, [id]);

	const productCategory = products?.filter((item) => {
		if (item.category.name === category && item.id != id) {
			return item;
		}
	});

	// Agregar al carrito de compras
	const handleAddCart = () => {
		const token = localStorage.getItem("token");
		if (token) {
			const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/cart";
			const obj = {
				id: productInfo.id,
				quantity: quantity,
			};

			axios
				.post(URL, obj, getConfig())
				.then((res) => {
					console.log(res.data);
					alert("product added to cart");
				})
				.catch();
		} else {
			alert("You need to be logged in to add products to your cart. 😕");
			navigate("/login");
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

	// console.log(cartProducts);

	return (
		<section className="productinfo">
			<div className="productinfo__return">
				<p className="productinfo__return-home" onClick={() => navigate("/")}>
          Home
				</p>
				<div className="productinfo__return-circle"></div>
				<p className="productinfo__return-product">{productInfo?.title}</p>
			</div>
			<article className="productinfo__container">
				<article className="productinfo__body">
					<div className="productinfo__img">
						<div className="productinfo__img-body">
							<img
								src={productInfo?.productImgs[0]}
								alt={productInfo?.title}
								className="productinfo__img-body-img"
							/>
						</div>
						<div className="productinfo__img-footer">
							<div className="productinfo__img-div">
								<img
									src={productInfo?.productImgs[0]}
									alt={productInfo?.title}
									className="productinfo__img-div-img"
								/>
							</div>
							<div className="productinfo__img-div">
								<img
									src={productInfo?.productImgs[1]}
									alt={productInfo?.title}
									className="productinfo__img-div-img"
								/>
							</div>
							<div className="productinfo__img-div">
								<img
									src={productInfo?.productImgs[2]}
									alt={productInfo?.title}
									className="productinfo__img-div-img"
								/>
							</div>
						</div>
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
				<article className="productinfo__footer">
					<h3 className="productinfo__footer-title">Discover similar items</h3>
					<section className="productinfo__footer-container">
						{productCategory?.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</section>
				</article>
			</article>
		</section>
	);
};

export default ProductDetails;
