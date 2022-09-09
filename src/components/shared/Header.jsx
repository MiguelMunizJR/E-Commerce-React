import React from "react";
import shared from "./style/shared.css";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCartInfo from "../products/ProductCartInfo";

const Header = ({
  getAllProductsCart,
  cartProducts,
  isLogin,
  total,
  setTotal,
  isEmpty,
  setIsEmpty,
  setIsLoading,
}) => {
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

  // Funcion para hacer checkout del carrito de compras
  const handleCheckout = () => {
    if (isLogin) {
      if (isEmpty) {
        alert("Your shopping cart is empty, add products. 😕");
        const cartDisplay = document.querySelector(".cart");
        cartDisplay.style.display = "none";
      } else {
        setIsLoading(true);
        const cartDisplay = document.querySelector(".cart");
        const URL =
          "https://ecommerce-api-react.herokuapp.com/api/v1/purchases";
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
            setTotal(0);
            alert("Thank you for your purchase! 😀");
            setTimeout(() => setIsLoading(false), 500);
            setIsEmpty(true);
            cartDisplay.style.display = "none";
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            getAllProductsCart();
            cartDisplay.style.display = "none";
          });
      }
    } else {
      const cartDisplay = document.querySelector(".cart");
      alert("You must first login before purchasing. 😕");
      cartDisplay.style.display = "none";
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <NavLink to="/">
        <h1
          className="header__logo"
          onClick={() => {
            const cartDisplay = document.querySelector(".cart");
            cartDisplay.style.display = "none";
          }}
        >
          e-commerce
        </h1>
      </NavLink>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active__link" : "header__link"
              }
            >
              <i
                className="fa-solid fa-user"
                onClick={() => {
                  const cartDisplay = document.querySelector(".cart");
                  cartDisplay.style.display = "none";
                }}
              ></i>
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/purchases"
              className={({ isActive }) =>
                isActive ? "active__link" : "header__link"
              }
            >
              <i
                className="fa-solid fa-store"
                onClick={() => {
                  const cartDisplay = document.querySelector(".cart");
                  cartDisplay.style.display = "none";
                }}
              ></i>
            </NavLink>
          </li>
          <li className="header__item">
            <i
              className="fa-solid fa-cart-shopping header__link"
              onClick={toggleCart}
            ></i>
          </li>
        </ul>
      </nav>
      <section className="cart">
        <article className="cart__header">
          <h2 className="cart__title">Shopping cart</h2>
          <section className="cart__container">
            {isEmpty ? (
              <div className="cart__container-div">
                <i className="fa-regular fa-face-frown"></i>
                <h4 className="cart__container-message">
                  Your shopping cart is empty
                </h4>
              </div>
            ) : (
              cartProducts?.map((product) => (
                <ProductCartInfo
                  key={product.id}
                  product={product}
                  getAllProductsCart={getAllProductsCart}
                  isEmpty={isEmpty}
                  setIsEmpty={setIsEmpty}
                />
              ))
            )}
          </section>
        </article>
        <article className="cart__footer">
          <p className="cart__footer-total">Total:</p>
          <span className="cart__footer-value">{`$ ${total}`}</span>
          <button className="cart__footer-btn" onClick={handleCheckout}>
            Checkout<i className="fa-solid fa-bag-shopping"></i>
          </button>
        </article>
      </section>
    </header>
  );
};

export default Header;
