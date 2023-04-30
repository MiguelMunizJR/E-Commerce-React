import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getConfig from "../utils/getConfig";
import {scrollToTop} from "../utils/scrollToTop";

const Orders = ({ setIsLoading }) => {
	const [orders, setOrders] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/purchases";

		axios
			.get(URL, getConfig())
			.then((res) => setOrders(""))
			.catch((err) => console.log(err));
		scrollToTop();
		setIsLoading(false);
	}, []);

	return (
		<section className="purchases">
			<article className="purchases__card">
				<h2 className="purchases__title">Purchases</h2>
				<div className="productinfo__return">
					<p className="productinfo__return-home" onClick={() => navigate("/")}>
            Home
					</p>
					<div className="productinfo__return-circle"></div>
					<p className="productinfo__return-product">Purchases</p>
				</div>
				<section className="purchases__container">
					{orders?.length !== 0 ? (
						orders?.map((purchase) => (
							<article className="purchases__product-card" key={purchase.id}>
								<header className="purchases__product-header">
									<p className="purchases__product-date">
										{purchase.createdAt.slice(0, 10)}
									</p>
								</header>
								{purchase?.cart.products.map((product) => (
									<main className="purchases__product-body" key={product.id}>
										<div className="purchases__product-article">
											<h3 className="purchases__product-title">
												{product.title}
											</h3>
											<span className="purchases__product-quantity">
												{product.productsInCart.quantity}
											</span>
											<span className="purchases__product-price">
												{`$ ${product.productsInCart.quantity * product.price}`}
											</span>
										</div>
									</main>
								))}
							</article>
						))
					) : (
						<div className="purchases__container-div">
							<i className="fa-regular fa-face-frown purchases__face"></i>
							<h4 className="purchases__container-message">
                You do not have orders
							</h4>
						</div>
					)}
				</section>
			</article>
		</section>
	);
};

export default Orders;
