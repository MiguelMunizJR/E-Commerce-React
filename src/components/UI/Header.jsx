// Dependencies
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
// Components & utils
import { CartLoading } from "../Loading";
import ProductCartInfo from "../products/ProductCartInfo";
import closeCartSlider from "../../utils/closeCartSlider";
import toggleCart from "../../utils/toggleCart";
import { ROUTES_PATH } from "../../consts";
import { orderCheckout } from "../../services/apiServices";
import useCart from "../../hooks/useCart";
import CartSvg from "../CartSvg";

const Header = ({ isLogin, storedToken }) => {
  const navigate = useNavigate();
  const { cart, loading, getAllProductsCart } = useCart();

  //* Funcion para hacer check-out del carrito de compras
  const handleCheckout = () => {
    if (isLogin) {
      if (cart.products?.length === 0) {
        toast.error("Cart empty, add products to continue with order");
      } else {
        orderCheckout(cart, getAllProductsCart);
        confetti({
          particleCount: 200,
          spread: 150,
          origin: {
            x: 0.5,
            y: 0.8,
          },
        });
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
      <article className="header__content">
        <div>
          <NavLink to={ROUTES_PATH.HOME}>
            <h1 className="header__logo">ecommerce</h1>
          </NavLink>
        </div>
        <nav className="header__nav">
          {isLogin ? (
            <Menu>
              <Menu.Button as="div" className="header__profile">
                <img
                  src="https://i.postimg.cc/B6Lr41Hc/user-profile.png"
                  alt="user_profile"
                  loading="lazy"
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
                isActive ? "header__cart-btn" : "header__cart-btn"
              }
            >
              <i className="fa-solid fa-store"></i>
            </NavLink>
          )}
          {isLogin && (
            <button
              onClick={() =>
                toggleCart(isLogin, getAllProductsCart, storedToken)
              }
              className="header__cart-btn"
            >
              <CartSvg className="header__item-cart" />
            </button>
          )}
        </nav>
        {/* Cart section */}
        <section className="cart">
          <h2 className="cart__title">Shopping cart</h2>
          <article className="cart__container">
            {loading ? (
              <CartLoading />
            ) : cart?.products.length < 1 ? (
              <article className="cart__container-empty">
                <CartSvg className="cart__container-empty-cart" />
                <h5>Empty cart</h5>
                <small>Please add products to continue with your order</small>
              </article>
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
            <span className="cart__footer-value">{`$${
              cart?.total?.toLocaleString("es-MX", {
                currency: "MXN",
              }) || 0
            }`}</span>
            <button
              className="cart__footer-btn"
              onClick={handleCheckout}
              disabled={cart.products?.length < 1}
            >
              Checkout<i className="fa-solid fa-bag-shopping"></i>
            </button>
          </footer>
        </section>
      </article>
    </header>
  );
};

export default Header;
