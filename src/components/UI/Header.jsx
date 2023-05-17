/* eslint-disable react/prop-types */
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCartInfo from "../products/ProductCartInfo";
import { ROUTES_PATH } from "../../consts";
import { Menu } from "@headlessui/react";
import useCart from "../../hooks/useCart";

const Header = ({ isLogin }) => {
	const navigate = useNavigate();
	const { cart, getAllProductsCart } = useCart();
	
	function toggleCart() {
		const cartSlider = document.querySelector(".cart");
		cartSlider.classList.toggle("cart__active");
		isLogin && getAllProductsCart();
	}

	// Funcion para hacer check-out del carrito de compras
	// const handleCheckout = () => {
	// 	if (isLogin) {
	// 		const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/purchases";
	// 		const obj = {
	// 			street: "Green. 1456",
	// 			colony: "Southwest",
	// 			zipCode: 12645,
	// 			city: "USA",
	// 			references: "Some refences",
	// 		};

	// 		axios
	// 			.post(URL, obj, getConfig())
	// 			.then((res) => {
	// 				console.log(res.data);
	// 				getAllProductsCart();
	// 				alert("Thank you for your purchase! 😀");
	// 				navigate("/");
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 				getAllProductsCart();
	// 			});
	// 	} else {
	// 		alert("You must first login before purchasing. 😕");
	// 		navigate("/login");
	// 	}
	// };

	const logout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<header className="header">
			<div>
				<NavLink to={ROUTES_PATH.HOME}>
					<h1 className="header__logo">e-commerce</h1>
				</NavLink>
			</div>
			<nav className="header__nav">
				<div className="header__item">
					{isLogin ? (
						<Menu>
							<Menu.Button as="div" className="header__profile">
								<img
									src="../../../public/user_profile.png"
									alt="user_profile"
								/>
							</Menu.Button>
							<Menu.Items className="header__profile-menu">
								<Menu.Item>
									{({ active }) => (
										<a
											className={`${
												active
													? "header__profile-item-hover"
													: "header__profile-item"
											}`}
											href="#"
										>
                        Account
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active
													? "header__profile-logout-hover"
													: "header__profile-logout"
											}`}
											onClick={() => logout()}
										>
                        Log out
										</button>
									)}
								</Menu.Item>
							</Menu.Items>
						</Menu>
					) : (
						<div className="header__auth-btns">
							<NavLink to={ROUTES_PATH.LOGIN} className="header__auth-login">
                  Login
							</NavLink>
							<NavLink
								to={ROUTES_PATH.REGISTER}
								className="header__auth-signup"
							>
                  Sign up
							</NavLink>
						</div>
					)}
					{isLogin && (
						<NavLink
							to={ROUTES_PATH.ORDERS}
							className={({ isActive }) =>
								isActive ? "active__link" : "header__item"
							}
						>
							<i className="fa-solid fa-store"></i>
							<p>Orders</p>
						</NavLink>
					)}
				</div>
				<button onClick={toggleCart} className="header__cart-btn">
					<i className="fa-solid fa-cart-shopping header__link"></i>
					<p>Cart</p>
				</button>
			</nav>
			<section className="cart">
				<article className="cart__header">
					<h2 className="cart__title">Shopping cart</h2>
					<section className="cart__container">
						{cart?.products?.map((product) => (
							<ProductCartInfo
								key={product.id}
								product={product}
								getAllProductsCart={getAllProductsCart}
							/>
						))}
					</section>
				</article>
				<article className="cart__footer">
					<p className="cart__footer-total">Total:</p>
					<span className="cart__footer-value">{`$ ${cart?.total}`}</span>
					<button className="cart__footer-btn" onClick={"handleCheckout"}>
            Checkout<i className="fa-solid fa-bag-shopping"></i>
					</button>
				</article>
			</section>
		</header>
	);
};

export default Header;
