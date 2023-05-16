import axios from "axios";
import getConfig from "../../utils/getConfig";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCartInfo from "../products/ProductCartInfo";
import { ROUTES_PATH } from "../../Constants";

const Header = ({ getAllProductsCart, cartProducts, isLogin }) => {
  const navigate = useNavigate();

  const toggleCart = () => {
    getAllProductsCart();

    const cartDisplay = document.querySelector(".cart");
    if (cartDisplay.style.display === "flex") {
      cartDisplay.style.display = "none";
    } else {
      cartDisplay.style.display = "flex";
    }
  };

  // Funcion para hacer check-out del carrito de compras
  const handleCheckout = () => {
    if (isLogin) {
      const cartDisplay = document.querySelector(".cart");
      const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/purchases";
      const obj = {
        street: "Green. 1456",
        colony: "Southwest",
        zipCode: 12645,
        city: "USA",
        references: "Some refences",
      };

      axios
        .post(URL, obj, getConfig())
        .then((res) => {
          console.log(res.data);
          getAllProductsCart();
          alert("Thank you for your purchase! 😀");
          cartDisplay.style.display = "none";
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          getAllProductsCart();
          cartDisplay.style.display = "none";
        });
    } else {
      const cartDisplay = document.querySelector(".cart");
      alert("You must first login before purchasing. 😕");
      cartDisplay.style.display = "none";
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div>
        <NavLink to={ROUTES_PATH.HOME}>
          <h1 className="header__logo">e-commerce</h1>
        </NavLink>
      </div>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            {isLogin ? (
              <i className="fa-solid fa-user-circle"></i>
            ) : (
              <div className="header__auth-btns">
                <NavLink
                  to={ROUTES_PATH.LOGIN}
                  className="header__auth-login"
                >
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
          </li>
          <li className="header__item">
            <i
              className="fa-solid fa-cart-shopping header__link"
              onClick={toggleCart}
							></i>
							<p>Cart</p>
          </li>
        </ul>
      </nav>
      <section className="cart">
        <article className="cart__header">
          <h2 className="cart__title">Shopping cart</h2>
          <section className="cart__container">
            {cartProducts?.map((product) => (
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
          <span className="cart__footer-value">{`$ ${"total"}`}</span>
          <button className="cart__footer-btn" onClick={handleCheckout}>
            Checkout<i className="fa-solid fa-bag-shopping"></i>
          </button>
        </article>
      </section>
    </header>
  );
};

export default Header;
