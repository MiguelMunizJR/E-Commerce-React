import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getConfig from "../utils/getConfig";
import { scrollToTop } from "../utils/scrollToTop";
import { ROUTES_PATH, URL_API } from "../consts";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getAllOrders();
		scrollToTop();
	}, []);

	const getAllOrders = () => {
		const URL = `${URL_API}${ROUTES_PATH.ORDERS}`;

		axios
			.get(URL, getConfig())
			.then((res) => setOrders(res?.data?.orders.reverse()))
			.catch(() =>
				console.error("An error occurred while obtaining the orders")
			);
	};

	return (
		<section className="purchases">
			<article className="purchases__card">
				<h2 className="purchases__title">Purchases</h2>
				<div className="productinfo__return">
					<p className="productinfo__return-home" onClick={() => navigate(ROUTES_PATH.HOME)}>
            Home
					</p>
					<div className="productinfo__return-circle"></div>
					<p className="productinfo__return-product">Purchases</p>
				</div>
				<section className="purchases__container">
					{orders?.length !== 0 ? (
						orders?.map((order) => (
							<main className="purchases__product-card" key={order.id}>
								<header className="purchases__product-header">
									<p className="purchases__product-date">{order.date}</p>
									<p className="purchases__product-total">
                    Total:<span> ${order.total}</span>
									</p>
								</header>
								{order?.products?.map((product) => (
									<article
										className="purchases__product-container"
										key={product.id}
									>
										<div className="purchases__product-article">
											<button
												className="purchases__product-img"
												onClick={() =>
													navigate(`${ROUTES_PATH.PRODUCTS}/${product.id}`)
												}
											>
												<img src={product.image} alt={product.title} />
											</button>
											<div className="purchases__product-body">
												<button
													className="purchases__product-title"
													onClick={() =>
														navigate(`${ROUTES_PATH.PRODUCTS}/${product.id}`)
													}
												>
													{product.title}
												</button>
												<span className="purchases__product-quantity">
													{product["order_details"]?.quantity}
												</span>
												<span className="purchases__product-price">
													{`$ ${product["order_details"]?.total}`}
												</span>
											</div>
										</div>
									</article>
								))}
							</main>
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
