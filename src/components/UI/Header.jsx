// Dependencies
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { toast } from "sonner";
// Components & utils
import { CartLoading } from "../Loading";
import ProductCartInfo from "../products/ProductCartInfo";
import closeCartSlider from "../../utils/closeCartSlider";
import toggleCart from "../../utils/toggleCart";
import { ROUTES_PATH } from "../../consts";
import { orderCheckout } from "../../services/apiServices";
import useCart from "../../hooks/useCart";

const Header = ({ isLogin }) => {
	const navigate = useNavigate();
	const { cart, loading, getAllProductsCart } = useCart();

	//* Funcion para hacer check-out del carrito de compras
	const handleCheckout = () => {
		if (isLogin) {
			if (cart.products?.length === 0) {
				toast.error("Cart empty, add products to continue with order");
			} else {
				orderCheckout(cart, getAllProductsCart);
				closeCartSlider();
				navigate(ROUTES_PATH.HOME);
			}
		} else {
			toast("You must login to continue", {
				action: {
					label: "Login",
					onClick: () => {
						closeCartSlider();
						navigate(ROUTES_PATH.LOGIN);
					},
				},
			});
		}
	};

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
				<button
					onClick={() => toggleCart(isLogin, getAllProductsCart)}
					className="header__cart-btn"
				>
					<i className="fa-solid fa-cart-shopping header__link"></i>
					<p>Cart</p>
				</button>
			</nav>
			{/* Cart section */}
			<section className="cart">
				<h2 className="cart__title">Shopping cart</h2>
				<article className="cart__container">
					{loading && isLogin ? (
						<CartLoading />
					) : (
						cart?.products?.map((product) => (
							<ProductCartInfo
								key={product.id}
								product={product}
								getAllProductsCart={getAllProductsCart}
							/>
						))
					)}
				</article>
				<footer className="cart__footer">
					<p className="cart__footer-total">Total:</p>
					<span className="cart__footer-value">{`$${cart?.total || 0}`}</span>
					<button className="cart__footer-btn" onClick={handleCheckout}>
            Checkout<i className="fa-solid fa-bag-shopping"></i>
					</button>
				</footer>
			</section>
		</header>
	);
};

export default Header;
